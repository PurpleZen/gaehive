  <template>
    <h1 class="greeting">The Hivezine</h1>
  <span>Hello, welcome to the Hivezine on the Gaehive Website!<br>Here you can find news and announcements about events happening in the Scratch studio, fun spoof posts, and useful guides for here and for in the Scratch studio!</span>

    <div>
      <router-link v-if="username && manager == 'true' || admin == 'true' || writer == 'true'" to="/hivezine/writers" class="button">Edit Writers</router-link>
      <a href="https://scratch.mit.edu/studios/33685506/comments" class="button">Studio</a>
    </div>
    <!--div class="writers">
          <div class="title">Our Writers:</div>
          <div class="hzlist">
            <TransitionGroup name="mng">
            <div v-for="(item, index) in this.list" :key="item.name">
              <div class="users"><a :href="'https://scratch.mit.edu/users/' + item.name"><img :src="'https://uploads.scratch.mit.edu/get_image/user/' + item.id + '_500x500.png'"><span>{{ item.name }}</span></a>
              </div>
            </div>
            </TransitionGroup>
          </div>
  </div-->
    

    <div class="pages">
      <router-link v-for="(item, index) in this.pages" :key="item" :to="'/hivezine/' + (item)" :class="{currentpage: this.page == item, nextpage: this.page !== item}">{{ item }}</router-link>
    </div>
    
    <div class="posts">
      <div class="post">
      <div class="title">
        <div class="username">
          <img :src="'https://uploads.scratch.mit.edu/get_image/user/' + this.id + '_500x500.png'">
          <span><a :href="'https://scratch.mit.edu/users/' + this.username">{{ this.username }}</a><br></span>
        </div>
        <textarea class="titlename" placeholder="Write an awesome title!"></textarea>
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
        <button class="tools" v-if="post" @click="preview = !preview">
          <span v-if="!preview">Preview</span>
          <span v-else>Edit</span>
        </button>
      </div>
      <div class='content'>
        <textarea id="textarea" @keydown.ctrl.b.prevent="shortcut('b')" @keydown.ctrl.i.prevent="shortcut('i')" @keydown.ctrl.u.prevent="shortcut('u')" @keydown.ctrl.enter.prevent="shortcut('br')" @focus="expand(true)" @focusout="expand(false)" @keyup="updated()" v-if="!preview" v-model="post" :style="'height:' + writing" placeholder="Write an awesome post!" ></textarea>
        <div v-if="preview" class="styledcontent" v-html="postpreview"></div>
      </div>
      <div class="reactions">
        <h5 style="margin:10px 0">{{ post.length }} characters</h5>
      </div>
        <button @click="addPost()">Post</button>
    </div>
      
      <TransitionGroup name="hz">
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
      <router-link v-for="(item, index) in this.pages" :key="item" :to="'/hivezine/' + (item)" :class="{currentpage: this.page == item, nextpage: this.page !== item}">{{ item }}</router-link>
    </div>
</template>

<script>
  import { getPosts, getPages, setReact, removeReact, addPost, reacting, posts, loading, username, id, pages } from '@/lib/hivezine.js'
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
        admin: null,
        manager: null,
        writer: null,
        list: null,
        title: null,
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
        writing: null
      }
    },
    created() {
      useMeta({
       title: 'Gaehive | Hivezine | Page 1'
      })
      getPages()
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
          document.body.scrollTop = 0;
          document.getElementsByClassName("page")[0].scrollTop = 0;
        },
        { immediate: true }
      )
    },

    methods: {
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
      updated() {
        this.symbcode = (symbcode)
        this.symbols = (symbols)

        this.postpreview = this.post
        this.symbcode.forEach(string => {
          let regex = new RegExp(string, "g")
          var i = this.symbcode.indexOf(string)
            this.postpreview = this.postpreview.replace(regex, this.symbols[i]);
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
      }
    }
  }
</script>
