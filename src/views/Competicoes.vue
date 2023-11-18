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
        background-image: linear-gradient(rgba(0, 0, 0, 0.5),rgba(0, 0, 0, 0.0)) , url('image/book_spiral.jpg');
        background-position: top; background-size: cover;
      ">
      <span class="mask bg-gradient-dark opacity-6"></span>
      <div class="container">
        <div class="row justify-content-center">
          <div class="text-center col-lg-5">
            <img src="/favicon.png" class="header-image mt-5" />
            <h1 class="text-lead text-white mt-4">A ciência descreve as coisas como são; a arte, como são sentidas, como
              se
              sente que são.</h1>
            <p class="float-end"><a class="link-decoration fw-bold" target="_blank"
                href="https://www.ebiografia.com/fernando_pessoa/">Fernando Pessoa</a></p>
            <div v-if="$store.state.role === 'ESCOLA'" class="mt-5">
              <argon-button class="mx-auto" @click="$router.push('competicoes/novo')">Cadastrar Novo
                Concurso</argon-button>
            </div>

          </div>
        </div>
      </div>
    </div>

    <div class="d-flex flex-wrap justify-content-center">
      <concurso-card :index="index" :concurso="concurso" v-for="(concurso, index) in concursos" />
    </div>
    <div class="align-items-start vh-100 pt-7 m-3 border-radius-lg" style="
    background-image: linear-gradient(rgba(0, 0, 0, 0.5),rgba(0, 0, 0, 0.0)) , url('image/old-books.jpg');
    background-position: top; background-size: cover;
  ">
      <div class="container">
        <h1 class="text-center text-white mb-6">Minhas competições</h1>
        <div class="d-flex flex-wrap justify-content-center">
          <concurso-card :index="index" :concurso="concurso" v-for="(concurso, index) in concursos" customClass="" />
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
      concursos: [],
      textos: [],
      badge: ['badge-primary', 'badge-dark', 'badge-success', 'badge-danger', 'badge-info', 'badge-dark']
    };
  },
  async mounted() {
    await this.loadConcursos();
    await this.loadTextos();
  },
  methods: {
    async loadConcursos() {
      try {
        //const { data } = await api.get("/concursos");
        const data = [{
          "nome": "Concurso de Escrita Criativa 2023",
          "descricao": "Uma competição para escritores de todas as idades e estilos literários.",
          "observacoes": "O concurso é realizado anualmente desde 2015.",
          "data_inicio": "2023-06-01",
          "data_fim": "2023-08-31",
          "categoria": ["Ficção", "Outro"],
          "premio": "Prêmio em dinheiro de R$ 5.000,00",
          "requisitos": [
            "Idade mínima de 18 anos",
            "Texto inédito e original",
            "Máximo de 2.000 palavras"
          ],
          "avaliacao": "Os textos serão avaliados por um painel de jurados experientes no campo literário.",
          "contato": {
            "email": "contato@concursodeescrita2023.com",
            "telefone": "(11) 98765-4321"
          }
        }
        ]
        this.concursos = data;
      } catch (error) {
        console.log(error);
      }
    },
    async loadTextos() {
      try {
        //const { data } = await api.get("/textos");
        const data = [{
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
          "texto": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing eli Lorem ipsum dolor sit amet, consectetur adipiscing eli Lorem ipsum dolor sit amet, consectetur adipiscing eli Lorem ipsum dolor sit amet, consectetur adipiscing eli Lorem ipsum dolor sit amet, consectetur adipiscing eli Lorem ipsum dolor sit amet, consectetur adipiscing eli Lorem ipsum dolor sit amet, consectetur adipiscing eli Lorem ipsum dolor sit amet, consectetur adipiscing eli Lorem ipsum dolor sit amet, consectetur adipiscing eli Lorem ipsum dolor sit amet, consectetur adipiscing eli Lorem ipsum dolor sit amet, consectetur adipiscing eli",
          "nota": 9.5,
          "categoria": ["Ficção", "Outro"]
        }]
        this.textos = data;
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
.link-decoration {
  color: #e9ab0d;
}

.link-decoration:link {
  text-decoration: none;
}

.link-decoration:visited {
  text-decoration: none;
}

.link-decoration:hover {
  text-decoration: none;
  color: #ffb700;
}

.link-decoration:active {
  text-decoration: underline;
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