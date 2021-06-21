import { userKey } from "../../shared/global";

import { Loading, QSpinnerGears } from "quasar";

import { http, tokenBearer } from "../http";

const _getReligioes = async ({ page, size }) => {
  Loading.show();
  const res = await http
    .get(`/religioes?page=${page}&size=${size}`, tokenBearer())
    .then(response => response)
    .catch(error => error);
  Loading.hide();
  return res;
};

const _getReligiaobyID = async payload => {
  Loading.show();
  const res = await http
    .get(`/religioes/${payload}`, tokenBearer())
    .then(response => response)
    .catch(error => error);
  Loading.hide();
  return res;
};
const _postReligiao = async payload => {
  Loading.show();
  const res = await http
    .post(`/religioes`, payload, tokenBearer())
    .then(response => response)
    .catch(error => error);
  Loading.hide();
  return res;
};

const _putReligiao = async ({ id, payload }) => {
  Loading.show();
  const res = await http
    .put(`/religioes/${id}`, payload, tokenBearer())
    .then(response => response)
    .catch(error => error);
  Loading.hide();
  return res;
};

const _deleteReligiao = async id => {
  Loading.show();
  const res = await http
    .delete(`/religioes/${id}`, tokenBearer())
    .then(response => response)
    .catch(error => error);
  Loading.hide();
  return res;
};

export default {
  _getReligioes,
  _getReligiaobyID,
  _postReligiao,
  _putReligiao,
  _deleteReligiao
};
