// import Vue from 'vue'
import { Notify } from "quasar";

export const userKey = "_user_";

export const logado = "_logado_";

// export const convenioId = () => {
//   if (localStorage.getItem(userLogado)) {
//     return JSON.parse(localStorage.getItem(userLogado)).id
//   } else return null
// }

export const toast = (text, type, background) => {
  return Notify.create({
    message: text,
    type,
    position: "top-right"
  });
  //   return Vue.swal({
  //     title: text,
  //     type: type,
  //     toast: true,
  //     position: 'top-end',
  //     timer: 3000,
  //     showConfirmButton: false,
  //     showCloseButton: true,
  //     closeButtonAriaLabel: 'Fechar notificação.',
  //     background: background,
  //     width: 'auto'
  //   })
};

export const showErrorToast = (text = "Algo inesperado aconteceu") => toast(text, "negative");

export const showSuccessToast = (text = "Operação realizada com sucesso!") => toast(text, "positive");

export const showWarningToast = (text = "Atenção!") => toast(text, "warning");

export const showInfoToast = (text = "Info!") => toast(text, "info");
