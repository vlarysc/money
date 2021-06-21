import { http, tokenBearer } from "../http";
import { userKey } from "../../shared/global";
import { Loading, QSpinnerGears } from "quasar";

const _getFormaPagamentos = async ({ page, size }) => {
  Loading.show();
  const res = await http
    .get(`/formapagamentos?page=${page}&size=${size}`, tokenBearer())
    .then(response => response)
    .catch(error => error);
  Loading.hide();
  return res;
};

const _getFormaPagamentobyID = async payload => {
  Loading.show();
  const res = await http
    .get(`/formapagamentos/${payload}`, tokenBearer())
    .then(response => response)
    .catch(error => error);
  Loading.hide();
  return res;
};
const _postFormaPagamento = async payload => {
  Loading.show();
  const res = await http
    .post(`/formapagamentos`, payload, tokenBearer())
    .then(response => response)
    .catch(error => error);
  Loading.hide();
  return res;
};

const _putFormaPagamento = async ({ id, payload }) => {
  Loading.show();
  const res = await http
    .put(`/formapagamentos/${id}`, payload, tokenBearer())
    .then(response => response)
    .catch(error => error);
  Loading.hide();
  return res;
};

const _deleteFormaPagamento = async id => {
  Loading.show();
  const res = await http
    .delete(`/formapagamentos/${id}`, tokenBearer())
    .then(response => response)
    .catch(error => error);
  Loading.hide();
  return res;
};

export default {
  _getFormaPagamentos,
  _getFormaPagamentobyID,
  _postFormaPagamento,
  _putFormaPagamento,
  _deleteFormaPagamento
};
//ideia de clean code
//service api
//store acessa service
//pagina acessa store
