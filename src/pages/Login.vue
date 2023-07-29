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
    beforeCreate() {
      const params = new URLSearchParams(window.location.search);
      const privateCode = params.get("privateCode")

      if (privateCode) {     fetch(`https://gaehivecloset.fizzyizzy.repl.co/login`, {
          headers: {
            "Content-Type": "application/json"
          },
          method: "POST",
          body: JSON.stringify({
            privateCode: privateCode
          })
        })
        .then(res => res.json())
          .then((res) => {
            localStorage['user'] = JSON.stringify({'username': res.username, 'admin': res.admin, 'manager': res.manager, 'writer': res.writer})

            localStorage.setItem("token", res.token)

            var date = new Date();
            date.setDate(date.getDate() + 14)
            localStorage.setItem("tokenExp", date)
            
            window.opener.location.reload();
            window.close()
          })
      } else {
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