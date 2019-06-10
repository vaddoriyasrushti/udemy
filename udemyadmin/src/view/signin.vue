<template>
  <div class="main">
    <div class="login-box">
      <h2>Log In</h2>
      <form @submit.prevent="logIn">
      <center>
          <span
            class="mdi mdi-account setspan"
            style="color:red; font-size:15px;"
            v-if="match"
          >{{msg}}</span>
        </center>
        <div class="textbox">
          <!-- <div v-if="authError" style="color:red; font-size:15px; margin-bottom:10px;">{{authError}}</div> -->
           <div style="color:red; font-size:15px; margin-bottom:10px;"></div>
         
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
        <div>
          <span class="mdi mdi-lock setspan"/>
           <b-form-select style="width:100%" v-model="user.role" class="mb-3">
          <option :value="null">Select Role</option>
          <option value="1">Admin</option>
          <option value="2">Instructor</option>
        </b-form-select>
          
        </div>
        <center>
          <span v-if="errors.roleValid" style="color:red; font-size:15px;">{{errors.role}}</span>
        </center>
        <input class="btn" type="submit" value="Log In">
      </form>
      <center>Not registered yet?
        <router-link style="color:#789e89;" to="/signup">Register</router-link>
      </center>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  data() {
    return {
      match: false,
      msg: "",
      user: {
        email: "",
        password: "",
        role:null
      },
      errors: {
        email: "",
        emailValid: false,
        password: "",
        passwordValid: false,
        role:"",
        roleValid:false,
      },
      emailRule: [v => !!v || "Email requires"]
    };
  },

  computed: {
    // authError() {
    //   return this.$store.state.authError;
    // }
  },

  created() {
    // if (localStorage.getItem("token")) {
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
      this.msg = "";
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
      if (this.user.role==null) {
        this.errors.role = "Please Select Role";
        this.errors.roleValid = true;
        return; 
      }

      if (this.errors.email === "" && this.errors.password === "" &&this.errors.role=="") {
       this.$store
          .dispatch("login", this.user)
          .then(res => this.$router.push('/'))
          .catch(err => {
          
            this.match = true,
            this.msg = err});
      }
    }
  }
};
</script>

<style>
.main {
  margin: 0;
  padding: 0;
  font-family: sans-serif;
  overflow: hidden;
}
.login-box {
  width: 530px;
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
  width:100%;
  /* text-align:left; */
  font-size:30px;
  /* border-bottom: 4px solid #789e89; */
  margin-top:0px;
  margin-bottom: 20px;
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
