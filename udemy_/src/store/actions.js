import authservice from "../service/auth";
import cartservice from "../service/cart";
import categoriesservice from "../service/categories";
import router from "../routes/routes";

export default {
  signup({
    commit,
    dispatch
  }, userdata) {
    return new Promise((resolve, reject) =>
      authservice
      .signup(userdata)
      .then(res => {
        if (!res.data.status) {
          return reject(res.data.message)
        }
        dispatch("login", {
          email: userdata.email,
          password: userdata.password,
          role: userdata.role
        });
        commit("clearAuthError");
        resolve(res);
      })
      .catch(err => commit("setAuthError", err.response))
    );
  },
  login({
    dispatch,
    commit
  }, authData) {
    console.log("login")
    return new Promise((resolve, reject) => {
      authservice
        .login(authData)
        .then(res => {
          console.log("res", res)
          if (!res.data.status) {
            return reject(res.data.message)
          }
          commit("authenticatedUser", {
            fullname: res.data.user[0].fullname,
            role: res.data.user[0].role,
            userid: res.data.user[0].userid
          });
          var x = {
            fullname: res.data.user[0].fullname,
            userid: res.data.user[0].userid
          };
          localStorage.setItem("user", JSON.stringify(x));
          commit("changelogoutvar");

          var user = JSON.parse(localStorage.getItem("user"));
          var course = JSON.parse(localStorage.getItem("courses"));
          if (user) {
            if (course != null) {
              course.map(p => {
                let data = {
                  userid: user.userid,
                  catid: p.id
                };
                dispatch("cart", data);
              });
            }
            dispatch("count", user.userid);
            this.state.selectedcourse = [];
            //this.state.cartitem=[];
            dispatch("getcartitem", user.userid);
          }

          resolve(res);
        })
        .catch(err => commit("setAuthError", err.response));
    });
  },

  logout({
    commit
  }) {
    commit("clearAuthData");
    localStorage.removeItem("user");
    commit("changelogoutvar");
    localStorage.removeItem("courses");
    commit("changecountvar");
    this.state.cartitem = []
  },
  count({
    commit
  }, userid) {
    var user = JSON.parse(localStorage.getItem("user"));
    if (localStorage.getItem("user")) {
      cartservice.getcartitem(user.userid).then(res => {
        this.state.counter = res.data.length;
      });
    } else {
      commit("changecountvar");
    }
  },
  getcartitem({
    dispatch
  }, userid) {
    cartservice
      .getcartitem(userid)
      .then(res => {

        res.data.map(p => {
          categoriesservice.getsubcategoriesbyid(p.catid).then(res => {
            if (this.state.selectedcourse == null) {
              this.state.selectedcourse = [];
            }
            this.state.cartitem.push(p.catid);
            this.state.selectedcourse.push(res.data[0]);
          });
        });
        // dispatch("cart", data);

      })
      .catch(err => console.log(err));
  },

  addCourse({
    dispatch
  }, i) {
    var user = JSON.parse(localStorage.getItem("user"));
    var crs = JSON.parse(localStorage.getItem("courses"));

    if (user) {
      this.state.cartitem.push(i.id)
      //  this.state.cartitem=this.state.cartitem
      let data = {
        userid: user.userid,
        catid: i.id
      };
      dispatch("cart", data);
      // this.state.cartitem.push(i.id)
      if (this.state.selectedcourse == null) {
        this.state.selectedcourse = [];
      } else {

        var elementPos = this.state.selectedcourse.map(function (x) {
          return x.id;
        }).indexOf(i.id);

        if (elementPos == -1) {
          // this.state.cartitem.push(i.id)
          this.state.selectedcourse.push(i);
        }
      }
    } else {

      if (crs == null) {
        this.state.selectedcourse = [];
      }
      if (crs) {
        try {
          this.state.selectedcourse = crs;
        } catch (e) {
          localStorage.removeItem("courses");
        }
        var allitems = JSON.parse(localStorage["courses"]);
        for (var j = 0; j < allitems.length; j++) {
          if (allitems[j].id == i.id) {
            return;
          }
        }
      }
      var x = {
        id: i.id,
        populartopic: i.populartopic,
        author: i.author,
        price: i.price,
        description: i.description,
        topicimage: i.topicimage,
        catname: i.catname
      };

      this.state.selectedcourse.push(x);
      this.state.cartitem.push(x.id)
      dispatch("saveCourses");
      this.state.total.push(i.price);
    }
  },
  saveCourses({
    commit
  }) {
    const parsed = JSON.stringify(this.state.selectedcourse);
    localStorage.setItem("courses", parsed);
    this.state.counter = JSON.parse(localStorage.getItem("courses")) ?
      JSON.parse(localStorage.getItem("courses")).length :
      0;
  },
  cart({
    commit
  }, data) {
    cartservice
      .postcartitem(data)
      .then(res => {
        this.state.cartitem.push(data.catid)
        this.state.counter = this.state.counter + 1;
      })
      .catch(err => console.log(err));
  },
  deletecartitem({
    dispatch
  }, {
    userid,
    catid
  }) {
    cartservice.deletecartitem(userid, catid).then(res => {
      this.state.counter = this.state.counter - 1;
    });
  },
  getsubcategoriesdetailbyid({
    commit
  }, id) {

    return new Promise((resolve, reject) =>
      categoriesservice.getsubcategoriesbyid(id)
      .then(res => {
        console.log("res", res.data[0])
        this.state.currentdetail = res.data[0]
        resolve(res)
      })
      .catch(err => console.log(err))
    )
  }

};
