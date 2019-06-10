<template>
  <div>
    <h2 style="margin-left:70px" align="left">{{$store.state.currentdetail.catname}}</h2>
    <div class="mt-3">
      <b-card-group style="margin-left:475px; margin-right: 475px;" deck class="mb-3">
        <b-card align="left">
          <div>
            <v-card style="align:right" height="500px" width="400px">
              <video
                style="width:400px;"
                :src="'http://localhost:3003/images/'+this.$store.state.currentdetail.videos"
                preload="auto"
                controls
              ></video>
              <v-card-title primary-title>
                <div>
                  <div class="headline">{{$store.state.currentdetail.description}}</div>
                  <span class="grey--text">Author:{{$store.state.currentdetail.author}}</span>
                  <b>
                    <div style="font-size:25px;">₹{{$store.state.currentdetail.price}}</div>
                  </b>
                </div>
              </v-card-title>
              <v-card-actions>
                <b-button
                  size="lg"
                  block
                  variant="danger"
                  v-if="$store.state.cartitem.includes($route.query.id)"
                  @click="$router.push({name:'cart'})"
                >Go to cart</b-button>
                <b-button
                  v-else
                  size="lg"
                  block
                  variant="danger"
                  @click="$store.dispatch('addCourse',$store.state.currentdetail);"
                >Add to cart</b-button>
              </v-card-actions>
              <v-card-actions>
                <b-button size="lg" v-if="!$store.state.logvar" block @click="buy">Buy Now</b-button>
                <signup name="signup" v-if="signupdialog" :togglesignup="signupmodel"></signup>
                <b-dropdown
                  style="width:100%"
                  v-if="$store.state.logvar"
                  size="lg"
                  id="dropdown-1"
                  dropright
                  text="Buy Now"
                  @click="buy"
                >
                  <b-dropdown-item>
                    <paypal-checkout
                      v-if="$store.state.logvar"
                      env="sandbox"
                      :amount="String($store.state.currentdetail.price)"
                      currency="USD"
                      v-bind:client="paypal"
                    ></paypal-checkout>
                  </b-dropdown-item>
                </b-dropdown>
                <!-- <b-button size="lg" block @click="buy">Buy Now</b-button> -->
                <!-- <signup name="signup" v-if="signupdialog" :togglesignup="signupmodel"></signup> -->
                <!-- <paypal-checkout
                  v-if="$store.state.logvar"
                  env="sandbox"
                  :amount="String($store.state.currentdetail.price)"
                  currency="USD"
                  v-bind:client="paypal"
                ></paypal-checkout>-->
              </v-card-actions>
              <v-spacer></v-spacer>
            </v-card>
          </div>
        </b-card>
      </b-card-group>
    </div>
  </div>
</template>
<script>
import signup from "./signup";
import PayPal from "vue-paypal-checkout";
//import paypal from "./paypal"

export default {
  data() {
    return {
      // user:localStorage.getItem("user"),
      signupdialog: false,

      paypal: {
        sandbox:
          "AWi18rxt26-hrueMoPZ0tpGEOJnNT4QkiMQst9pYgaQNAfS1FLFxkxQuiaqRBj1vV5PmgHX_jA_c1ncL",
        production:
          "AVZhosFzrnZ5Mf3tiOxAD0M6NHv8pcB2IFNHAfp_h69mmbd-LElFYkJUSII3Y0FPbm7S7lxBuqWImLbl"
      }
    };
  },

  created() {
    this.$store.dispatch("getsubcategoriesdetailbyid", this.$route.query.id);
  },
  components: {
    signup,
    "paypal-checkout": PayPal
  },
  computed: {
    player() {
      return this.$refs.videoPlayer.player;
    }
  },
  methods: {
    signupmodel() {
      this.signupdialog = !this.signupdialog;
    },
    buy() {
      if (localStorage.getItem("user")) {
      } else {
        this.signupmodel();
      }
    }
  }
};
</script>
<style>
.flex {
  flex: 1 1;
  height: 50px;
  /* padding: 5px */
}
/* .v-card__actions {
  align-items: center;
  display: block !important;
  text-align: right !important;
  padding: 8px;
} */
</style>

