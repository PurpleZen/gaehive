import { ref, onMounted } from 'vue'
import { supabase } from '@/lib/supabaseClient'

const users = ref()
let date = new Date() 
let months = ["jan","feb","mar","apr","may","jun","jul","aug","sep","oct","nov","dec"]
let today = months[date.getMonth()] + date.getDate()

async function getBirthdays() {
  const { data } = await supabase.from('birthdays').select('users->' + today)
  users.value = data[0][today]
}

export { getBirthdays, users }