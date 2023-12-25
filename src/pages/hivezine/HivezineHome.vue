  <template>
    <h1 class="greeting">The Hivezine</h1>
 
    <div>
      <router-link class="button" to="/hivezine/writers">Writers</router-link>
      <a href="https://scratch.mit.edu/studios/33685506/comments" target="_blank" class="button">Studio</a>
    </div>
    
    <div v-if="username && writer" class="posts">
      <div v-if="newpost == 'writing'" class="post">
      <div class="title">
        <div class="username">
          <img :src="'https://uploads.scratch.mit.edu/get_image/user/' + this.id + '_500x500.png'">
          <span><a :href="'https://scratch.mit.edu/users/' + this.username">{{ this.username }}</a><br></span>
        </div>
        <textarea v-model="title" v-if="!preview" @keyup="updated()" class="titlename" placeholder="Write an awesome title!" rows=1></textarea>
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
          </ul>
        </details>
        <button class="tools" v-if="post || title" @click="preview = !preview">
          <span v-if="!preview">Preview</span>
          <span v-else>Edit</span>
        </button>
      </div>
      <div class='content'>
        <textarea id="textarea" @keydown.ctrl.b.prevent="shortcut('b')" @keydown.ctrl.i.prevent="shortcut('i')" @keydown.ctrl.u.prevent="shortcut('u')" @keydown.ctrl.enter.prevent="shortcut('br')" @focus="expand(true)" @focusout="expand(false)" @keyup="updated()" v-if="!preview" v-model="post" :style="'height:' + writing" placeholder="Write an awesome post!"></textarea>
        <div v-if="preview" class="styledcontent" v-html="postpreview"></div>
      </div>
      <div class="reactions">
        <h5 style="margin:10px 0">{{ post.length }} characters</h5>
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
            <button @click="addPost()">Post</button>
          </div>
        </div>
      </div>
    </div>

    <div class="pagesearch">
      <div class="pages">
        <router-link v-for="(item, index) in this.pages" :key="item" :to="'/hivezine/' + (item)" :class="{currentpage: this.page == item, nextpage: this.page !== item}">{{ item }}</router-link>
      </div>
      <div class="space"></div>
      <div v-if="pages" style="display:flex">
      <input class="search" v-model="query" @keydown.enter="searchPosts(query, type)" :placeholder="'Search by ' + type">
        <button @click="searchPosts(query, type)" class="searchButton"><div class="material-symbols-rounded">search</div></button>
      <details class="tools" id="type">
        <summary>Filter</summary>
        <ul class="list">
          <button v-if="type !== 'post'" @click="type = 'post'; closeDropdown()" class="tools">Post</button>
          <button v-if="type == 'post'" @click="type = 'post'; closeDropdown()" class="toolsselect">Post</button>
          
          <button v-if="type !== 'title'" @click="type = 'title'; closeDropdown()" class="tools">Title</button>
          <button v-if="type == 'title'" @click="type = 'title'; closeDropdown()" class="toolsselect">Title</button>
          
          <button v-if="type !== 'user'" @click="type = 'user'; closeDropdown()" class="tools">Username</button>
          <button v-if="type == 'user'" @click="type = 'user'; closeDropdown()" class="toolsselect">Username</button>
        </ul>
      </details>
        <div class="space"></div>
        <button id="clearSearch" @click="clearSearch()">Clear</button>
      </div>
    </div>

    <div class="posts">
    <TransitionGroup name="hz">
        <div v-if="posts == '' && pages" class="noposts">No results 😿</div>
    <div class="post" v-for="(item, index) in posts" :key="item.id">
      <div class="title">
        <div class='username'>
          <img :src="'https://uploads.scratch.mit.edu/get_image/user/' + item.uid + '_500x500.png'">
          <span><a :href="'https://scratch.mit.edu/users/' + item.user">{{ item.user }}</a><br>{{ item.date }} <span v-if="item.edited" class="edited">(edited {{ item.edited }})</span></span>
           </div>
        <router-link class="titlename" :to="'/hivezine/post/' + item.id" v-html=item.title></router-link>
      </div>
      <div class='content' v-html=item.post>
      </div>
      <div v-if=username class="reactions">
        <div>
        <div v-if="!contains(item.loveby)" class="reactbutton" @click="react('love', item.id)">😻<span>{{ item.love }}</span></div>
        <div v-if="contains(item.loveby)" class="reactbuttonactive" @click="removeReact('love', item.id)">😻<span>{{ item.love }}</span></div>

        <div v-if="!contains(item.likeby)" class="reactbutton" @click="react('like', item.id)">😺<span>{{ item.like }}</span></div>
        <div v-if="contains(item.likeby)" class="reactbuttonactive" @click="removeReact('like', item.id)">😺<span>{{ item.like }}</span></div>

        <div v-if="!contains(item.laughby)" class="reactbutton" @click="react('laugh', item.id)">😹<span>{{ item.laugh }}</span></div>
        <div v-if="contains(item.laughby)" class="reactbuttonactive" @click="removeReact('laugh', item.id)">😹<span>{{ item.laugh }}</span></div>

        <div v-if="!contains(item.wowby)" class="reactbutton" @click="react('wow', item.id)">🙀<span>{{ item.wow }}</span></div>
        <div v-if="contains(item.wowby)" class="reactbuttonactive" @click="removeReact('wow', item.id)">🙀<span>{{ item.wow }}</span></div>

        <div v-if="!contains(item.sadby)" class="reactbutton" @click="react('sad', item.id)">😿<span>{{ item.sad }}</span></div>
        <div v-if="contains(item.sadby)" class="reactbuttonactive" @click="removeReact('sad', item.id)">😿<span>{{ item.sad }}</span></div>

        <div v-if="!contains(item.yayby)" class="reactbutton" @click="react('yay', item.id)">🌈<span>{{ item.yay }}</span></div>
        <div v-if="contains(item.yayby)" class="reactbuttonactive" @click="removeReact('yay', item.id)">🌈<span>{{ item.yay }}</span></div>

        <div v-if="!contains(item.frogby) && secret(item.post)" class="reactbutton" @click="react('frog', item.id)">🐸<span>{{ item.frog }}</span></div>
        <div v-if="contains(item.frogby) && secret(item.post)" class="reactbuttonactive" @click="removeReact('frog', item.id)">🐸<span>{{ item.frog }}</span></div>
      </div>
      </div>
    </div>
      </TransitionGroup>
    </div>
    
    <div class="pages">
      <router-link @click="scrollTop" v-for="(item, index) in this.pages" :key="item" :to="'/hivezine/' + (item)" :class="{currentpage: this.page == item, nextpage: this.page !== item}">{{ item }}</router-link>
    </div>
</template>

<script>
  import { getPosts, getPages, searchPosts, setReact, removeReact, addPost, reacting, posts, loading, username, id, pages } from '@/lib/hivezine.js'
  import { useMeta } from 'vue-meta'
  import symbcode from "@/data/symbcode.json"
  import symbols from "@/data/symbols.json"

  export default {
    data() {
      return {
        loading: loading,
        error: null,
        username: username,
        id: id,
        manager: null,
        writer: null,
        list: null,
        title: "",
        titlepreview: "",
        posts: posts,
        post: "",
        postpreview: "",
        preview: false,
        data: null,
        symbcode: null,
        symbols: null,
        page: 1,
        pages: pages,
        reacting: reacting,
        writing: null,
        newpost: 'writing',
        json: [],
        query: null,
        type: "post"
      }
    },
    created() {
      useMeta({
       title: 'Gaehive • Hivezine • Page 1'
      })
      if (localStorage['user']) {
        this.manager = JSON.parse(localStorage['user']).manager
        this.writer = JSON.parse(localStorage['user']).writer
      }
      getPages()
    },
    mounted() {
      if (!this.$route.params.pg) {
        getPosts(1)
      } else {
        getPosts(this.$route.params.pg[0])
      }
      this.$watch(
        () => this.$route.params.pg,
        () => {
          if (!this.$route.params.id) {
          if (this.$route.params.pg) {
            this.page = this.$route.params.pg
            getPosts(this.$route.params.pg)
          } else {
            getPosts(1)
          }
          }
        },
        { immediate: true }
      )
    },

    methods: {
      copy(value, id) {
        let element = "button" + id
        navigator.clipboard.writeText(value)
        document.getElementById(element).innerHTML = "Copied!"
      },
      contains(name) {
        if (name) {
          return name.includes(this.username)
        }
      },
      secret(post) {
        if (post.includes(":frog:")) {
          return true
        }
      },
      react(type, post) {
        if (this.reacting == false) {
          setReact(type, post + 1)
        }
      },
      removeReact(type, post) {
        if (this.reacting == false) {
          removeReact(type, post + 1)
        }
      },
      addPost() {
        addPost()
      },
      searchPosts(query, type) {
        searchPosts(query, type)
      },
      clearSearch() {
        if (!this.$route.params.id) {
        if (this.$route.params.pg) {
          this.page = this.$route.params.pg
          getPosts(this.$route.params.pg)
        } else {
          getPosts(1)
        }
        }
        this.query = null
        this.type = "post"
      },
      closeDropdown() {
        document.getElementById('type').open = false
      },
      jsonify() {
        this.newpost = "copying"
        this.json = []
        var obj = {title: this.title, post: this.post}
        obj = JSON.stringify(obj)
      for (var i = 0; i < obj.length / 500; i++) {
         this.json.push(obj.slice(i * 500, (i + 1) * 500))
      }
      },
      updated() {
        this.symbcode = (symbcode)
        this.symbols = (symbols)

        this.postpreview = this.post
        this.titlepreview = this.title
        this.symbcode.forEach(string => {
          let regex = new RegExp(string, "g")
          var i = this.symbcode.indexOf(string)
            this.postpreview = this.postpreview.replace(regex, this.symbols[i]);
            this.titlepreview = this.titlepreview.replace(regex, this.symbols[i]);
        })
      },
      expand(status) {
        if (status == true) {
          this.writing = "300px"  
        } else {
          if (!this.post) {
            this.writing = null;
          }
        }
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
      scrollTop() {
        document.body.scrollTop = 0;
        document.getElementsByClassName("pages")[0].scrollIntoView()
        document.getElementsByClassName("page")[0].scrollTop = document.getElementsByClassName("page")[0].scrollTop - 10
      }
    }
  }
</script>

<style>
  
 .tools details {
    position: relative;
    width: 300px;
    margin-right: 1rem;
  }

.tools details[open] {
    z-index: 1;
  }

.tools summary {
    cursor: pointer;
  font-size: smaller;
    border-radius: 5px;
    background-color: var(--acc);
    list-style: none;
  height: 100%;
  align-items: center;
  display: flex;
  }

.tools summary::-webkit-details-marker {
    display: none;
  }

.tools details[open] summary:before {
    content: '';
    display: block;
    width: 100vw;
    height: 100vh;
    background: transparent;
    position: fixed;
    top: 0;
    left: 0;
  }

.tools summary:after {
    content: '';
    display: inline-block;
  margin: 5px 0px 10px 5px;
    width: .5rem;
    height: .5rem;
    border-bottom: 2px solid currentColor;
    border-left: 2px solid currentColor;
    border-bottom-left-radius: 2px;
    transform: rotate(45deg) translate(50%, 0%);
    transform-origin: center center;
    transition: transform ease-in-out 100ms
  }

.tools summary:focus {
    outline: none;
  }

details[open] summary:after {
    transform: rotate(-45deg) translate(0%, 0%);
  }

.tools ul {
    width: auto;
    background: var(--acc);
    position: absolute;
    box-sizing: border-box;
    border-radius: 5px;
    max-height: 200px;
    overflow-y: auto;
  margin-top: 5px;
  }



</style>