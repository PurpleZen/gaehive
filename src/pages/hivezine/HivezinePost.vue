<template>
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
</template>

<script>
  import { getPost, getPages, post, loading, username, pages } from '@/lib/hivezine.js'
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
        symbcode: null,
        symbols: null,
        page: 1,
        pages: pages,
        reacting: false
      }
    },
    created() {
      getPost(JSON.parse(this.$route.params.id) +1)
    },

    methods: {
      contains(name) {
        if (name) {
          return name.includes(this.username)
        }
      },
      secret(post) {
        if (post.includes("🐸")) {
          return true
        }
      }
    }
  }
</script>