import { userKey } from "../../shared/global";

import { Loading, QSpinnerGears } from "quasar";

import { http, tokenBearer } from "../http";

const _getRoles = async ({ page, size }) => {
  Loading.show();
  const res = await http
    .get(`/roles?page=${page}&size=${size}`, tokenBearer())
    .then(response => response)
    .catch(error => error);
  Loading.hide();
  return res;
};

const _getRolebyID = async payload => {
  Loading.show();
  const res = await http
    .get(`/roles/${payload}`, tokenBearer())
    .then(response => response)
    .catch(error => error);
  Loading.hide();
  return res;
};
const _postRole = async payload => {
  Loading.show();
  const res = await http
    .post(`/roles`, payload, tokenBearer())
    .then(response => response)
    .catch(error => error);

  Loading.hide();
  return res;
};

const _putRole = async ({ id, payload }) => {
  Loading.show();
  const res = await http
    .put(`/roles/${id}`, payload, tokenBearer())
    .then(response => response)
    .catch(error => error);
  Loading.hide();
  return res;
};

const _deleteRole = async id => {
  Loading.show();
  const res = await http
    .delete(`/roles/${id}`, tokenBearer())
    .then(response => response)
    .catch(error => error);
  Loading.hide();
  return res;
};

export default {
  _getRoles,
  _getRolebyID,
  _postRole,
  _putRole,
  _deleteRole
};
