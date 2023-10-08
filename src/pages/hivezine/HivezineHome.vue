  <template>
    <h1 class="greeting">The Hivezine</h1>
  <span>Hello, welcome to the Hivezine on the Gaehive Website!<br>Here you can find news and announcements about events happening in the Scratch studio, fun spoof posts, and useful guides for here and for in the Scratch studio!</span>
    <!-- This link won't show if you don't have manager or writer permissions -->
    <div>
      <router-link v-if="username && manager == 'true' || admin == 'true' || writer == 'true'" to="/hivezine/new" class="button">New Post</router-link>
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
        <div v-if="!contains(item.loveby)" class="reactbutton" @click="react('love', item.id)">😻<span>{{ item.love }}</span></div>
        <div v-if="contains(item.loveby)" class="reactbuttonactive">😻<span>{{ item.love }}</span></div>

        <div v-if="!contains(item.likeby)" class="reactbutton" @click="react('like', item.id)">😺<span>{{ item.like }}</span></div>
        <div v-if="contains(item.likeby)" class="reactbuttonactive">😺<span>{{ item.like }}</span></div>

        <div v-if="!contains(item.laughby)" class="reactbutton" @click="react('laugh', item.id)">😹<span>{{ item.laugh }}</span></div>
        <div v-if="contains(item.laughby)" class="reactbuttonactive">😹<span>{{ item.laugh }}</span></div>

        <div v-if="!contains(item.wowby)" class="reactbutton" @click="react('wow', item.id)">🙀<span>{{ item.wow }}</span></div>
        <div v-if="contains(item.wowby)" class="reactbuttonactive">🙀<span>{{ item.wow }}</span></div>

        <div v-if="!contains(item.sadby)" class="reactbutton" @click="react('sad', item.id)">😿<span>{{ item.sad }}</span></div>
        <div v-if="contains(item.sadby)" class="reactbuttonactive">😿<span>{{ item.sad }}</span></div>

        <div v-if="!contains(item.yayby)" class="reactbutton" @click="react('yay', item.id)">🌈<span>{{ item.yay }}</span></div>
        <div v-if="contains(item.yayby)" class="reactbuttonactive">🌈<span>{{ item.yay }}</span></div>

        <div v-if="!contains(item.frogby) && secret(item.post)" class="reactbutton" @click="react('frog', item.id)">🐸<span>{{ item.frog }}</span></div>
        <div v-if="contains(item.frogby) && secret(item.post)" class="reactbuttonactive">🐸<span>{{ item.frog }}</span></div>
      </div>
    </div>
      </TransitionGroup>
    </div>
    
    <div class="pages">
      <router-link v-for="(item, index) in this.pages" :key="item" :to="'/hivezine/' + (item)" :class="{currentpage: this.page == item, nextpage: this.page !== item}">{{ item }}</router-link>
    </div>
</template>

<script>
  import { getPosts, getPages, posts, loading, username, pages } from '@/lib/hivezine.js'
  import { useMeta } from 'vue-meta'

  export default {
    data() {
      return {
        loading: loading,
        error: null,
        username: username,
        admin: null,
        manager: null,
        writer: null,
        list: null,
        title: null,
        posts: posts,
        data: null,
        symbcode: null,
        symbols: null,
        page: 1,
        pages: pages,
        reacting: false
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
      }
    }
  }
</script>
