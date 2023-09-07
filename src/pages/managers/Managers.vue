<template>
  <TransitionGroup name="popup">
  <div v-if="popup" class="popupbg"></div>
  
  <div v-if="popup == 'move'" class="popup">
    <div class="title">Are you sure you want to make {{ this.user }} host?</div>
    <div class="popupbody">
      <div>
        <button @click="this.move(this.user, this.host)" class="button">Yes</button>
        <button @click="this.popup = null" class="button">No</button>
      </div>
      <div v-if="loading == true" class="loader"></div>
    </div>
  </div>

  <div v-if="popup == 'remove'" class="popup">
    <div class="title">Are you sure you want to remove {{ this.user }}?</div>
    <div class="popupbody">
      <div>
        <button @click="this.remove(this.user)" class="button">Yes</button>
        <button @click="this.popup = null" class="button">No</button>
      </div>
      <div v-if="loading == true" class="loader"></div>
    </div>
  </div>

  <div v-if="popup == 'add'" class="popup">
    <div class="title">Add a new manager</div>
    <div class="popupbody">
      <input id="new" @keyup.enter="newManager()">
      <div>
        <button @click="newManager()" class="button">OK</button>
        <button @click="this.popup = null" class="button">Cancel</button>
      </div>
      <div v-if="loading == true" class="loader"></div>
    </div>
  </div>

  <div v-if="popup == 'error'" class="popup">
    <div class="title">Oh noes, looks like something went wrong 😿</div>
    <div class="popupbody">
      <div>
        <button @click="this.popup = null" class="button">Ok</button>
      </div>
    </div>
  </div>
  </TransitionGroup>
  
        <h1  class="greeting">Our Managers</h1>
        <button v-if="level == 'manager'" class="button" @click="prompt('add')">Add Managers</button>
  
        <div class="managers">
        <TransitionGroup name="mng">
        <div v-for="(user, index) in managers" :key="user.id">
          <div class="users">
            <a :href="'https://scratch.mit.edu/users/' + user.name" >
            <div class="crownimg">
              <img class="usersimg" :src="'https://uploads.scratch.mit.edu/get_image/user/' + user.id + '_500x500.png'">
              <img v-if="index == 0" class="crown" src="/crown.png">
              <img v-if="index == 1" class="crown" src="/crown2.png">
            </div>
            <div class="userinfo">
                  <span class="name">{{ user.name }}</span><br>
                  <span class="bio" v-html="user.bio"></span>
                </div></a>
            <div class='useroptions'>
              <div v-if="level == 'manager' && index !== 0" @click="prompt('move', user.name, managers[0].name)" class="promote"><div class="material-symbols-rounded">star</div>
              </div>
              <div v-if="level == 'manager'" @click="prompt('remove', user.name)" class="remove"><div class="material-symbols-rounded">remove</div>
              </div>
            </div>
          </div>
      

        </div>
        </TransitionGroup>
        </div>

</template>

<script>
  import { getManagers, newManager, move, remove, hostnext, next, list, managers, level, loading, popup } from '@/lib/managers.js'
  import { useMeta } from 'vue-meta'
export default {  
  created() {
    useMeta({
      title: 'The Gaehive | Managers'
    })
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
      user: null
      
    }
  },
  methods: {
    async move(name, host) {
      move(name, host)
    },
    newManager() {
      newManager()
    },
    remove(name) {
      remove(name)
    },
    prompt(type, user, host) {
      this.popup = type
      this.user = user
      this.host = host
      
    }
  }
}
</script>
