import { ref, onMounted } from 'vue'
import { supabase } from '@/lib/supabaseClient'

const users = ref()
const list = ref()

let date = new Date() 
let months = ["jan","feb","mar","apr","may","jun","jul","aug","sep","oct","nov","dec"]
let today = months[date.getMonth()] + date.getDate()

async function getBirthdays() {
  const { data } = await supabase.from('birthdays').select('users->' + today)
  users.value = data[0][today]
}

async function getBirthdayList() {
  const { data } = await supabase.from('birthdays').select('users')
  list.value = data[0].users
}


export { getBirthdays, getBirthdayList, users, list }