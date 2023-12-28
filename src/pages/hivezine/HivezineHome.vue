  <template>
  <div class="page" id="page">
  <div id="hostqueue" class="container">
  <div class="queue">
    <h1 class="greeting">The Hivezine</h1>
  <span>Hello, welcome to the Hivezine on the Gaehive Website!<br>Here you can find news and announcements about events happening in the Scratch studio, fun spoof posts, and useful guides for here and for in the Scratch studio!</span>
    <!-- This link won't show if you don't have manager or writer permissions -->
    <div>
      <router-link v-if="username && manager == 'true' || admin == 'true' || writer == 'true'" to="/hivezine/new" class="button">New Post</router-link>
      <router-link v-if="username && manager == 'true' || admin == 'true' || writer == 'true'" to="/hivezine/writers" class="button">Edit Writers</router-link>
      <a href="https://scratch.mit.edu/studios/33685506/comments" class="button">Studio</a>
    </div>
    <div class="writers">
          <div class="title">Our Writers:</div>
          <div class="hzlist">
            <TransitionGroup name="mng">
            <div v-for="(item, index) in this.list" :key="item.name">
              <div class="users"><a :href="'https://scratch.mit.edu/users/' + item.name"><img :src="'https://uploads.scratch.mit.edu/get_image/user/' + item.id + '_500x500.png'"><span>{{ item.name }}</span></a>
              </div>
            </div>
            </TransitionGroup>
          </div>
        </div>
    <div class="break" style="margin-bottom: 0;"></div>
    <div v-if="loading" class="loader">Loading...</div>
    
    <div class="posts">
      <TransitionGroup name="hz">
    <div class="post" v-for="(item, index) in this.posts" :key="item.id">
      <div class="title">
        <router-link :to="'/hivezine/post/' + item.id" v-html=item.title></router-link>
        <div class='username'><span><a :href="'https://scratch.mit.edu/users/' + item.user ">{{ item.user }}</a> on {{ item.date }}</span><img :src="'https://uploads.scratch.mit.edu/get_image/user/' + item.uid + '_500x500.png'">
           </div>
      </div>
      <div class='content' v-html=item.post>
      </div>
      <div v-if=username class="reactions">
        <div v-if="!contains(item.loveby)" class="reactbutton" @click="react('love', item.id)">❤️<span>{{ item.love }}</span></div>
        <div v-if="contains(item.loveby)" class="reactbuttonactive">❤️<span>{{ item.love }}</span></div>

        <div v-if="!contains(item.likeby)" class="reactbutton" @click="react('like', item.id)">👍<span>{{ item.like }}</span></div>
        <div v-if="contains(item.likeby)" class="reactbuttonactive">👍<span>{{ item.like }}</span></div>

        <div v-if="!contains(item.laughby)" class="reactbutton" @click="react('laugh', item.id)">😂<span>{{ item.laugh }}</span></div>
        <div v-if="contains(item.laughby)" class="reactbuttonactive">😂<span>{{ item.laugh }}</span></div>

        <div v-if="!contains(item.wowby)" class="reactbutton" @click="react('wow', item.id)">😮<span>{{ item.wow }}</span></div>
        <div v-if="contains(item.wowby)" class="reactbuttonactive">😮<span>{{ item.wow }}</span></div>

        <div v-if="!contains(item.sadby)" class="reactbutton" @click="react('sad', item.id)">😟<span>{{ item.sad }}</span></div>
        <div v-if="contains(item.sadby)" class="reactbuttonactive">😟<span>{{ item.sad }}</span></div>

        <div v-if="!contains(item.yayby)" class="reactbutton" @click="react('yay', item.id)">🎉<span>{{ item.yay }}</span></div>
        <div v-if="contains(item.yayby)" class="reactbuttonactive">🎉<span>{{ item.yay }}</span></div>

        <div v-if="!contains(item.frogby) && secret(item.post)" class="reactbutton" @click="react('frog', item.id)">🐸<span>{{ item.frog }}</span></div>
        <div v-if="contains(item.frogby) && secret(item.post)" class="reactbuttonactive">🐸<span>{{ item.frog }}</span></div>
      </div>
    </div>
      </TransitionGroup>
    </div>
    <div class="pages">
    <div v-for="(item, index) in this.pages" :key="item">
    <router-link :to="'/hivezine/' + (item + 1)" :class="{reactbuttonactive: this.page == item + 1, reactbutton: this.page !== item + 1}">{{ item + 1 }}</router-link>
    </div>
    </div>
  </div>
  </div>
  </div>
</template>

<script>
  import symbcode from "@/data/symbcode.json"
  import symbols from "@/data/symbols.json"
  export default {
    data() {
      return {
        loading: null,
        error: null,
        username: null,
        admin: null,
        manager: null,
        writer: null,
        list: null,
        title: null,
        posts: null,
        data: null,
        symbcode: null,
        symbols: null,
        page: 1,
        pages: null,
        reacting: false
      }
    },
    async mounted() {
      this.$watch(
        () => this.$route.params,
        () => {
          this.getPosts()
        },
        { immediate: true }
      )
      this.symbcode = (symbcode)
      this.symbols = (symbols)
      
      this.loading = true

      if (localStorage['user']) {
        this.username = JSON.parse(localStorage['user']).username
        this.admin = JSON.parse(localStorage['user']).admin 
        this.manager = JSON.parse(localStorage['user']).manager
        this.writer = JSON.parse(localStorage['user']).writer 
      }

      if (!localStorage["writers"]) {
        this.noWriterData()
      } else {
        this.getWriterData()
      }

      const postdata = await fetch('/gaehivecloset-legacy/hivezine/all.json')
      this.data = await postdata.json()

      for (var i = 0; i < Math.ceil(this.data.length / 10); i++) {
        if (!this.pages) {
          this.pages = [i];
        } else {
          this.pages.splice(i, 0, i);
        }
    }
      
      this.getPosts()
      
      this.loading = false
    },

    methods: {
      async getPosts() {
        window.scrollTo(0, 0);
        document.getElementById("page").scrollTo(0, 0);
        
        if (this.$route.params.pg) {
        this.page = this.$route.params.pg
      }
        
      this.symbcode.forEach(string => {
        var is = this.symbcode.indexOf(string)
        for ( var i = 0; i < this.data.length; i++){
          let regex = new RegExp(string, "g")
          this.data[i].title = this.data[i].title.replace(regex, this.symbols[is]);
          this.data[i].post = this.data[i].post.replace(regex, this.symbols[is]);
        }
      })
      var start = (this.page - 1) * 10
      var end = this.page * 10
      this.posts = this.data.slice(start, end)
      },
      
      async noWriterData() {
        const usersdata = await fetch('/gaehivecloset-legacy/writers.json')
        const writers = await usersdata.json()
        localStorage.setItem('writers', JSON.stringify(writers));
        this.getWriterData()
      },
      
      async getWriterData() {
        const writers = JSON.parse(localStorage["writers"])
        this.list = writers
      
        this.refresh()
      },
      
      async refresh() {
        const usersdata = await fetch('https://gaehivecloset.fizzyizzy.repl.co/hivezine/writers')
        const writers = await usersdata.json()
        localStorage.setItem('writers', JSON.stringify(writers))

        this.list = writers

        const postdata = await fetch('/gaehivecloset-legacy/hivezine/all.json')
      this.data = await postdata.json()
      
      this.symbcode.forEach(string => {
        var is = this.symbcode.indexOf(string)
        for ( var i = 0; i < this.data.length; i++){
          let regex = new RegExp(string, "g")
          this.data[i].title = this.data[i].title.replace(regex, this.symbols[is]);
          this.data[i].post = this.data[i].post.replace(regex, this.symbols[is]);
        }
      })
      var start = (this.page - 1) * 10
      var end = this.page * 10
      this.posts = this.data.slice(start, end)

      this.reacting = false
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
      
      async react(type, post) {
        if (this.reacting == false) {
          this.reacting = true
          this.$emit('load')
          fetch(`https://gaehivecloset.fizzyizzy.repl.co/hivezine/react`, {
            headers: {
              "Content-Type": "application/json"
            },
            method: "PUT",
            body: JSON.stringify({
              username: this.username,
              type: type,
              id: post,
              token: localStorage['token']
            })
          })
          .then(res => res.json())
          .then((res) => {
            if (res.ok) {
              this.$emit('load')
              this.refresh()
            }
            if (res.error) {
              this.$emit('load')
              this.$emit('error')
            }
          })
        }
      }
    }
  }
</script>

<style scoped>
.queue {
  align-content: baseline;
}
</style>
