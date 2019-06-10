<template>
  <div class="main">
    <div class="login-box">
      <!-- <div id="components-modal-demo-position"> -->
      <!-- <a-modal v-model="signupdialog" @cancel="togglesignup" :footer="null"> -->
      <h2>Signup and Start learning</h2>
      <form @submit.prevent="signUp">
        <center>
          <span
            class="mdi mdi-account setspan"
            style="color:red; font-size:15px;"
            v-if="match"
          >{{msg}}</span>
        </center>
        <div class="textbox" style="padding:5px">
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
        <div>
          <b-form-select style="width:100%" v-model="user.role" class="mb-3">
            <option :value="null">Select Role</option>
            <!-- <option value="1">Admin</option> -->
            <option value="2">Instructor</option>
          </b-form-select>
        </div>
        <center>
          <span v-if="errors.roleValid" style="color:red; font-size:15px;">{{errors.role}}</span>
        </center>
        <input type="submit" class="btn" value="Sign Up">
      </form>
      <center>
        Already registered?
        <a style="color:#789e89" @click="$router.push('/signin')">Login</a>
        <!-- <sign-in name="sign-in" v-if="signindialog" :togglesignin="signinmodel"></sign-in>  -->
      </center>
    </div>
    <!-- </a-modal> -->
  </div>
</template>

<script>
//import signin from "./signin";

export default {
  props: {
    togglesignup: { type: Function }
  },
  data() {
    return {
      match: false,
      msg: "",
      signupdialog: true,
      signindialog: false,
      user: {
        fullname: "",
        email: "",
        password: "",
        cpassword: "",
        role: null
      },
      errors: {
        fullname: "",
        fullnameValid: false,
        email: "",
        emailValid: false,
        password: "",
        passwordValid: false,
        cpassword: "",
        cpasswordValid: false,
        role: "",
        roleValid: false
      }
    };
  },
  components: {
    //  "sign-in": signin
  },
  methods: {
    validateInputs(event) {
      this.msg = "";
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
        (this.user.cpassword = ""),
        (this.user.role = null);
    },
    close() {
      this.clearform();
      // this.togglesignup();
    },
    signinmodel() {
      this.signupdialog = false;
      this.signindialog = !this.signindialog;
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
      if (this.user.role == null) {
        this.errors.role = "Please Select Role";
        this.errors.roleValid = true;
        return;
      }
      if (
        this.errors.fullname === "" &&
        this.errors.email === "" &&
        this.errors.password === "" &&
        this.errors.cpassword === "" &&
        this.errors.role == ""
      ) {
        let userdata = {
          fullname: this.user.fullname,
          email: this.user.email,
          password: this.user.password,
          role: this.user.role
        };

        this.$store
          .dispatch("signup", userdata)
          .then(res => this.$router.push("/"))
          .catch(err => {
            (his.match = true), (this.msg = err);
          });

        //this.close();
      }
    }
  }
};
</script>

<style scoped>
.main {
  margin: 0;
  padding: 0;
  font-family: sans-serif;
  background-size: cover;
}
.login-box {
  width: 575px;
  position: absolute;
  top: 40%;
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
  font-size: 30px;
  margin-bottom: 20px;
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
  /* padding: 5px; */
  font-size: 18px;
  margin: 12px 0;
}
</style>


