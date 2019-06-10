<template>
  <v-dialog v-model="$route.query.signindialog" max-width="500">
    <div class="main">
      <div class="login-box">
        <h3>Sign In</h3>
        <form @submit.prevent="logIn">
          <div class="textbox">
            <span class="mdi mdi-account setspan"/>
            <input
              type="email"
              name="email"
              :rules="emailRule"
              placeholder="Username"
              v-model="user.email"
              @input="validateInputs"
            >
          </div>
          <center>
            <span v-if="errors.emailValid" style="color:red; font-size:15px;">{{errors.email}}</span>
          </center>
          <div class="textbox">
            <span class="mdi mdi-lock setspan"/>
            <input
              type="password"
              name="password"
              placeholder="Password"
              v-model="user.password"
              @input="validateInputs"
            >
          </div>
          <center>
            <span v-if="errors.passwordValid" style="color:red; font-size:15px;">{{errors.password}}</span>
          </center>
          <input
            class="btn"
            type="submit"
            signindialog="false"
            @click="$router.push({name: 'signin', query:{signindialog: false}})"
            value="Log In"
          >
        </form>
        <center>
          Not registered yet?
          <!-- <a style="color:#789e89;" signupdialog="true" @click="$router.push({name:'signup', query:{signupdialog:true}})">Sign up</a> -->
        </center>
      </div>
    </div>
  </v-dialog>
</template>

<script>
/* eslint-disable */
export default {
  props: ["signindialog"],
  props: ["signupdialog"],
  data() {
    return {
      user: {
        email: "",
        password: ""
      },
      errors: {
        email: "",
        emailValid: false,
        password: "",
        passwordValid: false
      },
      emailRule: [v => !!v || "Email requires"],
      signindialog: false
    };
  },

  created() {
    // console.log("signin",this.signindialog)
    // if (localStorage.getItem("user")) {
    //   if (localStorage.getItem("role") && +localStorage.getItem("role") === 1) {
    //     this.$router.replace("/dashboard");
    //   } else if (
    //     localStorage.getItem("role") &&
    //     +localStorage.getItem("role") === 2
    //   ) {
    //     this.$router.replace("/userDashboard");
    //   }
    // }
  },

  methods: {
    validateInputs(event) {
      let name = event.target.name;
      let value = event.target.value;
      if (name === "email") {
        if (!value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
          this.errors.email = "Please Provide Valid Email Address.";
          this.errors.emailValid = true;
        } else {
          this.errors.email = "";
          this.errors.emailValid = false;
        }
      }
      if (name === "password") {
        if (
          !value.match(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/)
        ) {
          this.errors.password =
            "Password Must Contain at least 1 number and 1 special Character.";
          this.errors.passwordValid = true;
        } else {
          if (value.length < 6) {
            this.errors.password =
              "Password should contain minimum 6 characters.";
          } else {
            this.errors.password = "";
            this.errors.passwordValid = false;
          }
        }
      }
    },
    logIn() {
      if (this.user.email === "") {
        this.errors.email = "Please Fill up Email Address.";
        this.errors.emailValid = true;

        return;
      }
      if (this.user.password === "") {
        this.errors.password = "Please Fill up Password.";
        this.errors.passwordValid = true;
        return;
      }
      if (this.errors.email === "" && this.errors.password === "") {
        this.$store
          .dispatch("login", this.user)
          .then(res => "")
          .catch(err => "");
      }
    }
  }
};
</script>

<style scoped>
* {
  background-repeat: no-repeat;
  padding: 5px;
  margin: 0;
}
h3 {
  font-size: x-large;
}
.main {
  margin: 0;
  padding: 0;
  font-family: sans-serif;
  overflow: hidden;
}
.login-box {
  width: 380px;
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: black;
  border: 3px solid #789e89;
  background-color: white;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 0.5rem 0.5rem 0.5rem rgba(0, 0, 0, 0.1);
}
.login-box h2 {
  float: left;
  font-size: 40px;
  border-bottom: 6px solid #789e89;
  margin-bottom: 30px;
  padding: 0;
}
.textbox {
  width: 100%;
  overflow: hidden;
  font-size: 20px;
  padding: 8px 0;
  margin: 8px 0;
  border-bottom: 1px solid #789e89;
}
.textbox span {
  width: 26px;
  float: left;
  text-align: center;
}
.setspan {
  margin-right: 5px;
}
.textbox input {
  border: none;
  outline: none;
  background: none;
  font-size: 18px;
  width: 80%;
  float: left;
  margin: 0 10px;
}
.btn {
  width: 100%;
  background: #789e89;
  border: 2px solid #789e89;
  padding: 5px;
  font-size: 18px;
  margin: 12px 0;
}
</style>
