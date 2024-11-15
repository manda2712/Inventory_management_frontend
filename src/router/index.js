import { createRouter, createWebHistory } from 'vue-router'
import AdminView from '@/views/AdminView.vue'
import UserView from '@/views/UserView.vue'
// import { meta } from '@babel/eslint-parser'
import LoginView from '@/views/LoginView.vue'

const routes = [
  {
    path: '/admin/:component',
    name: 'admin',
    component: AdminView,
    props : true,
    meta: {
      requiresAuth : true,
      role: 'admin'
    }
  },
  {
    path: '/user/:component',
    name : 'user',
    component: UserView,
    props: true,
    meta :{
      requiresAuth : true,
      role: 'user'
    }
  },
  {
    path : "/login",
    name : "login",
    component: LoginView,
  },
  {
    path: '/',
    redirect : {'name' : 'admin', params : {component: 'item'}}, 
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem("auth");
  const userRole = localStorage.getItem("role");

  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: "login" });
  } else if (to.meta.requiresAuth && isAuthenticated) {
    // Pastikan userRole ada sebelum membandingkannya
    if (userRole && to.meta.role !== userRole) {
      alert("You're Not Authorized to Access This Page");
      next(false);
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router
