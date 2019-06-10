import axios from 'axios';
export default {
  getcategories() {
    return axios.get('/categories')
  },
  postcategories(formData) {
    return axios.post('/categories', formData)
  },
  putcategories(id, formData) {
    console.log("put service")
    console.log("id", id)
    console.log("formdata", formData)
    return axios.put('/categories/' + id, formData)
  },
  deletecategories(id) {
    return axios.delete('/categories/' + id)
  }

}