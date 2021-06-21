import { http, tokenBearer } from "../http";
import { userKey } from "../../shared/global";
import { Loading, QSpinnerGears } from "quasar";

const _getContatos = async ({ page, size, id }) => {
  Loading.show();
  const res = await http
    .get(`/empresa/${id}/contatos?page=${page}&size=${size}`, tokenBearer())
    .then((response) => response)
    .catch((error) => error);
  Loading.hide();
  return res;
};

const _getContatobyID = async (payload) => {
  Loading.show();
  const res = await http
    .get(`/contatoempresa/${payload}`, tokenBearer())
    .then((response) => response)
    .catch((error) => error);
  Loading.hide();
  return res;
};

const _postContato = async (payload) => {
  Loading.show();
  const res = await http
    .post(`/contatoempresa`, payload, tokenBearer())
    .then((response) => response)
    .catch((error) => error);
  Loading.hide();
  return res;
};

const _putContato = async ({ id, payload }) => {
  Loading.show();
  const res = await http
    .put(`/contatoempresa/${id}`, payload, tokenBearer())
    .then((response) => response)
    .catch((error) => error);
  Loading.hide();
  return res;
};

const _deleteContato = async (id) => {
  Loading.show();
  const res = await http
    .delete(`/contatoempresa/${id}`, tokenBearer())
    .then((response) => response)
    .catch((error) => error);
  Loading.hide();
  return res;
};

export default {
  _getContatos,
  _getContatobyID,
  _postContato,
  _putContato,
  _deleteContato
};
//ideia de clean code
//service api
//store acessa service
//pagina acessa store
