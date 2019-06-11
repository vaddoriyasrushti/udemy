<template>
  <div class="content">
    <div data-app>
      <div style="width:70%;  margin-left:auto; margin-right:auto;">
        <v-toolbar flat color="white">
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on }">
              <v-btn color="primary" dark class="mb-2" v-on="on">Add Categories</v-btn>
            </template>
            <v-card>
              <v-form ref="form">
                <v-card-title>
                  <span class="headline">{{ formTitle }}</span>
                </v-card-title>
                <v-card-text>
                  <v-container grid-list-md>
                    <v-layout wrap>
                      <v-flex
                        xs12
                        class="text-xs-center text-sm-center text-md-center text-lg-center"
                      >
                        <v-text-field
                          required
                          v-model="categoriesname"
                          :rules="nameRules"
                          label="Category Name"
                        ></v-text-field>
                      </v-flex>
                      <v-flex
                        xs12
                        class="text-xs-center text-sm-center text-md-center text-lg-center"
                      >
                        <v-text-field
                          required
                          v-model="categoriesicon"
                          :rules="iconRules"
                          label="Category Icon"
                        ></v-text-field>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" v-if="isUpdate !== 1" @click="addcat">Submit</v-btn>
                  <v-btn color="blue darken-1" v-if="isUpdate === 1" @click="editcat">Update</v-btn>
                  <v-btn color="blue darken-1" flat @click="close">Cancel</v-btn>
                </v-card-actions>
              </v-form>
            </v-card>
          </v-dialog>

          <v-dialog v-model="deleteModel" max-width="290">
            <v-card class="text-xs-center dialog-delete">
              <v-card-text>Are you sure you want to delete?</v-card-text>
              <v-card-actions style="padding-left:50px">
                <v-btn color="blue darken-1" flat @click="deletecat">Yes</v-btn>
                <v-btn color="blue darken-1" flat @click="deleteModel = false; deletecatId = 0;">No</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <v-dialog v-model="subcatModel" max-width="500px">
            <v-card class="text-xs-center">
              <v-flex xs12 class="text-xs-center text-sm-center text-md-center text-lg-center">
                <div style="padding-top:25px;font-size:17px">
                  Category Name :
                  <b>{{catname}}</b>
                </div>
              </v-flex>
              <v-flex xs12 class="text-xs-center text-sm-center text-md-center text-lg-center">
                <v-text-field
                  style="padding:30px"
                  required
                  v-model="subcategories"
                  :rules="subcatRules"
                  label="Subcategory"
                ></v-text-field>
              </v-flex>
              <v-card-actions style="padding-left:150px">
                <v-btn color="blue darken-1" flat @click="deletecat">Add</v-btn>
                <v-btn color="blue darken-1" flat @click="subcatModel = false">Cancel</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <v-divider class="mx-2" inset vertical></v-divider>
          <v-spacer></v-spacer>
        </v-toolbar>

        <v-data-table :headers="headers" :items="getcategories" class="elevation-1">
          <template v-slot:items="props">
            <tr>
              <td class="text-xs-left">{{ props.item.categoriesname }}</td>
              <td class="text-xs-left">{{ props.item.categoriesicon }}</td>
              <td class="text-xs-left">
                <a-popover placement="bottom">
                  <template slot="content">
                    <p v-if="getsubtosub.length<=0">No Record Found</p>
                    <ul v-for="(i,index) in getsubtosub" :key="index">
                      <li>{{i}}</li>
                    </ul>
                    <!-- <a-button> -->
                    <div @click="subcatModel=true">
                      <i class="material-icons">add_circle_outline</i>
                    </div>
                    <!-- </a-button> -->
                  </template>
                  <a-button
                    type="primary"
                    @mouseover="$store.dispatch('subcategories/getsubcategories',props.item.categoriesname);catname=props.item.categoriesname"
                  >Show Subcategories</a-button>
                </a-popover>
              </td>
              <td class="text-xs-left">
                <v-icon small class="mr-2" @click="editcatModel(props.item)">edit</v-icon>
                <v-icon small @click="deletecatModel(props.item.id)">delete</v-icon>
              </td>
            </tr>
          </template>
        </v-data-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      headers: [
        {
          text: "Categories Name",
          sortable: true
        },
        {
          text: "Icon Name",
          sortable: false
        },
        {
          text: "SubCategories",
          sortable: false
        },
        {
          text: "Action",
          sortable: false
        }
      ],
      dialog: false,
      deleteModel: false,
      deletecatId: 0,
      subcatModel: false,
      categoriesname: "",
      categoriesicon: "",
      subcategories: "",
      selectedItem: {},
      isUpdate: 0,
      nameRules: [v => !!v || "Category Name is required"],
      subcatRules: [v => !!v || "Subcategory Name is required"],
      iconRules: [v => !!v || "Category Icon is required"],
      editedIndex: -1,
      catname: ""
    };
  },
  computed: {
    formTitle() {
      return this.isUpdate === 1 ? "Edit Categories" : "New Categories";
    },
    getcategories() {
      return this.$store.state.categories.categories;
    },
    getsubtosub() {
      let c = [];
      this.$store.state.subcategories.allsubtosub.map(subcat => {
        var index = c.indexOf(subcat.allsubtosub);
        if (index == -1) {
          c.push(subcat.allsubtosub);
        }
      });
      return c;
    }
  },
  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  created() {
    this.$store.dispatch("subcategories/getallsubcategories");
    this.$store.dispatch("categories/getcategories");
  },

  methods: {
    handleMenuClick(e) {
      console.log("click", e);
    },
    addcat() {
      if (this.$refs.form.validate()) {
        let formData = {
          categoriesname: this.categoriesname,
          categoriesicon: this.categoriesicon
        };
        this.$store
          .dispatch("categories/postcategories", {
            formData
          })
          .then(res => {
            this.$store.state.categories.categories.unshift(res.data);
          });

        this.clearDialog();
        this.close();
      }
    },

    clearDialog() {
      this.categoriesname = "";
      this.categoriesicon = "";
      this.isUpdate = 0;
      this.selectedItem = {};
    },

    editcatModel(item) {
      // console.log("item", item);
      this.isUpdate = 1;
      this.selectedItem = item;
      this.categoriesname = item.categoriesname;
      this.categoriesicon = item.categoriesicon;
      this.dialog = true;
    },

    editcat() {
      let formData = {
        categoriesname: this.categoriesname,
        categoriesicon: this.categoriesicon
      };
      let id = this.selectedItem.id;
      this.$store
        .dispatch("categories/putcategories", { id, formData })
        .then(res => {
          // var elementPos = this.$store.state.categories.categories
          //   .map(function(x) {
          //     return x.id;
          //   })
          //   .indexOf(id);
          // this.$store.state.categories.categories[
          //   elementPos
          // ].categoriesname = this.categoriesname;
          // this.$store.state.categories.categories[
          //   elementPos
          // ].categoriesicon = this.categoriesicon;
        });
      this.close();
    },

    deletecatModel(id) {
      this.deleteModel = true;
      this.deletecatId = id;
    },

    deletecat() {
      let id = this.deletecatId;
      this.$store
        .dispatch("categories/deletecategories", {
          id
        })
        .then(res => {
          var elementPos = this.$store.state.categories.categories
            .map(function(x) {
              return x.id;
            })
            .indexOf(id);
          this.$store.state.categories.categories.splice(elementPos, 1);
        });
      this.deleteModel = false;
    },

    close() {
      this.dialog = false;
      this.clearDialog();
      this.$refs.form.reset();
    }
  }
};
</script>

<style>
table.v-table tbody td:not(:first-child) {
  padding: 25px 24px;
}
</style>
