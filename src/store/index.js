import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // initial information
    users: [
      {
        id: 1,
        name: "mostafa",
        email: "mostafa@gmail.com",
        role: "user",
        password: "12345",
      },
      {
        id: 2,
        name: "amir",
        email: "amir@gmail.com",
        role: "admin",
        password: "12345",
      },
      {
        id: 3,
        name: "ali",
        email: "ali@gmail.com",
        role: "user",
        password: "12345",
      },
    ],

    // new users + primary users
    allUsersList: [],

    // user enter to dashboard var
    userLogged: null,
  },
  getters: {
    // set initial information to localStorage
    checkUsersInLocal(state) {
      const usersInState = state.allUsersList;
      let userInLocal = JSON.parse(localStorage.getItem("users"));
      if (userInLocal === null) {
        userInLocal = localStorage.setItem(
          "users",
          JSON.stringify(usersInState)
        );
        // check dup information
      } else {
        const existId = usersInState.map((i) => i.id);
        userInLocal.forEach((el) => {
          if (!existId.includes(el.id)) {
            usersInState.push(el);
          }
        });
      }
    },

    // check userLogin information of localStorage
    checkUserloggedInLocal(state) {
      let userLogin = state.userLogged;
      let userInLocal = JSON.parse(localStorage.getItem("userLogged"));
      if (userInLocal === null) {
        userInLocal = localStorage.setItem(
          "userLogged",
          JSON.stringify(userLogin)
        );
      } else {
        state.userLogged = { ...userInLocal };
      }
    },
    addUsers(state) {
      const usersInState = state.users;
      let userInLocal = JSON.parse(localStorage.getItem("users"));
      if (userInLocal === null) {
        state.allUsersList = [...usersInState];
      } else {
        state.allUsersList = [...userInLocal];
      }
    },
  },
  mutations: {
    // update user enter to dashboard var
    updateUserLogin(state, data) {
      state.userLogged = data;
    },

    // add user data to state
    addUserToState: (state, data) => {
      state.allUsersList.push(data);
    },

    defaultUserlogged(state) {
      let userLogin = state.userLogged;
      userLogin.id = null;
    },

    deleteUserInState(state, index) {
      let allUsers = state.allUsersList;
      allUsers.splice(index, 1);
    },

    // edit user in edit form at UserList component
    editInState(state, data) {
      let foundItem = state.allUsersList.findIndex((x) => x.id == data.id);
      state.allUsersList[foundItem] = data;
    },
  },
});
