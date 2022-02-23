import { createRouter, createWebHistory } from 'vue-router'
import store from '../store/index'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/auth',
    name: 'Auth',
    component: () => {
      return import('../views/Auth.vue')
    }
  },
  {
    path: '/auth/register',
    name: 'Register',
    component: () => {
      return import('../components/auth/Register.vue')
    },
    meta: {
      requiresGuest: true
    }
  },
  {
    path: '/auth/login',
    name: 'Login',
    component: () => {
      return import('../components/auth/Login.vue')
    },
    meta: {
      requiresGuest: true
    }
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => {
      return import('../views/Cart.vue')
    },
    redirect: '/cart/cart',
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: 'cart',
        name: 'Cart',
        component: () => {
          return import('../components/cart/Cartcart.vue')
        },
      },
      {
        path: 'favorite',
        name: 'Favorite',
        component: () => {
          return import('../components/cart/Cartfavorite.vue')
        },
      }
    ]
  },
  {
    path: '/products',
    name: 'ProductList',
    component: () => {
      return import('../views/ProductList.vue')
    }
  },
  {
    path: '/products/tshirt',
    name: 'Tshirt',
    component: () => {
      return import('../views/ProductList.vue')
    }
  },
  {
    path: '/products/jacket',
    name: 'Jacket',
    component: () => {
      return import('../views/ProductList.vue')
    }
  },
  {
    path: '/products/casual',
    name: 'Casual',
    component: () => {
      return import('../views/ProductList.vue')
    }
  },
  {
    path: '/product',
    name: 'Product',
    component: () => {
      return import('../components/product/Product.vue')
    }
  },
  {
    path: '/product/:id',
    name: 'Product',
    component: () => {
      return import('../components/product/Product.vue')
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters['Auth/isLogIn']) {
      next({ path: '/auth/login' })
    } else {
      next();
    }
  } else if (to.matched.some(record => record.meta.requiresGuest)) {
    if (store.getters['Auth/isLogIn']) {
      next({ path: '/' })
    } else {
      next();
    }
  } else {
    next();
  }
})

export default router
