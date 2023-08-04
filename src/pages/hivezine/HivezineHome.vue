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
        <router-link :to="'/hivezine/post/' + item.id">{{ item.title }}</router-link>
        <div class='username'><span><a :href="'https://scratch.mit.edu/users/' + item.user ">{{ item.user }}</a> on {{ item.date }}</span><img :src="'https://uploads.scratch.mit.edu/get_image/user/' + item.uid + '_500x500.png'">
           </div>
      </div>
      <div class='content' v-html=item.post>
      </div>
      <div v-if=username class="reactions">
        <div v-if="!contains(item.loveby)" class="reactbutton" @click="react('love', item.id)">❤️{{ item.love }}</div>
        <div v-if="contains(item.loveby)" class="reactbuttonactive">❤️{{ item.love }}</div>

        <div v-if="!contains(item.likeby)" class="reactbutton" @click="react('like', item.id)">👍{{ item.like }}</div>
        <div v-if="contains(item.likeby)" class="reactbuttonactive">👍{{ item.like }}</div>

        <div v-if="!contains(item.laughby)" class="reactbutton" @click="react('laugh', item.id)">😂{{ item.laugh }}</div>
        <div v-if="contains(item.laughby)" class="reactbuttonactive">😂{{ item.laugh }}</div>

        <div v-if="!contains(item.wowby)" class="reactbutton" @click="react('wow', item.id)">😮{{ item.wow }}</div>
        <div v-if="contains(item.wowby)" class="reactbuttonactive">😮{{ item.wow }}</div>

        <div v-if="!contains(item.sadby)" class="reactbutton" @click="react('sad', item.id)">😟{{ item.sad }}</div>
        <div v-if="contains(item.sadby)" class="reactbuttonactive">😟{{ item.sad }}</div>

        <div v-if="!contains(item.yayby)" class="reactbutton" @click="react('yay', item.id)">🎉{{ item.yay }}</div>
        <div v-if="contains(item.yayby)" class="reactbuttonactive">🎉{{ item.yay }}</div>
      </div>
    </div>
      </TransitionGroup>
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
        symbcode: null
      }
    },
    async mounted() {
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
      
      this.symbcode = (symbcode)
      this.symbols = (symbols)

      const postdata = await fetch('https://gaehivecloset.fizzyizzy.repl.co/hivezine/list')
      this.data = await postdata.json()
      
      this.symbcode.forEach(string => {
        var is = this.symbcode.indexOf(string)
        for ( var i = 0; i < this.data.length; i++){
          let regex = new RegExp(string, "g")
          this.data[i].title = this.data[i].title.replace(regex, this.symbols[is]);
          this.data[i].post = this.data[i].post.replace(regex, this.symbols[is]);
        }
      })
      this.posts = this.data.reverse()
      this.loading = false
    },

    methods: {
      async noWriterData() {
        const usersdata = await fetch('https://gaehivecloset.fizzyizzy.repl.co/hivezine/writers')
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

        const postdata = await fetch('https://gaehivecloset.fizzyizzy.repl.co/hivezine/list')
      this.data = await postdata.json()
      
      this.symbcode.forEach(string => {
        var is = this.symbcode.indexOf(string)
        for ( var i = 0; i < this.data.length; i++){
          let regex = new RegExp(string, "g")
          this.data[i].title = this.data[i].title.replace(regex, this.symbols[is]);
          this.data[i].post = this.data[i].post.replace(regex, this.symbols[is]);
        }
      })
      this.posts = this.data.reverse()
      },
      contains(name) {
        if (name) {
          return name.includes(this.username)
        }
      },
      async react(type, post) {
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
</script>

<style scoped>
.queue {
  align-content: baseline;
}
</style>