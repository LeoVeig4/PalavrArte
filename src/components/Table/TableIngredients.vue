<template>
  <tr v-for="item in items" :key="item.idIngrediente">
    <td class="texto-ingrediente">
      <p>{{ item.nome }}</p>
    </td>
    <!-- TODO:ARRUMAR PARA IR PRO ID CERTO -->
    <td><button class="btn btn-primary">Editar</button></td>
    <td><button class="btn btn-danger">Excluir</button></td>
  </tr>
</template>
<script>
export default {
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
};
</script>
<style>
.texto-ingrediente {
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
