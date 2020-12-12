import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import SignIn from "../components/SignIn.vue";
import DashBoard from "../components/DashBoard.vue";
import AddUserForm from "../components/AddUserForm.vue";
import UserList from "../components/UserList.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/sign-in",
    name: "Home",
    component: Home,
  },
  {
    path: "/sign-in",
    name: "SignIn",
    component: SignIn,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: DashBoard,
    meta: { requiresLogin: true },
    children: [
      { path: "add-user-form", component: AddUserForm },
      { path: "user-list", component: UserList },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

// Router Guard
router.beforeEach((to, from, next) => {
  if (
    to.meta.requiresLogin &&
    JSON.parse(localStorage.getItem("userLogged")) == null
  ) {
    next("/sign-in");
  } else {
    next();
  }
});

export default router;
