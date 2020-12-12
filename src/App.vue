<template>
  <router-view />
</template>

<script>
export default {
  beforeCreate() {
    // add user into localstorage
    this.$store.getters.addUsers;
    // read localStorage and add extra information to the state
    this.$store.getters.checkUsersInLocal;
    // read localStorage and add userLogin inforamtion
    this.$store.getters.checkUserloggedInLocal;
  },
  methods: {}
};
</script>

<style lang="scss">
@font-face {
  font-family: IranSANS;
  src: url("./assets/fonts/IRANSansWeb-FaNum.woff2") format("woff2");
}
* {
  box-sizing: inherit;
}
html {
  font-size: 62.5%;
  box-sizing: border-box;
}
body {
  height: 100vh;
  font-family: "IranSANS";
  direction: rtl;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #42b983;
}
</style>