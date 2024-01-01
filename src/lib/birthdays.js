import { ref, onMounted } from 'vue'
import { supabase } from '@/lib/supabaseClient'

const users = ref()
let date = new Date() 
let months = ["jan","feb","mar","apr","may","jun","jul","aug","sep","oct","nov","dec"]
let today = months[date.getMonth()] + date.getDate()

async function getBirthdays() {
  const { data } = await supabase.from('birthdays').select('users->' + today)
  users.value = data[0][today]
  document.body.style.cursor = ''
}

async function newBirthdays() {
  document.body.style.cursor = 'wait'

  let newdays = await fetch("https://gaehive2.vercel.app/api/birthdays")
  let birthdays = await newdays.json()

  const { data, error } = await supabase
    .from('birthdays')
    .update({ users: birthdays })
    .eq("id", 1)

  getBirthdays()
}

export { getBirthdays, newBirthdays, users }