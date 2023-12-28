<template>
<div class="sidebar">

  <div class="hello">
    <img src="/favicon.ico">
    <h2>Hello :)</h2>
  </div>

  <router-link class='sidebuttonactive' to="/">About</router-link>

  <a class='sidebutton' href="https://scratch.mit.edu/studios/5842709/comments" target="_blank">Scratch Studio</a>

  <a class='sidebutton' href="https://gaehive-legacy.vercel.app/" target="_blank">Legacy Website</a>

  
</div>
  <div class="page">
    <div class="centerpage">
          <h1 class="greeting">The Gaehive Website</h1>

          <h3>Built for the Gaehive, a Scratch Studio and community supporting LGBTQ+ individuals.</h3>
      <h2>Version 2 coming early 2024!</h2><sub style="margin-top:-20px">hopefully lol</sub>

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
    --sb: #fee5a1;
    --acc: #e58c3f;
    --acc2: #483248;
    --acclt: #ee824b66;
    --brk: #0006;
    --txt: #444;
    --txtstr: #000;
    --btxt: #fee5a1;
    --slnk: #676700;
    --slnkh: #484800;
    --plnk: #573c57;
    --plnkh: #392839;
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

  .sidebar {
    background-color: var(--sb);
    width: 20%;
    padding: 30px;
    flex-shrink: 0;
    display: grid;
    align-content: center;
    transition: all ease 0.2s;
    z-index: 2;
  }

  .sidebar h2 {
    font-family: 'Agbalumo';
    font-size: larger;
    line-height: 22px;
    color: var(--acc2);
    margin: 0 0 0 8px;
    text-shadow: var(--acclt) 1.5px 1.5px;
  }

  .hello {
    display: flex;
    align-items: center;
    margin: 0 0 10px 5px;
  }

  .hello img {
    width: 50px;
    height: 50px;
    border-radius: 100%;
  }

  .sidebutton {
    display: inline-block;
    background-color: transparent;
    color: var(--txt);
    text-decoration: none;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-family: inherit;
    font-size: inherit;
    text-align: left;
    padding: 5px 15px;
    margin-bottom: 2px;
    transition: padding linear 0.05s;
  }

  .sidebuttonactive {
    display: inline-block;
    background-color: var(--acc);
    color: var(--btxt);
    text-decoration: none;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-family: inherit;
    font-size: inherit;
    text-align: left;
    padding: 5px 15px;
    padding-left: 20px;
    margin-bottom: 2px;
  }

  .sidebutton:hover {
    padding-left: 20px;
    background-color: var(--acclt);
    color: var(--txtstr);
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
    border-radius: 5px;
  }

  button .material-symbols-rounded {
    font-size: inherit !important;
  }

  .button:hover, .button:focus, button:hover, .clearbutton:hover, button:focus {
    outline: var(--acclt) solid 2px;
  }
</style>