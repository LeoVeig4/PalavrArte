<template>
    <div class="container top-0 position-relative z-index-3">
        <div class="row">
            <div class="col-12">
                <navbar isBtn="bg-gradient-light" />
            </div>
        </div>
    </div>
    <main class="main-content mt-0">
        <div class="page-header align-items-start vh-100 pt-5 pb-11 m-3 border-radius-lg" style="
          background-image: linear-gradient(rgba(0, 0, 0, 0.69),rgba(0, 0, 0, 0)) , url('/image/book_shelf.jpg');
          background-position: top; background-size: cover;
        ">
            <span class="mask bg-gradient-dark opacity-6"></span>
            <div class="container">
                <div class="row justify-content-center">
                    <div class="text-center col-lg-5">
                        <img src="/favicon.png" class="header-image mt-5" />
                    </div>
                </div>
            </div>
        </div>

        <div class="card container texto-css">
            <h3 class="my-3"> Texto </h3>
            <hr class="my-4" />
            <p class="badge badge-success badge-pill ms-1">
                <strong>Nome do Autor:</strong> {{ inscricao.nome }}
            </p>
            <p class="badge badge-primary badge-pill ms-1">
                {{ texto.categoria }}</p>
            <p class="badge badge-info badge-pill ms-1">
                {{ texto.nota }}</p>
            <hr class="my-4" />

            <h1>{{ texto.titulo_obra }}</h1>
            <p v-html="texto.texto"></p>

        </div>
    </main>
    <app-footer />
</template>
  
<script>
import TextoCard from "@/components/Texto/TextoCard.vue";
import ConcursoCard from "@/components/Concurso/ConcursoCard.vue";
import Navbar from "@/examples/PageLayout/Navbar.vue";
import AppFooter from "@/examples/PageLayout/Footer.vue";
import api from "@/services/api";
const body = document.getElementsByTagName("body")[0];

export default {
    name: "signin",
    components: {
        TextoCard,
        ConcursoCard,
        Navbar,
        AppFooter,
    },
    data() {
        return {
            texto: {},
            inscricao: {},
            badge: ['badge-primary', 'badge-dark', 'badge-success', 'badge-danger', 'badge-info', 'badge-dark']
        };
    },
    async mounted() {
        await this.loadTexto();
    },
    methods: {

        async loadTexto() {
            try {
                //const { data } = await api.get("/textos");
                const data = {
                    "inscricao": {
                        "nome": "Nome Completo",
                        "idade": 25,
                        "email": "exemplo@email.com",
                        "telefone": "(11) 98765-4321",
                        "endereco": "",
                        "Observacoes": "eu sou da escola tal"
                    },
                    "id": 1,
                    "titulo_obra": "O Despertar da Imaginação",
                    "texto": "<strong>Lorem ipsum dolor</strong> sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing eli Lorem ipsum dolor sit amet, consectetur adipiscing eli Lorem ipsum dolor sit amet, consectetur adipiscing eli Lorem ipsum dolor sit amet, consectetur adipiscing eli Lorem ipsum dolor sit amet, consectetur adipiscing eli Lorem ipsum dolor sit amet, consectetur adipiscing eli Lorem ipsum dolor sit amet, consectetur adipiscing eli Lorem ipsum dolor sit amet, consectetur adipiscing eli Lorem ipsum dolor sit amet, consectetur adipiscing eli Lorem ipsum dolor sit amet, consectetur adipiscing eli Lorem ipsum dolor sit amet, consectetur adipiscing eli",
                    "nota": 9.5,
                    "categoria": "ficção"
                }
                this.texto = data;
                this.inscricao = data.inscricao;
            } catch (error) {
                console.log(error);
            }
        },
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
  
<style scoped>
.texto-css {
    min-width: 350px;
    margin-top: -400px;
    max-height: 600px;
    overflow-y: scroll;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
}

.header-image {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    margin-bottom: 20px;
}

.text-decorado {
    color: #ffefc8;
    font-size: 35px;
}
</style>