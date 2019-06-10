<template>
<div style="display:inline-flex;">
  <v-tabs dark show-arrows>
    <v-tabs-slider color="blue"></v-tabs-slider>

    <v-tab
      v-for="(i,index) in getcategories"
      :key="index"
      :href="'#' + i.categoriesname"
      @click="getsubcategories($route.name)"
    >{{i.categoriesname}}</v-tab>

    <v-tabs-items>
      <v-tab-item v-for="(i,index) in getcategories" :key="index" :value="i.categoriesname">
        <v-card flat>
          <v-card-text v-if="i.categoriesname=='Development'">
            <development></development>
          </v-card-text>
          <v-card-text v-if="i.categoriesname=='Business'">
            <business></business>
          </v-card-text>
          <v-card-text v-if="i.categoriesname=='It & Software'">
            <itsoftware></itsoftware>
          </v-card-text>
           <v-card-text v-if="i.categoriesname=='Music'">
            <music></music>
          </v-card-text>
          <v-card-text v-if="i.categoriesname=='Design'">
            <design></design>
          </v-card-text>
          <v-card-text v-if="i.categoriesname=='Marketing'">
            <marketing></marketing>
          </v-card-text>
          <v-card-text v-if="i.categoriesname=='Health and fitness'">
            <healthfitness></healthfitness>
          </v-card-text>
          <v-card-text v-if="i.categoriesname=='Lifestyle'">
            <lifestyle></lifestyle>
          </v-card-text>
          <v-card-text v-if="i.categoriesname=='Photography'">
            <photography></photography>
          </v-card-text>
          <v-card-text v-if="i.categoriesname=='Office Productivity'">
            <officeproductivity></officeproductivity>
          </v-card-text>
          <v-card-text v-if="i.categoriesname=='Personal development'">
            <personaldevelopment></personaldevelopment>
          </v-card-text>
          
        </v-card>
      </v-tab-item>
    </v-tabs-items>
   
  </v-tabs>
   </div>
</template>
 
<script>
import development from "./development";
import business from "./business";
import itsoftware from "./itsoftware";
import music from "./music";
import design from "./design";
import marketing from "./marketing";
import officeproductivity from "./officeproductivity";
import personaldevelopment from "./personaldevelopment";
import healthfitness from "./helthandfitness";
import lifestyle from "./lifestyle";
import photography from "./photography";

export default {
  data() {
    return {};
  },
  created() {
    var catname = "Development";
    this.$store.dispatch("categories/getsubcategories", catname);
    
  },
  computed: {
    getcategories() {
      this.$store.dispatch("categories/getsubcategories", this.$route.name);
      return this.$store.state.categories.categories;
    },
  },
  mounted(){
     // this.$store.dispatch("categories/getsubcategories", this.$route.name);
  },
  methods: {
    getsubcategories(catname) {
     this.$store.dispatch("categories/getsubcategories", catname);
    }
  },
  components: {
    development: development,
    business,
    itsoftware,
    officeproductivity,
    personaldevelopment,
    design,
    marketing,
    music,
    healthfitness,
    lifestyle,
    photography
  }
};
</script>

<style>
.v-icon.v-icon.v-icon--link {
    cursor: pointer;
    padding-top:10px!important;
}

</style> 



