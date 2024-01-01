<template>
  <button @click="newBirthdays()">Update</button>
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