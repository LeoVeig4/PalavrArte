<template>
  <div class="container top-0 position-relative z-index-3">
    <div class="row">
      <div class="col-12">
        <navbar isBtn="bg-gradient-light" />
      </div>
    </div>
  </div>
  <main class="main-content mt-0">
    <div class="page-header align-items-start vh-100 pt-5 pb-11 m-3 border-radius-lg test">
      <span class="mask bg-gradient-dark opacity-6"></span>
    </div>
    <div class="card container p-3 maracutaia col-lg-5">
      <div class="row d-flex justify-content-center">
        <div class="text-center">
          <h1 class="text-lead mt-4">Concurso: {{ concurso.nome }}</h1>

          <div class=" mx-auto">
            <label>Descrição do concurso: </label><span class="ms-2">{{ concurso.descricao }}</span>
          </div>
          <div class=" mx-auto">
            <label>Observações: </label><span class="ms-2">{{ concurso.observacoes }}</span>
          </div>
          <div class=" mx-auto">
            <label>Status: </label><span class="ms-2">{{ concurso.status }}</span>

          </div>
          <div class=" mx-auto">
            <label>Data início: </label><span class="ms-2">{{ concurso.dataInicio }}</span>

          </div>
          <div class=" mx-auto">
            <label>Data Fim: </label><span class="ms-2">{{ concurso.dataFim }}</span>

          </div>
          <div class=" mx-auto">
            <label>Categoria: </label><span class="ms-2">{{ concurso.categoria
            }}</span>
          </div>

          <div class=" mx-auto">
            <label>Requisitos: </label><span class="ms-2">{{ concurso.requisitos || "Não há requisitos" }}</span>
          </div>

          <!-- <div class=" mx-auto">
            <label>Avaliadores: </label>
            <span v-for="avaliador in concurso.avaliadores" class="badge badge-pill ms-1" style="color:black;">
              {{ avaliador.nome }}</span>
          </div> -->
        </div>
        <div class="mt-5 text-center">
          <router-link v-if="$store.state.role === 'ALUNO'" class="mx-auto btn btn-primary"
            :to="`/competicoes/${$route.params.id}/inscricao`">Inscrever-se</router-link>
          <router-link v-if="$store.state.role === 'ESCOLA'" class="mx-auto mx-auto btn btn-primary"
            :to="`/competicoes/${$route.params.id}/editar`">Editar</router-link>
          <argon-button v-if="$store.state.role === 'ESCOLA' && concurso.status != 'Encerrado'" color="warning"
            class="mx-auto btn" @click="fechar">fechar
            concurso</argon-button>
          <router-link v-if="$store.state.role === 'AVALIADOR'" class="mx-auto mx-auto btn btn-primary"
            :to="`/competicoes/${$route.params.id}/corrigir`">Corrigir</router-link>
        </div>
      </div>
    </div>
    <div class="align-items-start pt-5 pb-11 m-3 border-radius-lg test2">
      <div class="mt-10">
        <h1 class="text-white text-center">Textos para se inspirar</h1>
        <div class="d-flex flex-wrap justify-content-center align-items-center mt-7">
          <texto-card :index="index" :finalizou="true" class="col-md-4  col-10" :texto="texto"
            v-for="(texto, index) in textos" />
        </div>
      </div>
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
  name: "competicoes",
  components: {
    TextoCard,
    ConcursoCard,
    Navbar,
    AppFooter,
  },
  data() {
    return {
      concurso: {
        nome: "",
        descricao: "",
        status: "",
        dataInicio: "",
        dataFim: "",
        categoria: "",
        requisitos: "",
        avaliadores: [],
      },
      textos: [],
    }
  },
  async mounted() {
    await this.loadConcurso();
  },
  methods: {
    async fechar() {
      try {
        const url = `/concurso/encerrar/${this.$route.params.id}`
        const { data } = await api.get(url);
      } catch (error) {
        console.log(error);
      }
    },
    async loadConcurso() {
      try {
        const url = `/concurso/${this.$route.params.id}`
        const { data } = await api.get(url);
        this.concurso = data;
        this.textos = data.submissoes;
      } catch (error) {
        console.log(error);
      }
    }
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
.test {
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.0)), url('../../public/image/book_spiral.jpg');
  background-position: top;
  background-size: cover;
}

.test2 {
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.0)), url('../../public/image/book_brain.jpg');
  background-position: top;
  background-size: cover;
}

.maracutaia2 {
  margin-top: -100px;
}

.maracutaia {
  margin-top: -600px;
  margin-bottom: 100px;
}
</style>