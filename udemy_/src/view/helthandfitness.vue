<template>
  <v-layout row class="main_wrap">
     <v-tabs v-if="$route.name!='home'" show-arrows style="width:100%">
     <v-tabs-slider color="blue"></v-tabs-slider>
    <v-tab  @click="$router.push({name:$route.name, params:{ subcat:'/' }})"><b>{{$route.name}}</b></v-tab>
    <v-tab 
      v-for="(i,index) in getsubtosubcategories"
      :key="index"
      @click="$router.push({name:$route.name, params:{ subcat:i }})"
    
    >{{i}}</v-tab>
     </v-tabs>
     <div style="width:100%">
  <template v-if="$route.name!='home'">
    <v-flex style="background: linear-gradient(220deg,#EC5252 -30%,#6E1A52 70%); height:80px;">
    <h2 class="header_name">{{title}}</h2>
  </v-flex>
</template>
<div class="cols">
    <v-flex v-if="gethealthandfitness.length==0">
      <span>No record Found</span>
    </v-flex>
    <div v-else>
      <div>
        <div class="row">
        <h3 v-if="$route.name!='home'" style="width:100%; padding:10px; text-align:left;" class="grey--text">Featured Courses</h3>
          <br>
          <div
            class="col-md-2 py-2"
            v-for="(i,index) in filteredList"
            :key="index"
            :value="i.catname"
            style="padding:10px"
          >
            <div class="card h-400">
              <a-popover :title="i.description" placement="right">
                <template slot="content">
                  <div>
                    <center>
                      <a-button
                        type="danger"
                        v-if="$store.state.cartitem.includes(i.id)"
                        @click="$router.push({name:'cart'})"
                      >Go to cart</a-button>
                      <a-button
                        type="primary"
                        v-else
                        @click="$store.dispatch('addCourse',i);"
                      >Add to cart</a-button>
                    </center>
                  </div>
                </template>
                <v-card
                  @click="$router.push({name:'detail',params:{course:i.catname+'_'+i.populartopic},query:{id:i.id}})"
                >
                  <v-img :src=" 'http://localhost:3003/images/'+ i.topicimage " alt="gvb" height="150px"></v-img>

                  <v-card-title primary-title>
                    <div>
                      <div class="headline">{{i.description}}</div>
                      <div class="grey--text">({{i.allsubtosub}})</div>
                      <br>
                      <span class="grey--text">{{i.author}}</span>
                    </div>
                  </v-card-title>

                  <v-card-actions>
                    <b>
                      <div style="font-size:17px">₹{{i.price}}</div>
                    </b>
                    <v-spacer></v-spacer>
                  </v-card-actions>
                </v-card>
              </a-popover>
            </div>
          </div>
        </div>
        <filtercourse/>
      </div>
    </div>
    </div>
    </div>
  </v-layout>
</template>
<script>
import filtercourse from './filter'
export default {
  data() {
    return {
      title:
        this.$route.params.subcat == "/"
          ? this.$route.name
          : this.$route.params.subcat
    };
  },
  updated() {
    this.title =
      this.$route.params.subcat == "/"
        ? this.$route.name
        : this.$route.params.subcat;
  },
  computed: {
    gethealthandfitness() {
      return this.$store.state.categories.healthfitness;
    },
    getsubtosubcategories() {
      var subtosubcat = [];
      this.$store.state.categories.healthfitness.map(subcat => {
        var index = subtosubcat.indexOf(subcat.allsubtosub);
        if (index == -1) {
          subtosubcat.push(subcat.allsubtosub);
        }
      });
      return subtosubcat;
    },
    filteredList() {
      if (this.$route.params.subcat == "/" || this.$route.name == "home") {
        return this.$store.state.categories.healthfitness;
      }
      const value = this.$route.params.subcat.toLowerCase();
      return this.$store.state.categories.healthfitness.filter(function(
        customer
      ) {
        return customer.allsubtosub.toLowerCase().indexOf(value) > -1;
      });
    }
  },
  components:{
    filtercourse
  }
};
</script>
<style scoped>
.flex {
  flex: 1 1;
  height: 50px;
}
.headline {
  max-height: 65px;
  overflow: auto;
  text-overflow: ellipsis;
}
.cols {
  width: 90%;
  margin: 0 auto;
}
.main_wrap {
  margin: 0px;
}
.header_name {
  padding-left: 68px;
  padding-top: 15px;
  text-align: left;
  color: white;
}
</style>

