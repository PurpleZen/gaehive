<template>
  <div class="centerpage">
  <TransitionGroup name="popup">
    <div v-if="popup" class="popupbg" :style="{ backdropFilter: blur }"></div>

    <div v-if="popup == 'delete'" class="popup">
      <div class="title">Are you sure you want to delete this post?</div>
      <div class="popupbody">
        <div class="popupbuttons">
          <button @click="deletePost()" class="button">Yes</button>
          <button @click="this.popup = null" class="button">No</button>
          <div v-if="loading == true" class="loader"></div>
        </div>
      </div>
    </div>
  </TransitionGroup>
  
  <div class="posts">
      <TransitionGroup name="hz">
    <div class="post" v-for="(item, index) in posts" :key="item.id">
      <div class="title">
        <div class='username'>
          <router-link class="promptButton" to="/hivezine"><div class="material-symbols-rounded">arrow_circle_left</div><span class="tooltiptextleft">View More</span></router-link>
          <div class="space"></div>
          <img :src="'https://uploads.scratch.mit.edu/get_image/user/' + item.uid + '_500x500.png'">
          <span><a :href="'https://scratch.mit.edu/users/' + item.user">{{ item.user }}</a><br>{{ item.date }} <span v-if="item.edited" class="edited">(edited {{ item.edited }})</span></span>
          
           </div>
        <router-link class="titlename" :to="'/hivezine/post/' + item.id" v-html=item.title></router-link>
      </div>
      <div class='content' v-html=item.post>
      </div>
      <div v-if=username class="reactions">
        <div>
          <div v-if="!contains(item.loveby)" class="reactbutton" @click="react('love', item.id)">❤️<span>{{ item.love }}</span>
            <div class="tooltiptexttop" v-if="item.loveby && item.loveby.length > 0">
              <p v-for="(item, index) in item.loveby" :key="item.id">
                {{ item }}
              </p>
            </div>
          </div>
          <div v-if="contains(item.loveby)" class="reactbuttonactive" @click="removeReact('love', item.id)">❤️<span>{{ item.love }}</span>
            <div class="tooltiptexttop" v-if="item.loveby && item.loveby.length > 0">
              <p v-for="(item, index) in item.loveby" :key="item.id">
                {{ item }}
              </p>
            </div>
          </div>

          <div v-if="!contains(item.likeby)" class="reactbutton" @click="react('like', item.id)">👍<span>{{ item.like }}</span>
            <div class="tooltiptexttop" v-if="item.likeby && item.likeby.length > 0">
              <p v-for="(item, index) in item.likeby" :key="item.id">
                {{ item }}
              </p>
            </div>
          </div>
          <div v-if="contains(item.likeby)" class="reactbuttonactive" @click="removeReact('like', item.id)">👍<span>{{ item.like }}</span>
            <div class="tooltiptexttop" v-if="item.likeby && item.likeby.length > 0">
              <p v-for="(item, index) in item.likeby" :key="item.id">
                {{ item }}
              </p>
            </div>
          </div>

          <div v-if="!contains(item.laughby)" class="reactbutton" @click="react('laugh', item.id)">😹<span>{{ item.laugh }}</span>
            <div class="tooltiptexttop" v-if="item.laughby && item.laughby.length > 0">
              <p v-for="(item, index) in item.laughby" :key="item.id">
                {{ item }}
              </p>
            </div>
          </div>
          <div v-if="contains(item.laughby)" class="reactbuttonactive" @click="removeReact('laugh', item.id)">😹<span>{{ item.laugh }}</span>
            <div class="tooltiptexttop" v-if="item.laughby && item.laughby.length > 0">
              <p v-for="(item, index) in item.laughby" :key="item.id">
                {{ item }}
              </p>
            </div>
          </div>

          <div v-if="!contains(item.wowby)" class="reactbutton" @click="react('wow', item.id)">🙀<span>{{ item.wow }}</span>
            <div class="tooltiptexttop" v-if="item.wowby && item.wowby.length > 0">
              <p v-for="(item, index) in item.wowby" :key="item.id">
                {{ item }}
              </p>
            </div>
          </div>
          <div v-if="contains(item.wowby)" class="reactbuttonactive" @click="removeReact('wow', item.id)">🙀<span>{{ item.wow }}</span>
            <div class="tooltiptexttop" v-if="item.wowby && item.wowby.length > 0">
              <p v-for="(item, index) in item.wowby" :key="item.id">
                {{ item }}
              </p>
            </div>
          </div>

          <div v-if="!contains(item.sadby)" class="reactbutton" @click="react('sad', item.id)">😿<span>{{ item.sad }}</span>
            <div class="tooltiptexttop" v-if="item.sadby && item.sadby.length > 0">
              <p v-for="(item, index) in item.sadby" :key="item.id">
                {{ item }}
              </p>
            </div>
          </div>
          <div v-if="contains(item.sadby)" class="reactbuttonactive" @click="removeReact('sad', item.id)">😿<span>{{ item.sad }}</span>
            <div class="tooltiptexttop" v-if="item.sadby && item.sadby.length > 0">
              <p v-for="(item, index) in item.sadby" :key="item.id">
                {{ item }}
              </p>
            </div>
          </div>

          <div v-if="!contains(item.yayby)" class="reactbutton" @click="react('yay', item.id)">🎉<span>{{ item.yay }}</span>
            <div class="tooltiptexttop" v-if="item.yayby && item.yayby.length > 0">
              <p v-for="(item, index) in item.yayby" :key="item.id">
                {{ item }}
              </p>
            </div>
          </div>
          <div v-if="contains(item.yayby)" class="reactbuttonactive" @click="removeReact('yay', item.id)">🎉<span>{{ item.yay }}</span>
            <div class="tooltiptexttop" v-if="item.yayby && item.sadby.length > 0">
              <p v-for="(item, index) in item.yayby" :key="item.id">
                {{ item }}
              </p>
            </div>
          </div>

          <div v-if="!contains(item.frogby) && secret(item.post)" class="reactbutton" @click="react('frog', item.id)">🐸<span>{{ item.frog }}</span>
            <div class="tooltiptexttop" v-if="item.frogby && item.frogby.length > 0">
              <p v-for="(item, index) in item.frogby" :key="item.id">
                {{ item }}
              </p>
            </div>
          </div>
          <div v-if="contains(item.frogby) && secret(item.post)" class="reactbuttonactive" @click="removeReact('frog', item.id)">🐸<span>{{ item.frog }}</span>
            <div class="tooltiptexttop" v-if="item.frogby && item.frogby.length > 0">
              <p v-for="(item, index) in item.frogby" :key="item.id">
                {{ item }}
              </p>
            </div>
          </div>
        </div>
      <div class="postoptions">
      <a :href="'https://scratch.mit.edu/studios/33586934/comments#comments-' + item.pid" class="promptButton" target="_blank"><div class="material-symbols-rounded">forum</div><span class="tooltiptext">View Source</span></a>
          
          <router-link :to="'/hivezine/edit/' + item.id" v-if="item.user == username" class="promptButton"><div class="material-symbols-rounded">edit</div><span class="tooltiptext">Edit Post</span></router-link>
          
          <span v-if="writer" @click="this.popup = 'delete'" id="important" class="promptButton"><div class="material-symbols-rounded">delete</div><span class="tooltiptext">Delete Post</span></span>
      </div>
      </div>
    </div>
      </TransitionGroup>
    </div>
  </div>
</template>

<script>
  import { getPost, getPages, post, deletePost, loading, username, pages, setReact, removeReact, reacting } from '@/lib/hivezine.js'
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
        posts: post,
        data: null,
        page: 1,
        pages: pages,
        reacting: reacting,
        popup: null,
        blur: "blur(1px)"
      }
    },
    
    created() {
      getPost(JSON.parse(this.$route.params.id) +1)      
      if (localStorage["blur"] == 0) {
        this.blur = "blur(0)"
      }
      if (localStorage['user']) {
        this.manager = JSON.parse(localStorage['user']).manager
        this.writer = JSON.parse(localStorage['user']).writer
      }
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
      deletePost() {
        deletePost(JSON.parse(this.$route.params.id) +1)
        this.$router.push({ path: "/hivezine", query: null })
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
    }
  }
</script>