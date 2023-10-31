import { useToast } from "vue-toastification";
const isProd = process.env.NODE_ENV === "production";
export const ErrorMessage = {
    install(Vue) {
        Vue.config.globalProperties.$error = {
            errorMessageToast(standardMessage, error) {
                const genericError = standardMessage || "Ocorreu um erro inesperado. Tente novamente mais tarde.";
                // const hasErrorResponseData = error.response && error.response.data;
                // let customError = genericError;
                // if (hasErrorResponseData) {
                //     const data = error.response.data;
                //     if (data[0] && data[0].message) customError = data[0].message;
                //     else if (data.message) customError = data.message;
                //     else if (data.errors[0]?.message) customError = data.errors[0].message;
                // }
                if (!isProd) console.log(error);
                // const messageError = hasErrorResponseData ? customError : genericError;
                useToast().error(genericError);
                return genericError;
            },
            errorMessage(standardMessage, error) {

                const genericError = standardMessage || "Ocorreu um erro inesperado. Tente novamente mais tarde.";
                // const hasErrorResponseData = error.response && error.response.data;
                // let customError = genericError;
                // if (hasErrorResponseData) {
                //     const data = error.response.data;
                //     if (data[0] && data[0].message) customError = data[0].message;
                //     else if (data.message) customError = data.message;
                //     else if (data.errors[0]?.message) customError = data.errors[0].message;
                // }
                // const messageError = hasErrorResponseData ? customError : genericError;
                // if (!isProd) console.log(error);
                return genericError;
            }
        }
    }
}
