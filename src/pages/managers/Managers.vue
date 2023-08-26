<template>
  <div class="page" id="page">
    <div v-if="loading == true" class="loader"></div>
    <div id="hostqueue" class="container">
      <div class="queue">
        <h1  class="greeting">Our Managers</h1>
        <span >The Gaehive Scratch studio has around <b style="font-family:serif">{{ managers.length }}</b> active managers that help keep the studio a safe and welcoming place for all. Managers rotate the role of Studio Host daily, giving them all opportunities to edit the studio and have some fun!<br>Here you can see the host queue and meet our wonderful managers!<b v-if="username && manager == 'true' || admin == 'true'"><br>Managers: You can click the star button on users to make them show as the current host!</b></span><input id="new" @keyup.enter="newManager()">
<div  class="break"></div>

        <div class="hostnext">
        <TransitionGroup name="mng">
        <div v-for="(user, index) in hostnext" :key="user.id">
          <div class="users" v-if="index == 0"><a :href="'https://scratch.mit.edu/users/' + user.name" ><img :src="'https://uploads.scratch.mit.edu/get_image/user/' + user.id + '_500x500.png'"><span>{{ user.name }} is currently host</span></a></div>
      
          <div class="users" v-if="index == 1"><a :href="'https://scratch.mit.edu/users/' + user.name" ><img :src="'https://uploads.scratch.mit.edu/get_image/user/' + user.id + '_500x500.png'"><span>{{ user.name }} will host next</span></a>
            <div class='useroptions'>
              <div v-if="level == 'manager'" @click="move(user.name, managers[0].name)" class="promote"><div class="material-symbols-rounded">star</div>
              </div>
              <div v-if="level == 'manager'" @click="remove(user.name)" class="remove"><div class="material-symbols-rounded">remove</div>
              </div>
            </div>
          </div>
        </div>
        </TransitionGroup>
        </div>
    
        <div  class="nexthosts">
          <div class="title">These users will be host following {{ next }}:</div>
          <div class="list">
            <TransitionGroup name="mng">
            <div v-for="(manager,index) in list" :key="manager.id">
              <div class="users"><a :href="'https://scratch.mit.edu/users/' + manager.name"><img :src="'https://uploads.scratch.mit.edu/get_image/user/' + manager.id + '_500x500.png'"><span>#{{ index +2 }} {{ manager.name }}</span></a>
            <div class='useroptions'>
              <div v-if="level == 'manager'" @click="move(manager.name, managers[0].name)" class="promote"><div class="material-symbols-rounded">star</div>
              </div>
              <div v-if="level == 'manager'" @click="remove(manager.name)" class="remove"><div class="material-symbols-rounded">remove</div>
              </div>
            </div>
              </div>
            </div>
            </TransitionGroup>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { getManagers, newManager, move, remove, hostnext, next, list, managers, level, loading } from '@/lib/managers.js'
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
      loading: loading
      
    }
  },
  methods: {
    move(name, host) {
      move(name, host)
    },
    newManager() {
      newManager()
    },
    remove(name) {
      remove(name)
    }
  }
}
</script>
