<template>
  <div class="container">
    <div class="text-light d-flex">
      <!-- <h1 class="text-white">Todas Receitas</h1> -->
      <router-link to="/admin/cadastrar-receita" class="ms-auto btn btn-primary"
        >Cadastrar Nova Receita
        <i class="fas ms-2 fa-plus"></i>
      </router-link>
    </div>
    <div class="">
      <TableDefault :items="receitasListadas" :nomes="nomes" tipo="receita" />
    </div>
  </div>
</template>
<script>
import TableDefault from "../components/Table/TableDefault.vue";
import api from "../services/api";
export default {
  data() {
    return {
      receitas: {},
      receitasListadas: {},
      nomes: ["Nome", "Ingredientes", "Rendimento", "Editar", "Remover"],
    };
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
  mounted: function () {
    this.getReceitas();
  },
  methods: {
    async getReceitas() {
      try {
        await api.get("/receita/lista").then((response) => {
          this.receitas = response.data;
          this.receitasListadas = response.data;
          this.$swal.close();
        });
      } catch (error) {
        this.$swal.close();
        this.$swal({
          icon: "error",
          title: "Oops...",
          text: "Não foi possível carregar as receitas!",
        });
        console.log(error);
      }
      return this.receitas;
    },
  },
  components: {
    TableDefault,
  },
};
</script>
<style lang=""></style>
