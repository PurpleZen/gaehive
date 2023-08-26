  import { ref, onMounted } from 'vue'
  import { supabase } from '@/lib/supabaseClient'

  const hostnext = ref([])
  const next = ref([])
  const list = ref([])
  const managers = ref([])
  const level = ref([])
  const loading = ref([])

  async function getManagers() {
    if (localStorage['user']) {
        level.value = JSON.parse(localStorage['user']).level
    }
    if (localStorage["managers"]) {
      let localManagers = JSON.parse(localStorage["managers"])
      hostnext.value = localManagers.slice(0, 2)
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
  }

  async function newManager() {
    loading.value = true
    const username = document.getElementById("new").value
    document.getElementById("new").value = ""
    const userinfo = await fetch('https://scratchdb.lefty.one/v3/user/info/' + username);
  const userdata = await userinfo.json();
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

  async function move(name, host) {
    if (confirm("Are you sure you want to make " + name + " host?")) {
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
  }

  async function remove(name) {
    if (confirm("Are you sure you want to remove " + name + "?")) {
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
    getManagers()
    }
  }
    
  export { getManagers, newManager, move, remove, hostnext, next, list, managers, level, loading }