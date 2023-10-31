<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div v-for="c in cardsMenu" :key="c" :class="spaceCards">
        <Card
          :title="c.tittle"
          :value="c.value"
          :iconClass="c.iconClass"
          :iconBackground="c.iconBackground"
          :titleColor="c.titleColor"
          :valueColor="c.valueColor"
          :reverseDirection="c.reverseDirection"
          :contentClass="c.contentClass"
          :cadastrarPath="c.cadastrarPath"
          :visualizarPath="c.visualizarPath"
        />
        <!-- 
        <Card
          title="Minha Receita"
          value="Visualizar Minhas Receitas"
          iconClass="fas fa-birthday-cake fa-lg"
          iconBackground="bg-gradient-success"
          titleColor="text-black"
          valueColor="text-black"
          reverseDirection="true"
          contentClass="text-center"
        /> -->
      </div>
      <!-- para cada cardsMenu renderize -->
    </div>
  </div>
</template>
<script>
import Card from "@/components/Card/Card.vue";

export default {
  name: "dashboard-default",
  data() {
    return {
      spaceCards: "col-12 col-md-6 col-lg-6",
      cardsMenu: {
        MinhaReceita: {
          tittle: "Minha Receita",
          value: "Receitas Totais: ",
          iconClass: "fas fa-utensils fa-lg",
          iconBackground: "bg-danger",
          titleColor: "text-white",
          valueColor: "text-white",
          contentClass: "text-left",
          cadastrarPath: "/cadastrar-receita",
          visualizarPath: "/admin/receitas",
        },
        Despesa: {
          tittle: "Meus Ingredientes",
          value: "Visualizar Meus Ingredientes",
          iconClass: "fas fa-carrot fa-lg",
          iconBackground: "bg-warning",
          titleColor: "text-white",
          valueColor: "text-white",
          contentClass: "text-left",
          cadastrarPath: "/cadastrar-ingrediente",
          visualizarPath: "/admin/ingredientes",
        },
        Usuario: {
          tittle: "Usuários",
          value: "Total de Usuários",
          iconClass: "fas fa-user fa-lg",
          iconBackground: "bg-dark",
          titleColor: "text-white",
          valueColor: "text-white",
          contentClass: "text-left",
          cadastrarPath: "/admin/cadastrar-usuario",
          visualizarPath: "/admin/usuarios",
        },
      },
    };
  },
  components: {
    Card,
  },
};
</script>
