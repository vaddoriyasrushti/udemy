export default {
    authenticatedUser(state, data) {
        state.fullname = data.fullname,
        state.role = data.role,
        state.userid = data.userid
    },
  
    clearAuthData(state) {
      (state.fullname = null),
        (state.role = null),
        (state.userid = null),
        (state.authError = null)
    },
  
    setAuthError(state, err) {
      state.authError = err;
    },
    
    clearAuthError(state) {
      state.clearAuthError = null;
    },
    changelogoutvar(state){
      if (localStorage.getItem("user")) {
        state.logvar=true
        state.letter=localStorage.getItem("user")?JSON.parse(localStorage.getItem("user")).fullname.charAt(0).toUpperCase():""
      } else {
        state.logvar=false
      }
    },
    changecountvar(state){
      if(localStorage.getItem("user")){
        
      }
      else{
      if (localStorage.getItem("courses")) {
        state.counter=JSON.parse(localStorage.getItem("courses")).length
        state.selectedcourse=JSON.parse(localStorage.getItem("courses"))
      } else {
        state.counter=0
        state.selectedcourse=JSON.parse(localStorage.getItem("courses"))
      }
    }
    },
    
    
    
  };