<template>
  <header id="header">
    <div class="logo">
      <img src="./assets/logo.png" style="height: 100px; width: 100px">
    </div>
    <nav>
      <ul>
        <li>
          <router-link to="/signup">Sign Up</router-link>
        </li>
        <li>
          <router-link to="/signin">Sign In</router-link>
        </li>
       </ul>
    </nav>
  </header>
</template>

<style scoped>
  #header {
    height: 100px;
    display: flex;
    flex-flow: row;
    justify-content: space-between;
    align-items: center;
    background-color: #0c010c;
    padding: 0 20px;
  }

  .logo {
    font-weight: bold;
    font-size: 40px;
    color: white;
    text-align: center
  }

  .logo a {
    text-decoration: none;
    color: white;
  }

  nav {
    height: 100%;
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    height: 100%;
    display: flex;
    flex-flow: row;
    align-items: center;
  }

  li {
    margin: 0 16px;
  }

  li a {
    text-decoration: none;
    color: white;
  }

  li a:hover,
  li a:active,
  li a.router-link-active {
    color: #fa923f;
  }
</style>
