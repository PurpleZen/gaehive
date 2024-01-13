<template>
<h1 class="greeting">Edit Post</h1>
  
<div v-if="username && writer" class="posts">
  <div v-if="newpost == 'writing'" class="post">
  <div class="title">
    <div class="username">
      <router-link class="promptButton" :to="'/hivezine/post/' + this.$route.params.id"><div class="material-symbols-rounded">arrow_circle_left</div><span class="tooltiptextleft">View More</span></router-link>
      <div class="space"></div>
      <img :src="'https://uploads.scratch.mit.edu/get_image/user/' + this.id + '_500x500.png'">
      <span><a :href="'https://scratch.mit.edu/users/' + this.username">{{ this.username }}</a><br></span>
    </div>
    <textarea v-html="edit[0].title" v-if="!preview" @keyup="updated()" class="titlename" placeholder="Write an awesome title!" rows=1></textarea>
    <div class="titlename" v-if="preview" v-html="titlepreview"></div>
  </div>
  <div class="toolbar">
    <button class="tools" @click="shortcut('b')">
      <b>B</b>
    </button>
    <button class="tools" @click="shortcut('i')">
      <i>I</i>
    </button>
    <button class="tools" @click="shortcut('u')">
      <u>U</u>
    </button>
    <button class="tools" @click="shortcut('br')">
      Br
    </button>
    <button class="tools" @click="shortcut('a')">
      <div class="material-symbols-rounded">link</div>
    </button>
    <button class="tools" @click="shortcut('img')">
      <div class="material-symbols-rounded">image</div>
    </button>
    <button class="tools" @click="shortcut('center')">
      <div class="material-symbols-rounded">format_align_center</div>
    </button>
    <details id="headers" class="tools">
      <summary>Headers</summary>
      <ul class="list">
        <button @click="shortcut('h1')" class="tools">h1</button>
        <button @click="shortcut('h2')" class="tools">h2</button>
        <button @click="shortcut('h3')" class="tools">h3</button>
        <button @click="shortcut('h4')" class="tools">h4</button>
        <button @click="shortcut('h5')" class="tools">h5</button>
        <button @click="shortcut('h6')" class="tools">h6</button>
      </ul>
    </details>
    <details id="emojis" class="tools">
      <summary>Emojis</summary>
      <ul class="list">
        <button @click="shortcut(':happy:')" class="tools">😊</button>
        <button @click="shortcut(':sad:')" class="tools">☹️</button>
        <button @click="shortcut(':cool:')" class="tools">😎</button>
        <button @click="shortcut(':hmm:')" class="tools">🤔</button>
        <button @click="shortcut(':crylaugh:')" class="tools">😂</button>
        <button @click="shortcut(':thumbsup:')" class="tools">👍</button>
        <button @click="shortcut(':heart:')" class="tools">❤️</button>
        <button @click="shortcut(':pride:')" class="tools">🏳️‍🌈</button>
        <button @click="shortcut(':trans:')" class="tools">🏳️‍⚧️</button>
        <button @click="shortcut(':nails:')" class="tools">💅</button>
        <button @click="shortcut(':skull:')" class="tools">💀</button>
        <button @click="shortcut(':sparkle:')" class="tools">✨</button>
        <button @click="shortcut(':yay:')" class="tools">🎉</button>
        <button @click="shortcut(':leaves:')" class="tools">🍂</button>
        <button @click="shortcut(':pumpkin:')" class="tools">🎃</button>
        <button @click="shortcut(':bat:')" class="tools">🦇</button>
        <button @click="shortcut(':boo!:')" class="tools">👻</button>
        <button @click="shortcut(':y:')" class="tools">🪿</button>
        <button @click="shortcut(':quack:')" class="tools">🦆</button>
        <button @click="shortcut(':eye::lip::eye:')" class="tools">👁️👄👁️</button>
        <button @click="shortcut(':shrug:')" class="tools">¯\_(ツ)_/¯</button>
        <button @click="shortcut(':pablo:')" class="tools">(͠≖ ͜ʖ͠≖)</button>
      </ul>
    </details>
    <button class="tools" v-if="edit[0].post || edit[0].title" @click="preview = !preview">
      <span v-if="!preview">Preview</span>
      <span v-else>Edit</span>
    </button>
  </div>
  <div class='content'>
    <textarea id="textarea" @keydown.ctrl.b.prevent="shortcut('b')" @keydown.ctrl.i.prevent="shortcut('i')" @keydown.ctrl.u.prevent="shortcut('u')" @keydown.ctrl.enter.prevent="shortcut('br')" @keyup="updated()" v-if="!preview" v-model="edit[0].post" style="height:300px" placeholder="Write an awesome post!"></textarea>
    <div v-if="preview" class="styledcontent" v-html="postpreview"></div>
  </div>
  <div class="reactions">
    <h5 style="margin:10px 0">{{ edit[0].post.length }} characters</h5>
    <button @click="jsonify()">Next</button>
  </div>
</div>
  <div v-if="newpost == 'copying'" class="post">
    <div class="content">
        <div v-for="(item, index) in json" :key="item">
          <h5 v-if="index == 0">First Comment <button :id="'button' + index" @click="copy(item, index)">Copy</button></h5>
          <h5 v-else>Reply #{{ index }} <button :id="'button' + index" @click="copy(item, index)">Copy</button></h5>
          <div class="json">
            {{ item }} 
          </div>
        </div>
    </div>
    <div class="reactions">
      <button @click="this.newpost = 'writing'">Back</button>
      <div>
        <a href="https://scratch.mit.edu/studios/33586934/comments" target="_blank"><button>Studio</button></a>
        <button @click="editPost()">Finish</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
  import { getPostEdit, getPages, searchPosts, setReact, removeReact, editPost, reacting, post, username, id, pages } from '@/lib/hivezine.js'
  import { useMeta } from 'vue-meta'
  import symbcode from "@/data/symbcode.json"
  import symbols from "@/data/symbols.json"

  export default {
    data() {
      return {
        username: username,
        id: id,
        manager: null,
        writer: null,
        list: null,
        edit: post,
        titlepreview: "",
        postpreview: "",
        preview: false,
        data: null,
        symbcode: null,
        symbols: null,
        page: 1,
        pages: pages,
        reacting: reacting,
        newpost: 'writing',
        json: [],
        query: null,
        type: "post"
      }
    },
    created() {
      useMeta({
       title: 'Gaehive • Hivezine • Edit Post ' + this.$route.params.id
      })
      if (localStorage['user']) {
        this.writer = JSON.parse(localStorage['user']).writer
      }
      getPostEdit(JSON.parse(this.$route.params.id) +1)
    },

    mounted() {
      this.updated()
    },

    methods: {
      copy(value, id) {
        let element = "button" + id
        navigator.clipboard.writeText(value)
        document.getElementById(element).innerHTML = "Copied!"
      },
      
      editPost() {
        editPost()
        this.$router.push({ path: "/hivezine/post/" + this.$route.params.id, query: null })
      },

      closeDropdown() {
        document.getElementById('type').open = false
      },
      jsonify() {
        this.newpost = "copying"
        this.json = []
        var obj = {edit: this.edit[0].id, title: this.edit[0].title, post: this.edit[0].post}
        obj = JSON.stringify(obj)
      for (var i = 0; i < obj.length / 500; i++) {
         this.json.push(obj.slice(i * 500, (i + 1) * 500))
      }
      },
      updated() {
        this.symbcode = (symbcode)
        this.symbols = (symbols)

        this.postpreview = this.edit[0].post
        this.titlepreview = this.edit[0].title
        this.symbcode.forEach(string => {
          let regex = new RegExp(string, "g")
          var i = this.symbcode.indexOf(string)
            this.postpreview = this.postpreview.replace(regex, this.symbols[i]);
            this.titlepreview = this.titlepreview.replace(regex, this.symbols[i]);
        })
      },
      
      shortcut(type) {
        if (type == "br") {
          let textarea = document.getElementById('textarea')
            textarea.value = textarea.value.slice(0, textarea.selectionStart) + '<' + type + '>' + textarea.value.slice(textarea.selectionEnd)
            this.post = textarea.value
            textarea.focus()
        } else if (type == "img") {
          let textarea = document.getElementById('textarea')
          let start = textarea.selectionStart
          let end = textarea.selectionEnd
          let jumpback = (textarea.value.length + 10) - (textarea.value.length - textarea.selectionEnd)
          textarea.value = textarea.value.slice(0, textarea.selectionStart) + '<' + type + ' src=""' + '>' + textarea.value.slice(textarea.selectionEnd)
          this.post = textarea.value
          textarea.focus()
          if (start == end) {
            textarea.selectionStart = jumpback
            textarea.selectionEnd = jumpback
          }
        } else if (type == "a") {
          let textarea = document.getElementById('textarea')
          let start = textarea.selectionStart
          let end = textarea.selectionEnd
          let jumpback = (textarea.value.length + 9) - (textarea.value.length - textarea.selectionEnd)
          textarea.value = textarea.value.slice(0, textarea.selectionStart) + '<' + type + ' href=""' + '>' + textarea.value.slice(textarea.selectionStart, textarea.selectionEnd) + '</' + type + '>' + textarea.value.slice(textarea.selectionEnd)
          this.post = textarea.value
          textarea.focus()
            if (start == end) {
              textarea.selectionStart = jumpback
              textarea.selectionEnd = jumpback
            }
        } else if (type.includes(":")) {
              let textarea = document.getElementById('textarea')
          textarea.value = textarea.value.slice(0, textarea.selectionStart) + type + textarea.value.slice(textarea.selectionEnd)
          this.post = textarea.value
          textarea.focus()
        } else {
          let textarea = document.getElementById('textarea')
          let start = textarea.selectionStart
          let end = textarea.selectionEnd
          let endtag = '</' + type + '>'
          let jumpback = (textarea.value.length + endtag.length - 1) - (textarea.value.length - textarea.selectionEnd)
          textarea.value = textarea.value.slice(0, textarea.selectionStart) + '<' + type + '>' + textarea.value.slice(textarea.selectionStart, textarea.selectionEnd) + '</' + type + '>' + textarea.value.slice(textarea.selectionEnd)
          this.post = textarea.value
          textarea.focus()
          if (start == end) {
            textarea.selectionStart = jumpback
            textarea.selectionEnd = jumpback
          }
        }
        this.updated()
        document.getElementById("emojis").open = false
        document.getElementById("headers").open = false
      },

      decodeHTML(html) {
        var txt = document.createElement("textarea");
        txt.innerHTML = html;
        return txt.innerText;
      }
    }
  }
</script>