import axios from 'axios'

export default {
  getallsubcategories() {
    return axios.get('/subcategories')
  },
  getsubcategories(catname) {
    return axios.get('/subcategories/' + catname)
  },
  postsubcategories(formData) {
    return axios.post('/subcategories', formData)
  },
  putsubcategories(id, formData) {
    console.log("id", id)
    console.log("formdata", formData)
    return axios.put('/subcategories/' + id, formData)
  },
  deletesubcategories(id) {
    return axios.delete('/subcategories/' + id)
  }
}
