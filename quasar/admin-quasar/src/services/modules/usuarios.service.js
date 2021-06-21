import { http, tokenBearer } from "../http";
import { userKey } from "../../shared/global";
import { Loading, QSpinnerGears } from "quasar";

const _getUsuarios = async ({ page, size, nome, documento }) => {
  Loading.show();
  var filtro = "";

  filtro = !!nome ? `&nome=${nome}` : !!documento ? `&documento=${documento}` : "";

  const res = await http
    .get(`/users?page=${page}&size=${size}${filtro}`, tokenBearer())
    .then((response) => response)
    .catch((error) => error);
  Loading.hide();
  return res;
};

const _getUsuariobyID = async (payload) => {
  Loading.show();
  const res = await http
    .get(`/users/${payload}`, tokenBearer())
    .then((response) => response)
    .catch((error) => error);
  Loading.hide();
  return res;
};

const _getUsuariobyDocumento1 = async (payload) => {
  Loading.show();

  const res = await http
    .get(`/users?documento=${payload}`, tokenBearer())
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

const _postUsuario = async (payload) => {
  Loading.show();
  const res = await http
    .post(`/users`, payload, tokenBearer())
    .then((response) => response)
    .catch((error) => error);
  Loading.hide();
  return res;
};

const _putUsuario = async ({ id, payload }) => {
  Loading.show();
  const res = await http
    .put(`/users/${id}`, payload, tokenBearer())
    .then((response) => response)
    .catch((error) => error);
  Loading.hide();
  return res;
};

const _deleteUsuario = async (id) => {
  Loading.show();
  const res = await http
    .delete(`/users/${id}`, tokenBearer())
    .then((response) => response)
    .catch((error) => error);
  Loading.hide();
  return res;
};

export default {
  _getUsuarios,
  _getUsuariobyID,
  _postUsuario,
  _putUsuario,
  _deleteUsuario,
  _getUsuariobyDocumento1,
  _getPessoabyDocumento1
};
//ideia de clean code
//service api
//store acessa service
//pagina acessa store
