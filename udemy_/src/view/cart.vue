<template>
  <div>
     <template v-if="$route.name!='home'">
       <br>
    <v-flex style="background: linear-gradient(220deg,#EC5252 -30%,#6E1A52 70%); height:80px;">
    <h2 class="header_name">your cart</h2>
  </v-flex>
</template>
    <!-- <h2 style="margin-left:70px" align="left">your cart</h2> -->
    <div class="mt-3">
      <b-card-group style="margin-left:25px; margin-right: 25px;" deck class="mb-3">
        <b-card align="left">
          <div v-if="counter==0">
            <center>
              <v-icon x-large color="grey lighten-1">shopping_cart</v-icon>
              <b-card-text>Your cart is empty. Keep shopping to find a course!</b-card-text>
              <b-button
                tag:router-link
                to="/"
                replace
                size="lg"
                block
                variant="danger"
              >continue browsing</b-button>
            </center>
          </div>
          <div v-else>
            <div class="mt-4" v-for="(i,index) in getcartdata" :key="index" :value="i">
              <!-- <div @click="$router.replace({name:'detail',params:{course:i.catname+'_'+i.populartopic},query:{id:i.id}})"> -->
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
                  <!-- {{this.total=this.total+i.price}} -->
                </div>
                <b-button
                  style="margin-left:893px; margin-top:-45px"
                  @click="removeCourse(index,i.id,i.price)"
                >Remove</b-button>
                <!-- <div><b-button @click="removeCourse(index)">Remove</b-button></div> -->
              </b-card>
            </div>
            <hr>
            <b>
              <b-card-text style="font-size:15px; color:red">Total:{{total}}</b-card-text>
            </b>
          </div>
        </b-card>
      </b-card-group>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      massage: ""
    };
  },
  computed: {},
  methods: {
    saveCourses() {
      const parsed = JSON.stringify(this.$store.state.selectedcourse);
      localStorage.setItem("courses", parsed);
    },
    removeCourse(x, id, price) {
      var user = JSON.parse(localStorage.getItem("user"));

      if (user) {
        var catid = id;
        var userid = user.userid;
        this.$store.dispatch("deletecartitem", { userid, catid });
        if (this.$store.state.selectedcourse == null) {
          this.$store.state.selectedcourse = [];
        }
        var elementPos = this.$store.state.selectedcourse
          .map(function(x) {
            return x.id;
          })
          .indexOf(catid);
        // var objectFound = this.$store.state.selectedcourse[elementPos];
        var idPos = this.$store.state.cartitem.indexOf(catid);

        this.$store.state.cartitem.splice(idPos, 1);
        this.$store.state.cartitem = this.$store.state.cartitem;
        this.$store.state.selectedcourse.splice(elementPos, 1);
        this.$store.state.selectedcourse = this.$store.state.selectedcourse;
      } else {
        this.$store.state.cartitem.splice(x, 1);
        this.$store.state.selectedcourse.splice(x, 1);
        this.saveCourses();
        this.$store.state.counter = localStorage.getItem("courses")
          ? JSON.parse(localStorage.getItem("courses")).length
          : 0;
        var index = this.$store.state.total.indexOf(price);
        this.$store.state.total.splice(index, 1);
      }
    }
  },
  created() {},
  computed: {
    total() {
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
        return this.$store.state.total.reduce(function(total, num) {
          return total + num;
        }, 0);
      }
    },
    counter() {
      // this.$store.dispatch("count");
      return this.$store.state.counter;
    },
    getcartdata() {
      if (localStorage.getItem("user")) {
      }
      return this.$store.state.selectedcourse;
    }
  }
};
</script>
<style>
.header_name{
    padding-left:68px;
    padding-top: 15px;
    text-align:left;
    color: white;
}
</style>
