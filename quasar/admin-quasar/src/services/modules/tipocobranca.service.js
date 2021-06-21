import { http, tokenBearer } from "../http";
import { userKey } from "../../shared/global";
import { Loading, QSpinnerGears } from "quasar";

const _getTipoCobrancas = async ({ page, size }) => {
  Loading.show();
  const res = await http
    .get(`/tipocobranca?page=${page}&size=${size}`, tokenBearer())
    .then((response) => response)
    .catch((error) => error);
  Loading.hide();
  return res;
};

const _getTipoCobrancabyID = async (payload) => {
  Loading.show();
  const res = await http
    .get(`/tipocobranca/${payload}`, tokenBearer())
    .then((response) => response)
    .catch((error) => error);
  Loading.hide();
  return res;
};
const _postTipoCobranca = async (payload) => {
  Loading.show();
  const res = await http
    .post(`/tipocobranca`, payload, tokenBearer())
    .then((response) => response)
    .catch((error) => error);
  Loading.hide();
  return res;
};

const _putTipoCobranca = async ({ id, payload }) => {
  Loading.show();
  const res = await http
    .put(`/tipocobranca/${id}`, payload, tokenBearer())
    .then((response) => response)
    .catch((error) => error);
  Loading.hide();
  return res;
};

const _deleteTipoCobranca = async (id) => {
  Loading.show();
  const res = await http
    .delete(`/tipocobranca/${id}`, tokenBearer())
    .then((response) => response)
    .catch((error) => error);
  Loading.hide();
  return res;
};

export default {
  _getTipoCobrancas,
  _getTipoCobrancabyID,
  _postTipoCobranca,
  _putTipoCobranca,
  _deleteTipoCobranca
};
//ideia de clean code
//service api
//store acessa service
//pagina acessa store
