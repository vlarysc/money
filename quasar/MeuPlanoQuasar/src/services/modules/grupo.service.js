import { http, tokenBearer } from "../http";
import { userKey } from "../../shared/global";
import { Loading, QSpinnerGears } from "quasar";

const _getGrupos = async ({ page, size }) => {
  Loading.show();
  const res = await http
    .get(`/grupos?page=${page}&size=${size}`, tokenBearer())
    .then(response => response)
    .catch(error => error);
  Loading.hide();
  return res;
};

const _getGrupobyID = async payload => {
  Loading.show();
  const res = await http
    .get(`/grupos/${payload}`, tokenBearer())
    .then(response => response)
    .catch(error => error);
  Loading.hide();
  return res;
};
const _postGrupo = async payload => {
  Loading.show();
  const res = await http
    .post(`/grupos`, payload, tokenBearer())
    .then(response => response)
    .catch(error => error);
  Loading.hide();
  return res;
};

const _putGrupo = async ({ id, payload }) => {
  Loading.show();
  const res = await http
    .put(`/grupos/${id}`, payload, tokenBearer())
    .then(response => response)
    .catch(error => error);
  Loading.hide();
  return res;
};

const _deleteGrupo = async id => {
  Loading.show();
  const res = await http
    .delete(`/grupos/${id}`, tokenBearer())
    .then(response => response)
    .catch(error => error);
  Loading.hide();
  return res;
};

export default {
  _getGrupos,
  _getGrupobyID,
  _postGrupo,
  _putGrupo,
  _deleteGrupo
};
//ideia de clean code
//service api
//store acessa service
//pagina acessa store
