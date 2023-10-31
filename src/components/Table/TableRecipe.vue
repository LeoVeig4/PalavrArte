<template>
  <tr v-for="item in items" :key="item.idReceita">
    <td>
      <p>{{ item.nome }}</p>
    </td>
    <td class="texto-ingrediente">
      <span
        class="me-1"
        v-for="ingrediente in item.ingredientes"
        :key="ingrediente.idIngredientes"
        >{{ ingrediente.nome }}</span
      >
    </td>
    <td>{{ item.rendimento }} unidades</td>
    <!-- TODO:ARRUMAR PARA IR PRO ID CERTO -->
    <td><button class="btn btn-primary">Editar</button></td>
    <td><button class="btn btn-danger">Excluir</button></td>
  </tr>
</template>
<script>
export default {
  mounted() {
    console.log(this.items);
  },
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
};
</script>
<style scoped>
.texto-ingrediente {
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
