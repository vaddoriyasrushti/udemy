<template>
  <div id="app">
    <app-header></app-header>
     <router-view></router-view> 
     <app-footer></app-footer>
  </div>
</template>

<script>
import header from './view/header';
import footer from './view/footer';
export default {
  name: 'app',
  data () {
    return {
        currentComp:''
    }
  },
  components:{
    'app-header': header,
    'app-footer':footer
   
  },
 
}
</script>

<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}

h1, h2 {
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
