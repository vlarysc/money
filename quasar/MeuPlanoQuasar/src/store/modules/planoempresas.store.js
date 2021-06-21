import { userKey, showErrorToast, showSuccessToast } from "../../shared/global";
import { getField, updateField } from "vuex-map-fields";
import planoempresa from "../../services/modules/planoempresa.service";
import enderecoService from "../../services/modules/enderecos.service";
import Router from "../../router/index";

export const namespaced = true;
export const state = {
  planoempresas: [],
  planoempresa: {},
  endereco: "",
  erro: {},
  pessoa: {}
};

export const getters = {
  getField
};

export const mutations = {
  updateField,
  SET_PLANOEMPRESAS: (state, planoempresas) => {
    state.planoempresas = planoempresas;
  },
  SET_PLANOEMPRESA: (state, planoempresa) => {
    state.planoempresa = planoempresa;
  },
  setAddPlanoEmpresa: (state, planoempresa) => {
    !planoempresa.id ? state.planoempresa.empresa.push(planoempresa) : null;
  },
  SET_PESSOA: (state, pessoa) => {
    state.pessoa = pessoa;
  },
  SET_ENDERECOS: (state, endereco) => {
    state.endereco = endereco;
  },
  setAddEndereco: (state, endereco) => {
    !endereco.id
      ? state.planoempresa.pessoa.enderecos.push(endereco)
      : (state.planoempresa.pessoa.enderecos = state.planoempresa.pessoa.enderecos.map(
          end => (end.id == endereco.id ? endereco : end)
        ));
  },
  setDeleteEndereco: async (state, endereco) => {
    !!endereco.id ? await enderecoService._deleteEnderecos(endereco.id) : null;
    state.planoempresa.pessoa.enderecos = state.planoempresa.pessoa.enderecos.filter(
      end => {
        return !(
          end.cep == endereco.cep &&
          end.logradouro == endereco.logradouro &&
          end.numero == endereco.numero
        );
      }
    );
  }
};

export const actions = {
  getPlanoEmpresas: async ({ commit }, options) => {
    const tipo = await planoempresa._getPlanoEmpresas(
      options || { page: 0, size: 99999 }
    );

    if (tipo.status != 200) {
      showErrorToast("Erro ao consultar For de pagamento");
    } else commit("SET_PLANOEMPRESAS", tipo.data);
  },

  getPlanoEmpresa: async ({ commit }, id) => {
    const planoempresaGet = await planoempresa._getPlanoEmpresabyID(id);

    if (planoempresaGet.status != 200) {
      showErrorToast("Erro ao consultar For de pagamento");
    } else commit("SET_PLANOEMPRESA", planoempresaGet.data);
  },
  getPlanoEmpresaByDocumento1: async ({ commit }, documento1) => {
    const planoempresaGet = await planoempresa._getPlanoEmpresabyDocumento1(
      documento1
    );
    // console.log(filialGet);
    if (planoempresaGet.status != 200) {
      showErrorToast("Erro ao consultar o tipo de cobrança");
    } else commit("SET_PLANOEMPRESA", planoempresaGet.data.results[0]);
  },

  postPlanoEmpresa: async ({ commit, dispatch }, payload) => {
    const planoempresaPost = await planoempresa._postPlanoEmpresa(payload);

    if (planoempresaPost.status != 201) {
      showErrorToast("Erro ao adicionar For de pagamento");
    }
  },

  putPlanoEmpresa: async ({ commit, dispatch }, payload) => {
    const planoempresaPut = await planoempresa._putPlanoEmpresa(payload);

    if (planoempresaPut.status != 200) {
      showErrorToast("Erro ao alterar For de pagamento");
    }
  },

  deletePlanoEmpresa: async ({ commit, dispatch }, payload) => {
    const planoempresaDel = await planoempresa._deletePlanoEmpresa(payload);

    if (planoempresaDel.status != 200) {
      showErrorToast("Erro ao deletar For de pagamento");
    }
  },

  addPlanoEmpresa: async ({ commit }, planoempresas) => {
    commit("setAddPlanoEmpresa", planoempresas);
  },
  setPlanoEmpresa: ({ commit }, planoempresa) => {
    commit("SET_PLANOEMPRESA", planoempresa);
  },
  addEndereco: async ({ commit }, enderecos) => {
    commit("setAddEndereco", enderecos);
  },

  deleteEndereco: async ({ commit }, enderecos) => {
    commit("setDeleteEndereco", enderecos);
  }
};
