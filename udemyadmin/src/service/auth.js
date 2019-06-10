import axios from 'axios'

export default{
    signup(userdata){
       return axios.post('/signup',userdata)
    },
    login (userData) {
        return axios.post('/signin', userData)
      }
}