  import { ref, onMounted } from 'vue'
  import { supabase } from '@/lib/supabaseClient'

  const hostnext = ref([])
  const next = ref([])
  const list = ref([])
  const managers = ref([])
  const level = ref([])
  const loading = ref([])
  const popup = ref()

  async function getManagers() {
    if (localStorage['user']) {
        level.value = JSON.parse(localStorage['user']).level
    }
    if (localStorage["managers"]) {
      let localManagers = JSON.parse(localStorage["managers"])
      managers.value = localManagers
      next.value = localManagers[1].name
      list.value = localManagers.slice(2, localManagers.length)
      refresh()
    } else {
      refresh()
    }
  }

  async function refresh() {
    const { data } = await supabase.from('managers').select('data')
    hostnext.value = data[0].data.slice(0, 2)
    next.value = data[0].data[1].name
    list.value = data[0].data.slice(2, data[0].data.length)
    managers.value = data[0].data
    localStorage.setItem('managers', JSON.stringify(managers.value));
    loading.value = false
    popup.value = null
  }

  async function newManager() {
    loading.value = true
    const user = document.getElementById("new").value
    document.getElementById("new").value = ""
    const userinfo = await fetch('https://scratchdb.lefty.one/v3/user/info/' + user);
    const userdata = await userinfo.json();
  if (userdata.error) {
    popup.value = "error"
    loading.value = false
  } else {
  const username = userdata.username
  const id = userdata.id

  const newUser = {
    name: username,
    id: id
  }

  managers.value.splice(1, 0, newUser);
    
  const { error } = await supabase
  .from('managers')
  .update({ data: managers.value })
  .eq('id', 1)
    refresh()
  }
  }

  async function transfer(name, host) {
      loading.value = true
    for (var i = 0; i < managers.value.length; i++) {
      if (managers.value[i].name == name) {
        let moved = managers.value.splice(i, 1)
          managers.value.splice(0, 0, moved[0])
      }
      if (managers.value[i].name == host) {
        let moved = managers.value.splice(i, 1)
          managers.value.splice(managers.value.length, 0, moved[0])
      }
    }
    const { error } = await supabase
    .from('managers')
    .update({ data: managers.value })
    .eq('id', 1)
    refresh()
  }

  async function move(name, direction) {
    if (direction == "up") {
      for (var i = 0; i < managers.value.length; i++) {
        if (managers.value[i].name == name) {
          let moved = managers.value.splice(i, 1)
          managers.value.splice(i - 1, 0, moved[0])
          break;
        }
      }
    }
    if (direction == "down") {
      for (var i = 0; i < managers.value.length; i++) {
        if (managers.value[i].name == name) {
          let moved = managers.value.splice(i, 1)
          managers.value.splice(i + 1, 0, moved[0])
          break;
        }
      }
    }
    const { error } = await supabase
    .from('managers')
    .update({ data: managers.value })
    .eq('id', 1)
    refresh()
  }

  async function remove(name) {
    loading.value = true
    for (var i = 0; i < managers.value.length; i++) {
      if (managers.value[i].name == name) {
        managers.value.splice(i, 1)
      }
    }
    const { error } = await supabase
    .from('managers')
    .update({ data: managers.value })
    .eq('id', 1)
    refresh()
  }
    
  export { getManagers, newManager, transfer, move, remove, hostnext, next, list, managers, level, loading, popup }