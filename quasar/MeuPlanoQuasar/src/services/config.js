//import store from '@/store'
import { showErrorToast } from "../shared/global";
import store from "../store/index";
// import notify from '../plugins/notify'

export const config = {
  timeout: 30 * 1000,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  }
};

// export const token = !!sessionStorage.getItem(userKey) ? JSON.parse(sessionStorage.getItem(userKey)).access_token : "";

// export const handleRequestSuccess = async ({ data }) => {
//   changeObjectDateValuesToJSON(data)
// }

// export const handleResponseSuccess = async ({ data }) => {
// if (Array.isArray(data)) {
//   data.forEach(obj => {
//     changeDateStringToObjectDate(obj)
//   })
// } else {
//   changeDateStringToObjectDate(data)
// }
// store.commit('config/END_LOADING')
// }

export const errorHandler = async error => {
  const err = error.response;
  const errorMessage = error.message;
  const status = error.response.status;

  // store.commit('config/END_LOADING')

  if (status === 401) {
    await store.dispatch("logout");
    return showErrorToast("Acesso negado");
  }

  if (status === 403) {
    const msg = "Acesso restrito!";
    return showErrorToast(msg);
  }

  return { err, errorMessage };
  // notify({
  //   err,
  //   errorMessage
  // })
};
