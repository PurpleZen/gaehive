  <script setup>
  import { ref, onMounted } from 'vue'
  import { supabase } from '@/lib/supabaseClient'

  const countries = ref([])

  async function getCountries() {
    const { data } = await supabase.from('countries').select()
    countries.value = data
  }
    
  onMounted(() => {
    getCountries()
  })
  </script>

  <template>
    <button @click="window.location = 'https://auth.itinerary.eu.org/auth/?redirect=' +
      btoa('https://' + location.hostname + '/api') +
      '&name=the Gaehive website 2'"
    <ul>
      <li v-for="country in countries" :key="country.id">{{ country.name }}</li>
    </ul>
  </template>