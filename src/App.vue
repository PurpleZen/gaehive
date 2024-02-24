<template>
<div class="sidebar">

  <div class="hello">
    <img v-if="username" :src="'https://uploads.scratch.mit.edu/get_image/user/' + id + '_500x500.png'">
    <img v-if="!username" src="/favicon.ico">
    <h5 v-if="username">Hello{{ mellie }},<br>{{ username }}</h5>
    <h5 v-if="!username">Hello! 🐝</h5>
    <sub class="status">{{ this.status }}</sub>
  </div>

  <div class="sidelinks">
    <router-link class='sidebuttonactive' to="/">About</router-link>

    <a class='sidebutton' href="https://scratch.mit.edu/studios/5842709/comments" target="_blank">Scratch Studio</a>

    <a class='sidebutton' href="https://gaehive-legacy.vercel.app/" target="_blank">Legacy Website</a>
  </div>

  <div class="loginSettingsBox">
    
  </div>
  
</div>
  <div class="page">
    <div class="centerpage">
          <h1 class="greeting">The Gaehive Website</h1>

          <h3>Built for the Gaehive, a Scratch Studio and community supporting LGBTQ+ individuals.</h3>
      <h2>Version 2 Coming Early 2024!</h2><sub style="margin-top:-25px">hopefully lol</sub>

      <h3><a class="button" href="https://scratch.mit.edu/users/LegoManiac04/" target="_blank">Made with &lt;3 by LegoManiac04</a></h3>

      Powered by 
      <div>
        <a href="https://vuejs.org/" target="_blank"><img class="poweredby" src="https://skillicons.dev/icons?i=vue"></a>
        <a href="https://vercel.com/" target="_blank"><img class="poweredby" src="https://skillicons.dev/icons?i=vercel"></a>
        <a href="https://supabase.com/" target="_blank"><img class="poweredby" src="https://skillicons.dev/icons?i=supabase"></a>
      </div>
    </div>
  </div>
</template>

<style>
  /* Themes */

  :root {
    --bg: #f6b93c;
    --sb: #ffe098;
    --acc: #e58c3f;
    --acc2: #483248;
    --acclt: #d18d6a66;
    --brk: #0006;
    --txt: #473241;
    --txtstr: #000;
    --btxt: #fee5a1;
    --plnk: #732e6e;
    --plnkh: #4c1e47;
    --imp: #d22727;
  }

  html, body {
    color: var(--txt);
    background-color: var(--bg);
    margin: 0;
    font-family: 'Manrope';
    overflow: auto;
    display: flex;
    height: 100vh;
    width: 100vw;
  }

  h1 {
    font-size: xxx-large;
  }

  .centerpage {
    align-content: center;
    display: grid;
    align-items: center;
    height: calc(100vh - 20px);
    justify-items: center;
    width: 100%;
  }

  .page {
    width: 100%;
    padding: 0 20px 20px 20px;
    display: grid;
    overflow: scroll;
    justify-items: center;
    align-content: baseline;
    position: relative;
  }

  .page h1 {
    color: var(--acc2)
  }

  a:not(.button, .sidebar *) {
    color: var(--plnk);
  }

  a:not(.button, .sidebar *):hover {
    color: var(--plnkh);
  }

  .greeting {
    margin-top: 50px;
    margin-bottom: 5px;
    font-family: 'Agbalumo';
    color: var(--acc2);
    text-shadow: var(--acc) 2px 2px;
  }

  .space {
    width: 5px;
  }

  .block-break {
    height: 48px; 
  }

  .break {
    display: inline-block;
    width: 40%;
    height: 2px;
    background-color: var(--acc);
    border-radius: 5px;
    margin: 15px
  }

  .credits {
    text-align: center;
    font-family: 'Manrope';
    font-size: 12px;
    margin-top: 30px;
  }

  .poweredby {
    margin: 2px;
    width: 35px;
    height: 35px;
  }

  .button, button {
    width: fit-content;
    display: inline-flex;
    align-items: center;
    background-color: var(--acc);
    color: var(--btxt);
    text-decoration: none;
    border: none;
    cursor: pointer;
    font-family: inherit;
    font-size: inherit;
    text-align: left;
    padding: 5px 15px;
    margin: 5px 3px;
    border-radius: 10px;
  }

  .sidebar {
    background-color: var(--sb);
    padding: 50px;
    border-radius: 0 20px 20px 0;
    display: grid;
    justify-content: center;
    align-content: space-around;
    overflow: clip;
    transition: all ease 0.1s;
  }

  .sidebar h2 {
    font-family: 'Agbalumo';
    font-size: larger;
    line-height: 22px;
    color: var(--acc2);
    margin: 0 0 0 8px;
    text-shadow: var(--acclt) 1.5px 1.5px;
  }

  .mobilemenu {
    display: none;
  }

  .hello {
    display: grid;
    align-content: center;
    justify-items: center;
  }

  .hello h5 {
    margin: 0;
    color: var(--acc2);
    font-family: agbalumo;
    text-align: center;
    line-height: 20px;
    font-size: 20px;
  }

  .hello img {
    width: 50px;
    height: 50px;
    border-radius: 100%;
    border: var(--sb) solid 6px;
    outline: var(--acc) solid 3px;
    margin: 10px;
  }

  .status {
    margin-bottom: -15px;
    color: var(--acc2);
    font-weight: bold;
  }

  .sidelinks {
    display: grid;
  }

  .sidebutton {
    display: inline-block;
    background-color: transparent;
    color: var(--txt);
    text-decoration: none;
    border: none;
    border-radius: 10px 0 0 10px;
    cursor: pointer;
    font-family: inherit;
    font-size: 14px;
    text-align: left;
    padding: 5px 15px;
    padding-right: 50px;
    margin-right: -50px;
    transition: all ease 0.05s;
    white-space: nowrap;
  }

  .sidebuttonactive {
    display: inline-block;
    background-color: var(--bg);
    color: var(--txt);
    font-weight: bold;
    text-decoration: none;
    border: none;
    border-radius: 10px 0 0 10px;
    cursor: pointer;
    font-family: inherit;
    font-size: 14px;
    text-align: left;
    padding: 5px 15px;
    padding-left: 20px;
    margin-right: -50px;
    position: relative;
  }

  .sidebutton:hover {
    padding-left: 20px;
    padding-right: 45px;
    background-color: var(--acclt);
    color: var(--txtstr);
  }

  .sidebuttonactive::before,
  .sidebuttonactive::after {
    content: "";
    position: absolute;
    width: 20px;
    height: 20px;
    animation: blobin ease 0.1s;
    right: -10px;
  }
  .sidebuttonactive::before {
    bottom: 19.5px;
    border-bottom: 10px solid var(--bg);
    border-right: 10px solid var(--bg);
    border-bottom-right-radius: 20px;
  }
  .sidebuttonactive::after {
    top: 19.5px;
    border-top: 10px solid var(--bg);
    border-right: 10px solid var(--bg);
    border-top-right-radius: 20px;
  }

  .loginSettingsBox{
    display: flex;
    justify-content: center;
  }

  .login {
    display: flex;
    background-color: var(--acc);
    color: var(--btxt);
    font-family: inherit;
    font-size: 10px;
    padding: 5px 11px;
    margin: 2px;
    align-items: center;
    border-radius: 10px;
    width: fit-content;
    text-decoration: none;
    white-space: nowrap;
    cursor: pointer;
    border: none;
  }

  .login .material-symbols-rounded {
    width: 10px;
    overflow: clip;
    font-size: inherit !important;
    margin-left: 5px;
    margin-bottom: -1.7px;
  }

  .login:hover {
    outline: var(--bg) solid 2px;
  }

</style>

<script>
  export default {
    created() {
      localStorage.clear() 
    }
  }
</script>