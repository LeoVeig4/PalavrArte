<template>
  <div class="container">
    <div class="text-light w-100 d-flex">
      <!-- <h1 class="text-white">Todas Receitas</h1> -->
      <router-link
        to="/admin/cadastrar-ingrediente"
        class="ms-auto btn btn-primary"
        >Cadastrar Novo Ingrediente
        <i class="fas ms-2 fa-plus"></i>
      </router-link>
    </div>
    <div class="">
      <TableDefault :items="items" :nomes="nomes" tipo="ingrediente" />
    </div>
  </div>
</template>

<script>
import TableDefault from "../components/Table/TableDefault.vue";
import api from "../services/api";
export default {
  components: {
    TableDefault,
  },
  beforeMount() {
    this.$swal({
      title: "Carregando...",
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
      showConfirmButton: false,
      onBeforeOpen: () => {
        this.$swal.showLoading();
      },
    });
  },
  data() {
    return {
      items: [],
      nomes: ["Nome", "Editar", "Ações"],
    };
  },
  methods: {
    async getIngredientes() {
      let nutrientes = false;
      try {
        let response = await api
          .get("/ingrediente/lista/" + nutrientes)
          .then((response) => {
            this.items = response.data;
            this.$swal.close();
          });
        console.log(response);
      } catch (error) {
        this.$swal.close();
        this.$swal({
          icon: "error",
          title: "Oops...",
          text: "Não foi possível carregar os ingredientes!",
        });
        console.log(error);
      }

      return this.items;
    },
  },
  mounted() {
    console.log("onMounted");
    this.getIngredientes();
  },
};
</script>
<style lang=""></style>
