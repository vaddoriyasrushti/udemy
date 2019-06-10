
export default {
    userid: null,
    fullname:null,
    role:null,
    authError: null,
    logvar:false,//for logout var
    total:[],//total of selected item
    currentid:null,
    currentdetail:[],//for onclick detail
    cartitem:[],//for button change
    selectedcourse:localStorage.getItem("user")?[]:JSON.parse(localStorage.getItem("courses")),
    counter:localStorage.getItem("courses")?JSON.parse(localStorage.getItem("courses")).length:0,
    letter:localStorage.getItem("user")?JSON.parse(localStorage.getItem("user")).fullname.charAt(0).toUpperCase():""
}
  