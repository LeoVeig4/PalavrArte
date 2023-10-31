<template>
  <div :class="cols">
    <div class="card p-3">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    cols: {
      type: String,
      default: "col-12 col-md-6 col-lg-6",
    },
  },
};
</script>
<style scoped></style>
