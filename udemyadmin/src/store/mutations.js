export default{
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
        state.letter=localStorage.getItem("user")?JSON.parse(localStorage.getItem("user")).fullname:""
      } else {
        state.logvar=false
      }
    },
}