<template>
  <div class="page" id="page">
    <div id="hostqueue" class="container">
      <div class="queue">
        <div v-if="loading" class="loader"></div>
        <h1 v-if=!loading class="greeting">Our Managers</h1>
        <span v-if=!loading>The Gaehive Scratch studio has around <b style="font-family:serif">{{ managers.length }}</b> active managers that help keep the studio a safe and welcoming place for all. Managers rotate the role of Studio Host daily, giving them all opportunities to edit the studio and have some fun!<br>Here you can see the host queue and meet our wonderful managers!<b v-if="username && manager == 'true' || admin == 'true'"><br>Managers: You can click the star button on users to make them show as the current host!</b></span><input id="new" @keyup.enter="newCountry()">
<div v-if=!loading class="break"></div>

        <div class="hostnext">
        <TransitionGroup name="mng">
        <div v-for="(user, index) in hostnext" :key="user.id">
          <div class="users" v-if="index == 0"><a :href="'https://scratch.mit.edu/users/' + user.name" ><img :src="'https://uploads.scratch.mit.edu/get_image/user/' + user.id + '_500x500.png'"><span>{{ user.name }} is currently host</span></a></div>
      
          <div class="users" v-if="index == 1"><a :href="'https://scratch.mit.edu/users/' + user.name" ><img :src="'https://uploads.scratch.mit.edu/get_image/user/' + user.id + '_500x500.png'"><span>{{ user.name }} will host next</span></a>
            <div class='useroptions'>
              <div @click="move(user.name, managers[0].name)" class="promote"><div class="material-symbols-rounded">star</div>
              </div>
              <div @click="remove(user.name)" class="remove"><div class="material-symbols-rounded">remove</div>
              </div>
            </div>
          </div>
        </div>
        </TransitionGroup>
        </div>
    
        <div v-if=!loading class="nexthosts">
          <div class="title">These users will be host following {{ next }}:</div>
          <div class="list">
            <TransitionGroup name="mng">
            <div v-for="(manager,index) in list" :key="manager.id">
              <div class="users"><a :href="'https://scratch.mit.edu/users/' + manager.name"><img :src="'https://uploads.scratch.mit.edu/get_image/user/' + manager.id + '_500x500.png'"><span>#{{ index +2 }} {{ manager.name }}</span></a>
            <div class='useroptions'>
              <div @click="move(manager.name, managers[0].name)" class="promote"><div class="material-symbols-rounded">star</div>
              </div>
              <div @click="remove(manager.name)" class="remove"><div class="material-symbols-rounded">remove</div>
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
  import { useMeta } from 'vue-meta'
  export default {
  created () {
    useMeta({
      title: 'The Gaehive | Managers'
    })
  }
}

</script>

<script setup>
  import { ref, onMounted } from 'vue'
  import { supabase } from '@/lib/supabaseClient'

  const hostnext = ref([])
  const next = ref([])
  const list = ref([])
  const managers = ref([])

  async function getCountries() {
    const { data } = await supabase.from('managers').select('data')
    hostnext.value = data[0].data.slice(0, 2)
    next.value = data[0].data[1].name
    list.value = data[0].data.slice(2, data[0].data.length)
    managers.value = data[0].data
  }

  async function newCountry() {
    const username = document.getElementById("new").value
    document.getElementById("new").value = ""
    const userinfo = await fetch('https://scratchdb.lefty.one/v3/user/info/' + username);
  const userdata = await userinfo.json();
  const id = userdata.id

  const newUser = {
    name: username,
    id: id
  }

  managers.value.splice(1, 0, newUser);
    
  const { error } = await supabase
  .from('managers')
  .update({ data: managers.value })
  .eq('id', 1)
    getCountries()
  }

  async function move(name, host) {
    if (confirm("Are you sure you want to make " + name + " host?")) {
    for (var i = 0; i < managers.value.length; i++) {
      if (managers.value[i].name == name) {
        let moved = managers.value.splice(i, 1)
          managers.value.splice(0, 0, moved[0])
      }
      if (managers.value[i].name == host) {
        let moved = managers.value.splice(i, 1)
          managers.value.splice(managers.value.length, 0, moved[0])
      }
    }
    const { error } = await supabase
    .from('managers')
    .update({ data: managers.value })
    .eq('id', 1)
    getCountries()
    }
  }

  async function remove(name) {
    if (confirm("Are you sure you want to remove " + name + "?")) {
    for (var i = 0; i < managers.value.length; i++) {
      if (managers.value[i].name == name) {
        managers.value.splice(i, 1)
      }
    }
    const { error } = await supabase
    .from('managers')
    .update({ data: managers.value })
    .eq('id', 1)
    getCountries()
    }
  }
    
  onMounted(() => {
    getCountries()
    
  })
  </script>