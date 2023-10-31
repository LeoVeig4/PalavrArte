import "./assets/js/nav-pills.js";
import "./assets/scss/argon-dashboard.scss";

import VueTippy from "vue-tippy";
import "tippy.js/dist/tippy.css";

import { LoadingPlugin } from "vue-loading-overlay";
import "vue-loading-overlay/dist/css/index.css";

import Toast, { POSITION } from "vue-toastification";
import "vue-toastification/dist/index.css";
import { useToast } from "vue-toastification";
import moment from "moment";

import { ErrorMessage } from "./plugins/ErrorMessage.js";

import modal from "@/components/Modal.vue";
import ArgonAlert from "@/components/ArgonAlert.vue";
import ArgonInput from "@/components/ArgonInput.vue";
import ArgonSwitch from "@/components/ArgonSwitch.vue";
import ArgonButton from "@/components/ArgonButton.vue";
import BaseDropdown from "@/components/BaseDropdown.vue";
import YearPicker from "@/components/YearPicker.vue";
import FileSelect from "@/components/FileSelect.vue";

export default {
  install(app) {

    app.component('argon-button', ArgonButton);
    app.component('argon-input', ArgonInput);
    app.component("argon-switch", ArgonSwitch);
    app.component('argon-alert', ArgonAlert);
    app.component('year-picker', YearPicker);
    app.component('file-select', FileSelect);
    app.component('base-dropdown', BaseDropdown);
    app.component('modal', modal);

    app.use(
      VueTippy,
      {
        defaultProps: { placement: 'top', animation: 'fade', theme: 'light', arrow: true },
        directive: 'Tooltip',
      }
    )
    app.use(ErrorMessage)
    app.use(moment);
    app.use(LoadingPlugin, { loader: "dots" });
    app.use(Toast, { position: POSITION.BOTTOM_RIGHT });
    app.config.globalProperties.$toast = useToast();

    app.mixin({
      methods: {
        formatDate(rawDate, format = "ll") {
          return moment(rawDate, "YYYY-MM-DD").locale("pt-br").format(format);
        },
        formatTimestamp(timestamp, format = "LLL") {
          return moment(timestamp, "YYYY-MM-DD hh:mm:ss")
            .locale("pt-br")
            .format(format);
        },
        getYear(input) {
          const date = this.moment(input);
          return date.isValid() ? date.year() : "...";
        },
        formatValue(value, allowNegative = false) {
          const valueNumber = Number(value);
          if (valueNumber > 0 || allowNegative) {
            return valueNumber.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            });
          }
          return "-";
        },
      },
    });
  },
};
