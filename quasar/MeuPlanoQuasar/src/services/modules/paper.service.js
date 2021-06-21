import { userKey } from "../../shared/global";

import { Loading, QSpinnerGears } from "quasar";

import { http, tokenBearer } from "../http";

const _getPapers = async ({ page, size }) => {
  Loading.show();
  const res = await http
    .get(`/papers?page=${page}&size=${size}`, tokenBearer())
    .then(response => response)
    .catch(error => error);
  Loading.hide();
  return res;
};

const _getPaperbyID = async payload => {
  Loading.show();
  const res = await http
    .get(`/papers/${payload}`, tokenBearer())
    .then(response => response)
    .catch(error => error);
  Loading.hide();
  return res;
};
const _postPaper = async payload => {
  Loading.show();
  const res = await http
    .post(`/papers`, payload, tokenBearer())
    .then(response => response)
    .catch(error => error);
  Loading.hide();
  return res;
};

const _putPaper = async ({ id, payload }) => {
  Loading.show();
  const res = await http
    .put(`/papers/${id}`, payload, tokenBearer())
    .then(response => response)
    .catch(error => error);
  Loading.hide();
  return res;
};

const _deletePaper = async id => {
  Loading.show();
  const res = await http
    .delete(`/papers/${id}`, tokenBearer())
    .then(response => response)
    .catch(error => error);
  Loading.hide();
  return res;
};

export default {
  _getPapers,
  _getPaperbyID,
  _postPaper,
  _putPaper,
  _deletePaper
};
