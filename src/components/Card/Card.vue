<template>
  <div :class="`mb-4 card shadow  ${iconBackground}`">
    <div class="p-3 card-body">
      <div
        class="d-flex flex-column"
        :class="directionReverse ? reverseDirection : ''"
      >
        <!-- <div class="">
          <div
            class="col-12 w-100 text-center icon icon-shape"
            :class="` ${
              this.$store.state.isRTL ? 'border-radius-md' : 'border-radius-2xl'
            }`"
          >
            <i
              class="text-lg opacity-10"
              :class="iconClass"
              aria-hidden="true"
            ></i>
          </div>
        </div> -->
        <div :class="contentClass">
          <div class="numbers">
            <p
              class="mb-0 text-sm text-uppercase font-weight-bold"
              :class="titleColor"
            >
              <i
                class="text-lg opacity-10 me-3"
                :class="iconClass"
                aria-hidden="true"
              ></i>
              {{ title }}
            </p>
            <div class="text-center pt-3 pb-3">
              <h5 class="font-weight-bolder" :class="valueColor">
                {{ value }}
              </h5>
              <h5 class="font-weight-bolder" :class="valueColor">0</h5>
            </div>
            <span class="text-sm" :class="percentageColor">{{
              percentage
            }}</span>
            {{ detail }}
          </div>
          <div class="d-flex flex-row justify-content-center">
            <div>
              <button
                class="btn btn-md btn-success me-2"
                @click="this.$router.push(visualizarPath)"
              >
                Visualizar
                <i class="fas fa-eye ms-1"></i>
              </button>
            </div>
            <div>
              <button
                class="btn btn-md btn-info"
                @click="this.$router.push(cadastrarPath)"
              >
                Cadastrar
                <i class="fas fa-plus ms-1"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "card",
  data() {
    return {
      reverseDirection: "flex-row-reverse justify-content-between",
    };
  },
  props: {
    directionReverse: Boolean,
    title: {
      type: String,
      required: true,
    },
    detail: {
      type: String,
      required: true,
    },
    titleColor: {
      type: String,
    },
    value: {
      required: true,
    },
    valueColor: {
      type: String,
    },
    percentage: String,
    iconClass: {
      type: String,
      required: true,
    },
    percentageColor: {
      type: String,
      default: "text-success",
    },
    iconBackground: {
      type: String,
      default: "bg-white",
    },
    contentClass: {
      type: String,
    },
    visualizarPath: {
      type: String,
      required: true,
    },
    cadastrarPath: {
      type: String,
      required: true,
    },
  },
};
</script>
