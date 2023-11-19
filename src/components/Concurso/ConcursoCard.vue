<template>
    <div class="container">

        <div class="card z-index-0 shadow-lg">
            <div class="card-header text-center pt-4">
                <img src="image/book_shelf.jpg" class="w-100 mt-n4 image-container" />
                <h3> {{ concurso.nome }}</h3>
                <hr />
            </div>
            <div class="card-body text-start mt-n5">
                <p v-if="concurso.descricao"><span class="fw-bold">Descrição:</span> {{ concurso.descricao }}</p>
                <p v-if="concurso.status"><span class="fw-bold">Status:</span> {{ concurso.status }}</p>
                <p><span class="fw-bold">Data de inscrição: </span>{{ concurso.dataInicio.slice(0, 10) }} a {{
                    concurso.dataFim.slice(0, 10)
                }}
                </p>
                <p><span class="fw-bold">Categoria: </span><span class="badge badge-pill ms-1" :class="badge[index % 6]">{{
                    concurso.categoria }}
                    </span></p>
                <div class="text-center">
                    <router-link :to="`/competicoes/${concurso.idConcurso}`"
                        class="btn bg-gradient-primary w-100 mt-4 mb-0">Ver</router-link>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
export default {
    name: "concurso-card",
    props: {
        index: {
            type: Number,
            required: true,
            default: 0,
        },
        concurso: {
            type: Object,
            required: true,
        },
        customClass: {
            type: String,
            default: "mt-lg-n10 mt-md-n11 mt-n10",
        },
        Role: {
            type: String,
            default: "usuario",
        },
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
</style>