<template>
<div class="sidebar">

  <div class="hello">
    <img v-if="username" :src="'https://uploads.scratch.mit.edu/get_image/user/' + id + '_500x500.png'">
    <img v-if="!username" src="/favicon.ico">
    <h5 v-if="username">Hello{{ mellie }},<br>{{ username }}</h5>
    <h5 v-if="!username">Welcome!</h5>
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
      <b>Version 2 coming sometime in 2024! Here's a sneak peak...</b>
      <img class="sneakpeek" src="/sneakpeek.png">
      
      <h3><a class="button" href="https://scratch.mit.edu/users/LegoManiac04/" target="_blank">Made with &lt;3 by LegoManiac04</a></h3>
      Powered by 
      <div class="poweredby">
        <div>
          <img src="https://skillicons.dev/icons?i=vue">
          <img src="https://skillicons.dev/icons?i=vercel">
          <img src="https://skillicons.dev/icons?i=supabase">
        </div>
        <div>
          VueJS, Vercel, & Supabase
        </div>
      </div>
    </div>
  </div>
</template>

<style>
  /* Themes */

  :root {
    --bg: #f6b93c;
    --bg2: #ffe098;
    --sb: #52832f;
    --acc: #365a35;
    --acc2: #52832f;
    --acc3: #ffb425;
    --acclt: #25571d66;
    --brk: #0006;
    --txt: #473241;
    --txtstr: #000;
    --btxt: #fee5a1;
    --plnk: #732e6e;
    --plnkh: #4c1e47;
    --imp: #d22727;
  }

  /* Page */
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

  textarea {
    resize: none;
    outline: none;
    overflow: auto;
    border: none;
    border-radius: inherit;
    margin-top: 0;
    color: var(--txt);
    font-family: 'Manrope';
    background-color: var(--bg2);
  }

  .centerpage {
    display: grid;
    align-content: center;
    height: calc(100vh - 50px);
    justify-items: center;
    width: 100%;
  }

  .sneakpeek {
    width:50%; 
    border: solid var(--acc) 2px;
    outline: solid var(--acclt) 3px;
    border-radius: 10px;
    margin: 5px;
  }

  .page {
    width: 100%;
    padding: 0 50px 50px 50px;
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
    margin-top: 30px;
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
    background-color: var(--acclt);
    border-radius: 5px;
    margin: 15px
  }

  .credits {
    text-align: center;
    font-family: 'Manrope';
    font-size: 12px;
    margin-top: 30px;
  }

  .poweredby{
    display: grid;
    font-size: xx-small;
    justify-items: center;
  }

  .poweredby img {
    margin: 2px;
    width: 35px;
    height: 35px;
  }

  input {
    background-color: var(--bg2);
    color: var(--plnk);
    margin: 2px;
    padding: 5px;
    border: none;
    border-radius: 5px;
    font-family: inherit;
    text-align: center;
  }

  .headerButtons {
    margin-bottom: 5px;
  }

  .buttonarea {
    display: flex;
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

  button .material-symbols-rounded {
    font-size: inherit !important;
  }

  .button:hover, .button:focus, button:hover, .clearbutton:hover, button:focus {
    outline: var(--acclt) solid 2px;
  }

  .promptButton {
    display: flex;
    position: relative;
    width: 24px;
    text-decoration: none !important;
    cursor: pointer;
    padding: 5px 8px;
    margin: 2px;
    border-radius: 10px;
  }

  .promptButton#important:hover {
    background-color: var(--imp);
  }

  .promptButton#important:hover .material-symbols-rounded {
    color: var(--btxt);
  }

  .promptButton .material-symbols-rounded {
    color: var(--txt);
    font-variation-settings:
    'FILL' 0,
    'wght' 400,
    'GRAD' 200,
    'opsz' 48
  }

  .promptButton:hover .material-symbols-rounded {
    font-variation-settings:
    'FILL' 1,
    'wght' 400,
    'GRAD' 200,
    'opsz' 48
  }

  .promptButton .tooltiptext {
    width: max-content;
    visibility: hidden;
    background-color: var(--acc);
    color: var(--btxt);
    text-align: center;
    padding: 5px 10px;
    border-radius: 6px;
    position: absolute;
    z-index: 1;
    top: 115%;
    right: 0;
    opacity: 0;
    transition: opacity 0.3s;
  }

  .promptButton .tooltiptextleft {
    width: max-content;
    visibility: hidden;
    background-color: var(--acc);
    color: var(--btxt);
    text-align: center;
    padding: 5px 10px;
    border-radius: 6px;
    position: absolute;
    align-self: center;
    z-index: 1;
    left: 115%;
    opacity: 0;
    transition: opacity 0.3s;
  }

  .reactbutton .tooltiptexttop, .reactbuttonactive .tooltiptexttop {
    font-size: small;
    font-weight: normal;
    text-shadow: none;
    cursor: initial;
    width: max-content;
    visibility: hidden;
    background-color: var(--acc);
    color: var(--btxt);
    text-align: center;
    padding: 5px 10px;
    border-radius: 6px;
    position: absolute;
    z-index: 1;
    bottom: 115%;
    left: 0;
    opacity: 0;
    transition: opacity 0.3s;
  }

  .tooltiptexttop p {
    margin: 0;
  }

  .promptButton:hover .tooltiptext, .promptButton:hover .tooltiptextleft, .reactbutton:hover .tooltiptexttop, .reactbuttonactive:hover .tooltiptexttop {
    visibility: visible;
    opacity: 1;
  }

  .loader {
    height: 20px;
    border: var(--acclt) solid 3px;
    aspect-ratio: 1;
    border-radius: 50%;
    border-bottom: transparent solid 3px;
    animation: rotate 1s infinite;
    margin: 6px;
    align-self: center;
    display: inline-flex;
  }

  .box {
    display: grid;
    width: 100%;
    justify-items: center;
    background-color: var(--bg2);
    margin-top: 10px;
    padding: 10px;
    border-radius: 10px;
  }

  .box input {
    background-color: var(--bg);
    color: var(--txt);
  }


  /* Sidebar */

  .sidebar {
    background-color: var(--sb);
    padding: 50px;
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
    color: var(--acc3);
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
    color: var(--acc3);
    font-weight: bold;
  }

  .sidelinks {
    display: grid;
  }

  .sidebutton {
    display: inline-block;
    background-color: transparent;
    color: var(--btxt);
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
    color: var(--acc3);
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

  .birthday {
    font-size: x-small;
    font-weight: bold;
    text-align: center;
    position: absolute;
    padding: 0 3px 3px 3px;
    border-radius: 0 0 13px 13px;
    background: linear-gradient(-45deg, #ef5350, #ffb74d, #fdd835, #9ccc65, #4fc3f7, #ba68c8);
    background-size: 400% 400%;
    animation: slidedown ease 0.5s, gradient ease 5s, fade ease 0.5s 5s forwards;
  }

  .birthday-inner {
    background-color: var(--bg2);
    padding: 10px 20px;
    border-radius: 0 0 10px 10px;
  }

  .birthday a {
    color: var(--plnk);
    text-decoration: none;
  }

  .birthday a:hover {
    text-decoration: underline;
  }

</style>

<script>
  export default {
    created() {
      localStorage.clear() 
    }
  }
</script>