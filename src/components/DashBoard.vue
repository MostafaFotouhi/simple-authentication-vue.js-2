<template>
  <div class="dashboard">
    <div class="sidebar">
      <div class="logo">لوگو</div>
      <router-link to="/dashboard/add-user-form">داشبورد</router-link>
      <router-link to="/dashboard/user-list">کاربران</router-link>
      <button class="btn" @click="exitOfDashboard">خروج</button>
    </div>
    <div class="content-box">
      <div class="header-box">سلام {{ $store.state.userLogged.name }}</div>
      <div class="content">
        <div class="content-item">
          <transition name="fade-anime" mode="out-in" enter-active-class="animate__animated animate__fadeIn" leave-active-class="animate__animated animate__fadeOut">
            <router-view/>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import json from "../json/primaryUsers.json";
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      // external json file for primary users
      myJson: json,
    };
  },
  methods: {
    ...mapMutations(["addUserToState", "defaultUserlogged"]),

    // delete user logged information of localStorage when user exit of dashboard
    delUserloggedInLocal() {
      localStorage.setItem("userLogged", null);
    },

    // delete user logged information of state when user exit of dashboard
    delUserloggedInState() {
      this.defaultUserlogged();
    },

    // add primary users to state when user exit of dashboard
    updateUsersInState() {
      let users = JSON.parse(this.myJson);
      let userInState = this.$store.state.allUsersList;
      users.forEach((el) => {
        const findUserId = userInState.find((i) => i.id === el.id);
        if (!findUserId) {
          this.addUserToState(el);
        }
      });
    },

    // add primary users to localStorage when user exit of dashboard
    updateUsersInLocal() {
      let users = JSON.parse(this.myJson);
      let localData = JSON.parse(localStorage.getItem("users"));
      users.forEach((el) => {
        const findUserId = localData.find((i) => i.id === el.id);
        if (!findUserId) {
          localData.push(el);
        }
        localStorage.setItem("users", JSON.stringify(localData));
      });
    },

    // exit button of dashboard
    exitOfDashboard() {
      this.updateUsersInLocal();
      this.updateUsersInState();
      this.delUserloggedInLocal();
      this.delUserloggedInState();
      this.$router.push("/sign-in");
    },
  },
};
</script>

<style lang="scss" scoped>

@import "https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css";

.dashboard {
  font-family: "IranSANS";
  position: fixed;
  width: 80rem;
  height: 60rem;
  background-color: #fff;
  box-shadow: 0 0.5rem 2rem rgba($color: #000000, $alpha: 0.1);

  display: flex;
  overflow: hidden;

  .sidebar {
    width: 18rem;
    height: 100%;
    background-color: #42b983;
    border-left: 1px solid #fff;

    .logo {
      font-size: 2.5rem;
      color: #fff;
      height: 6rem;
      display: flex;
      justify-content: center;
      align-items: center;
      border-bottom: 1px solid #fff;
    }
    a,
    .btn {
      text-align: center;
      padding: 2rem;
      border: none;
      border-bottom: 1px solid #fff;
      text-decoration: none;
      color: #fff;
      font-size: 1.8rem;
      display: block;
      font-family: "IranSANS";
      background-color: transparent;
      outline: none;
      cursor: pointer;
    }
    .btn {
      width: 100%;
    }
  }
  .content-box {
    flex: 1;
    position: relative;
    flex-direction: row;
    height: 100%;
    background-color: #fff;
    .header-box {
      font-size: 1.8rem;
      color: #fff;
      padding-right: 2rem;
      height: 6rem;
      background-color: #42b983;
      border-bottom: 1px solid #fff;
      display: flex;
      align-items: center;
    }
    .content {
      width: 100%;
      height: 90%;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;

      .content-item {
        position: fixed;
        width: 50rem;
        height: 40rem;
      }
    }
  }
}
// .rout-enter-from,
// .rout-leave-to {
//   opacity: 0;
// }

// .rout-enter-active,
// .rout-leave-active {
//   transition: all 1s;
// }

// .rout-enter-to,
// .rout-leave-from {
//   opacity: 1;
// }
</style>
