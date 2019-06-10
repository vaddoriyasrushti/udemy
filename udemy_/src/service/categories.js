import axios from 'axios'

export default{
    getcategories(){
       return axios.get('/categories')
    },
    getallsubcategories(){
        return axios.get('/subcategories')
    },
    getsubcategories(catname){
        return axios.get('/subcategories/'+catname)
    },
    getsubcategoriesbyid(id){
        return axios.get('/subcategories/id/'+id)
    }
}