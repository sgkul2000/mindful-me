import { Client as Appwrite, Databases, Account, Permission, Role, Storage, Functions } from 'appwrite';

const Server = {
    endpoint : import.meta.env.VITE_APP_ENDPOINT,
    project: import.meta.env.VITE_APP_PROJECT,
    collectionID : import.meta.env.VITE_APP_COLLECTION_ID,
    database: import.meta.env.VITE_APP_DATABASE_ID.toString(),
    storage: import.meta.env.VITE_APP_STORAGE_BUCKET,
}


let api = {
  sdk: null,

  provider: () => {
    if (api.sdk) {
      return api.sdk;
    }
    let appwrite = new Appwrite();
    appwrite.setEndpoint(Server.endpoint).setProject(Server.project);
    const account = new Account(appwrite);
    const database = new Databases(appwrite, Server.database);
    const storage = new Storage(appwrite);
    const functions = new Functions(appwrite);

    api.sdk = { database, account, storage, functions };
    return api.sdk;
  },

  createAccount: (email, password, name) => {
    return api.provider().account.create("unique()", email, password, name);
  },

  getAccount: () => {
    return api.provider().account.get();
  },

  createSession: (email, password) => {
    return api.provider().account.createEmailSession(email, password);
  },

  deleteCurrentSession: () => {
    return api.provider().account.deleteSession("current");
  },

  createDocument: (collectionId, data, $id) => {
    return api
      .provider()
      .database.createDocument(
        Server.database,
        collectionId,
        $id,
        data,
        [
          Permission.read(Role.guests()),
          Permission.update(Role.guests()),
          Permission.delete(Role.guests()),
        ]
      );
  },

  getDocument: (collectionId, $id) => {
    return api.provider().database.getDocument(Server.database, collectionId, $id);
  },

  listDocuments: (collectionId) => {
    return api.provider().database.listDocuments(Server.database, collectionId);
  },

  updateDocument: (collectionId, documentId, data) => {
    return api
      .provider()
      .database.updateDocument(Server.database, collectionId, documentId, data);
  },

  deleteDocument: (collectionId, documentId) => {
    return api
      .provider()
      .database.deleteDocument(Server.database, collectionId, documentId);
  },

  uploadFile: (file) => {
    return api.provider().storage.createFile(
        Server.storage,
        Math.floor(Math.random() * 10000000).toString(),
        file
    );
  },

  runFunction: (funcId, data) => {
    return api.provider().functions.createExecution(funcId, data)
  }
};

export default api;
