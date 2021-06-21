import { http, tokenBearer } from "../http";

import { Loading, QSpinnerGears } from "quasar";

const _getFuncionarios = async ({ page, size, nome, documento }) => {
  Loading.show();
  var filtro = "";

  filtro = !!nome
    ? `&nome=${nome}`
    : !!documento
    ? `&documento=${documento}`
    : "";

  const res = await http
    .get(`/funcionarios?page=${page}&size=${size}${filtro}`, tokenBearer())
    .then(response => response)
    .catch(error => error);
  Loading.hide();
  return res;
};

const _getFuncionariobyID = async payload => {
  Loading.show();
  const res = await http
    .get(`/funcionarios/${payload}`, tokenBearer())
    .then(response => response)
    .catch(error => error);
  Loading.hide();
  return res;
};
const _getFuncionariobyDocumento1 = async payload => {
  Loading.show();

  const res = await http
    .get(`/funcionarios?documento=${payload}`, tokenBearer())
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

const _postFuncionario = async payload => {
  Loading.show();
  const res = await http
    .post(`/funcionarios`, payload, tokenBearer())
    .then(response => response)
    .catch(error => {
      return error;
    });
  Loading.hide();
  return res;
};

const _putFuncionario = async ({ id, payload }) => {
  Loading.show();
  const res = await http
    .put(`/funcionarios/${id}`, payload, tokenBearer())
    .then(response => response)
    .catch(error => error);
  Loading.hide();
  return res;
};

const _deleteFuncionario = async id => {
  Loading.show();
  const res = await http
    .delete(`/funcionarios/${id}`, tokenBearer())
    .then(response => response)
    .catch(error => error);
  Loading.hide();
  return res;
};

export default {
  _getFuncionarios,
  _getFuncionariobyID,
  _postFuncionario,
  _putFuncionario,
  _deleteFuncionario,
  _getFuncionariobyDocumento1,
  _getPessoabyDocumento1
};
//ideia de clean code
//service api
//store acessa service
//pagina acessa store
