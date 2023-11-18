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
          <h1 class="text-lead mt-4">Cadastro de Concurso</h1>
          <div class="mx-auto">
            <argon-input label="Nome do concurso*" placeholder="Ex: Concurso da Feira do Livro" v-model="model.nome" />
          </div>
          <div class=" mx-auto">
            <argon-input label="Descrição do concurso">
              <template #customInput>
                <textarea rows="3" class="form-control" placeholder="Descreva os detalhes do concurso"
                  v-model="model.descricao">
                          </textarea>
              </template>
            </argon-input>
          </div>

          <!-- <div class=" mx-auto">
            <argon-input label="Status">
              <template #customInput>
                <select class="form-select" v-model="model.status">
                  <option v-for="statu in status" :value="statu.id">
                    {{ statu.nome }}</option>
                </select>
              </template>
            </argon-input>
          </div> -->
          <div class=" mx-auto">
            <argon-input type="date" addon-left-icon="ni ni-calendar-grid-58" placeholder="Data início"
              input-classes="form-control" v-model="model.dataInicio" />
          </div>
          <div class=" mx-auto">
            <argon-input type="date" addon-left-icon="ni ni-calendar-grid-58" placeholder="Data Fim"
              input-classes="form-control" v-model="model.dataFim" />
          </div>
          <div class=" mx-auto">
            <argon-input label="Categoria">
              <template #customInput>
                <select class="form-select" v-model="model.idConcursoCategoria">
                  <option v-for="categoria in categorias" :value="categoria.idConcursoCategoria">
                    {{ categoria.descricao }}</option>
                </select>
              </template>
            </argon-input>
          </div>
          <div class=" mx-auto">
            <argon-input label="Avaliadores">
              <template #customInput>
                <select class="form-select" v-model="avaliadorSelecionado">
                  <option v-for="avaliador in avaliadores" :value="avaliador">
                    {{ avaliador.nome }}</option>
                </select>
                <argon-button class="float-end" @click="adicionarAvaliador">Adicionar</argon-button>
                <div class="mt-5">
                  <span v-for="avaliador in model.idUsuarioAvaliadores" class="badge badge-pill ms-1"
                    style="color:black;">
                    {{ avaliadores.find(item => item.idUsuario == avaliador).nome }} <i class="fa fa-solid fa-trash"
                      @click="removeAvaliador(avaliador)" /></span>
                </div>
              </template>
            </argon-input>
          </div>
          <div class="mt-5">
            <argon-button class="mx-auto" @click="Submit">Cadastrar</argon-button>
          </div>
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
      model: {
        nome: "",
        descricao: "",
        dataInicio: "",
        dataFim: "",
        idEscola: this.$store.state.idUsuario,
        idConcursoCategoria: "",
        idUsuarioAvaliadores: [],
      },
      avaliadores: [],
      avaliadorSelecionado: {},
      categorias: [],
    };
  },
  async mounted() {
    if (this.$store.state.role !== 'escola') {
      this.$router.back();
    }
    await this.loadCategoria();
    await this.loadAvaliadores();
  },
  methods: {
    async Submit() {
      //verificar se todos os campos estão preenchidos
      console.log(this.model)
      for (const key in this.model) {
        if (this.model[key] === "") {
          alert("Preencha todos os campos");
          return;
        }
      }

      try {
        //const { data } = await api.post("/concurso", this.model);
        this.$router.push("/competicoes");
      } catch (error) {
        console.log(error);
      }
    },
    async loadAvaliadores() {
      try {
        //const { data } = await api.get("/usuario/lista-avaliadores");
        const data = [{ nome: "Avaliador 1", idUsuario: 1 }, { nome: "Avaliador 2", idUsuario: 2 }, { nome: "Avaliador 3", idUsuario: 3 }];
        this.avaliadores = data;
      } catch (error) {
        console.log(error);
      }
    },
    async loadCategoria() {
      try {
        //const { data } = await api.get("/concurso/lista-categorias");
        const data = [{ descricao: "Ficção", idConcursoCategoria: 1 }, { descricao: "Não-ficção", idConcursoCategoria: 2 }, { descricao: "Outro", idConcursoCategoria: 3 }];
        this.categorias = data;
      } catch (error) {
        console.log(error);
      }
    },
    removeAvaliador(id) {
      this.model.idUsuarioAvaliadores = this.model.idUsuarioAvaliadores.filter(avaliador => avaliador !== id);
    },

    adicionarAvaliador() {
      console.log(this.model.idUsuarioAvaliadores.find(avaliador => avaliador === this.avaliadorSelecionado.idUsuario))
      if (this.model.idUsuarioAvaliadores.find(avaliador => avaliador === this.avaliadorSelecionado.idUsuario) === undefined) {
        this.model.idUsuarioAvaliadores.push(this.avaliadorSelecionado.idUsuario);
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

.maracutaia2 {
  margin-top: -100px;
}

.maracutaia {
  margin-top: -600px;
  margin-bottom: 100px;
}
</style>