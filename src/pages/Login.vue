<template>
  <div class="page">
    <div class="queue">
      <h2>Signing you in</h2>
       <div class="loader">Loading...</div>
    </div>
  </div>
</template>

<script>
  export default {

  async created() {
    const params = new URLSearchParams(window.location.search);
      const privateCode = params.get("privateCode")
        let res = await fetch('https://gaehivecloset.fizzyizzy.repl.co/login/' + privateCode)
        let data = await res.json()
        if (data.error) {
          window.location = "/error"
        } else {
          localStorage['user'] = JSON.stringify({'username': data.username, 'admin': data.admin, 'manager': data.manager, 'writer': data.writer})

            localStorage.setItem("token", data.token)

            var date = new Date();
            date.setDate(date.getDate() + 14)
            localStorage.setItem("tokenExp", date)
            window.location = "/"
        }
  }
  }

</script>

<style scoped>
.page {
  width: 100%;
}
</style>