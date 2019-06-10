import subcategoriesservice from '../../../service/subcategories'
export default {
  getallsubcategories({ commit }) {
    return new Promise((resolve, reject) =>
      subcategoriesservice
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
      subcategoriesservice
        .getsubcategories(catname)
        .then(res => {
          commit('setallsubtosub', res.data)
          resolve(res);
        })
        .catch(err => reject(err.response.data.error))
    );
  },
  postsubcategories({ dispatch }, { formData }) {
    return new Promise((resolve, reject) => {
      subcategoriesservice.postsubcategories(formData)
        .then(res => {
          //dispatch('getallsubcategories')
          resolve(res)
        })
        .catch(err => reject(err.response.data.error))
    })
  },
  putsubcategories({ dispatch }, { id, formData }) {
    return new Promise((resolve, reject) => {
      subcategoriesservice.putsubcategories(id, formData)
        .then(res => {
          dispatch('getallsubcategories')
          resolve(res)
        })
        .catch(err => reject(err.response.data.error))
    })
  },
  deletesubcategories({ dispatch }, { id }) {
    return new Promise((resolve, reject) => {
      subcategoriesservice.deletesubcategories(id)
        .then(res => {
          resolve(res)
        })
        .catch(err => reject(err.response.data.error))
    })
  }

}
