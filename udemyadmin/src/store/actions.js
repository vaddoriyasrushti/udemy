import authservice from "../service/auth";
import { router } from './../main';

export default {
  signup({ commit, dispatch }, userdata) {
    console.log("signup");
    return new Promise((resolve, reject) =>
      authservice
        .signup(userdata)
        .then(res => {
          if (!res.data.status) {
            return reject(res.data.message);
          }
          Promise.all([
            dispatch("login", {
              email: userdata.email,
              password: userdata.password,
              role: userdata.role
            })
          ]).then(res => {
            commit("clearAuthError");
            resolve(res);
          });
        })
        .catch(err => {
          commit("setAuthError", err.response);
        })
    );
  },

  login({ dispatch, commit }, authData) {
    return new Promise((resolve, reject) => {
      authservice
        .login(authData)
        .then(res => {
          if (!res.data.status) {
            return reject(res.data.message);
          }
          commit("authenticatedUser", {
            fullname: res.data.user[0].fullname,
            role: res.data.user[0].role,
            userid: res.data.user[0].userid
          });
          var x = {
            fullname: res.data.user[0].fullname,
            userid: res.data.user[0].userid,
            role: res.data.user[0].role
          };
          localStorage.setItem("user", JSON.stringify(x));
          commit("changelogoutvar");
          resolve(res);
        })
        .catch(err => commit("setAuthError", err.response));
    });
  },

  logout({ commit }) {
    commit("clearAuthData");
    localStorage.removeItem("user");
    commit("changelogoutvar");
    router.push('/signin')

  }
};
