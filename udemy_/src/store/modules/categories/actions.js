import categoriesservice from "../../../service/categories";
import state from "./state";

export default {
  getcategories({ commit }) {
    return new Promise((resolve, reject) =>
      categoriesservice
        .getcategories()
        .then(res => {
          commit("setcategories", res.data);

          resolve(res);
        })
        .catch(err => reject(err.response.data.error))
    );
  },
  getallsubcategories({ commit }) {
    return new Promise((resolve, reject) =>
      categoriesservice
        .getallsubcategories()
        .then(res => {
          commit("setallsubcategories", res.data);
          resolve(res);
        })
        .catch(err => reject(err.response.data.error))
    );
  },
  getsubcategories({ commit }, catname) {
    return new Promise((resolve, reject) =>
      categoriesservice
        .getsubcategories(catname)
        .then(res => {
          if (catname == "Development") {
            commit("setdevelopment", res.data);
          }
          if (catname == "Business") {
            commit("setbusiness", res.data);
          }
          if (catname == "It & Software") {
            commit("setitsoftware", res.data);
          }
          if (catname == "Music") {
            commit("setmusic", res.data);
          }
          if (catname == "Office Productivity") {
            commit("setofficeproductivity", res.data);
          }
          if (catname == "Design") {
            commit("setdesign", res.data);
          }
          if (catname == "Marketing") {
            commit("setmarketing", res.data);
          }
          if (catname == "Helth and fitness") {
            commit("sethelthfitness", res.data);
          }
          if (catname == "Personal development") {
            commit("setpersonaldevelopment", res.data);
          }
          if (catname == "Lifestyle") {
            commit("setlifestyle", res.data);
          }
          if (catname == "Photography") {
            commit("setphotography", res.data);
          }
          resolve(res);
        })
        .catch(err => reject(err.response.data.error))
    );
  },
  
};
