export default{
    userid: null,
    fullname:null,
    role:null,
    authError: null,
    logvar:false,
    letter:localStorage.getItem("user")?JSON.parse(localStorage.getItem("user")).fullname:""
}