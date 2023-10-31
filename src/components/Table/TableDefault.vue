<template>
  <div class="input-group py-3">
    <input
      type="text"
      class="form-control"
      placeholder="Pesquisar..."
      v-model="search"
      @input="filterItems"
    />
  </div>
  <div class="bg-gray card p-3">
    <div class="table-responsive p-0">
      <table class="table table-striped mb-0">
        <thead>
          <tr>
            <th
              class="text-uppercase text-secondary text-xs font-weight-bolder opacity-7"
              v-for="nome in nomes"
              :key="nome"
              scope="col"
            >
              {{ nome }}
            </th>
          </tr>
        </thead>
        <tbody class="">
          <TableRecipe :items="itensListados" v-if="tipo === 'receita'" />
          <TableIngredients
            :items="itensListados"
            v-else-if="tipo === 'ingrediente'"
          />

          <!-- Coloca um component para cada tipo -->
        </tbody>
      </table>
      <NotFoundItem v-if="itensListados.length === 0 || this.search != ''" />
    </div>
  </div>
</template>
<script>
import TableRecipe from "./TableRecipe.vue";
import TableIngredients from "./TableIngredients.vue";
import searchItemByName from "../../services/SearchService";
import NotFoundItem from "./NotFoundItem.vue";
export default {
  data() {
    return {
      search: "",
      itensListados: this.items,
    };
  },
  mounted() {
    this.itensListados = this.items;
  },
  watch: {
    items() {
      this.itensListados = this.items;
    },
  },
  methods: {
    filterItems() {
      let itensFiltrados = searchItemByName(this.search, this.items);
      this.itensListados = itensFiltrados;
    },
  },
  props: {
    items: {
      type: Array,
      required: true,
    },
    nomes: {
      type: Array,
      required: true,
    },
    tipo: {
      type: String,
      required: true,
    },
  },
  components: {
    TableRecipe,
    TableIngredients,
    NotFoundItem,
  },
};
</script>
<style lang=""></style>
