 <template>
   <div v-if="!phase" class="page" id="page">
    <div id="hostqueue" class="container">
      <div class="queue">
        <div class="loader"></div>
      </div>
    </div>
   </div>
  <LoginProcess v-if="phase == 'process'" />
</template>

<script>
  import LoginProcess from '../models/LoginProcess.vue'
  
  export default {
    mounted() {
      
      const params = new URLSearchParams(window.location.search);
      const privateCode = params.get("privateCode")
      const logout = params.get("logout")

      if (privateCode) {
        this.phase = "process"

        fetch(`https://gaehivecloset.fizzyizzy.repl.co/login`, {
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
            
            window.history.go(-3)
          })
      } else {
        location.href = 'https://auth.itinerary.eu.org/auth/?redirect=' +
      btoa('https://' + location.hostname + '/login') +
      '&name=the Gaehive website&authProject=867214083'
      }
    },
    data() {
      return {
        phase: null,
        loading: null
      }
    },
    components: {
      LoginProcess
    }
  }
  
</script>