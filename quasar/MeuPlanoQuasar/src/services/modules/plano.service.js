import { http, tokenBearer } from "../http";
import { userKey } from "../../shared/global";
import { Loading, QSpinnerGears } from "quasar";

const _getPlanos = async ({ page, size }) => {
  Loading.show();
  const res = await http
    .get(`/planos?page=${page}&size=${size}`, tokenBearer())
    .then(response => response)
    .catch(error => error);
  Loading.hide();
  return res;
};

const _getPlanobyID = async payload => {
  Loading.show();
  const res = await http
    .get(`/planos/${payload}`, tokenBearer())
    .then(response => response)
    .catch(error => error);
  Loading.hide();
  return res;
};
const _postPlano = async payload => {
  Loading.show();
  const res = await http
    .post(`/planos`, payload, tokenBearer())
    .then(response => response)
    .catch(error => error);
  Loading.hide();
  return res;
};

const _putPlano = async ({ id, payload }) => {
  Loading.show();
  const res = await http
    .put(`/planos/${id}`, payload, tokenBearer())
    .then(response => response)
    .catch(error => error);
  Loading.hide();
  return res;
};

const _deletePlano = async id => {
  Loading.show();
  const res = await http
    .delete(`/planos/${id}`, tokenBearer())
    .then(response => response)
    .catch(error => error);
  Loading.hide();
  return res;
};

export default {
  _getPlanos,
  _getPlanobyID,
  _postPlano,
  _putPlano,
  _deletePlano
};
//ideia de clean code
//service api
//store acessa service
//pagina acessa store
