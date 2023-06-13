<script>
import {defineComponent} from 'vue'
import {useEditor, EditorContent} from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import {Placeholder} from "@tiptap/extension-placeholder";
import appwrite from "../appwrite.js";


export default defineComponent({
  name: "journal",

  components: {
    EditorContent,
  },

  data() {
    return {
      lastPush: null,
    }
  },

  setup() {
    const user = JSON.parse(localStorage.getItem('user'));
    const content = '<p>Start a new story 🎉</p>';
    let lastPush = null;
    console.log(user)
    const debounce = (params) => {
      if(lastPush === null || Date.now() - lastPush > 60000) {
        const data = params.editor.getJSON()
        const user = JSON.parse(localStorage.getItem('user'));
        appwrite.updateDocument('64873d304947190ba124', user['userId'], {
          journal: JSON.stringify(data)
        })
      }
    }
    const editor = useEditor({
      content: content,
      extensions: [
        StarterKit,
        Placeholder.configure({
          placeholder: "A safe place to jot down feeling, notes, meme pages we don't judge.....",
        }),
      ],
      onUpdate: debounce
    })
    return { editor, lastPush, user }
  },

  mounted() {

    appwrite.getDocument('64873d304947190ba124', this.user['userId']).then((data) => {
      if(data["journal"] !== "") {
        this.editor.commands.setContent(JSON.parse(data['journal']))
      }
    })
  },


  methods: {
    debounce(params) {
      if(this.lastPush === null || Date.now() - this.lastPush > 60000) {
        const data = params.editor.getJSON()
        const user = JSON.parse(localStorage.getItem('user'));
        appwrite.updateDocument('64873d304947190ba124', user['userId'], {
          journal: JSON.stringify(data)
        })
      }
    }
  }

})
</script>

<template>
  <editor-content class="prose" :editor="editor" @update="debounce"/>
  <div v-if="editor" class="fixed top-1.5 left-1/2 flex justify-center items-center bg-blue-300 m-5 pl-8 pr-8 rounded-3xl toolbar ">
    <button @click="editor.chain().focus().toggleBold().run()" :disabled="!editor.can().chain().focus().toggleBold().run()" :class="{ 'is-active': editor.isActive('bold') }">
      <img width="24" height="24" src="https://img.icons8.com/hatch/64/bold.png" alt="bold"/>
    </button>
    <button @click="editor.chain().focus().toggleItalic().run()" :disabled="!editor.can().chain().focus().toggleItalic().run()" :class="{ 'is-active': editor.isActive('italic') }">
      <img width="24" height="24" src="https://img.icons8.com/external-creatype-outline-colourcreatype/64/external-font-essential-ui-v3-creatype-outline-colourcreatype.png" alt="external-font-essential-ui-v3-creatype-outline-colourcreatype"/>
    </button>
    <button @click="editor.chain().focus().toggleStrike().run()" :disabled="!editor.can().chain().focus().toggleStrike().run()" :class="{ 'is-active': editor.isActive('strike') }">
      <img width="24" height="24" src="https://img.icons8.com/ios-filled/50/strikethrough.png" alt="strikethrough"/>
    </button>
    <button @click="editor.chain().focus().toggleCode().run()" :disabled="!editor.can().chain().focus().toggleCode().run()" :class="{ 'is-active': editor.isActive('code') }">
      <img width="24" height="24" src="https://img.icons8.com/ios-filled/50/source-code.png" alt="source-code"/>
    </button>
    <button @click="editor.chain().focus().setParagraph().run()" :class="{ 'is-active': editor.isActive('paragraph') }">
      <img width="24" height="24" src="https://img.icons8.com/external-bearicons-glyph-bearicons/64/external-paragraph-graphic-design-bearicons-glyph-bearicons.png" alt="external-paragraph-graphic-design-bearicons-glyph-bearicons"/>
    </button>
    <button @click="editor.chain().focus().toggleHeading({ level: 1 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }">
      <img width="24" height="24" src="https://img.icons8.com/material-rounded/96/header.png" alt="header"/>
    </button>
    <button @click="editor.chain().focus().toggleHeading({ level: 2 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }">
      <img width="24" height="24" src="https://img.icons8.com/material-outlined/24/header-2.png" alt="header-2"/>
    </button>
    <button @click="editor.chain().focus().toggleHeading({ level: 3 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }">
      <img width="24" height="24" src="https://img.icons8.com/material-outlined/24/header-3.png" alt="header-3"/>
    </button>
    <button @click="editor.chain().focus().toggleBulletList().run()" :class="{ 'is-active': editor.isActive('bulletList') }">
      <img width="24" height="24" src="https://img.icons8.com/ios-filled/50/bulleted-list.png" alt="bulleted-list"/>
    </button>
    <button @click="editor.chain().focus().toggleOrderedList().run()" :class="{ 'is-active': editor.isActive('orderedList') }">
      <img width="50" height="50" src="https://img.icons8.com/ios/50/numbers-input-form.png" alt="numbers-input-form"/>
    </button>
    <button @click="editor.chain().focus().toggleCodeBlock().run()" :class="{ 'is-active': editor.isActive('codeBlock') }">
      <img width="24" height="24" src="https://img.icons8.com/ios/50/code--v1.png" alt="code--v1"/>
    </button>
    <button @click="editor.chain().focus().toggleBlockquote().run()" :class="{ 'is-active': editor.isActive('blockquote') }">
      <img width="24" height="24" src="https://img.icons8.com/external-creatype-glyph-colourcreatype/64/external-conversation-creatype-user-interface-creatype-glyph-colourcreatype.png" alt="external-conversation-creatype-user-interface-creatype-glyph-colourcreatype"/>
    </button>
    <button @click="editor.chain().focus().undo().run()" :disabled="!editor.can().chain().focus().undo().run()">
      <img width="24" height="24" src="https://img.icons8.com/ios-filled/50/undo.png" alt="undo"/>
    </button>
    <button @click="editor.chain().focus().redo().run()" :disabled="!editor.can().chain().focus().redo().run()">
      <img width="24" height="24" src="https://img.icons8.com/ios-filled/50/redo.png" alt="redo"/>
    </button>
  </div>
</template>

<style>
.ProseMirror {
  padding: 3em;
  margin-top: 3em;
  border: none;
  min-height: 100vh;
}


.ProseMirror-focused {
  border: none !important;
  outline: none !important;
}

.ProseMirror p.is-editor-empty:first-child::before {
   color: #adb5bd;
   content: attr(data-placeholder);
   float: left;
   height: 0;
   pointer-events: none;
 }

.ProseMirror b, .ProseMirror strong {
  font-weight: bold;
}

* {
  color: theme(colors.charcoal);
}

button {
  margin: 5px;
}

.toolbar {
  transform: translateX(-50%);
}
</style>
