import { http, tokenBearer } from "../http";
import { userKey } from "../../shared/global";
import { Loading, QSpinnerGears } from "quasar";

const _getEstadoCivils = async ({ page, size }) => {
  Loading.show();
  const res = await http
    .get(`/estadocivil?page=${page}&size=${size}`, tokenBearer())
    .then(response => response)
    .catch(error => error);
  Loading.hide();
  return res;
};

const _getEstadoCivilbyID = async payload => {
  Loading.show();
  const res = await http
    .get(`/estadocivil/${payload}`, tokenBearer())
    .then(response => response)
    .catch(error => error);
  Loading.hide();
  return res;
};
const _postEstadoCivil = async payload => {
  Loading.show();
  const res = await http
    .post(`/estadocivil`, payload, tokenBearer())
    .then(response => response)
    .catch(error => error);
  Loading.hide();
  return res;
};

const _putEstadoCivil = async ({ id, payload }) => {
  Loading.show();
  const res = await http
    .put(`/estadocivil/${id}`, payload, tokenBearer())
    .then(response => response)
    .catch(error => error);
  Loading.hide();
  return res;
};

const _deleteEstadoCivil = async id => {
  Loading.show();
  const res = await http
    .delete(`/estadocivil/${id}`, tokenBearer())
    .then(response => response)
    .catch(error => error);
  Loading.hide();
  return res;
};

export default {
  _getEstadoCivils,
  _getEstadoCivilbyID,
  _postEstadoCivil,
  _putEstadoCivil,
  _deleteEstadoCivil
};
