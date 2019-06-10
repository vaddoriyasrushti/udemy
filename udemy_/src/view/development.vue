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
    <v-flex v-if="getdevelopment.length==0">
      <span>No record Found</span>
    </v-flex>
    
    <div v-else>
      <div>
        <div class="row">
          <h3 v-if="$route.name!='home'" style="width:100%; padding:10px; text-align:left;" class="grey--text">Featured Courses</h3>
          <br>
          <div class="col-md-2 py-3"
            v-for="(i,index) in filteredList"
            :key="index"
            :value="i.catname"
            style="padding:10px;"
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
                  @click="$router.push({name:'detail',params:{course:i.catname+'_'+i.populartopic},query:{id:i.id}});"
                >
                  <v-img
                    :src=" 'http://localhost:3003/images/'+ i.topicimage "
                    :alt="i.topicname"
                    height="150px"
                  ></v-img>
                  <v-card-title primary-title>
                    <div>
                      <div class="headline">{{i.description}}</div>
                      <div class="grey--text">({{i.allsubtosub}})</div>
                      <br>
                      <span class="grey--text">{{i.author}}</span>
                      <br>
                    </div>
                  </v-card-title>
                  <v-card-actions>
                    <b>
                      <div style="font-size:17px;">₹{{i.price}}</div>
                    </b>
                    <v-spacer></v-spacer>
                  </v-card-actions>
                </v-card>
               
              </a-popover>
         
          </div>
           </div>
        </div>
        <filtercourse></filtercourse>
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
     
      button: "Add to cart",
      courses: [],
      cartitem: [],
      id: 7,
      //toggleheader:false,
      showheader:true,
      title:this.$route.params.subcat=='/'?this.$route.name:this.$route.params.subcat
     
    };
  },
  created() {
    
  },
  mounted() {
    if (localStorage.getItem("courses")) {
      try {
        this.courses = JSON.parse(localStorage.getItem("courses"));
      } catch (e) {
        localStorage.removeItem("courses");
      }
    }
  },
  updated(){
    this.title=this.$route.params.subcat=='/'?this.$route.name:this.$route.params.subcat
  },
  computed: {
    getdevelopment() {
      return this.$store.state.categories.development;
    },
    getsubtosubcategories(){
      var subtosubcat=[];
      this.$store.state.categories.development.map((subcat)=>{
              var index=subtosubcat.indexOf(subcat.allsubtosub)
              if(index==-1){
                  subtosubcat.push(subcat.allsubtosub)
              }
            })
        return subtosubcat
    },
    filteredList() {
      if (this.$route.params.subcat=='/'||this.$route.name=="home") {
        return this.$store.state.categories.development;
      }
      const value = this.$route.params.subcat.toLowerCase();
      return this.$store.state.categories.development.filter(function(
        customer
      ) {
        return (
          customer.allsubtosub.toLowerCase().indexOf(value) > -1
        );
      });
    }
   
  },
  method: {
    myclick(id) {
      this.$store.state.currentid = id;
    },
  },
  components:{
    filtercourse
  }
  
};
</script>
<style>
.flex {
  flex: 1 1;
  height: 50px;
 }
.v-card__actions {
  align-items: center;
  display: block !important;
  text-align: right !important;
  padding: 8px;
}
.headline {
  max-height: 65px;
  overflow: auto;
  text-overflow: ellipsis;
}
.cols{
  width:90%;
  margin:0 auto;
}
.main_wrap{
  margin:0px;
}
.header_name{
    padding-left:68px;
    padding-top: 15px;
    text-align:left;
    color: white;
}

</style>

