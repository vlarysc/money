import { userKey, showErrorToast, showSuccessToast } from "../../shared/global";
import { getField, updateField } from "vuex-map-fields";
import parentesco from "../../services/modules/parentesco.service";
import Router from "../../router/index";

export const namespaced = true;
export const state = {
  parentescos: [],
  parentesco: ""
};

export const getters = {
  getField
};

export const mutations = {
  updateField,
  SET_PARENTESCOS: (state, parentescos) => {
    state.parentescos = parentescos;
  },
  SET_PARENTESCO: (state, parentesco) => {
    state.parentesco = parentesco;
  }
};

export const actions = {
  getParentescos: async ({ commit }, options) => {
    const tipo = await parentesco._getParentescos(
      options || { page: 0, size: 99999 }
    );

    if (tipo.status != 200) {
      showErrorToast("Erro ao consultar For de pagamento");
    } else commit("SET_PARENTESCOS", tipo.data);
  },

  getParentesco: async ({ commit }, id) => {
    const parentescoGet = await parentesco._getParentescobyID(id);

    if (parentescoGet.status != 200) {
      showErrorToast("Erro ao consultar For de pagamento");
    } else commit("SET_PARENTESCO", parentescoGet.data);
  },

  postParentesco: async ({ commit, dispatch }, payload) => {
    const parentescoPost = await parentesco._postParentesco(payload);

    if (parentescoPost.status != 200) {
      showErrorToast("Erro ao adicionar For de pagamento");
    }
  },

  putParentesco: async ({ commit, dispatch }, payload) => {
    const parentescoPut = await parentesco._putParentesco(payload);

    if (parentescoPut.status != 200) {
      showErrorToast("Erro ao alterar For de pagamento");
    }
  },

  deleteParentesco: async ({ commit, dispatch }, payload) => {
    const parentescoDel = await parentesco._deleteParentesco(payload);

    if (parentescoDel.status != 200) {
      showErrorToast("Erro ao deletar For de pagamento");
    }
  },

  addParentesco: async ({ commit }, parentescos) => {
    commit("setAddParentesco", parentescos);
  }
};
