<template>
  <div class="mb-2 item-ingrediente">
    <div class="row border rounded p-3">
      <div :class="cols" class="">
        {{ ingredientes?.nome }}
      </div>
      <div :class="cols" class="d-flex">
        <div class="ms-3 me-3">
          <input
            type="number"
            class="form-control"
            :class="showEditQuantidade ? 'd-block' : 'd-none'"
            v-model="ingredientes.quantidade"
            :ref="inputQuantidade"
            min="0"
            :placeholder="ingredientes.quantidade === null ? '0' : ''"
          />
          <div v-if="!showEditQuantidade">
            {{
              ingredientes?.quantidade === null ? "0" : ingredientes?.quantidade
            }}
          </div>
        </div>
        <button
          class="btn btn-primary btn-sm"
          aria-label="Editar Quantidade"
          title="Editar Quantidade"
          @click="editarQuantidade(ingredientes.id)"
        >
          <i
            class="fas"
            :class="showEditQuantidade ? 'fa-check' : ' fa-edit'"
          ></i>
        </button>
      </div>
      <div class="col-12 col-md-2">
        <button
          class="btn btn-danger btn-sm"
          aria-label="Deletar Ingrediente"
          title="Deletar Ingrediente"
          @click="deleteIngredient(ingredientes)"
        >
          <i class="fas fa-trash-alt"></i>
        </button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      cols: "col-12 col-md-5 col-lg-5",
      quantidade: 0,
      showEditQuantidade: false,
      inputQuantidade: "inputQuantidade",
    };
  },
  methods: {
    deleteIngredient(ingrediente) {
      console.log("deleteIngredient");
      console.log(this.ingredientes);
      this.deleteIngrediente(ingrediente);
    },
    editarQuantidade() {
      this.showEditQuantidade = !this.showEditQuantidade;
      if (this.showEditQuantidade) {
        this.$refs.inputQuantidade.focus();
      }
    },
  },

  props: {
    ingredientes: {
      type: Object,
      required: true,
    },
    deleteIngrediente: {
      type: Function,
      required: true,
    },
  },
};
</script>
<style></style>
