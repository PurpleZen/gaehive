<template>
  <h1 class="greeting">Our Managers</h1>
  <div>
    <button v-if="level == 'manager'" class="button" @click="prompt('add')">Add Managers</button>
    <button v-if="level == 'manager'" class="button">Add/Edit Bio</button>
  </div>
  
  <div class="managers">
    <TransitionGroup name="mng">
      <div v-for="(user, index) in managers" :key="user.id">
        <div class="users">
          <a :href="'https://scratch.mit.edu/users/' + user.name" target="_blank">
            <div class="crownimg">
              <img class="usersimg" :src="'https://uploads.scratch.mit.edu/get_image/user/' + user.id + '_500x500.png'">
              <img v-if="index == 0" class="crown" src="/crown.png">
              <img v-if="index == 1" class="crown" src="/crown2.png">
            </div>
            <div class="userinfo">
              <span class="name">{{ user.name }}</span><br>
              <span class="bio" v-html="user.bio"></span>
            </div>
          </a>
          <div class='useroptions'>
            <div>
              <div v-if="level == 'manager' && index !== 0" @click="prompt('move', user.name, managers[0].name)" class="promote"><div class="material-symbols-rounded">star</div>
              </div>
              <div v-if="level == 'manager'" @click="prompt('remove', user.name)" class="remove"><div class="material-symbols-rounded">remove</div>
              </div>
            </div>

            <div>
              <div v-if="level == 'manager' && index !== 0" @click="move(user.name, 'up')" class="promote"><div class="material-symbols-rounded">expand_less</div>
              </div>
              <div v-if="level == 'manager' && index !== managers.length - 1" @click="move(user.name, 'down')" class="promote"><div class="material-symbols-rounded">expand_more</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </TransitionGroup>
  </div>

  <!--popups-->
  <TransitionGroup name="popup">
    <div v-if="popup" class="popupbg" :style="{ backdropFilter: blur }"></div>

  <!--move-->
  <div v-if="popup == 'move'" class="popup">
    <div class="title">Are you sure you want to make {{ this.user }} host?</div>
    <div class="popupbody">
      <div class="popupbuttons">
        <button @click="this.transfer(this.user, this.host)" class="button">Yes</button>
        <button @click="this.popup = null" class="button">No</button>
        <div v-if="loading == true" class="loader"></div>
      </div>
    </div>
  </div>

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
  import { getManagers, newManager, transfer, move, remove, hostnext, next, list, managers, level, loading, popup } from '@/lib/managers.js'
  import { useMeta } from 'vue-meta'
export default {  
  created() {
    useMeta({
      title: 'Gaehive • Managers'
    })
    if (localStorage["blur"] == 0) {
      this.blur = "blur(0)"
    }
  },

  mounted() {
    getManagers()    
  },
  
  data() {
  	return {
      level: level,
      hostnext: hostnext,
      next: next,
      list: list,
      managers: managers,
      loading: loading,
      popup: popup,
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
