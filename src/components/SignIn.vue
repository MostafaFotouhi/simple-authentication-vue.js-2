<template>
  <div class="card">
    <h3 class="text-header">صفحه ورود</h3>
    <ValidationObserver v-slot="{ handleSubmit }">
      <form action="#" @submit.prevent="handleSubmit(signIn)">
        <ValidationProvider
          name="Name"
          rules="required|alpha"
          v-slot="{ errors }"
        >
          <label for="username">نام</label>
          <input type="text" id="name" v-model="name" />
          <span style="color:red">{{ errors[0] }}</span
          ><br />
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
            v-model="password"
            autocomplete="on"
          />
          <span style="color:red">{{ errors[0] }}</span>
        </ValidationProvider>
        <input type="submit" class="btn" @click="signIn" value="ورود" />
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // username & password for validation
      name: "",
      password: "",
    };
  },
  methods: {
    // get and send userLogged data to state
    getUserlogged() {
      let user = this.$store.state.allUsersList;
      const userLog = user.find((n) => n.name === this.name);
      localStorage.setItem("userLogged", JSON.stringify(userLog));
      this.$store.commit("updateUserLogin", userLog);
    },

    // validation username and password
    signIn() {
      const users = this.$store.state.allUsersList;
      const name = users.find((n) => n.name === this.name);
      const pass = users.find((p) => p.password === this.password);
      if (name && pass) {
        this.getUserlogged();
        this.$router.push("/dashboard/add-user-form");
      } else {
        alert("مقادیر وارد شده اشتباه است");
        this.password = "";
        return false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.card {
  font-family: "IranSANS";
  width: 40rem;
  height: 50rem;
  background-color: #fff;
  border-radius: 0.5rem;
  box-shadow: 0 0.5rem 2rem rgba($color: #000000, $alpha: 0.1);
  display: flex;
  flex-direction: column;
  padding: 0 5rem;

  .text-header {
    background-image: linear-gradient(to left, #42b983, #72cda4);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-align: center;
    font-size: 3rem;
    margin: 7rem 0 6rem;
  }
  label {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
  }
  input {
    font-family: "IranSANS";
    width: 100%;
    padding: 1rem;
    margin-bottom: 1rem;
    outline: none;
  }
  .btn {
    width: 100%;
    font-family: "IranSANS";
    font-size: 1.6rem;
    font-weight: 700;
    background-color: #42b983;
    border: 1px solid #42b983;
    color: #fff;
    padding: 1.3rem;
    border-radius: 3px;
    margin-top: 3rem;
    cursor: pointer;
    outline: none;
  }
}
</style>
