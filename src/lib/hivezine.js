import { ref, onMounted } from 'vue'
import { supabase } from '@/lib/supabaseClient'

import symbcode from "@/data/symbcode.json"
import symbols from "@/data/symbols.json"

const loading = ref([])
const posts = ref([])
const username = ref()
const pages = ref()

async function getPages() {
  const { count } = await supabase.from('hivezine').select('data', { count: 'exact', head: true }).not('data', 'is', null)
  pages.value = Math.ceil(count / 10)
}

async function getPosts(page) {
  loading.value = true
  if (localStorage['user']) {
        username.value = JSON.parse(localStorage['user']).username
    }
  const { data } = await supabase.from('hivezine').select('data').not('data', 'is', null).order("id", { ascending: false }).range((page - 1) * 10, (page * 10) - 1)
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
  document.getElementsByClassName("page")[0].scrollTop = 0;
}

export { getPosts, getPages, posts, loading, username, pages }