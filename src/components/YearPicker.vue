<template>
    <base-dropdown class="year-picker" :class="type" icon="far fa-calendar-alt me-2 mt-2" :custom="true"
        :title="selectedYear" :position="position">
        <h6 class="dropdown-header header-black ">Ano</h6>
        <div class="row">
            <div v-for="year in range(getCurrentYear() + 10, 1970)" :key="year" class="col-6 mx-n2">
                <span class="dropdown-item button-style py-1 ms-3 mb-2" @click="emitSelection(year)">{{ year }}</span>
            </div>
        </div>
    </base-dropdown>
</template>
  
<script>
export default {
    name: "year-picker",
    props: {
        type: {
            type: String,
            default: "secondary",
            description: "Which is primary or secondary type",
        },
        selectedYear: {
            type: String,
            default: "",
            description: "Which year is selected",
        },
        position: {
            type: String,
            default: "Right",
            description: "Which side is the dropdown",
        },
    },
    methods: {
        getCurrentYear() {
            return 2020;
        },
        emitSelection(year) {
            this.$emit("select", year);
        },
        range(max, min) {
            let arr = [];
            let j = 0;
            for (let i = max; i >= min; i--) {
                arr[j] = i;
                j++;
            }
            return arr;
        },
        getBtnType() {
            if (this.type === "primary") {
                return "btn-primary";
            }
            if (this.type === "secondary") {
                return "btn-secondary";
            }
        },
    },
};
</script>
  
<style>
.year-picker {
    border-radius: 4px;
    width: 100px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: bottom;
}

.primary {
    border: 1px solid #cccccc49;
    color: #fff;
    background-color: #5e72e4;
    -webkit-box-shadow: 0 7px 14px rgba(50, 50, 93, 0.1),
        0 3px 6px rgba(0, 0, 0, 0.08);
    box-shadow: 0 7px 14px rgba(50, 50, 93, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08);
}

.secondary {
    border: 1px solid #cccccc49;
    background-color: #fff;
    -webkit-box-shadow: 0 7px 14px rgba(50, 50, 93, 0.1),
        0 3px 6px rgba(0, 0, 0, 0.08);
    box-shadow: 0 7px 14px rgba(50, 50, 93, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08);
}

.button-style {
    background-color: rgba(150, 150, 150, 0.402);
    text-align: center;
    cursor: pointer;
    border-radius: 5px;
}
</style>