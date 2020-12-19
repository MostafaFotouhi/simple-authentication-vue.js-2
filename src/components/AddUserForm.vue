<template>
<div class="fix">

  <ValidationObserver v-slot="{ handleSubmit }" ref="form">
    <form action="#" @submit.prevent="handleSubmit(addNewUser)">
      <div class="form">
        <ValidationProvider
          name="Name"
          rules="required|alpha"
          v-slot="{ errors }"
        >
          <label for="name">نام</label>
          <input
            type="text"
            id="name"
            v-model="newUser.name"
            :disabled="isDisabled"
          />
          <span style="color:red">{{ errors[0] }}</span>
        </ValidationProvider>
        <ValidationProvider
          name="Email"
          rules="required|email"
          v-slot="{ errors }"
        >
          <label for="email">ایمیل</label>
          <input
            type="email"
            id="email"
            v-model="newUser.email"
            :disabled="isDisabled"
            @input="checkUserEmail"
          />
          <span style="color:red">{{ errors[0] }}</span>
          <span style="color:red" v-if="isEmailExist">{{ text }}</span>
        </ValidationProvider>
        <ValidationProvider
          name="Role"
          rules="required|alpha"
          v-slot="{ errors }"
        >
          <label for="role">نقش</label>
          <select id="role" v-model="newUser.role" :disabled="isDisabled">
            <option value="admin">admin</option>
            <option value="user">user</option>
          </select>
          <span style="color:red">{{ errors[0] }}</span>
        </ValidationProvider>
        <ValidationProvider
          name="Password"
          rules="required|max:12|min:5"
          v-slot="{ errors }"
        >
          <label for="pass">رمز</label>
          <input
            type="password"
            id="pass"
            v-model="newUser.password"
            :disabled="isDisabled"
            autocomplete="on"
          />
          <span style="color:red">{{ errors[0] }}</span>
        </ValidationProvider>
        <button class="btn" :disabled="isDisabled">
          ساختن
        </button>
      </div>
    </form>
  </ValidationObserver>
</div>
</template>

<script>
import { mapMutations } from "vuex";
import {addNewUserData} from "../mixin/addNewUser.js";
export default {
  mixins: [addNewUserData],
  data() {
    return {
      // store new user data
      newUser: {
        id: null,
      },
      // copy of newUser variable
      newUserCopy: {
        id: null,
      },
    };
  },
  mounted() {
    // call method for allow form access
    this.disableFormFields();
  },
  methods: {
    ...mapMutations(["addUserToState"]),

    // check duplicate id
    isIdDuplicate() {
      this.newUserCopy.id = Math.floor(Math.random() * 100) + 1;
      const users = this.$store.state.allUsersList;
      const idUsers = users.some((i) => i.id === this.newUserCopy.id);
      console.log(idUsers);
      if (idUsers) {
        this.isIdDuplicate();
      }
    },

    // check email exist in form
    checkUserEmail() {
      const users = this.$store.state.allUsersList;
      const checkEmail = users.find((e) => e.email === this.newUser.email);
      if (checkEmail) {
        this.isEmailExist = true;
      } else {
        this.isEmailExist = false;
      }
    },

    // reset form after create user
    clearForm() {
      this.newUser.name = "";
      this.newUser.email = "";
      this.newUser.role = "";
      this.newUser.password = "";
    },

    // add information of new user to localStorage
    addDataInLocal() {
      let localData = JSON.parse(localStorage.getItem("users"));
      localData.push(this.newUserCopy);
      localStorage.setItem("users", JSON.stringify(localData));
    },
    // add new user data to state & call other methods
    addNewUser() {
      this.newUserCopy = { ...this.newUser };
      try {
        if (this.isEmailExist === true) throw "ایمیل تکراری است";
        this.isIdDuplicate();
        this.addDataInLocal();
        this.addUserToState(this.newUserCopy);
        this.clearForm();
      } catch (error) {
        this.text = error;
      } finally {
        if (this.isEmailExist === false) {
          this.$nextTick(() => {
            this.$refs.form.reset();
          });
        }
      }
    },
    // access permission to form button
    disableFormFields() {
      const user = this.$store.state.userLogged;
      if (user.role === "admin") {
        this.isDisabled = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.fix {
  position: fixed;
  width: inherit;
  height: inherit;
}
.form {
  width: 100%;
  height: 100%;
  background-color: #42b983;
  display: flex;
  flex-direction: column;
  padding: 2rem 10rem;

  input,
  select,
  .btn {
    font-family: "IranSANS";
    width: 100%;
    margin-bottom: 1rem;
    padding: 0.8rem;
    border: none;
    border-radius: 0.3rem;
    outline: none;
  }
  label {
    color: #fff;
    font-size: 1.3rem;
    display: inline-block;
    margin-bottom: .5rem;
  }
  .btn {
    color: #fff;
    margin-top: 2rem;
    border: 1px solid #fff;
    background-color: #42b983;
    cursor: pointer;
  }
  .error {
    color: red;
  }
}
</style>
