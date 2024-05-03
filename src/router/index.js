import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RegistrationView from "@/views/RegistrationView";
import AuthorizationView from "@/views/AuthorizationView";
import BasketView from "@/views/BasketView";
import OrderCompleted from "@/views/OrderCompleted";
import Order from "@/views/Order";

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
    path: '/orderCompleted',
    name: 'orderCompleted',
    component: OrderCompleted
  },
  {
    path: '/authorization',
    name: 'authorization',
    component: AuthorizationView
  },
  {
    path: '/order',
    name: 'order',
    component: Order
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
