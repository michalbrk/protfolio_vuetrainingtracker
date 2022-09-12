import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue"
import Register from "../views/Register.vue"
import Create from "../views/Create.vue"
import ViewTraining from "../views/ViewTraining.vue"
import { supabase } from "../supabase/init"

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      title: "Hone",
      auth: false
    }
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      title: "Login",
      auth: false
    }
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: {
      title: "Register",
      auth: false
    }
  },
  {
    path: "/create",
    name: "Create",
    component: Create,
    meta: {
      title: "Create",
      auth: true
    }
  },
  {
    path: "/view-training/:trainingId",
    name: "View-Training",
    component: ViewTraining,
    meta: {
      title: "View Training",
      auth: false
    }
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | Active Tracker`
  next()
}) 

router.beforeEach(async (to, from, next) => {
  const user = await supabase.auth.user()
  if(to.matched.some(res => res.meta.auth)) {
    if(user) {
      next()
      return
    }
    next({ name: 'Login' })
    return
  }
  next()
})


export default router;
