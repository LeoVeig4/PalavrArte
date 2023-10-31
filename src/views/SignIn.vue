<template>
  <div class="container top-0 position-sticky z-index-sticky">
    <div class="row">
      <div class="col-12">
        <navbar isBtn="bg-gradient-light" />
      </div>
    </div>
  </div>
  <main class="main-content mt-0">
    <div
      class="page-header align-items-start min-vh-50 pt-5 pb-11 m-3 border-radius-lg"
      style="
        background-image: url('image/fruit-background.jpg');
        background-position: top;
      "
    >
      <span class="mask bg-gradient-dark opacity-6"></span>
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-5 text-center mx-auto">
            <h1 class="text-white mb-2 mt-5">Bem-vindo!</h1>
            <p class="text-lead text-white">...</p>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row mt-lg-n10 mt-md-n11 mt-n10 justify-content-center">
        <div class="col-xl-4 col-lg-5 col-md-7 mx-auto">
          <div class="card z-index-0">
            <div class="card-header text-center pt-4">
              <h5>Login</h5>
            </div>
            <div class="card-body mt-n4">
              <form role="form" @submit.prevent="login">
                <argon-input
                  type="email"
                  v-model="model.email"
                  placeholder="Email"
                  aria-label="Email"
                />
                <argon-input
                  type="password"
                  v-model="model.senha"
                  placeholder="Senha"
                  aria-label="Senha"
                />
                <!-- <argon-checkbox checked>
                  <label class="form-check-label" for="flexCheckDefault">
                    I agree the
                    <a href="javascript:;" class="text-dark font-weight-bolder">Terms and Conditions</a>
                  </label>
                </argon-checkbox> -->
                <div class="text-center">
                  <argon-button
                    fullWidth
                    color="dark"
                    variant="gradient"
                    class="my-4 mb-2"
                    >Entrar</argon-button
                  >
                </div>
                <p class="text-sm mt-3 mb-0">
                  Esqueceu a
                  <a
                    href="recuperar a senha"
                    class="text-dark font-weight-bolder"
                  >
                    senha?</a
                  >
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
  <app-footer />
</template>

<script>
import Navbar from "@/examples/PageLayout/Navbar.vue";
import AppFooter from "@/examples/PageLayout/Footer.vue";
import api from "@/services/api";
const body = document.getElementsByTagName("body")[0];

export default {
  name: "signin",
  components: {
    Navbar,
    AppFooter,
  },
  data() {
    return {
      model: {
        email: "",
        senha: "",
      },
    };
  },
  methods: {
    async login() {
      try {
        this.$swal.showLoading();
        const { data } = await api.post("/auth/login", this.model);
        this.$swal.close();
        console.log(data);
        this.$store.dispatch("login", data);
        this.$toast.success("Login realizado com sucesso");
        this.$router.push({ name: "Dashboard" });
      } catch (error) {
        this.$toast.error("Erro ao fazer login");
        this.$swal.close();
      }
    },
  },
  created() {
    this.$store.state.hideConfigButton = true;
    this.$store.state.showNavbar = false;
    this.$store.state.showSidenav = false;
    this.$store.state.showFooter = false;
    body.classList.remove("bg-gray-100");
  },
  beforeUnmount() {
    this.$store.state.hideConfigButton = false;
    this.$store.state.showNavbar = true;
    this.$store.state.showSidenav = true;
    this.$store.state.showFooter = true;
    body.classList.add("bg-gray-100");
  },
};
</script>
