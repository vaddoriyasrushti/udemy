<template>
  <div id="app">
    <appheader></appheader>
    <router-view/>
  </div>
</template>

<script>
import signin from "./view/signin";
import appheader from "./view/header";
export default {
  name: "app",
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
    };
  },
  created() {},
  components: {
    signin,
    appheader
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}

h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
