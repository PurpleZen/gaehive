<template>
  <h1 class="greeting">Euphoria Machine</h1>

  <div class="headerButtons">
    <router-link class="button" to="/euphoria/contributors">Contributors</router-link>
  </div>

  <div class="box">
    <input style="margin-top:10px" placeholder="Name" v-model="name">
    <div class="pronouns"><input placeholder="they" v-model="pronouns[0]">/<input placeholder="them" v-model="pronouns[1]">/<input placeholder="their" v-model="pronouns[2]"></div>
    <button class="login" @click="plural = !plural">
      <span v-if="!plural">Not Plural*</span>
      <span v-if="plural">Plural*</span>
    </button>
    <br>
    <span v-if="!plural"><sub><sup>*(i.e., "is" intead of "are" is used)</sup></sub></span>
    <span v-if="plural"><sub><sup>*(i.e., "are" intead of "is" is used)</sup></sub></span>

    <div class="reactions">
      <button @click="randNum()">Generate!</button>
    </div>
  </div>

  <div class="post" v-if="num !== null">
    <div class="content">
      <div v-if="num == 0">
        <h4>Hey! This is my friend {{ name }}! {{ pronouns[0][0].toUpperCase() + pronouns[0].slice(1) }} <template v-if="plural == false">is</template><template v-if="plural == true">are</template> super cool and {{ pronouns[2] }} name is awesome! I wish {{ pronouns[1] }} a great day!</h4>
        <sub>- Made with <3 by <a href="https://scratch.mit.edu/users/LegoManiac04" target="_blank">LegoManiac04</a></sub>
      </div>

      <div v-if="num == 1">
        <h4>Hiya! This is {{ name }}! {{ pronouns[0][0].toUpperCase() + pronouns[0].slice(1) }} <template v-if="plural == false">is</template><template v-if="plural == true">are</template> sooooo cool! I hope {{ pronouns[0] }} know<template v-if="plural == false">s</template><template v-if="plural == true"></template> that {{ pronouns[0] }} <template v-if="plural == false">is</template><template v-if="plural == true">are</template> valid and deserves love and respect! <2</h4>
        <sub>- Made with <3 by <a href="https://scratch.mit.edu/users/General-Lotl" target="_blank">General-Lotl</a></sub>
      </div>

      <div v-if="num == 2">
        <h4>Have you met {{ name }}? {{ pronouns[0][0].toUpperCase() + pronouns[0].slice(1) }} <template v-if="plural == false">is</template><template v-if="plural == true">are</template> SO cool and {{ pronouns[0] }} <template v-if="plural == false">is</template><template v-if="plural == true">are</template> genuinely so nice! {{ pronouns[0][0].toUpperCase() + pronouns[0].slice(1) }} <template v-if="plural == false">is</template><template v-if="plural == true">are</template> awesome and I hope {{ pronouns[0] }} <template v-if="plural == false">has</template><template v-if="plural == true">have</template> a great day and that {{ pronouns[0] }} remember<template v-if="plural == false">s</template><template v-if="plural == true"></template> to take care of {{ pronouns[1] }}self.</h4>
      <sub>- Made with <3 by <a href="https://scratch.mit.edu/users/FireFromArt" target="_blank">FireFromArt</a></sub>
      </div>

      <div v-if="num == 3">
        <h4>Hey, this is {{ name }}! I hope {{ pronouns[0] }} <template v-if="plural == false">is</template><template v-if="plural == true">are</template> doing well. If not, I hope it gets better for {{ pronouns[1] }}. {{ pronouns[0][0].toUpperCase() + pronouns[0].slice(1) }} seem<template v-if="plural == false">s</template> super cool!! Hopefully, {{ name }} keeps {{ pronouns[1] }}self hydrated and well. Bye {{ name }}!!</h4>
      <sub>- Made with <3 by <a href="https://scratch.mit.edu/users/bazinga__" target="_blank">bazinga__</a></sub>
      </div>

      <div v-if="num == 4">
        <h4>This is {{ name }}, {{ pronouns[0] }} <template v-if="plural == false">is</template><template v-if="plural == true">are</template> gae and cool! I hope {{ pronouns[0] }} <template v-if="plural == false">has</template><template v-if="plural == true">have</template> a good day <3</h4>
      <sub>- Made with <3 by <a href="https://scratch.mit.edu/users/NoNameBiker" target="_blank">NoNameBiker</a></sub>
      </div>

      <div v-if="num == 5">
        <h4>This is my new friend {{ name }}! {{ pronouns[0][0].toUpperCase() + pronouns[0].slice(1) }} <template v-if="plural == false">is</template><template v-if="plural == true">are</template> super nice and I'm happy to get to know {{ pronouns[1] }} more. I hope {{ pronouns[0] }} <template v-if="plural == false">has</template><template v-if="plural == true">have</template> a great rest of {{ pronouns[2] }} day and that {{ pronouns[0] }} know<template v-if="plural == false">s</template><template v-if="plural == true"></template> {{ pronouns[0] }}<template v-if="plural == false">'s</template><template v-if="plural == true">'re</template> supported :)</h4>
      <sub>- Made with <3 by <a href="https://scratch.mit.edu/users/LuckyDog615" target="_blank">LuckyDog615</a></sub>
      </div>
    </div>
  </div>

</template>

<style>
  .pronouns input {
    width: 60px;
    margin-bottom: 10px;
  }
</style>

<script>
  import { useMeta } from 'vue-meta'
  export default {
    data() {
      return {
        name: "",
        pronouns: [],
        plural: false,
        num: null
      }
    },

    created() {
      useMeta({
        title: 'Gaehive • Euphoria Machine'
      });
    },

    methods: {
      randNum() {
        let oldNum = this.num
        this.num = Math.floor(Math.random() * 5);
        if (oldNum == this.num) {
          this.randNum()
        }
      }
    }
  }
</script>