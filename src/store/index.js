import { createStore } from "vuex";
import { auth } from '@/store/auth'

const getRole = localStorage.getItem('@ROLE') || undefined
const getUserId = localStorage.getItem('@USER_ID') || undefined
export default createStore({
  modules: {
    auth: auth
  },
  state: {
    hideConfigButton: false,
    isPinned: true,
    showConfig: false,
    sidebarType: "bg-white",
    isRTL: false,
    mcolor: "",
    darkMode: false,
    isNavFixed: false,
    isAbsolute: false,
    showNavs: true,
    showSidenav: true,
    showNavbar: true,
    showFooter: true,
    showMain: true,
    layout: "default",

    idUsuario: getUserId,
    role: getRole,
  },
  mutations: {
    storeId(state, id) {
      state.idUsuario = id
      localStorage.setItem('@USER_ID', id)
    },
    dropId(state) {
      state.idUsuario = undefined
      localStorage.removeItem('@USER_ID')
    },
    storeRole(state, role) {
      state.role = role
      localStorage.setItem('@ROLE', role)
    },
    dropRole(state) {
      state.role = undefined
      localStorage.removeItem('@ROLE')
    },
    toggleConfigurator(state) {
      state.showConfig = !state.showConfig;
    },
    navbarMinimize(state) {
      const sidenav_show = document.querySelector(".g-sidenav-show");

      if (sidenav_show.classList.contains("g-sidenav-hidden")) {
        sidenav_show.classList.remove("g-sidenav-hidden");
        sidenav_show.classList.add("g-sidenav-pinned");
        state.isPinned = true;
      } else {
        sidenav_show.classList.add("g-sidenav-hidden");
        sidenav_show.classList.remove("g-sidenav-pinned");
        state.isPinned = false;
      }
    },
    sidebarType(state, payload) {
      state.sidebarType = payload;
    },
    navbarFixed(state) {
      if (state.isNavFixed === false) {
        state.isNavFixed = true;
      } else {
        state.isNavFixed = false;
      }
    }
  },
  actions: {
    toggleSidebarColor({ commit }, payload) {
      commit("sidebarType", payload);
    }
  },
  getters: {},
  actions: {
    login({ commit }, data) {
      commit('storeRole', data.categoria)
      commit('storeId', data.idUsuario)
    },
    logout({ commit }) {
      commit('dropRole')
      commit('dropId')
    },
  },
});
