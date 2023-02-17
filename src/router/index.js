import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: () => import("../views/FrontLayout.vue"),
      children: [
        {
          path: "",
          name: "home",
          component: () => import("../views/front/HomeView.vue"),
        },
        {
          path: "about",
          name: "about",
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import("../views/front/AboutView.vue"),
        },
        {
          path: "products",
          component: () => import("../views/front/ProductsView.vue"),
        },
        {
          path: "product/:id",
          component: () => import("../views/front/ProductView.vue"),
        },
        {
          path: "cart",
          component: () => import("../views/front/CartView.vue"),
        },
        {
          path: "login",
          component: () => import("../views/front/LoginView.vue"),
        },
      ],
    },
    {
      path: "/admin",
      component: () => import("../views/DashboardView.vue"),
      children: [
        {
          path: "products",
          component: () => import("../views/admin/AdminProducts.vue"),
        },
        {
          path: "orders",
          component: () => import("../views/admin/AdminOrders.vue"),
        },
      ],
    },
  ],
});

export default router;
