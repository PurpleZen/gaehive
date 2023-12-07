<template>
  <h1 class="greeting">Hivezine Writers</h1>
  <div>
    <button v-if="manager" class="button" @click="prompt('add')">Add Writers</button>
  </div>

  <div class="managers">
    <TransitionGroup name="mng">
      <div v-for="(user, index) in writers" :key="user.id">
        <div class="users">
          <a :href="'https://scratch.mit.edu/users/' + user.name" target="_blank">
            <img class="usersimg" :src="'https://uploads.scratch.mit.edu/get_image/user/' + user.id + '_500x500.png'">
            <div class="userinfo">
              <span class="name">{{ user.name }}</span><br>
            </div>
          </a>
          <div class='useroptions'>
            <div v-if="level == 'manager'" @click="prompt('remove', user.name)" class="remove"><div class="material-symbols-rounded">remove</div>
            </div>
          </div>
        </div>
      </div>
    </TransitionGroup>
  </div>

  <!--popups-->
  <TransitionGroup name="popup">
    <div v-if="popup" class="popupbg" :style="{ backdropFilter: blur }"></div>

  <!--remove-->
  <div v-if="popup == 'remove'" class="popup">
    <div class="title">Are you sure you want to remove {{ this.user }}?</div>
    <div class="popupbody">
      <div class="popupbuttons">
        <button @click="this.remove(this.user)" class="button">Yes</button>
        <button @click="this.popup = null" class="button">No</button>
        <div v-if="loading == true" class="loader"></div>
      </div>
    </div>
  </div>

  <!--add-->
  <div v-if="popup == 'add'" class="popup">
    <div class="title">Add a new manager</div>
    <div class="popupbody">
      <input id="new" placeholder="username" @keyup.enter="newManager()">
      <div class="popupbuttons">
        <button @click="newManager()" class="button">OK</button>
        <button @click="this.popup = null" class="button">Cancel</button>
        <div v-if="loading == true" class="loader"></div>
      </div>
    </div>
  </div>

  <!--error-->
  <div v-if="popup == 'error'" class="popup">
    <div class="title">Oh noes, looks like something went wrong 😿</div>
    <div class="popupbody">
      <div>
        <button @click="this.popup = null" class="button">Ok</button>
      </div>
    </div>
  </div>
  </TransitionGroup>
  <!--popups-->
</template>

<script>
  import { getWriters, writers } from '@/lib/hivezine.js'
  import { useMeta } from 'vue-meta'
export default {  
  created() {
    useMeta({
      title: 'Gaehive • Hivezine • Writers'
    })
    if (localStorage['user']) {
      this.manager = JSON.parse(localStorage['user']).manager
    }
    if (localStorage["blur"] == 0) {
      this.blur = "blur(0)"
    }
  },

  mounted() {
    getWriters()    
  },

  data() {
    return {
      writers: writers,
      manager: null,
      confirm: null,
      host: null,
      user: null,
      blur: "blur(1px)"
    }
  },
  methods: {
    async transfer(name, host) {
      transfer(name, host)
    },
    newManager() {
      newManager()
    },
    remove(name) {
      remove(name)
    },
    move(name, direction) {
      move(name, direction)
    },
    prompt(type, user, host) {
      this.popup = type
      this.user = user
      this.host = host

    }
  }
}
</script>
