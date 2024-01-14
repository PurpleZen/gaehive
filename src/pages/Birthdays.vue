<template>
  <h1 class="greeting">Birthdays</h1>
  <a href="https://scratch.mit.edu/studios/34421126/comments" target="_blank"><button>Studio</button></a>
  <div class="jumpToContainer">
    <a class="jumpToMonth" v-for="(month) in months" :key="month" :href='"#" + month.toLowerCase()'>
      {{ month }}
    </a>
  </div>

  <div class="months" v-for="(month, monthIndex) in months" :key="month">
    <TransitionGroup name="bday">
    <div :id='month.toLowerCase()' class="titlename">
      <h2>{{ month }}</h2>
    </div>

      <template v-for="(item, index) in list" :key="item">
        <div class="birthdayRow" v-if="index.slice(0,3) == shortMonths[monthIndex]">
          <div class="birthdate">{{ month }} {{ index.slice(3) }}{{ getOrdinal(index.slice(3)) }}</div>
          <div class="birthdays">
            <template v-for="(user) in item" :key="user">
              <div class="birthdayUsers"><a :href='"https://scratch.mit.edu/users/" + user' target="_blank">@{{ user }}</a></div>
            </template>
          </div>
        </div>
      </template>

      <div v-if="!noBirthdays(monthIndex)" class="birthdayRow">
        <div>No Birthdays</div>
      </div>
    </TransitionGroup>
  </div>
</template>

<script>
  import { useMeta } from 'vue-meta'
  import { getBirthdayList, list } from '@/lib/birthdays.js'
  export default {
    data() {
      return {
        list: list,
        months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        shortMonths: ["jan","feb","mar","apr","may","jun","jul","aug","sep","oct","nov","dec"]
      }
    },

    created() {
      useMeta({
        title: 'Gaehive • Birthdays'
      });
      getBirthdayList()
    },
    
    methods: {
      getBirthdayList() {
        getBirthdayList()
      },
      noBirthdays(monthIndex) {
        return JSON.stringify(this.list).includes(this.shortMonths[monthIndex])
      },
      getOrdinal(n) {
        let ord = 'th';

        if (n % 10 == 1 && n % 100 != 11)
        {
          ord = 'st';
        }
        else if (n % 10 == 2 && n % 100 != 12)
        {
          ord = 'nd';
        }
        else if (n % 10 == 3 && n % 100 != 13)
        {
          ord = 'rd';
        }

        return ord;
      }
    }
  }
</script>