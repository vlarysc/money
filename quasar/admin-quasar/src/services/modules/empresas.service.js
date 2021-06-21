import { http, tokenBearer } from "../http";
import { userKey } from "../../shared/global";
import { Loading, QSpinnerGears } from "quasar";

const _getEmpresas = async ({ page, size, nome, documento }) => {
  Loading.show();
  var filtro = "";

  filtro = !!nome ? `&nome=${nome}` : !!documento ? `&documento=${documento}` : "";
  console.log(filtro);
  const res = await http
    .get(`/empresa?page=${page}&size=${size}${filtro}`, tokenBearer())
    .then((response) => response)
    .catch((error) => error);
  Loading.hide();
  return res;
};

const _getEmpresabyID = async (payload) => {
  Loading.show();
  const res = await http
    .get(`/empresa/${payload}`, tokenBearer())
    .then((response) => response)
    .catch((error) => error);
  Loading.hide();
  return res;
};

const _getEmpresabyDocumento1 = async (payload) => {
  Loading.show();

  const res = await http
    .get(`/empresa?documento=${payload}`, tokenBearer())
    .then((response) => response)
    .catch((error) => error);
  Loading.hide();
  return res;
};

const _getPessoabyDocumento1 = async (payload) => {
  Loading.show();
  const res = await http
    .get(`/pessoa?documento=${payload}`, tokenBearer())
    .then((response) => response)
    .catch((error) => error);
  Loading.hide();
  return res;
};

const _postEmpresa = async (payload) => {
  Loading.show();
  const res = await http
    .post(`/empresa`, payload, tokenBearer())
    .then((response) => response)
    .catch((error) => {
      console.log(error);
      return error;
    });
  Loading.hide();
  return res;
};

const _putEmpresa = async ({ id, payload }) => {
  Loading.show();
  const res = await http
    .put(`/empresa/${id}`, payload, tokenBearer())
    .then((response) => response)
    .catch((error) => error);
  Loading.hide();
  return res;
};

const _deleteEmpresa = async (id) => {
  Loading.show();
  const res = await http
    .delete(`/empresa/${id}`, tokenBearer())
    .then((response) => response)
    .catch((error) => error);
  Loading.hide();
  return res;
};

export default {
  _getEmpresas,
  _getEmpresabyID,
  _postEmpresa,
  _putEmpresa,
  _deleteEmpresa,
  _getEmpresabyDocumento1,
  _getPessoabyDocumento1
};
//ideia de clean code
//service api
//store acessa service
//pagina acessa store
