<template>
  <div class="form-group">
    <div :class="hasIcon(icon)">
      <span v-if="iconDir === 'left'" class="input-group-text">
        <i :class="getIcon(icon)"></i>
      </span>
      <input :name="name" :id="id" :value="modelValue" :type="type" :min="min" :max="max" :placeholder="placeholder"
        class="form-control" :class="getClasses(size, valid)" :disabled="disabled"
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
};
</script>
