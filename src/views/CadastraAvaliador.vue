<template>
    <div class="container top-0 position-relative z-index-3">
        <div class="row">
            <div class="col-12">
                <navbar isBtn="bg-gradient-light" />
            </div>
        </div>
    </div>
    <main class="main-content mt-0">
        <div class="page-header align-items-start pt-5 pb-11 m-3 border-radius-lg" style="
          background-image: linear-gradient(rgba(0, 0, 0, 0.529),rgba(0, 0, 0, 0)) , url('/image/books.jpg');
          background-position: top;background-size: cover;
        ">
            <span class="mask bg-gradient-dark opacity-6"></span>
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-lg-5 text-center mx-auto">
                        <h1 class="text-white mb-2 mt-5">Bem-vindo!</h1>
                        <p class="text-lead text-white">...</p>
                    </div>
                    <div class="row mt-7 justify-content-center">
                        <div class="col-xl-4 col-lg-5 col-md-7 mx-auto">
                            <div class="card z-index-0 shadow-lg">
                                <div class="card-header text-center pt-4">
                                    <h5>Cadastro de Avaliador</h5>
                                </div>
                                <div class="card-body mt-n4">
                                    <form role="form" @submit.prevent="login">
                                        <argon-input v-model="model.nome" placeholder="Nome" aria-label="Nome" />
                                        <argon-input type="email" v-model="model.email" placeholder="Email"
                                            aria-label="Email" />
                                        <argon-input type="password" v-model="model.senha" placeholder="Senha"
                                            aria-label="Senha" />
                                        <div class="text-center">
                                            <argon-button fullWidth color="dark" variant="gradient"
                                                class="my-4 mb-2">Cadastrar Usuario</argon-button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
    <app-footer class="mt-n4 index" />
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
                nome: "",
                email: "",
                senha: "",
                categoria: "AVALIADOR"
            },
        };
    },
    methods: {
        async login() {
            try {
                this.$swal.showLoading();
                const { data } = await api.post("/usuario/cadastrar", this.model);
                this.$swal.close();
                this.$toast.success("Cadastro realizado com sucesso");
                this.$router.push('/signin');
            } catch (error) {
                console.log(error)
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
  
<style>
.index {
    z-index: 999 !important;
}
</style>
  