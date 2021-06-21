import { http, tokenBearer } from "../http";
import { userKey } from "../../shared/global";
import { Loading, QSpinnerGears } from "quasar";

const _deleteEnderecos = async (id) => {
  Loading.show();
  const res = await http
    .delete(`/endereco/${id}`, tokenBearer())
    .then((response) => response)
    .catch((error) => error);
  Loading.hide();
  return res;
};

export default {
  _deleteEnderecos
};
//ideia de clean code
//service api
//store acessa service
//pagina acessa store
