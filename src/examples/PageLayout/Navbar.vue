<template>
  <!-- Navbar -->
  <nav class="navbar navbar-expand-lg top-0 z-index-3 position-absolute mt-4"
    :class="isBlur ? isBlur : 'shadow-none my-2 navbar-transparent w-100'">
    <div class="container ps-2 pe-0">
      <router-link class="navbar-brand font-weight-bolder ms-lg-0 ms-3" :class="darkMode ? 'text-black' : 'text-white'"
        to="/">PalavrArte</router-link>
      <button class="shadow-none navbar-toggler ms-2" type="button" data-bs-toggle="collapse" data-bs-target="#navigation"
        aria-controls="navigation" aria-expanded="false" aria-label="Toggle navigation">
        <span class="mt-2 navbar-toggler-icon">
          <span class="navbar-toggler-bar bar1"></span>
          <span class="navbar-toggler-bar bar2"></span>
          <span class="navbar-toggler-bar bar3"></span>
        </span>
      </button>
      <div class="collapse navbar-collapse" id="navigation">
        <ul class="navbar-nav mx-auto">
          <li class="nav-item">
            <router-link class="nav-link d-flex align-items-center me-2 active" active-class="activated"
              aria-current="page" to="/home">
              <i class="fa fa-spa opacity-6 me-1 icon-color" aria-hidden="true"
                :class="isBlur ? 'text-dark' : 'text-white'"></i>
              Home
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link me-2" to="/competicoes" active-class="activated">
              <i class="fas fa-table opacity-6 me-1" aria-hidden="true" :class="isBlur ? 'text-dark' : 'text-white'"></i>
              Competições abertas
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link me-2" to="/quintal" active-class="activated">
              <i class="fas fa-cloud opacity-6 me-1" aria-hidden="true" :class="isBlur ? 'text-dark' : 'text-white'"></i>
              Quintal de Textos
            </router-link>
          </li>
        </ul>
        <ul class="navbar-nav d-lg-block d-none">
          <li class="nav-item">
            <router-link v-if="$store.state.role === 'ESCOLA' || true" to="/cadastrar/avaliador"
              class="btn btn-sm mb-0 me-2" :class="isBtn">
              cadastrar
              avaliador</router-link>
            <router-link v-if="$store.state.role === undefined" to="/signin" class="btn btn-sm mb-0 me-1"
              :class="isBtn">Login</router-link>
            <div v-else to="/signin" class="btn btn-sm mb-0" :class="isBtn" @click="deslogar">logout</div>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <!-- End Navbar -->
</template>

<script>
import downArrWhite from "@/assets/img/down-arrow-white.svg";
import downArrBlack from "@/assets/img/down-arrow-dark.svg";

export default {
  name: "navbar",
  data() {
    return {
      downArrWhite,
      downArrBlack,

    };
  },
  methods: {
    isActive(route) {
      return this.$route.path === route;
    },
    async deslogar() {
      this.$store.dispatch('logout');
      this.$router.push('/signin');
      console.log(this.$store.state.role, this.$store.state.idUsuario)
    }
  },
  props: {
    btnBackground: String,
    isBlur: String,
    isBtn: { type: String, default: "bg-gradient-light" },
    darkMode: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    darkModes() {
      return {
        "text-dark": this.darkMode
      };
    }
  }
};
</script>
<style>
.activated {
  background-color: #dcdcdc !important;
  border-radius: 10px;
  color: #000 !important;
  margin: 0px;
  padding: 0px;
}

.activated i {
  color: #000 !important;
}
</style>