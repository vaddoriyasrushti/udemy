<template>
  <div data-app>
    <v-toolbar dark color="primary" v-if="$store.state.logvar">
      <div align-center text-xs-center @click="$router.push({name:'home'})">
        <v-avatar :tile="false" :size="52" color="grey lighten-4">
          <img src="../assets/l1.jpg" alt="avatar">
        </v-avatar>
      </div>
      <v-toolbar-title style="margin-left:2px;" @click="$router.push({name:'home'})">demy</v-toolbar-title>

      <div class="text-xs-center">
        <v-btn color="primary" dark @click.stop="drawer = !drawer">
          <md-icon>menu</md-icon>
        </v-btn>
      </div>
      <div align-center text-xs-center v-if="localstoragecheck">
        <a-popover placement="bottomRight">
          <template slot="content">
            <span type="primary" @click="logout">Logout</span>
          </template>
          <v-avatar :tile="false" :size="40" color="grey lighten-4" style="margin-right: -2300px">
            <b>
              <span
                style="font-weight:bolder; color:black; font-size: 16px;"
              >{{$store.state.letter.charAt(0).toUpperCase()}}</span>
            </b>
          </v-avatar>
        </a-popover>
      </div>
    </v-toolbar>

    <v-layout wrap style="height: 50px;">
      <v-navigation-drawer
        style="margin-top:64px;background-color: #212121;"
        v-model="drawer"
        :mini-variant="mini"
        absolute
        dark
        temporary
      >
        <v-list class="pa-1">
          <v-list-tile v-if="mini" @click.stop="mini = !mini">
            <v-list-tile-action>
              <v-icon>chevron_right</v-icon>
            </v-list-tile-action>
          </v-list-tile>

          <v-list-tile tag="div">
            <v-list-tile-avatar>
              <div class="v-avatar" style="height: 40px; width: 40px; background-color:navajowhite">
                <b>
                  <span
                    style="font-weight:bolder; color:black; font-size: 16px;"
                  >{{$store.state.letter.charAt(0).toUpperCase()}}</span>
                </b>
              </div>
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title>{{$store.state.letter}}</v-list-tile-title>
            </v-list-tile-content>

            <v-list-tile-action>
              <v-btn icon @click.stop="mini = !mini">
                <v-icon>chevron_left</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>

        <v-list class="pt-0" dense>
          <v-divider light></v-divider>

          <br>
          <div style="padding-left:20px;">
            <div style="display:flex;" @click="$router.push({name:'categories'})">
              <v-list-tile-action>
                <i class="material-icons">add_circle_outline</i>
              </v-list-tile-action>
              <v-list-tile-title>&nbsp;&nbsp;&nbsp;Categories</v-list-tile-title>
            </div>
            <br>
            <br>
            <div style="display:flex;" @click="$router.push({name:'subcategories'})">
              <v-list-tile-action>
                <i class="material-icons">add_circle_outline</i>
              </v-list-tile-action>
              <v-list-tile-title>&nbsp;&nbsp;&nbsp;Courses</v-list-tile-title>
            </div>
          </div>
        </v-list>
      </v-navigation-drawer>
    </v-layout>
    <!-- <subcate></subcate> -->
  </div>
</template>
<script>
import subcate from "./subcategories";

export default {
  data() {
    return {
      drawer: null,
      mini: false,
      right: null
    };
  },
  created() {
    if (!localStorage.getItem("user")) {
      this.$router.push("/signin");
    } else {
      this.$store.state.logvar = true;
    }
  },
  computed: {
    localstoragecheck() {
      return this.$store.state.logvar;
    }
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
    },
    addcategories() {
      console.log("add cat");
    }
  },
  components: {}
};
</script>
<style>
@import "https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons";
*/ .v-avatar {
  background-color: navajowhite !important;
}
</style>
