import { http, tokenBearer } from "../http";
import { userKey } from "../../shared/global";
import { Loading, QSpinnerGears } from "quasar";

const _getPlanoEmpresas = async ({ page, size }) => {
  Loading.show();
  const res = await http
    .get(`/planoempresas?page=${page}&size=${size}`, tokenBearer())
    .then(response => response)
    .catch(error => error);
  Loading.hide();
  return res;
};

const _getPlanoEmpresabyID = async payload => {
  Loading.show();
  const res = await http
    .get(`/planoempresas/${payload}`, tokenBearer())
    .then(response => response)
    .catch(error => error);
  Loading.hide();
  return res;
};

const _getPlanoEmpresabyDocumento1 = async payload => {
  Loading.show();

  const res = await http
    .get(`/planoempresas?documento=${payload}`, tokenBearer())
    .then(response => response)
    .catch(error => error);
  Loading.hide();
  return res;
};

const _postPlanoEmpresa = async payload => {
  Loading.show();
  const res = await http
    .post(`/planoempresas`, payload, tokenBearer())
    .then(response => response)
    .catch(error => error);
  Loading.hide();
  return res;
};

const _putPlanoEmpresa = async ({ id, payload }) => {
  Loading.show();
  const res = await http
    .put(`/planoempresas/${id}`, payload, tokenBearer())
    .then(response => response)
    .catch(error => error);
  Loading.hide();
  return res;
};

const _deletePlanoEmpresa = async id => {
  Loading.show();
  const res = await http
    .delete(`/planoempresas/${id}`, tokenBearer())
    .then(response => response)
    .catch(error => error);
  Loading.hide();
  return res;
};

export default {
  _getPlanoEmpresas,
  _getPlanoEmpresabyID,
  _postPlanoEmpresa,
  _putPlanoEmpresa,
  _deletePlanoEmpresa,
  _getPlanoEmpresabyDocumento1
};
//ideia de clean code
//service api
//store acessa service
//pagina acessa store
