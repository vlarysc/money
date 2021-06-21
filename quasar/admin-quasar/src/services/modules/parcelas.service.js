import { http, tokenBearer } from "../http";
import { userKey } from "../../shared/global";
import { Loading, QSpinnerGears } from "quasar";

const _getParcelas = async ({ page, size, id }) => {
  Loading.show();
  const res = await http
    .get(`/empresa/${id}/parcelas?page=${page}&size=${size}`, tokenBearer())
    .then((response) => response)
    .catch((error) => error);
  Loading.hide();
  return res;
};

const _getParcelabyID = async (payload) => {
  Loading.show();
  const res = await http
    .get(`/parcela/${payload}`, tokenBearer())
    .then((response) => response)
    .catch((error) => error);
  Loading.hide();
  return res;
};

const _postParcela = async (payload) => {
  Loading.show();
  const res = await http
    .post(`/parcela`, payload, tokenBearer())
    .then((response) => response)
    .catch((error) => error);
  Loading.hide();
  return res;
};

const _putParcela = async ({ id, payload }) => {
  Loading.show();
  const res = await http
    .put(`/parcela/${id}`, payload, tokenBearer())
    .then((response) => response)
    .catch((error) => error);
  Loading.hide();
  return res;
};

const _deleteParcela = async (id) => {
  Loading.show();
  const res = await http
    .delete(`/parcela/${id}`, tokenBearer())
    .then((response) => response)
    .catch((error) => error);
  Loading.hide();
  return res;
};

export default {
  _getParcelas,
  _getParcelabyID,
  _postParcela,
  _putParcela,
  _deleteParcela
};
//ideia de clean code
//service api
//store acessa service
//pagina acessa store
