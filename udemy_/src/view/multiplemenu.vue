<template slot="content">
<div>
  <div 
   v-for="(i,index) in getcategories" :key="index" :value="i">
    <div style="display:inline-flex">
      <md-icon>{{i.categoriesicon}}</md-icon>
      <v-list-tile
        style="font-size:17px;"
        @click="$router.push({name:i.categoriesname})"
      >{{ i.categoriesname }}</v-list-tile>
      <md-icon>navigate_next</md-icon>
    </div>
  </div>
</div>
</template>
<script>
export default {
    data(){
        return{

        }
    },
    computed:{
    getcategories() {
      return this.$store.state.categories.categories;
    },
    getsubcategories(){
      return this.$store.state.categories.subcategories;
    },
    }
};
</script>
<style>

</style>

        