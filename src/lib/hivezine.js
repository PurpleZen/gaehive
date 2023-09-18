import { ref, onMounted } from 'vue'
import { supabase } from '@/lib/supabaseClient'

import symbcode from "@/data/symbcode.json"
import symbols from "@/data/symbols.json"

const loading = ref([])
const posts = ref([])
const post = ref([])
const username = ref()
const pages = ref()

async function getPages() {
  const { count } = await supabase.from('hivezine').select('data', { count: 'exact', head: true }).not('data', 'is', null)
  pages.value = Math.ceil(count / 10)
}

async function getPosts(page) {
  document.getElementsByClassName("page")[0].scrollTop = 0;
  document.body.scrollTop = 0;
  document.title = 'Gaehive | Hivezine | Page ' + page
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
}

async function getPost(id) {
  post.value = ([])
  const { data } = await supabase.from('hivezine').select('data').eq("id", id)
  post.value = data[0].data
  symbcode.forEach(string => {
    var is = symbcode.indexOf(string)
    for ( var i = 0; i < post.value.length; i++){
      let regex = new RegExp(string, "g")
      post.value[i].title = post.value[i].title.replace(regex, symbols[is]);
      post.value[i].post = post.value[i].post.replace(regex, symbols[is]);
        }
      })
  document.title = "Gaehive | Hivezine | " + post.value[0].title
}

export { getPosts, getPost, getPages, posts, post, loading, username, pages }