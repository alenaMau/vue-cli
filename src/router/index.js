import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RegistrationView from "@/views/RegistrationView";
import AuthorizationView from "@/views/AuthorizationView";
import BasketView from "@/views/BasketView";

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/reg',
    name: 'reg',
    component: RegistrationView
  },
  {
    path: '/basket',
    name: 'basket',
    component: BasketView
  },
  {
    path: '/authorization',
    name: 'authorization',
    component: AuthorizationView
  },
  {
    path: '/about',
    name: 'about',
    component: function () {
      return import('../views/AboutView.vue')
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
