 <template>
  <LoginProcess v-if="phase == 'process'" />
  <LoginSuccess v-if="phase == 'success'" />
</template>

<script>
  import LoginProcess from '../models/LoginProcess.vue'
  import LoginSuccess from '../models/LoginSuccess.vue'
  
  export default {
    mounted() {
      
      const params = new URLSearchParams(window.location.search);
      const privateCode = params.get("privateCode")
      const success = params.get("success")
      const logout = params.get("logout")

      if (privateCode) {
        this.phase = "process"

        fetch(`https://auth2.fizzyizzy.repl.co/login`, {
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
            localStorage['user'] = JSON.stringify({'username': res.username, 'id': res.id, 'manager': res.manager})

            localStorage.setItem("token", res.token)


            
            location.href = "/?login=true"
          })
      }
      if (success) {
        this.phase = "success"
      }
    },
    data() {
      return {
        phase: null,
        loading: null
      }
    },
    components: {
      LoginProcess,
      LoginSuccess
    }
  }
  
</script>