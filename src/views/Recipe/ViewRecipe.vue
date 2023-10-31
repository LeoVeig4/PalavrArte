<template>
  <div class="container">
    <div class="first-row row justify-content">
      <CardsViewRecipe cols="col-12 col-md-6">
        <div class="h6 mb-0 pb-0 row align-items-center">
          <span class="col-7">Tabela Nutricional</span>
          <span class="col-5 my-auto text-end"
            ><button class="btn btn-warning">
              Atualizar Tabela
              <i class="fas fa-sync-alt"></i>
            </button>
          </span>
        </div>
        <hr />
        <div>TABELAAAAAAAAAAAAAA</div>
      </CardsViewRecipe>
      <CardsViewRecipe>
        <div class="h6 mb-0 pb-0 row align-items-center">
          <span class="col-7">Ingredientes</span>
          <span class="col-5 my-auto text-end"
            ><button class="btn btn-warning">
              Atualizar Tabela
              <i class="fas fa-sync-alt"></i>
            </button>
          </span>
        </div>
        <hr />
        <table>
          <tr>
            <th>Nome</th>
            <th>Quantidade</th>
            <th>Valor Energetico</th>
          </tr>
          <tr>
            <td>Arroz</td>
            <td>1kg</td>
            <td>1000</td>
          </tr>
          <tr>
            <td>Feijão</td>
            <td>1kg</td>
            <td>1000</td>
          </tr>
        </table>
      </CardsViewRecipe>
    </div>

    <div class="mt-3 row">
      <CardsViewRecipe cols="col-12 col-md-6 ">
        <div>
          <p>Alergenicos</p>
          <hr />
          <div class="p-3"></div>
          <div>
            <button class="btn btn-warning">
              Editar Alergenicos
              <i class="fas fa-edit"></i>
            </button>
          </div>
        </div>
      </CardsViewRecipe>
      <CardsViewRecipe cols="col-12 col-md-6 ">
        <div class="h6 mb-0 pb-0 row align-items-center">
          <span class="col-7">Modo de Preparo</span>
          <span class="col-5 my-auto text-end"
            ><button class="btn btn-warning">
              Atualizar Tabela
              <i class="fas fa-sync-alt"></i>
            </button>
          </span>
        </div>
        <hr />
        <div>Modo de Preparo</div>
        <hr />
        <div>
          <button class="btn btn-warning">
            Editar Modo de Preparo
            <i class="fas fa-edit"></i>
          </button>
        </div>
      </CardsViewRecipe>
    </div>
  </div>
</template>
<script>
import CardsViewRecipe from "@/components/Card/CardsViewRecipe.vue";
export default {
  components: {
    CardsViewRecipe,
  },
};
</script>
<style lang=""></style>
