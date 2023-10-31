<template>
    <div>
        <div class="d-flex justify-content-center">
            <div class="box" id="nutricionalTable">
                <div class="text-center">
                    <strong>INFORMAÇÃO NUTRICIONAL</strong>
                </div>
                <hr />
                <span class="ms-2">Porções por embalagem: 000 Porções</span>
                <br />
                <span class="ms-2">Porção: 000g (medida caseira)</span>
                <div class="hr-style" />
                <table class="mx-auto">
                    <tr>
                        <th></th>
                        <th class="border-left"><span class="mx-1">100g</span></th>
                        <th class="border-left"><span class="mx-1">000g</span></th>
                        <th class="border-left"><span class="mx-1">%VD*</span></th>
                    </tr>
                    <tr v-for="(item, index) in items">
                        <td class="no-border-left"> <span :class="{ 'ms-3': item.isDerived }" class="me-1">{{ item.name
                        }}</span></td>
                        <td>
                            <div class="text-center">{{ item.valueDefault }}</div>
                        </td>
                        <td>
                            <div class="text-center">
                                {{ item.valuePorcao }}
                            </div>
                        </td>
                        <td class="no-border-right">
                            <div class="text-center">
                                {{ item.valueDiary }}
                            </div>
                        </td>
                    </tr>
                </table>
                <div class="hr-style" />
                <div>
                    <span class="ps-2 sm-font">
                        *Percentual de valores diários fornecidos pela porção
                    </span>
                </div>
            </div>
        </div>
        <argon-button @click="dowloadImage"> baixar Imagem</argon-button>
    </div>
</template>

<script>
import api from "../services/api";
import html2canvas from 'html2canvas';
export default {
    data() {
        return {
            items: [{
                name: "Valor energético (kcal)",
                valueDefault: "0",
                valuePorcao: "0",
                valueDiary: "0",
                isDerived: false,
            },
            {
                name: "Carboidratos totais (g)",
                valueDefault: "0",
                valuePorcao: "0",
                valueDiary: "0",
                isDerived: false,
            },
            {
                name: "Açucares totais (g)",
                valueDefault: "0",
                valuePorcao: "0",
                valueDiary: "0",
                isDerived: false,
            },
            {
                name: "Açucares adicionados (g)",
                valueDefault: "0",
                valuePorcao: "0",
                valueDiary: "0",
                isDerived: true,
            },
            {
                name: "Gorduras totais (g)",
                valueDefault: "0",
                valuePorcao: "0",
                valueDiary: "0",
                isDerived: false,
            },
            {
                name: "Gorduras saturadas (g)",
                valueDefault: "0",
                valuePorcao: "0",
                valueDiary: "0",
                isDerived: true,
            },
            {
                name: "Gorduras trans (g)",
                valueDefault: "0",
                valuePorcao: "0",
                valueDiary: "0",
                isDerived: true,
            },
            {
                name: "Fibra alimentar (g)",
                valueDefault: "0",
                valuePorcao: "0",
                valueDiary: "0",
                isDerived: false,
            },
            {
                name: "Sódio (mg)",
                valueDefault: "0",
                valuePorcao: "0",
                valueDiary: "0",
                isDerived: false,
            }],
            nomes: ["Nome", "Editar", "Ações"],
        };
    },
    mounted() {
        //this.getNutrition();
    },
    methods: {
        dowloadImage() {
            const targetElement = document.getElementById('nutricionalTable');
            html2canvas(targetElement).then(canvas => {
                // Convert the canvas to a data URL
                const dataUrl = canvas.toDataURL();
                // Create an anchor element
                const downloadLink = document.createElement('a');
                // Set the href and download attributes to save the image
                downloadLink.href = dataUrl;
                downloadLink.download = 'nutrition_image.png';
                // Trigger a click event on the anchor element to start the download
                downloadLink.click();
            });
        },
        async getNutrition() {
            const { data } = await api.get("/nutrition");
            this.items = data;
        },
    }
};
</script>
<style>
#nutricionalTable {
    font-family: Arial, Helvetica, sans-serif;
}

.hr-style {
    margin: 0px;
    padding: 0px;
    border: 3px solid black;
}

.sm-font {
    font-size: 10px;
}

.box {
    border: 1px solid black;
    width: 370px;
    background-color: white;
    color: black;
}

hr,
.hr-style {
    margin-top: 0px;
    margin-bottom: 0px;
    margin-right: 3px;
    margin-left: 3px;
    padding: 0px;
}

table {
    border-collapse: collapse;
}

.no-border-top {
    border-top: none !important;
}

.no-border-left {
    border-left: none;
}

.no-border-right {
    border-right: none;
}

.border-left {
    border-left: 1px solid;
}

td {
    border: 1px solid;
    border-bottom: none;
}
</style>
  