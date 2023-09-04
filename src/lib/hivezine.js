import { ref, onMounted } from 'vue'
import { supabase } from '@/lib/supabaseClient'

import symbcode from "@/data/symbcode.json"
import symbols from "@/data/symbols.json"

const loading = ref([])
const posts = ref([])
const username = ref()

async function getPosts() {
  loading.value = true
  if (localStorage['user']) {
        username.value = JSON.parse(localStorage['user']).username
    }
  const { data } = await supabase.from('hivezine').select('data').order("id", { ascending: false })
  posts.value = ([])
  for ( var i = 0; i < data.length; i++){
    posts.value = posts.value.concat(data[i].data)
  }
  symbcode.forEach(string => {
    var is = symbcode.indexOf(string)
    for ( var i = 0; i < posts.value.length; i++){
      let regex = new RegExp(string, "g")
      posts.value[i].title = posts.value[i].title.replace(regex, symbols[is]);
      posts.value[i].post = posts.value[i].post.replace(regex, symbols[is]);
        }
      })
  loading.value = false
}

export { getPosts, posts, loading, username }