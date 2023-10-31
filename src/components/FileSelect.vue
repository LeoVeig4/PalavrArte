<template>
    <label class="file-select">
        <div class="select-button" :title="title">
            <span v-if="modelValue" class="btn btn-white">{{ modelValue.name }}</span>
            <span v-else :class="'btn btn-' + type">
                {{ title }}
                <i :class="iconClass"></i>
            </span>
        </div>
        <input type="file" @change="handleFileChange($event)" :accept="accept" />
    </label>
</template>
  
<script>
export default {
    name: "file-select",
    data() {
        return {
            iconSolid: "solid"
        }
    },
    props: {
        modelValue: File,
        title: {
            default: "",
            description: "Upload buttton label"
        },
        type: {
            default: "warning",
            description: "Upload button type"
        },
        accept: {
            type: String,
            default: "",
            description: "String with the accepted files"
        },
        mbSize: {
            type: Number,
            default: 0,
            description: "Max file size in MB"
        },
        iconName: {
            type: String
        },
    },
    methods: {
        handleFileChange(e) {
            const file = e.target.files[0];
            if (this.mbSize && file.size > this.mbSize * 1024 * 1024) {
                this.$toast.error(
                    `O tamanho do arquivo excede o máximo permitido (${this.mbSize}MB)`
                );
            } else {
                this.$emit("update:modelValue", file);
            }
        }
    },
    computed: {
        iconClass() {
            return ['fas', 'fa-solid', `fa-${this.iconName}`];
        },
    }
};
</script>
  
<style scoped>
.file-select {
    cursor: pointer;
}

.file-select>input[type="file"] {
    display: none;
}
</style>