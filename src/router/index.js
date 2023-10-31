import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import Tables from "../views/Tables.vue";
import Billing from "../views/Billing.vue";
import VirtualReality from "../views/VirtualReality.vue";
import RTL from "../views/Rtl.vue";
import Profile from "../views/Profile.vue";
import store from "@/store/index.js";

const routes = [
  //public
  {
    path: "/",
    name: "/",
    redirect: "/dashboard-default",
  },
  {
    path: "/signin",
    name: "SignIn",
    component: () => import("../views/SignIn.vue"),
  },


  //Admin Routes
  {
    path: "/admin",
    redirect: "/admin/dashboard-default",
    beforeEnter(to, from, next) {
      console.log(store.state.auth.token);
      //if (store.state.auth.role === "admin") {
      if (store.state.auth.token) {
        next();
      } else {
        next({ name: "SignIn" });
      }
    },
    component: () => import("../layout/BlankLayout.vue"),
    children: [
      {
        path: "dashboard-default",
        name: "Dashboard",
        component: Dashboard,
      },
      {
        path: "tables",
        name: "Tables",
        component: Tables,
      },
      {
        path: "billing",
        name: "Billing",
        component: Billing,
      },
      {
        path: "virtual-reality",
        name: "Virtual Reality",
        component: VirtualReality,
      },
      {
        path: "rtl-page",
        name: "RTL",
        component: RTL,
      },
      {
        path: "profile",
        name: "Profile",
        component: Profile,
      },

      {
        path: "cadastrar-receita",
        name: "Cadastrar Receita",
        component: () => import("../views/RegisterRecipe.vue"),
      },
      {
        path: "receitas",
        name: "Receitas",
        component: () => import("../views/Recipes.vue"),
      },
      {
        path: "ingredientes",
        name: "Ingredientes",
        component: () => import("../views/Ingredients.vue"),
      },
      {
        path: "cadastro-receita",
        name: "Cadastro Receita",
        component: () => import("../views/RegisterRecipe.vue"),
      },
      {
        path: "receita/:id",
        name: "Receita",
        component: () => import("../views/Recipe/ViewRecipe.vue"),
      },
      {
        path: "nutrition",
        name: "Nutrition",
        component: () => import("@/components/NutritionTable.vue"),
      },
    ],
  },

  //Bolsista Routes
  {
    path: "/bolsista",
    redirect: "/bolsista/dashboard",
    beforeEnter(to, from, next) {
      if (store.state.auth.role === "bolsista") {
        next();
      } else {
        next("/signin");
      }
    },
    component: () => import("../views/SignIn.vue"),
    children: [
      {
        path: "dashboard",
        alias: "dashboard",
        name: "admin_Dashboard",
        meta: { title: "dashboard" },
        component: () => import("../views/SignIn.vue"),
      },
    ],
  },
  //Feirante Routes
  {
    path: "/feirante",
    redirect: "/feirante/dashboard",
    beforeEnter(to, from, next) {
      if (store.state.auth.role === "feirante") {
        next();
      } else {
        next("/signin");
      }
    },
    component: () => import("../views/SignIn.vue"),
    children: [
      {
        path: "dashboard",
        alias: "dashboard",
        name: "admin_Dashboard",
        meta: { title: "dashboard" },
        component: () => import("../views/SignIn.vue"),
      },
    ],
  },
  { path: "/:catchAll(.*)", redirect: "/signin" },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active",
  props: true,
});

router.beforeEach((to, from, next) => {
  const toBaseRoute = ["/", "/signin"].includes(to.fullPath);
  if (toBaseRoute) {
    if (store.state.auth.token) {
      next(`/admin/`);
    } else next();
  } else {
    next();
  }
});
export default router;
