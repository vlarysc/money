import { http, tokenBearer } from "../http";
import { Loading } from "quasar";

const _login = async payload => {
  Loading.show();
  const login = await http
    .post("/login", payload)
    .then(response => response)
    .catch(error => {
      return error;
    });
  Loading.hide();
  return login;
};
const _forgotPassword = async payload => {
  return await http
    .post("/forgotpassword", payload)
    .then(response => response)
    .catch(error => error);
};
const _resetPassword = async (payload, resetCode) => {
  return await http
    .post(`/resetpassword/${resetCode}`, payload)
    .then(response => response)
    .catch(error => error);
};
const _checkToken = async payload => {
  _removeToken();
  return await http
    .get(`/logged`, tokenBearer())
    .then(response => response)
    .catch(error => error);
};
const _storeToken = token => {
  http.defaults.headers.common["Authorization"] = "Bearer ".concat(token);
};

const _removeToken = () => {
  delete http.defaults.headers.common["Authorization"];
};

export default {
  _login,
  _storeToken,
  _removeToken,
  _forgotPassword,
  _resetPassword,
  _checkToken
};
