import { http, tokenBearer } from "../http";
import { userKey } from "../../shared/global";
import { Loading, QSpinnerGears } from "quasar";

const _getParentescos = async ({ page, size }) => {
  Loading.show();
  const res = await http
    .get(`/parentescos?page=${page}&size=${size}`, tokenBearer())
    .then(response => response)
    .catch(error => error);
  Loading.hide();
  return res;
};

const _getParentescobyID = async payload => {
  Loading.show();
  const res = await http
    .get(`/parentescos/${payload}`, tokenBearer())
    .then(response => response)
    .catch(error => error);
  Loading.hide();
  return res;
};
const _postParentesco = async payload => {
  Loading.show();
  const res = await http
    .post(`/parentescos`, payload, tokenBearer())
    .then(response => response)
    .catch(error => error);
  Loading.hide();
  return res;
};

const _putParentesco = async ({ id, payload }) => {
  Loading.show();
  const res = await http
    .put(`/parentescos/${id}`, payload, tokenBearer())
    .then(response => response)
    .catch(error => error);
  Loading.hide();
  return res;
};

const _deleteParentesco = async id => {
  Loading.show();
  const res = await http
    .delete(`/parentescos/${id}`, tokenBearer())
    .then(response => response)
    .catch(error => error);
  Loading.hide();
  return res;
};

export default {
  _getParentescos,
  _getParentescobyID,
  _postParentesco,
  _putParentesco,
  _deleteParentesco
};
//ideia de clean code
//service api
//store acessa service
//pagina acessa store
