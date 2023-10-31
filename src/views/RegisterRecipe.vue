<template>
  <div class="container">
    <div class="card container py-3">
      <h3 class="text-center">Cadastro de Receita</h3>
      <div class="form-group">
        <label>Nome da Receita:</label>
        <input
          type="text"
          class="form-control"
          id="nomeReceita"
          name="nomeReceita"
          v-model="receita.nome"
          placeholder="Nome da Receita"
        />
      </div>
      <div class="form-group">
        <label>Anotações:</label>
        <textarea
          class="form-control"
          rows="5"
          id="anotacoes"
          name="anotacoes"
          placeholder="Ex: Coloco muita farinha de trigo extra"
          v-model="receita.anotacoes"
        ></textarea>
      </div>
      <div class="form-group">
        <label>Rendimento por receita:</label>
        <input
          type="number"
          class="form-control"
          v-model="receita.rendimento"
          placeholder="Rendimento"
        />
      </div>
      <div class="form-group" data-id="not-close-search">
        <label>Ingredientes:</label>
        <input
          type="search"
          data-id="not-close-search"
          v-model="ingredienteInput"
          ref="ingredienteInput"
          class="form-control"
          @input="procuraIngrediente(ingredienteInput)"
          placeholder="Procure aqui os ingredientes para serem adicionados na receita"
          tabindex="0"
          @focusin="showSuggestions = true"
          @blur="onBlur($event)"
        />
        <ul v-if="showSuggestions" class="p-0">
          <!-- <div class="d-relative">
            <button class="btn btn-danger button-close-search">
              Close
              <i class="fas fa-times"></i>
            </button>
          </div> -->
          <div v-if="listaIngredientesSearch.length === 0">
            <li class="list-group-item shadow autocomplete-item">
              Ingrediente não encontrado!
            </li>
          </div>
          <li
            v-for="(ingrediente, index) in listaIngredientesSearch"
            :key="ingrediente.id"
            tabindex="0"
            class="list-group-item shadow autocomplete-item"
          >
            <div class="row">
              <div class="col-9 col-md-10">
                {{ ingrediente.nome }}
              </div>
              <div class="col-3 col-md-2">
                <button
                  class="btn btn-success autocomplete-item"
                  @click="addIngrediente(ingrediente)"
                >
                  Adicionar
                  <i class="fas fa-plus"></i>
                </button>
              </div>
            </div>
          </li>
        </ul>
      </div>

      <div class="form-group">
        <hr />
        <h4>Lista de Ingredientes:</h4>
        <div>
          <div class="row">
            <div class="col-9 col-md-5">
              <label>Nome</label>
            </div>
            <div class="col-3 col-md-5">
              <label>Quantidade</label>
            </div>
            <div class="col-3 col-md-2">
              <label>Excluir</label>
            </div>
          </div>
        </div>
        <div v-for="(ingrediente, index) in ingredienteReceita" :key="index">
          <IngredienteItem
            :ingredientes="ingrediente"
            :deleteIngrediente="deleteIngrediente"
          />
        </div>
        <div v-if="ingredienteReceita.length === 0" class="text-center p-3 row">
          <div>
            <p>Nenhum ingrediente adicionado!</p>
            <button class="btn btn-primary" @click="focaNoInputIngrediente">
              Adicionar Ingrediente
              <i class="fas ms-2 fa-plus"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="d-flex mt-3">
      <button
        class="btn btn-success btn-lg ms-auto col-12 col-md-4"
        @click="salvarReceita($event)"
      >
        Cadastrar Receita
      </button>
    </div>
  </div>
</template>
<script>
import Card from "@/examples/Cards/Card.vue";
import GradientLineChart from "@/examples/Charts/GradientLineChart.vue";
import Carousel from "./components/Carousel.vue";
import CategoriesCard from "./components/CategoriesCard.vue";
import api from "@/services/api";
import IngredienteItem from "@/components/Ingrediente/IngredienteItem.vue";
export default {
  name: "dashboard-default",
  data() {
    return {
      ingredienteInput: "",
      index: 0,
      limitSearch: 20,
      receita: {
        nome: "",
        ingredientes: {},
        rendimento: 0,
        anotacoes: "",
      },
      showSuggestions: false,
      listaIngredientes: [
        // Add more ingredients as needed
      ],
      listaIngredientesSearch: [],
      ingredienteReceita: [
        // Add more ingredients as needed
      ],
    };
  },
  methods: {
    async salvarReceita(evt) {
      let valida = await this.validaCampos();
      if (valida == false) {
        return;
      }
      //disable button
      this.$swal({
        title: "Cadastrando receita...",
        showConfirmButton: false,
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
        onOpen: () => {
          this.$swal.showLoading();
        },
      });
      console.log(this.ingredienteReceita);
      this.receita.ingredientes = this.ingredienteReceita;
      console.log("receita", this.receita);
      api
        .post("/receita/salvar", this.receita)
        .then((response) => {
          console.log(response);
          this.$swal({
            title: "Receita cadastrada com sucesso!",
            icon: "success",
            showConfirmButton: true,
          });
          this.$router.push("/receitas");
        })
        .catch((error) => {
          console.log(error);
          this.$swal({
            title: "Erro ao cadastrar receita!",
            message: "error.data.message",
            icon: "error",
            showConfirmButton: true,
          });
        });
    },
    async validaCampos() {
      let validade = true;
      if (this.receita.nome == "") {
        this.$swal({
          title: "Nome da receita não pode ser vazio!",
          icon: "warning",
          showConfirmButton: true,
          timer: 1500,
        });
        validade = false;
      }
      if (this.receita.rendimento == "") {
        this.$swal({
          title: "Rendimento da receita não pode ser vazio!",
          icon: "warning",
          showConfirmButton: true,
          timer: 1500,
        });
        validade = false;
      }
      if (this.receita.ingredientes.length == 0) {
        this.$swal({
          title: "Receita deve ter pelo menos um ingrediente!",
          icon: "warning",
          showConfirmButton: true,
          timer: 1500,
        });
        validade = false;
      }
      if (this.receita.ingredientes.length > 0) {
        this.receita.ingredientes.forEach((ingrediente) => {
          if (
            ingrediente.quantidade == "" ||
            ingrediente.quantidade == null ||
            ingrediente.quantidade == undefined ||
            ingrediente.quantidade == 0 ||
            ingrediente.quantidade == "0"
          ) {
            this.$swal({
              title: "Quantidade do ingrediente não pode ser vazio!",
              icon: "warning",
              showConfirmButton: true,
              timer: 1500,
            });
            validade = false;
          }
        });
      }
      return validade;
    },
    focaNoInputIngrediente() {
      this.$refs.ingredienteInput.focus();
    },
    procuraIngrediente(query) {
      let resposta = this.listaIngredientes.filter((item) =>
        item.nome.includes(query)
      );
      this.listaIngredientesSearch = resposta.slice(0, this.limitSearch);
      return resposta;
    },
    deleteIngrediente(ingrediente) {
      console.log(ingrediente);
      this.ingredienteReceita = this.ingredienteReceita.filter(
        (item) => item.id != ingrediente.id
      );
    },
    addIngrediente(ingrediente) {
      console.log(ingrediente);
      console.log(this.ingredienteReceita);
      if (
        this.ingredienteReceita.find(
          (item) => item.id == ingrediente.idIngrediente
        )
      ) {
        this.$swal({
          title: "Ingrediente já adicionado!",
          icon: "warning",
          showConfirmButton: true,
          timer: 1500,
        });
        return;
      }
      let ingredientePush = {
        idIngrediente: ingrediente.idIngrediente,
        id: ingrediente.idIngrediente,
        nome: ingrediente.nome,
        quantidade: 0,
      };
      this.ingredienteReceita.push(ingredientePush);
    },
    async getAllIngredients() {
      try {
        let response = await api.get("/ingrediente/lista/".concat(false));
        this.listaIngredientes = response.data;
        //set max to 10
        this.listaIngredientesSearch = this.listaIngredientes.slice(
          0,
          this.limitSearch
        );
      } catch (error) {
        console.log(error);
      }
    },
    retiraSuggestions(event) {
      console.log(event);
      //verificar se tem a uma tag pai com o id not-close-search ate achar o elemento com o id not-close-search
      let element = event.target;
      while (element?.id != "not-close-search") {
        element = element.parentElement;
        if (element != null) {
          if (element?.id == "not-close-search") {
            return;
          }
        }
      }

      this.showSuggestions = false;
    },
    onBlur(evt) {
      const tgt = evt.relatedTarget;
      console.log(tgt);
      if (tgt && tgt.classList.contains("autocomplete-item")) {
        return;
      }
      this.resetIngredienteInput();
    },
    resetIngredienteInput() {
      this.ingredienteInput = "";
      this.listaIngredientesSearch = this.listaIngredientes.slice(
        0,
        this.limitSearch
      );
      this.showSuggestions = false;
    },
  },
  beforeMount() {
    this.$swal({
      title: "Carregando...",
      showConfirmButton: false,
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
      onOpen: () => {
        this.$swal.showLoading();
      },
    });
  },
  mounted() {
    this.$swal.close();
    this.getAllIngredients();
  },
  components: {
    IngredienteItem,
    Card,
    GradientLineChart,
    Carousel,
    CategoriesCard,
  },
};
</script>

<style scoped>
label {
  font-weight: bold;
  font-size: 1rem;
}
.button-close-search {
  position: block;
}
</style>
