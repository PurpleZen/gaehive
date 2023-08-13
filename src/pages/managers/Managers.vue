<template>
  <div class="page" id="page">
    <div id="hostqueue" class="container">
      <div class="queue">
        <div v-if="loading" class="loader"></div>
        <h1 v-if=!loading class="greeting">Our Managers</h1>
        <span v-if=!loading>The Gaehive Scratch studio has around <b style="font-family:serif">{{ this.active }}</b> active managers that help keep the studio a safe and welcoming place for all. Managers rotate the role of Studio Host daily, giving them all opportunities to edit the studio and have some fun!<br>Here you can see the host queue and meet our wonderful managers!<b v-if="username && manager == 'true' || admin == 'true'"><br>Managers: You can click the star button on users to make them show as the current host!</b></span><button @click='newCountry()'>hi</button>
        
        <router-link v-if="username && manager == 'true' || admin == 'true'" to="/managers/edit" class="button">Edit Managers</router-link>
        <div v-if=!loading class="break"></div>
        
    
        <div v-if=!loading class="nexthosts">
          <div class="title">These users will be host following :</div>
          <div class="list">
            <TransitionGroup name="mng">
            <div v-for="manager in managers" :key="manager.id">
              <div class="users"><a><span>#{{ manager.id +2 }} {{ manager.name }}</span></a><div v-if="username && manager == 'true' || admin == 'true'" class="promote"><div class="material-symbols-rounded">stars</div></div>
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
  export default {
    data() {
      return {
        loading: null,
        request: null,
        error: null,
        hosts: null,
        nexthost: null,
        list: null,
        active: null,
        username: null,
        admin: null,
        manager: null
      }
    },
  }
</script>

<script setup>
  import { ref, onMounted } from 'vue'
  import { supabase } from '@/lib/supabaseClient'

  const managers = ref([])

  async function getCountries() {
    const { data } = await supabase.from('managers').select().order('id')
    managers.value = data
  }

  async function newCountry() {
  const { error } = await supabase
  .from('managers')
  .upsert({ name: 'Canada' });
  const { data } = await supabase.from('managers').select().order('id')
    managers.value = data
  }
    
  onMounted(() => {
    getCountries()
    
  })
  </script>