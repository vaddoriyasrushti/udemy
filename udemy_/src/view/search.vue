<template>
  <v-layout row class="main_wrap">
    <div style="width:100%">
      <div class="cols">
        <v-flex  v-if="filteredList.length==0">
        <br>
          <div class="color">
            <b>
              <div
                style="font-size:30px "
              >Sorry, we couldn't find any results for "{{$route.params.search}}"</div>
            </b>
            <div style="font-size:25px ">
              Try adjusting your search. Here are some ideas:
              <div style="font-size:20px; text-align:left;padding-left:500px">
                <ul>
                  <li>Make sure all words are spelled correctly.</li>
                  <li>Try different search terms.</li>
                  <li>Try more general search terms.</li>
                </ul>
              </div>
            </div>
            <br><br>
          </div>
          <br><br><br><br><br><br><br><br><br><br><br><br><br><br>
                  </v-flex>
        <div v-else>
          <div>
            <div class="row">
              <div
                class="col-md-2 py-3"
                v-for="(i,index) in filteredList"
                :key="index"
                :value="i.catname"
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
                      style="width:200.83px"
                      @click="$router.push({name:'detail',params:{course:i.catname+'_'+i.populartopic},query:{id:i.id}})"
                    >
                      <v-img
                        :src=" 'http://localhost:3003/images/'+ i.topicimage "
                        alt="gvb"
                        height="150px"
                      ></v-img>

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
          </div>
        </div>
      </div>
    </div>
  </v-layout>
</template>
<script>
//import { serverBus } from "../main";
export default {
  data() {
    return {
      searchmessage: ""
    };
  },
  computed: {
    filteredList() {
      if (!this.$route.params.searchtitle) {
        this.$route.params.searchtitle = "";
      }
      const value = this.$route.params.searchtitle.toLowerCase();
      return this.$store.state.categories.subcategories.filter(function(
        customer
      ) {
        return (
          customer.populartopic.toLowerCase().indexOf(value) > -1 ||
          customer.allsubtosub.toLowerCase().indexOf(value) > -1
        );
      });
    }
  },
  created() {}
  //   serverBus.$on("serverSelected", searchmessage => {
  //     console.log("in search craeted", searchmessage);
  //     this.searchmessage = searchmessage;
  //     console.log("own", this.searchmessage);
  //   });
  // }
};
</script>
<style scoped>
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
.color {
  background-color: lightgray;
}
.cols {
  width: 90%;
  margin: 0 auto;
}
.main_wrap {
  margin: 0px;
}
</style>

