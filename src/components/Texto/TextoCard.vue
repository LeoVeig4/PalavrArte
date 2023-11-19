<template>
    <div class="container">
        <div class="card z-index-0 shadow-lg">
            <div class="card-header text-center pt-4">
                <img src="/image/book_shelf.jpg" class="w-100 mt-n4 image-container" />
                <h3> {{ texto.titulo }}</h3>
                <h3 class="badge badge-pill ms-1" :class="badge[index % 6 + 2]">Colocação: {{ index + 1 }}°</h3>
                <hr />
            </div>
            <div class="card-body text-start mt-n5">
                <p class="fw-bold text-center">Texto</p>
                <p v-html="texto.texto" class="overflow-ellipsis"></p>

                <p v-if="texto.nota"><span class="fw-bold">nota:</span> {{ texto.nota }}</p>
                <p v-if="texto.notaMedia"><span class="fw-bold">nota:</span> {{ texto.notaMedia }}</p>
                <p v-if="texto.quantidadeAvaliacoes"><span class="fw-bold">Quantidade de Avaliações:</span>
                    {{ texto.quantidadeAvaliacoes }}</p>
                <p v-if="texto.autor"><span class="fw-bold">Autor: </span>{{ texto.autor }}</p>
                <p v-if="texto.categoria"><span class="fw-bold">Categoria: </span><span class="badge badge-pill ms-1"
                        :class="badge[index % 6]">{{ texto.categoria }}
                    </span></p>
                <div class="text-center">
                    <router-link v-if="!Avaliar" :to="`/texto/${texto.idConcursoSubmissao}`"
                        class="btn bg-gradient-primary  w-100 mt-4 mb-0">Ler
                        Texto</router-link>
                    <router-link v-else :to="`avaliar/texto/${texto.idConcursoSubmissao}`"
                        class="btn bg-gradient-primary  w-100 mt-4 mb-0">Avaliar</router-link>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
export default {
    name: "texto-card",
    props: {
        index: {
            type: Number,
            required: true,
            default: 0,
        },
        texto: {
            type: Object,
            required: true,
        },
        Avaliar: {
            type: Boolean,
            default: false,
        },
        finalizou: {
            type: Boolean,
            default: false,
        }
    },
    data() {
        return {
            badge: ['badge-primary', 'badge-dark', 'badge-success', 'badge-danger', 'badge-info', 'badge-dark']
        };
    },
};
</script>

<style>
.image-container {
    width: 100%;
    height: 100px;
    object-fit: fill;
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
}

p {
    font-size: 13px;
    margin: 5px;
}

.overflow-ellipsis {
    display: -webkit-box;
    -webkit-line-clamp: 5;
    /* Limit the number of lines to 5 */
    -webkit-box-orient: vertical;
    overflow: hidden;

    /* Hides any content that overflows the container */
    text-overflow: ellipsis;
    /* Displays an ellipsis (...) when the content overflows */
}
</style>