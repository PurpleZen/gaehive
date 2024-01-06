<template>
  <h1 class="greeting">Birthdays</h1>
  <a href="https://scratch.mit.edu/studios/34421126/comments" target="_blank"><button>Studio</button></a>
  
</template>

<script>
  import { newBirthdays } from '@/lib/birthdays.js'

  export default {
    methods: {
      newBirthdays() {
        newBirthdays()
      }
    }
  }
</script>