<template>
  <!-- <v-dialog v-model="signupdialog" max-width="500"> -->
  <div class="main">
    <div class="login-box">
      <h3>Signup and Start learning</h3>
      <form @submit.prevent="signUp">
        <div class="textbox">
          <input
            type="text"
            placeholder="Full Name"
            name="fname"
            v-model="user.fullname"
            @input="validateInputs"
          >
        </div>
        <center>
          <span v-if="errors.fullnameValid" style="color:red; font-size:15px;">{{errors.fullname}}</span>
        </center>

        <div class="textbox">
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            v-model="user.email"
            @input="validateInputs"
          >
        </div>
        <center>
          <span v-if="errors.emailValid" style="color:red; font-size:15px;">{{errors.email}}</span>
        </center>
        <div class="textbox">
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
        <div class="textbox">
          <input
            type="password"
            placeholder="Confirm Password"
            name="cpassword"
            v-model="user.cpassword"
            @input="validateInputs"
          >
        </div>
        <center>
          <span v-if="errors.cpasswordValid" style="color:red; font-size:15px;">{{errors.cpassword}}</span>
        </center>
        <!-- <input type="submit" class="btn"  signupdialog="false" @click="$router.push({name: 'signup', query:{signupdialog: false}})" value="Sign Up"> -->
      </form>
      <center>
        Already registered?
        <a
          style="color:#789e89;"
          signindialog="true"
          @click="$router.push({name: 'signin', query:{signindialog: true}})"
        >Login</a>
      </center>
    </div>
  </div>
  <!-- </v-dialog> -->
</template>

<script>
/* eslint-disable */

export default {
  props: ["signupdialog"],
  props: ["signindialig"],
  props: ["toggle"],
  data() {
    return {
      user: {
        fullname: "",
        email: "",
        password: "",
        cpassword: ""
      },
      errors: {
        fullname: "",
        fullnameValid: false,
        email: "",
        emailValid: false,
        password: "",
        passwordValid: false,
        cpassword: "",
        cpasswordValid: false
      },
      signupdialog: true
    };
  },

  methods: {
    validateInputs(event) {
      let name = event.target.name;
      let value = event.target.value;
      if (name === "fname") {
        if (!value.match(/^[a-zA-Z]+$/)) {
          this.errors.fullname = "Only Characters are allowed.";
          this.errors.fullnameValid = true;
        } else {
          this.errors.fullname = "";
          this.errors.fullnameValid = false;
        }
      }

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
            "Password Must Contain at least 1 number and 1 special Character and greter then 6.";
          this.errors.passwordValid = true;
        } else {
          if (value.length < 6) {
            this.errors.password =
              "Password should contain minimum 6 characters.";
            this.errors.passwordValid = true;
          } else {
            this.errors.password = "";
            this.errors.passwordValid = false;
          }
        }
      }
      if (name === "cpassword") {
        if (value !== this.user.password) {
          //check here
          this.errors.cpassword = "Password and Confirm Password Must be Same.";
          this.errors.cpasswordValid = true;
        } else {
          this.errors.cpassword = "";
          this.errors.cpasswordValid = false;
        }
      }
    },
    clearform() {
      (this.user.fullname = ""),
        (this.user.email = ""),
        (this.user.password = ""),
        (this.user.cpassword = "");
    },
    close() {
      this.clearform();
      this.signupdialog = "false";
    },
    signUp() {
      if (this.user.fullname === "") {
        this.errors.fullname = "Please Fill up First Name.";
        this.errors.fullnameValid = true;
        return;
      }
      if (this.user.lastname === "") {
        this.errors.lastname = "Please Fill up Last Name.";
        this.errors.lastnameValid = true;
        return;
      }
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
      if (this.user.cpassword === "") {
        this.errors.cpassword = "Please Fill up Confirm Password.";
        this.errors.cpasswordValid = true;
        return;
      }
      if (this.user.password !== this.user.cpassword) {
        this.errors.cpassword = "Password and Confirm Password Must be Same.";
        this.errors.cpasswordValid = true;
        return;
      }
      if (
        this.errors.fullname === "" &&
        this.errors.email === "" &&
        this.errors.password === "" &&
        this.errors.cpassword === ""
      ) {
        let userdata = {
          fullname: this.user.fullname,
          email: this.user.email,
          password: this.user.password
        };

        this.$store
          .dispatch("signup", userdata)
          .then(res => "")
          .catch(err => "");
        this.close();
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

.main {
  margin: 0;
  padding: 0px;
  font-family: sans-serif;
  background-size: cover;
}
.login-box {
  width: 405px;
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: black;
  border: 3px solid #789e89;
  padding: 2rem;
  background-color: white;
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
.custom-control-inline {
  display: inline;
  margin-left: 10px;
}
span {
  font-size: 18px;
  margin: 0 10px;
  color: #6d7175;
}
.textbox {
  width: 100%;
  overflow: hidden;
  font-size: 20px;
  padding: 8px 0;
  margin: 8px 0;
  border-bottom: 1px solid #789e89;
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


