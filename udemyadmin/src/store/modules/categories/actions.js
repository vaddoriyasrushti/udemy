import categoriesservice from '../../../service/categories'
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
  postcategories({ dispatch }, { formData }) {
    return new Promise((resolve, reject) => {
      categoriesservice.postcategories(formData)
        .then(res => {
          resolve(res)
        })
        .catch(err => reject(err.response.data.error))
    })
  },
  putcategories({ dispatch }, { id, formData }) {
    console.log("put categories")
    console.log("in putsubcat", formData)
    return new Promise((resolve, reject) => {
      categoriesservice.putcategories(id, formData)
        .then(res => {
          console.log("res put", res)
          dispatch('getcategories')
          resolve(res)
        })
        .catch(err => reject(err.response.data.error))
    })
  },
  deletecategories({ dispatch }, { id }) {
    return new Promise((resolve, reject) => {
      categoriesservice.deletecategories(id)
        .then(res => {
          resolve(res)
        })
        .catch(err => reject(err.response.data.error))
    })
  }

}
