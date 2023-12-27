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
const writers = ref()

async function getPages() {
  const { count } = await supabase.from('hivezine').select('data', { count: 'exact', head: true }).not('data', 'is', null)
  pages.value = Math.ceil(count / 10)
}

async function getPosts(page) {
  document.title = 'Gaehive • Hivezine • Page ' + page
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
  let allElements = document.querySelectorAll('*')
  for (var i = 0; i < allElements.length; i++) {
    allElements[i].style.cursor = ''
  }
}

async function searchPosts(query, type) {
  document.title = 'Gaehive • Hivezine • Search results for "' + query + '"'
  loading.value = true
  const { data } = await supabase.from('hivezine').select('data').not('data', 'is', null).order("id", { ascending: false })
  posts.value = ([])
  for ( var i = 0; i < data.length; i++){
    if (JSON.stringify(data[i].data[0][type]).toLowerCase().includes(query.toLowerCase())) {
    posts.value = posts.value.concat(data[i].data)
    }
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
  let allElements = document.querySelectorAll('*')
  for (var i = 0; i < allElements.length; i++) {
    allElements[i].style.cursor = ''
  }
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
  document.title = "Gaehive • Hivezine • " + post.value[0].title
}

async function getPostEdit(pid) {
  post.value = ([])
  if (localStorage['user']) {
    username.value = JSON.parse(localStorage['user']).username
    id.value = JSON.parse(localStorage['user']).id
  }
  const { data } = await supabase.from('hivezine').select('data').eq("id", pid)
  post.value = data[0].data
}

async function setReact(type, id) {
  reacting.value = true
  let allElements = document.querySelectorAll('*')
  for (var i = 0; i < allElements.length; i++) {
    allElements[i].style.cursor = 'progress'
  }
  
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
  let allElements = document.querySelectorAll('*')
  for (var i = 0; i < allElements.length; i++) {
    allElements[i].style.cursor = 'progress'
  }
  
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
  let allElements = document.querySelectorAll('*')
  for (var i = 0; i < allElements.length; i++) {
    allElements[i].style.cursor = 'wait'
  }
  
  let postdata = await fetch("https://gaehive2.vercel.app/api/hivezine?username=" + username.value)
  let post = await postdata.json()

  const { count } = await supabase.from('hivezine').select('data', { count: 'exact', head: true })

  const d = new Date();
  let date = d.toLocaleDateString("en-US", {month:'short', day: '2-digit', year:'numeric', hour:'2-digit', hour12:'true', minute:'2-digit', timeZoneName:'short'})

  let id = count
  let user = post[0].user
  let uid = post[0].uid
  let pid = post[0].pid
  let title = JSON.parse(post[0].data).title
  let newpost = JSON.parse(post[0].data).post

  const { data, error } = await supabase
    .from('hivezine')
    .insert([
      {id: id + 1, data: [{'id': id, 'date': date, 'user': user, 'uid': uid, 'title': title, 'post': newpost, 'pid': pid}] },
    ])
    .select()
  
  if (!location.pathname.split("/")[2]) {
    getPosts(1)
  } else {
    getPosts(location.pathname.split("/")[2])
  }
}

async function editPost() {
  let allElements = document.querySelectorAll('*')
  for (var i = 0; i < allElements.length; i++) {
    allElements[i].style.cursor = 'wait'
  }

  let postdata = await fetch("https://gaehive2.vercel.app/api/hivezine?username=" + username.value)
  let post = await postdata.json()

  const d = new Date();
  let editdate = d.toLocaleDateString("en-US", {month:'short', day: '2-digit', year:'numeric', hour:'2-digit', hour12:'true', minute:'2-digit', timeZoneName:'short'})

  let id = JSON.parse(post[0].data).edit
  let user = post[0].user
  let uid = post[0].uid
  let pid = post[0].pid
  let title = JSON.parse(post[0].data).title
  let newpost = JSON.parse(post[0].data).post

  const { data } = await supabase.from('hivezine').select('data').eq("id", id + 1)
  post.value = data[0].data

  let date = post.value[0].date

  if (user == post.value[0].user) {

  const { data, error } = await supabase
    .from('hivezine')
    .update([
      {data: [{'id': id, 'date': date, 'edited': editdate, 'user': user, 'uid': uid, 'title': title, 'post': newpost, 'pid': pid}] },
    ])
    .eq('id', id + 1)

    getPosts(1)
  }
}

async function deletePost(id) {
  const { error } = await supabase
  .from('hivezine')
  .update({ data: null })
  .eq('id', id)
  getPosts(1)
}

async function getWriters() {
  const { data } = await supabase.from('managers').select('data').eq("id", 2)
  writers.value = data[0].data
}

export { getPosts, getPost, getPostEdit, searchPosts, getPages, setReact, removeReact, addPost, editPost, deletePost, getWriters, writers, reacting, posts, post, loading, username, id, pages }