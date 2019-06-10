<template>
  <div id="components-modal-demo-position">
    <a-modal v-model="signindialog" @ok="togglesignin" @cancel="togglesignin" :footer="null">
      <h3>Sign In</h3>
      <form @submit.prevent="logIn">
        <center>
          <span
            class="mdi mdi-account setspan"
            style="color:red; font-size:15px;"
            v-if="match"
          >{{msg}}</span>
        </center>
        <div class="textbox">
          <span class="mdi mdi-account setspan"/>
          <input
            type="email"
            name="email"
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
        <input class="btn" type="submit" value="Log In">
      </form>
      <!-- <center>Not registered yet?
       <a style="color:#789e89" @click="signupmodel">Sign up</a>
       <sign-up name="sign-up" v-if="signupdialog" :togglesignup="signupmodel"></sign-up>
      </center>-->
    </a-modal>
  </div>
</template>

<script>
import signup from "./signup";
export default {
  props: {
    togglesignin: { type: Function }
  },
  data() {
    return {
      match: false,
      msg: "",
      signindialog: true,
      signupdialog: false,
      user: {
        email: "",
        password: "",
        role:3
      },
      errors: {
        email: "",
        emailValid: false,
        password: "",
        passwordValid: false
      }
    };
  },

  components: {
    "sign-up": signup
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
    clearform() {
      (this.user.email = ""), (this.user.password = "");
    },
    signupmodel() {
      this.signindialog = false;
      this.signupdialog = !this.signupdialog;
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
          .then(res => {
            this.togglesignin();
          })
          .catch(err => {
            this.match = true;
            this.msg = err;
          });
      }
    }
  }
};
</script>

<style scoped>
h3 {
  font-size: x-large;
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
