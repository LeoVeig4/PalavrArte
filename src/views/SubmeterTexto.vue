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
            <argon-input label="Titulo do Texto" v-model="model.titulo" />
            <quill-editor v-model:value="model.texto" :options="editorEdittable">
            </quill-editor>
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

import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

import { quillEditor } from 'vue3-quill'
export default {
    name: "signin",
    components: {
        TextoCard,
        ConcursoCard,
        Navbar,
        AppFooter,
        quillEditor
    },
    data() {
        return {
            texto: [],
            textoMostrado: {},
            model: {
                "idConcurso": 0,
                "idAluno": this.$store.state.idUsuario,
                "titulo": "",
                "texto": ""
            },
            editorEdittable: {
                placeholder: "Escreva aqui as o seu texto"
            },
            badge: ['badge-primary', 'badge-dark', 'badge-success', 'badge-danger', 'badge-info', 'badge-dark']
        };
    },
    async mounted() {
        await this.loadTextos();
    },
    methods: {

        async loadTexto() {
            try {
                //const { data } = await api.get(`/concurso/get-lista-textos/${this.$route.params.idConcurso}/avaliador/${this.$store.state.idUsuario}`);
                const data = {
                    "idConcursoSubmissao": 1,
                    "titulo": "O Despertar da Imaginação",
                    "texto": "<strong>Lorem ipsum dolor</strong> sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing eli Lorem ipsum dolor sit amet, consectetur adipiscing eli Lorem ipsum dolor sit amet, consectetur adipiscing eli Lorem ipsum dolor sit amet, consectetur adipiscing eli Lorem ipsum dolor sit amet, consectetur adipiscing eli Lorem ipsum dolor sit amet, consectetur adipiscing eli Lorem ipsum dolor sit amet, consectetur adipiscing eli Lorem ipsum dolor sit amet, consectetur adipiscing eli Lorem ipsum dolor sit amet, consectetur adipiscing eli Lorem ipsum dolor sit amet, consectetur adipiscing eli Lorem ipsum dolor sit amet, consectetur adipiscing eli",
                    "jaAvaliou": false
                }
                this.texto = data.filter(item => item.jaAvaliou == false);
                if (this.texto.length == 0) {
                    this.$toast.error("Você já avaliou todos os textos desse concurso");
                    this.$router.back()
                }
                this.textoMostrado = this.texto[0];
            } catch (error) {
                console.log(error);
            }
        },
        async submit() {
            try {
                this.$swal.showLoading();
                const { data } = await api.post("/concurso/avaliar", this.model);
                this.$swal.close();
                this.texto.shift()
                this.$toast.success("avaliacao realizada com sucesso");
                if (this.texto.length > 0)
                    this.textoMostrado = this.texto[0];
                else
                    this.$router.push('/home');
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