import { userKey, showErrorToast, showSuccessToast } from "../../shared/global";
import { getField, updateField } from "vuex-map-fields";
import formapagamento from "../../services/modules/formapagamento.service";
import Router from "../../router/index";

export const namespaced = true;
export const state = {
  formapagamentos: [],
  formapagamento: ""
};

export const getters = {
  getField
};

export const mutations = {
  updateField,
  SET_FORMAPAGAMENTOS: (state, formapagamentos) => {
    state.formapagamentos = formapagamentos;
  },
  SET_FORMAPAGAMENTO: (state, formapagamento) => {
    state.formapagamento = formapagamento;
  },
  setAddFormaPagamento: (state, formapagamento) => {
    !formapagamento.id
      ? state.formapagamento.empresa.push(formapagamento)
      : null;
  }
};

export const actions = {
  getFormaPagamentos: async ({ commit }, options) => {
    const tipo = await formapagamento._getFormaPagamentos(
      options || { page: 0, size: 99999 }
    );

    if (tipo.status != 200) {
      showErrorToast("Erro ao consultar For de pagamento");
    } else commit("SET_FORMAPAGAMENTOS", tipo.data);
  },

  getFormaPagamento: async ({ commit }, id) => {
    const formapagamentoGet = await formapagamento._getFormaPagamentobyID(id);

    if (formapagamentoGet.status != 200) {
      showErrorToast("Erro ao consultar For de pagamento");
    } else commit("SET_FORMAPAGAMENTO", formapagamentoGet.data);
  },

  postFormaPagamento: async ({ commit, dispatch }, payload) => {
    const formapagamentoPost = await formapagamento._postFormaPagamento(
      payload
    );

    if (formapagamentoPost.status != 200) {
      showErrorToast("Erro ao adicionar For de pagamento");
    }
  },

  putFormaPagamento: async ({ commit, dispatch }, payload) => {
    const formapagamentoPut = await formapagamento._putFormaPagamento(payload);

    if (formapagamentoPut.status != 200) {
      showErrorToast("Erro ao alterar For de pagamento");
    }
  },

  deleteFormaPagamento: async ({ commit, dispatch }, payload) => {
    const formapagamentoDel = await formapagamento._deleteFormaPagamento(
      payload
    );

    if (formapagamentoDel.status != 200) {
      showErrorToast("Erro ao deletar For de pagamento");
    }
  },

  addFormaPagamento: async ({ commit }, formapagamentos) => {
    commit("setAddFormaPagamento", formapagamentos);
  }
};
