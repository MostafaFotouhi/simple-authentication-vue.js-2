<template>
  <div class="home">
    <sign-in />
  </div>
</template>

<script>
import SignIn from "../components/SignIn.vue";
export default {
  name: SignIn ,
  components: { SignIn }
}
</script>

<style lang="scss" scoped>
a {
  color: #42b983;
  font-family: "IranSANS";
  font-size: 1.3rem;
  text-decoration: none;
  background-color: #fff;
  border: none;
  padding: 1rem 1.5rem;
  border-radius: 0.5rem;
  cursor: pointer;
}
</style>
