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
    redirect: "/signin",
  },
  {
    path: "/signin",
    name: "SignIn",
    component: () => import("../views/SignIn.vue"),
  },
  {
    path: "/signup",
    name: "SignUp",
    component: () => import("../views/SignUp.vue"),
  },
  {
    path: "/home",
    name: "Home",
    component: () => import("../views/Home.vue"),
  },
  {
    path: "/quintal",
    name: "Quintal_de_Textos",
    component: () => import("../views/Quintal.vue"),
  },
  {
    path: "/competicoes",
    name: "Competições_abertas",
    component: () => import("../views/Competicoes.vue"),
  },
  {
    path: "/competicoes/:id",
    name: "Competições_ver",
    component: () => import("../views/ConcursoVer.vue"),
  },
  {
    path: "/competicoes/novo",
    name: "Concurso_novo",
    component: () => import("../views/ConcursoForm.vue"),
  },
  {
    path: "/cadastrar/avaliador",
    name: "Concurso_editar",
    component: () => import("../views/CadastraAvaliador.vue"),
  },
  {
    path: "/inscricao/:id",
    name: "Inscricao",
    component: () => import("../views/Inscricao.vue"),
  },
  {
    path: "/texto/:id",
    name: "Ler_Texto",
    component: () => import("../views/Texto.vue"),
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
