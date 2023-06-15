import { createStore } from "vuex";

export default createStore({
  state() {
    return {
      user: null,
      isLoggedIn: false,
    };
  },
  mutations: {
    SET_USER: (state, user) => {
      console.log(user);
      state.user = user;
      state.isLoggedIn = true;
      localStorage.setItem("user", JSON.stringify(user));
    },
  },
  getters: {
    GET_USER: (state) => state.user,
  },
});
