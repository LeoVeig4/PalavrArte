<template>
  <div class="form-group">
    <div :class="hasIcon(icon)">

      <label v-if="label" class="form-control-label" :class="labelClasses">
        {{ label }}
        <span v-if="required">*</span>
      </label>
      <span v-if="iconDir === 'left'" class="input-group-text">
        <i :class="getIcon(icon)"></i>
      </span>
      <slot name="customInput"></slot>
      <input v-if="hasSlot" :name="name" :id="id" :value="modelValue" :type="type" :min="min" :max="max"
        :placeholder="placeholder" class="form-control" :class="getClasses(size, valid)" :disabled="disabled"
        @input="$emit('update:modelValue', $event.target.value)" :isRequired="isRequired" v-maska :data-maska="mask" />
      <span v-if="iconDir === 'right'" class="input-group-text">
        <i :class="getIcon(icon)"></i>
      </span>
    </div>
  </div>
</template>

<script>
import { vMaska } from "maska";

export default {
  name: "argon-input",
  emits: ["update:modelValue"],
  directives: {
    maska: vMaska,
  },
  props: {
    labelClasses: {
      type: String,
      default: "",
    },
    label: {
      type: String,
      default: "",
    },
    required: {
      type: Boolean,
      default: false,
    },
    mask: {
      type: String,
      default: "",
    },
    size: {
      type: String,
      default: "default",
    },
    valid: {
      type: Boolean,
      default: false,
    },
    disabled: [String, Boolean],
    icon: String,
    iconDir: String,
    name: String,
    id: String,
    modelValue: [String, Number],
    placeholder: String,
    type: String,
    isRequired: Boolean,
    min: Number,
    max: Number,
  },
  methods: {
    getClasses: (size, valid) => {
      let sizeValue, isValidValue;

      sizeValue = size ? `form-control-${size}` : null;

      isValidValue = valid ? `${valid}` : "invalid";

      return `${sizeValue} ${isValidValue}`;
    },
    getIcon: (icon) => (icon ? icon : null),
    hasIcon: (icon) => (icon ? "input-group" : null),
  },
  computed: {
    hasSlot() {
      let hasSlot
      this.$slots.customInput ? hasSlot = true : hasSlot = false;
      return !hasSlot;
    }
  }
};
</script>