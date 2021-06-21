import { http, tokenBearer } from "../http";

import { Loading, QSpinnerGears } from "quasar";

const _getFiliais = async ({ page, size, nome, documento }) => {
  Loading.show();
  var filtro = "";

  filtro = !!nome
    ? `&nome=${nome}`
    : !!documento
    ? `&documento=${documento}`
    : "";

  const res = await http
    .get(`/filiais?page=${page}&size=${size}${filtro}`, tokenBearer())
    .then(response => response)
    .catch(error => error);
  Loading.hide();
  return res;
};

const _getFilialbyID = async payload => {
  Loading.show();
  const res = await http
    .get(`/filiais/${payload}`, tokenBearer())
    .then(response => response)
    .catch(error => error);
  Loading.hide();
  return res;
};
const _getFilialbyDocumento1 = async payload => {
  Loading.show();

  const res = await http
    .get(`/filiais?documento=${payload}`, tokenBearer())
    .then(response => response)
    .catch(error => error);
  Loading.hide();
  return res;
};

const _getPessoabyDocumento1 = async payload => {
  Loading.show();
  const res = await http
    .get(`/pessoas?documento=${payload}`, tokenBearer())
    .then(response => response)
    .catch(error => error);
  Loading.hide();
  return res;
};

const _postFilial = async payload => {
  Loading.show();
  const res = await http
    .post(`/filiais`, payload, tokenBearer())
    .then(response => response)
    .catch(error => {
      return error;
    });
  Loading.hide();
  return res;
};

const _putFilial = async ({ id, payload }) => {
  Loading.show();
  const res = await http
    .put(`/filiais/${id}`, payload, tokenBearer())
    .then(response => response)
    .catch(error => error);
  Loading.hide();
  return res;
};

const _deleteFilial = async id => {
  Loading.show();
  const res = await http
    .delete(`/filiais/${id}`, tokenBearer())
    .then(response => response)
    .catch(error => error);
  Loading.hide();
  return res;
};

export default {
  _getFiliais,
  _getFilialbyID,
  _postFilial,
  _putFilial,
  _deleteFilial,
  _getFilialbyDocumento1,
  _getPessoabyDocumento1
};
//ideia de clean code
//service api
//store acessa service
//pagina acessa store
