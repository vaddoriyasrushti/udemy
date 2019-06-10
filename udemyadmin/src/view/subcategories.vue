<template>
  <div class="content">
    <div data-app>
      <div style="width:95%;  margin-left:auto; margin-right:auto;">
        <v-toolbar flat color="white">
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on }">
              <v-btn color="primary" dark class="mb-2" v-on="on">Add Courses</v-btn>
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
                        <v-select
                          v-model="catname"
                          :items="getcategories"
                          required
                          label="Categories"
                          @change="$store.dispatch('subcategories/getsubcategories',catname)"
                        ></v-select>
                      </v-flex>

                      <v-flex
                        v-if="catname"
                        xs12
                        class="text-xs-center text-sm-center text-md-center text-lg-center"
                      >
                        <v-select
                          v-model="allsubtosub"
                          :items="getsubtosub"
                          required
                          label="SubCategories"
                        ></v-select>
                      </v-flex>
                      <v-flex
                        xs12
                        class="text-xs-center text-sm-center text-md-center text-lg-center"
                      >
                        <v-text-field
                          required
                          v-model="populartopic"
                          :rules="nameRules"
                          label="Topic Name"
                        ></v-text-field>
                      </v-flex>
                      <v-flex
                        xs12
                        class="text-xs-center text-sm-center text-md-center text-lg-center"
                      >
                        <!-- <v-icon class="icon" @click="deleteImage">mdi-close</v-icon> -->
                        <img :src="imageUrl" style="height: 60px; width: 80px" v-if="imageUrl">
                        <v-text-field
                          label="Select Image"
                          @click="pickFile"
                          v-model="imageName"
                          prepend-icon="attach_file"
                        ></v-text-field>
                        <input
                          type="file"
                          style="display: none"
                          ref="image"
                          accept="image/*"
                          @change="onFilePicked"
                        >
                      </v-flex>
                      <v-flex
                        xs12
                        class="text-xs-center text-sm-center text-md-center text-lg-center"
                      >
                        <v-text-field
                          required
                          v-model="description"
                          :rules="descriptionRules"
                          label="Topic Description"
                        ></v-text-field>
                      </v-flex>

                      <v-flex
                        xs12
                        class="text-xs-center text-sm-center text-md-center text-lg-center"
                      >
                        <v-text-field
                          required
                          v-model="author"
                          :rules="authorRules"
                          label="Instructor Name"
                        ></v-text-field>
                      </v-flex>
                      <v-flex
                        xs12
                        class="text-xs-center text-sm-center text-md-center text-lg-center"
                      >
                        <v-text-field
                          required
                          v-model="price"
                          :rules="priceRules"
                          label="Topic price"
                        ></v-text-field>
                      </v-flex>
                      <v-flex
                        xs12
                        class="text-xs-center text-sm-center text-md-center text-lg-center"
                      >
                        <!-- <v-icon class="icon" @click="deleteImage">mdi-close</v-icon>  -->
                        <video
                          v-if="videoUrl"
                          :src="videoUrl"
                          style="height: 80px; width: 140px"
                          preload="auto"
                          controls
                        />
                        <v-text-field
                          label="Preview Video"
                          @click="pickvideoFile"
                          v-model="videofileName"
                          prepend-icon="attach_file"
                        ></v-text-field>
                        <input
                          type="file"
                          style="display: none"
                          ref="video"
                          accept="video/*"
                          @change="onvideoFilePicked"
                        >
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" v-if="isUpdate !== 1" @click="addsubcat">Submit</v-btn>
                  <v-btn color="blue darken-1" v-if="isUpdate === 1" @click="editsubcat">Update</v-btn>
                  <v-btn color="blue darken-1" flat @click="close">Cancel</v-btn>
                </v-card-actions>
              </v-form>
            </v-card>
          </v-dialog>

          <v-dialog v-model="deleteModel" max-width="290">
            <v-card class="text-xs-center dialog-delete">
              <v-card-text>Are you sure you want to delete?</v-card-text>
              <v-card-actions style="padding-left:50px">
                <v-btn color="blue darken-1" flat @click="deletesubcat">Yes</v-btn>
                <v-btn
                  color="blue darken-1"
                  flat
                  @click="deleteModel = false; deletesubcatId = 0;"
                >No</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-divider class="mx-2" inset vertical></v-divider>
          <v-spacer></v-spacer>
        </v-toolbar>

        <v-data-table :headers="headers" :items="getallsubcategories" class="elevation-1">
          <template v-slot:items="props">
            <tr>
              <td class="text-xs-left">
                <img
                  style="margin:5px"
                  :src=" 'http://localhost:3003/images/thumbnail/'+ props.item.topicimage "
                >
              </td>
              <td class="text-xs-left">{{ props.item.populartopic }}</td>
              <td class="text-xs-left">{{ props.item.description }}</td>
              <td class="text-xs-left">{{ props.item.allsubtosub }}</td>
              <td class="text-xs-left">{{ props.item.catname }}</td>
              <td class="text-xs-left">{{ props.item.author }}</td>
              <td class="text-xs-left">{{ props.item.price }}</td>
              <td class="text-xs-left">
                <v-icon small class="mr-2" @click="editsubcatModel(props.item)">edit</v-icon>
                <v-icon small @click="deletesubcatModel(props.item.id)">delete</v-icon>
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
          text: "Topic Image",
          sortable: false
        },
        {
          text: "Popular Topic",
          sortable: false
        },
        {
          text: "Description",
          sortable: false
        },
        {
          text: "SubCategories",
          sortable: false
        },
        {
          text: "Categories",
          sortable: false
        },
        {
          text: "Author",
          sortable: false
        },
        {
          text: "Price",
          sortable: false
        },
        {
          text: "Action",
          sortable: false
        }
      ],
      dialog: false,
      deleteModel: false,
      deletesubcatId: 0,
      catname: "",
      allsubtosub: "",
      populartopic: "",
      description: "",
      author: "",
      price: "",
      selectedItem: {},
      imageName: "",
      imageUrl: "",
      imageFile: "",
      fileError: "",
      videofileName: "",
      videoUrl: "",
      videoFile: "",
      isUpdate: 0,
      nameRules: [v => !!v || "Topic Name is required"],
      descriptionRules: [v => !!v || "Topic description is required"],
      authorRules: [v => !!v || "Author name is required"],
      priceRules: [v => !!v || "Price is required"],
      editedIndex: -1
    };
  },
  computed: {
    formTitle() {
      return this.isUpdate === 1 ? "Edit Courses" : "New Courses";
    },
    getallsubcategories() {
      return this.$store.state.subcategories.subcategories;
    },
    getcategories() {
      let c = [];
      this.$store.state.categories.categories.map(cat => {
        c.push(cat.categoriesname);
      });
      return c;
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
    addsubcat() {
      // console.log("add subcat");
      if (this.$refs.form.validate()) {
        let formData = new FormData();
        formData.append("catname", this.catname);
        formData.append("allsubtosub", this.allsubtosub);
        formData.append("populartopic", this.populartopic);
        formData.append("description", this.description);
        formData.append("author", this.author);
        formData.append("price", this.price);
        // console.log("imagefile", this.imageFile);
        // console.log("videofile", this.video);
        if (this.imageFile) {
          formData.append("topicimage", this.imageFile);
        }
        if (this.videoFile) {
          formData.append("videos", this.videoFile);
        }
        // for (var value of formData.values()) {
        //   console.log("formdata", value);
        // }
        const config = {
          headers: {
            "content-type": "multipart/form-data"
          }
        };
        this.$store
          .dispatch("subcategories/postsubcategories", {
            formData
          })
          .then(res => {
            this.$store.state.subcategories.subcategories.unshift(res.data);
          });

        this.clearDialog();
        this.close();
      }
    },

    clearDialog() {
      this.catname = "";
      this.allsubtosub = "";
      this.populartopic = "";
      this.description = "";
      this.author = "";
      this.price = "";
      this.imageFile = "";
      this.imageUrl = "";
      this.imageName = "";
      this.videoFile = "";
      this.videoUrl = "";
      this.videofileName = "";
      this.isUpdate = 0;
      this.selectedItem = {};
    },

    editsubcatModel(item) {
      // console.log("item", item);
      this.isUpdate = 1;
      this.selectedItem = item;
      this.catname = item.catname;
      this.allsubtosub = item.allsubtosub;
      this.populartopic = item.populartopic;
      this.description = item.description;
      this.author = item.author;
      this.price = item.price;
      this.imageName = item.topicimage;
      this.imageUrl =
        "http://localhost:3003/images/thumbnail/" + item.topicimage;
      // console.log("gfb", this.imageUrl);
      var x = item.topicimage.split("-");
      // console.log("x", x[x.length - 1]);
      this.imageFile = new File([""], x[x.length - 1]);
      // console.log("imagefile", this.imageFile);
      this.videofileName = item.videos;
      this.videoUrl = "http://localhost:3003/images/" + item.videos;
      this.videoFile = new File([""], item.videos);
      // }
      this.dialog = true;
    },

    editsubcat() {
      let formData = new FormData();
      formData.append("catname", this.catname);
      formData.append("allsubtosub", this.allsubtosub);
      formData.append("populartopic", this.populartopic);
      formData.append("description", this.description);
      formData.append("author", this.author);
      formData.append("price", this.price);
      // console.log("edit imagefile", this.imageFile);
      formData.append("videos", this.videoFile);
      // if (this.imageFile) {
      formData.append("topicimage", this.imageFile);
      // }
      // if (this.videoFile) {
      // formData.append("videos", this.videoFile);
      // }
      for (var value of formData.values()) {
        console.log("formdata", value);
      }
      const config = {
        headers: {
          "content-type": "multipart/form-data"
        }
      };
      let id = this.selectedItem.id;
      this.$store.dispatch("subcategories/putsubcategories", {
        id,
        formData
      });

      this.close();
    },

    deletesubcatModel(id) {
      this.deleteModel = true;
      this.deletesubcatId = id;
    },

    deletesubcat() {
      let id = this.deletesubcatId;
      // console.log("id", id);
      this.$store
        .dispatch("subcategories/deletesubcategories", {
          id
        })
        .then(res => {
          var elementPos = this.$store.state.subcategories.subcategories
            .map(function(x) {
              return x.id;
            })
            .indexOf(id);

          this.$store.state.subcategories.subcategories.splice(elementPos, 1);
        });
      this.deleteModel = false;
    },

    close() {
      this.dialog = false;
      this.clearDialog();
      this.$refs.form.reset();
    },

    pickFile() {
      this.$refs.image.click();
    },
    pickvideoFile() {
      this.$refs.video.click();
    },
    onFilePicked(e) {
      const files = e.target.files;
      if (files[0] !== undefined) {
        this.imageName = files[0].name;
        if (this.imageName.lastIndexOf(".") <= 0) {
          return;
        }
        const fr = new FileReader();
        fr.readAsDataURL(files[0]);
        fr.addEventListener("load", () => {
          this.imageUrl = fr.result;
          this.imageFile = files[0]; // this is an image file that can be sent to server...
        });
      } else {
        this.imageName = "";
        this.imageUrl = "";
        this.$refs.image.value = "";
        this.fileError = "Please choose image only";
      }
    },
    onvideoFilePicked(e) {
      const files = e.target.files;
      if (files[0] !== undefined) {
        this.videofileName = files[0].name;
        if (this.videofileName.lastIndexOf(".") <= 0) {
          return;
        }
        const fr = new FileReader();
        fr.readAsDataURL(files[0]);
        fr.addEventListener("load", () => {
          this.videoUrl = fr.result;
          this.videoFile = files[0]; // this is an image file that can be sent to server...
        });
      } else {
        this.videofileName = "";
        this.videoUrl = "";
        this.$refs.video.value = "";
        this.fileError = "Please choose image only";
      }
    }
  }
};
</script>

<style>
table.v-table tbody td:not(:first-child) {
  padding: 25px 24px;
}
</style>
