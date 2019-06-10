<template>
  <div v-if="$route.name!='home'">
    <br>
    <h3 style="width:100%; text-align:-webkit-left;" class="grey--text">Full Courese Catalog</h3>
    <div style="text-align:-webkit-left">
      <v-btn outline v-if="!showbuttons" @click="showbuttons=true">Filters</v-btn>
      <div v-if="showbuttons||selected.length>0">
        <v-btn v-if="showbuttons" dark @click="showbuttons=false">Apply</v-btn>
        <v-btn v-if="showbuttons" outline @click="showbuttons=false,selected=[]">cancel</v-btn>
       
        <br>
        <div v-if="selected.length>0" class="row">
          <div class="col-sm-1" v-for="(i,item) in selected" :key="item">
            <v-btn @click="selected.splice(item,1)">
              {{i}}
              <md-icon>clear</md-icon>
            </v-btn>
          </div>
          <div class="col-sm-1">
            <v-btn v-if="selected.length>1" @click="selected.splice(0)">Clear All</v-btn>
          </div>
        </div>
        <br>
        <div v-if="showbuttons" style="margin-left:30px;">
          <h5 style="text-align:-webkit-left;" class="grey--text">price</h5>
          <b-form-group>
            <b-form-checkbox-group v-model="selected" :options="prices1" name="flavour-2a" stacked></b-form-checkbox-group>
          </b-form-group>
        </div>
      </div>
    
    </div>
    <br>
    <div style="text-align:-webkit-auto; text-size:20px">
      <div style="display:flex">
        Sorting :
        <b-form-select style="width:17%" v-model="selectedsort" class="mb-3">
          <option :value="null">select an option</option>
          <option value="a">Lowest to Highest Price</option>
          <option value="b">Highest to Lowest Price</option>
        </b-form-select>
      </div>
    </div>
    
    <!-- horizonatal card -->
    <div class="mt-4" v-for="(i,index) in filterandsorting" :key="index" :value="i">
      <b-card
        img-height="100px"
        img-width="+90px"
        :img-src=" 'http://localhost:3003/images/'+ i.topicimage "
        img-alt="Card image"
        img-left
        class="mb-3"
      >
        <div
          @click="$router.push({name:'detail',params:{course:i.catname+'_'+i.populartopic},query:{id:i.id}})"
        >
          <b>{{i.description}}</b>
          <br>
          {{i.author}}
          <br>
          <b style="font-size:15px; color:red">₹{{i.price}}</b>
        </div>
      </b-card>
     
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      showbuttons: false,
      selectedsort: null,
      selected: [], // Must be an array reference!
      prices1: [
        { text: "0-300", value: "0-300" },
        { text: "301-500", value: "301-500" },
        { text: "501-700", value: "501-700" },
        { text: "700 up", value: "700 up" }
      ],
      filtersAsNumbers: {
        "0-300": [0, 300],
        "301-500": [301, 500],
        "501-700": [501, 700],
        "700 up": [700, 1000000]
      }
    };
  },
  computed: {
    filterandsorting() {
      var x = this.filteredProducts;
      if (this.selectedsort == "a") {
        return _.orderBy(x, "price");
      } else if (this.selectedsort == "b") {
        return _.orderBy(x, "price", "desc");
      } else {
        return x;
      }
    },
    filteredProducts() {
      console.log("filtered inside");
      return this.getdata.filter(product => {
        if (this.selected.length < 1) {
          return product;
        } else {
          var productReturn;
          Object.keys(this.filtersAsNumbers)
            .filter(priceRange => this.selected.includes(priceRange))
            .filter(priceRangeFiltered => {
              let low = this.filtersAsNumbers[priceRangeFiltered][0];
              let high = this.filtersAsNumbers[priceRangeFiltered][1];
              if (product.price >= low && product.price <= high) {
                productReturn = product;
              }
            });
          return productReturn;
        }
      });
    },
    getdata({commit}) {
    if (this.$route.name == "Development") {
      return this.$store.state.categories.development;
    }
    if (this.$route.name == "Business") {
      return this.$store.state.categories.business;
    }
    if (this.$route.name == "It & Software") {
      return this.$store.state.categories.itsoftware;
    }
    if (this.$route.name == "Design") {
      return this.$store.state.categories.design;
    }
    if (this.$route.name == "Health and fitness") {
      return this.$store.state.categories.healthfitness;
    }
    if (this.$route.name == "Music") {
      return this.$store.state.categories.music;
    }
    if (this.$route.name == "Office Productivity") {
      return this.$store.state.categories.officeproductivity;
    }
    if (this.$route.name == "Marketing") {
      return this.$store.state.categories.marketing;
    }
    if (this.$route.name == "Personal development") {
      return this.$store.state.categories.personaldevelopment;
    }
    if (this.$route.name == "Lifestyle") {
      return this.$store.state.categories.lifestyle;
    }
    if (this.$route.name == "Photography") {
      return this.$store.state.categories.photography;
    }
  }
 
   
  },
  methods: {
    remove(item) {
      this.selected.splice(item, 1);
    },
  }
};
</script>
<style>
.filters,
.product-tile {
  margin: 20px;
}
</style>

