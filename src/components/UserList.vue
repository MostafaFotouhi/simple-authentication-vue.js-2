<template>
  <div class="fix">
    <table class="list">
      <tbody>
        <tr v-for="(user, index) in allUsersList" :key="index">
          <td>{{ user.id }}</td>
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.role }}</td>
          <td>{{ user.password }}</td>
          <td>
            <button
              @click="deleteField(index)"
              class="btn"
              :disabled="isDisabled"
            >
              حذف
            </button>
          </td>
          <td>
            <button
              @click="showModalBtn(user.id)"
              class="btn"
              :disabled="isDisabled"
            >
              ویرایش
            </button>
          </td>
          <td>
            <edit-form-modal v-if="showModal">
              <form action="#" @submit.prevent="userRegister">
                <div class="form">
                  <label for="name">نام</label>
                  <input type="text" name="name" v-model="userValues.name" />
                  <label for="email">ایمیل</label>
                  <input
                    type="email"
                    name="email"
                    v-model="userValues.email"
                    @input="checkUserEmail"
                  />
                  <span style="color:red" v-if="isEmailExist">{{ text }}</span>
                  <label for="role">نقش</label>
                  <select name="role" v-model="userValues.role">
                    <option value="admin">admin</option>
                    <option value="user">user</option>
                  </select>
                  <label for="pass">رمز</label>
                  <input
                    type="password"
                    name="pass"
                    v-model="userValues.password"
                    autocomplete="on"
                  />
                  <button class="button" @click="userRegister">
                    ثبت
                  </button>
                  <button class="button" @click="closeModalBtn">
                    لغو
                  </button>
                </div>
              </form>
            </edit-form-modal>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import EditFormModal from "../components/EditFormModal.vue";
import { addNewUserData } from "../mixin/addNewUser.js";
import { mapState, mapMutations } from "vuex";
export default {
  mixins: [addNewUserData],
  components: { EditFormModal },
  data() {
    return {
      // modal variable to show or close
      showModal: false,

      // variable for user values in edit form
      userValues: {},
    };
  },
  mounted() {
    // disable button if user not be admin
    this.disableBtnForm();
  },
  computed: {
    ...mapState(["allUsersList", "userLogged", "users"]),
  },
  methods: {
    ...mapMutations(["addUserToState", "editInState", "deleteUserInState"]),

    // get data from state and register to edit form fields
    getDataFromState(data) {
      const userId = this.allUsersList.find((i) => i.id === data);
      this.userValues.id = userId.id;
      this.userValues.name = userId.name;
      this.userValues.email = userId.email;
      this.userValues.role = userId.role;
      this.userValues.password = userId.password;
    },

    // check email exist in edit form
    checkUserEmail() {
      const users = this.$store.state.allUsersList;
      const emailUser = users.find((e) => e.email === this.userValues.email);
      if (emailUser) {
        this.isEmailExist = true;
      } else {
        this.isEmailExist = false;
      }
    },
    
    //  access permission to edit form button
    disableBtnForm() {
      const user = this.$store.state.userLogged;
      if (user.role === "admin") {
        this.isDisabled = false;
      }
    },

    // open modal method
    showModalBtn(data) {
      this.showModal = true;
      this.getDataFromState(data);
    },

    //  close modal method
    closeModalBtn() {
      this.showModal = false;
    },
    // delete user of state
    deleteInState(idx) {
      this.deleteUserInState(idx);
    },
    // delete user of localStorege
    deleteInLocal(idx) {
      let localData = JSON.parse(localStorage.getItem("users"));
      localData.splice(idx, 1);
      localStorage.setItem("users", JSON.stringify(localData));
    },

    // store index of admin users
    indexRole() {
      var roleIdx = [];
      let userRole = this.allUsersList.map((r) => r.role);
      userRole.filter((el, index) => {
        if (el === "admin") {
          roleIdx.push(index);
        }
      });
      return roleIdx;
    },

    // call delete methods
    deleteField(idx) {
      let idxRole = this.indexRole();
      let includeIdx = idxRole.includes(idx);
      if (!includeIdx) {
        this.deleteInState(idx);
        this.deleteInLocal(idx);
      }
    },

    //  edit information in localStorage
    registerInLocal() {
      let localData = JSON.parse(localStorage.getItem("users"));
      let foundItem = localData.findIndex((x) => x.id == this.userValues.id);
      localData[foundItem] = this.userValues;
      localStorage.setItem("users", JSON.stringify(localData));
    },

    //  edit information in state
    registerInState() {
      this.editInState(this.userValues);
      this.userValues = {};
    },

    // call edit information methods
    userRegister() {
      try {
        if (this.isEmailExist === true) throw "ایمیل تکراری است";
        this.registerInLocal();
        this.registerInState();
        this.closeModalBtn();
      } catch (error) {
        this.text = error;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.fix {
  position: fixed;
  font-size: 1.3rem;
  width: inherit;
  height: inherit;
}
.list {
  width: 100%;
  height: 100%;
  text-align: center;
  color: #fff;
  background-color: #42b983;

  thead {
    font-size: 1.5rem;
  }
}
.list,
th,
td {
  border: 1px solid #fff;
}
.list {
  border-collapse: collapse;
}
.btn {
  font-family: "IranSANS";
  font-size: 1.2rem;
  width: 6.5rem;
  padding: 1rem 0;
  border: 1px solid #fff;
  color: #fff;
  background-color: transparent;
  cursor: pointer;
  border-radius: 3px;
  outline: none;
}
.form {
  width: 100%;
  height: 100%;
  background-color: #42b983;
  display: flex;
  flex-direction: column;
  padding: 2rem;

  input,
  select,
  .button {
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
    margin-bottom: 0.5rem;
  }
  .button {
    color: #fff;
    margin-top: 2rem;
    border: 1px solid #fff;
    background-color: #42b983;
    cursor: pointer;
  }
}
</style>
