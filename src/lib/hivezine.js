import { ref, onMounted } from 'vue'
import { supabase } from '@/lib/supabaseClient'

import symbcode from "@/data/symbcode.json"
import symbols from "@/data/symbols.json"

const loading = ref([])
const posts = ref([])
const post = ref([])
const username = ref()
const id = ref()
const pages = ref()
const reacting = ref()

async function getPages() {
  const { count } = await supabase.from('hivezine').select('data', { count: 'exact', head: true }).not('data', 'is', null)
  pages.value = Math.ceil(count / 10)
}

async function getPosts(page) {
  document.title = 'Gaehive | Hivezine | Page ' + page
  loading.value = true
  if (localStorage['user']) {
    username.value = JSON.parse(localStorage['user']).username
    id.value = JSON.parse(localStorage['user']).id
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
  reacting.value = false
}

async function getPost(id) {
  post.value = ([])
  if (localStorage['user']) {
    username.value = JSON.parse(localStorage['user']).username
  }
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

async function setReact(type, id) {
  reacting.value = true
  if (localStorage['user']) {
    username.value = JSON.parse(localStorage['user']).username
  }
  const { data } = await supabase.from('hivezine').select('data').eq("id", id)
  let react = data[0].data
  
  if (react[0][type]) {
    react[0][type] = react[0][type] + 1
  } else {
    react[0][type] = 1
  }
      
  let by = type + "by"
  if (react[0][by]) {
    react[0][by].splice(0, 0, username.value)
  } else {
    react[0][by] = [username.value]
  }
  const { error } = await supabase
  .from('hivezine')
  .update({ data: react })
  .eq('id', id)
  if (!location.pathname.split("/")[2]) {
    getPosts(1)
  } else {
    getPosts(location.pathname.split("/")[2])
  }
}

async function removeReact(type, id) {
  reacting.value = true
  if (localStorage['user']) {
    username.value = JSON.parse(localStorage['user']).username
  }
  const { data } = await supabase.from('hivezine').select('data').eq("id", id)
  let react = data[0].data
  
  if (react[0][type] > 1) {
    react[0][type] = react[0][type] - 1
  } else {
    react[0][type] = null
  }
      
  let by = type + "by"
  react[0][by].splice(react[0][by].indexOf(username.value), 1)
  
  const { error } = await supabase
  .from('hivezine')
  .update({ data: react })
  .eq('id', id)
  if (!location.pathname.split("/")[2]) {
    getPosts(1)
  } else {
    getPosts(location.pathname.split("/")[2])
  }
}

async function addPost() {
  let postdata = await fetch("https://gaehive2.vercel.app/api/hivezine?username=" + username.value)
  let post = await postdata.json()

  const { count } = await supabase.from('hivezine').select('data', { count: 'exact', head: true })

  let id = count + 1
  let user = post[0].user
  let uid = post[0].uid
  let pid = post[0].pid
  let title = JSON.parse(post[0].data).title
  let newpost = JSON.parse(post[0].data).post

  const { data, error } = await supabase
    .from('hivezine')
    .insert([
      { data: [{'id': id, 'user': user, 'uid': uid, 'pid': pid, 'title': title, 'post': newpost}] },
    ])
    .select()

}


export { getPosts, getPost, getPages, setReact, removeReact, addPost, reacting, posts, post, loading, username, id, pages }