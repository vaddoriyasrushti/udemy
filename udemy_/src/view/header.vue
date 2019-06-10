<template>
  <div data-app>
    <v-toolbar dark color="primary">
      <div align-center text-xs-center @click="$router.push({name:'home'})">
        <v-avatar :tile="false" :size="52" color="grey lighten-4">
          <img src="../assets/l1.jpg" alt="avatar">
        </v-avatar>
      </div>
      <v-toolbar-title style="margin-left:2px;" @click="$router.push({name:'home'})">demy</v-toolbar-title>

      <a-popover placement="bottomLeft">
        <!-- <multiplemenu></multiplemenu> -->
        <template slot="content">
          <div v-ripple v-for="(i,index) in getcategories" :key="index" :value="i">
            <!-- <a-popover placement="right">
            <template slot="content">
            <div v-for="(j,index1) in getallsubtosub" :key="index1" :value="j">
              <v-list-tile
              style="font-size:17px;"
              @click="$router.replace({name:i.categoriesname});"
            >
            {{ i.categoriesname }}
            
            </v-list-tile>
            </div>
            </template>-->
            <div style="display:inline-flex">
              <md-icon>{{i.categoriesicon}}</md-icon>
              <v-list-tile
                style="font-size:17px;"
                @click="$router.push({name:i.categoriesname, params:{ subcat:'/' }})"
              >{{ i.categoriesname }}</v-list-tile>
              <!-- <md-icon>navigate_next</md-icon> -->
            </div>
            <!-- </a-popover> -->
          </div>
        </template>
        <div class="text-xs-center">
          <v-btn color="primary" dark>
            <v-icon>apps</v-icon>Categories
          </v-btn>
        </div>
      </a-popover>

      <v-text-field
        style="margin-top: 8px;margin-bottom:8px;"
        v-model="searchmessage"
        dark
        flat
        solo
        label="Search for anything"
        clearable
        @keypress.enter="search"
      ></v-text-field>
      <!-- </v-flex> -->
      <v-btn icon>
        <v-icon @click="search">search</v-icon>
      </v-btn>&nbsp;&nbsp;&nbsp;
      <!-- </div>-->
      &nbsp;&nbsp;&nbsp;
      <a-popover title="your cart" class="cart" placement="bottomRight">
        <template slot="content">
          <div v-if="counter==0">
            <center>
              <p>your cart is empty</p>
              <router-link to="/" replace>Keep Shopping</router-link>
            </center>
          </div>
          <div v-else>
            <div class="mt-4" v-for="(i,index) in getcartdata" :key="index" :value="i">
              <b-card
                @click="$router.push({name:'detail',params:{course:i.catname+'_'+i.populartopic},query:{id:i.id}})"
                style="height:90px; width: 400px; white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;"
                img-height="90px"
                img-width="100px"
                :img-src=" 'http://localhost:3003/images/'+ i.topicimage "
                img-alt="Card image"
                img-left
                img-align="center"
                class="mb-3"
              >
                <b>{{i.description}}</b>
                <br>
                {{i.author}}
                <br>
                <b style="font-size:15px; color:red">₹{{i.price}}</b>
              </b-card>
            </div>
            <hr>
            <b>
              <b-card-text style="font-size:15px; color:red">Total:{{total}}</b-card-text>
            </b>
          </div>
        </template>
        <div>
          <v-badge left>
            <template v-slot:badge>
              <span>{{counter}}</span>
            </template>
            <v-icon medium color="grey lighten-1" @click="$router.push({name:'cart'})">shopping_cart</v-icon>
          </v-badge>
        </div>
      </a-popover>&nbsp;&nbsp;&nbsp;
      <div align-center text-xs-center v-if="localstoragecheck">
        <a-popover placement="bottomRight">
          <template slot="content">
            <span type="primary" @click="logout">Logout</span>
          </template>
          <v-avatar :tile="false" :size="40" color="grey lighten-4">
            <b>
              <span
                style="font-weight:bolder; color:black; font-size: 16px;"
              >{{$store.state.letter}}</span>
            </b>
          </v-avatar>
        </a-popover>
      </div>

      <div style="display:inline-flex;" v-else>
        <v-btn color="red" style="opacity:1" @click="signupmodel">Sign Up</v-btn>
        <sign-up name="sign-up" v-if="signupdialog" :togglesignup="signupmodel"></sign-up>
        <v-btn color="red" style="opacity:1" @click="signinmodel">Sign In</v-btn>
        <sign-in name="sign-in" v-if="signindialog" :togglesignin="signinmodel"></sign-in>
      </div>
    </v-toolbar>
    <!-- <br> -->
  </div>
</template>

<script>
import signup from "../view/signup";
import signin from "../view/signin";
import categories from "../view/categories";
import multiplemenu from "./multiplemenu";
//import { mdbIcon } from 'mdbvue';

export default {
  data() {
    return {
      signupdialog: false,
      signindialog: false,
      searchmessage: ""
    };
  },
  components: {
    "sign-up": signup,
    "sign-in": signin,
    categories: categories,
    multiplemenu
    //mdbIcon
  },
  created() {
    if (this.$store.state.selectedcourse == null) {
      this.$store.state.selectedcourse = [];
    }
    this.$store.state.selectedcourse.map(p => {
      this.$store.state.cartitem.push(p.id);
    });
    //set subcategories in state
    this.$store.dispatch("categories/getcategories").then(res => {
      this.$store.state.categories.categories.map(p => {
        this.$store.dispatch("categories/getsubcategories", p.categoriesname);
      });
    });

    this.$store.dispatch("categories/getallsubcategories"); //get all the data for search

    var user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      this.$store.state.logvar = true;
      this.$store.dispatch("getcartitem", user.userid);
      this.$store.dispatch("count");
    }
    this.$store.dispatch("count");
  },
  mounted() {
    this.$store.state.cartitem = this.$store.state.cartitem;
  },
  watch: {},
  computed: {
    total: function() {
      if (localStorage.getItem("user")) {
        if (this.$store.state.selectedcourse == null) {
          this.$store.state.selectedcourse = [];
        }
        var totalprice = this.$store.state.selectedcourse.map(function(x) {
          return x.price;
        });
        return totalprice.reduce(function(total, num) {
          return total + num;
        }, 0);
      } else {
        //  if(!this.$store.state.total){
        this.$store.state.total = [];
        //}
        if (localStorage.getItem("courses")) {
          Object.entries(JSON.parse(localStorage.getItem("courses"))).forEach(
            ([key, val]) => {
              this.$store.state.total.push(val.price); // the value of the current key.
            }
          );
        }
        return this.$store.state.total.reduce(function(total, num) {
          return total + num;
        }, 0);
      }
    },
    getcartdata() {
      return this.$store.state.selectedcourse;
    },
    getcategories() {
      return this.$store.state.categories.categories;
    },

    localstoragecheck() {
      return this.$store.state.logvar;
    },
    counter() {
      this.$store.dispatch("count");
      return this.$store.state.counter;
    }
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
      this.signindialog = false;
      this.signupdialog = false;
    },
    // getsubcategories(catname) {
    //   this.$store.dispatch("categories/getsubcategories", catname);
    // },
    signupmodel() {
      this.signupdialog = !this.signupdialog;
    },
    signinmodel() {
      this.signindialog = !this.signindialog;
    },

    getallsubtosub() {
      //   if(catname=="Development"){

      return this.$store.state.categories.development;
      //  }
    },

    search() {
      // console.log("in search",this.searchmessage)
      //  serverBus.$emit('serverSelected', this.searchmessage);
      // this.$router.replace({name:"search"})
      this.$router.push({
        name: "search",
        params: { searchtitle: this.searchmessage }
      });
    }
  }
};
</script>
<style>
@import "https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons";
cart {
  width: 200px;
  /* height:200px; */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.v-input__slot {
  margin-bottom: 8px;
  margin-top: 8px !important;
}
.theme--dark.v-text-field--solo > .v-input__control > .v-input__slot {
  border-radius: 2000px !important;
}
</style>

