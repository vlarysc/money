import { userKey, showErrorToast, showSuccessToast } from "../../shared/global";
import { getField, updateField } from "vuex-map-fields";
import estadocivil from "../../services/modules/estadocivil.service";
import Router from "../../router/index";

export const namespaced = true;
export const state = {
  estadocivils: [],
  estadocivil: ""
};

export const getters = {
  getField
};

export const mutations = {
  updateField,
  SET_ESTADOCIVILS: (state, estadocivils) => {
    state.estadocivils = estadocivils;
  },
  SET_ESTADOCIVIL: (state, estadocivil) => {
    state.estadocivil = estadocivil;
  }
};

export const actions = {
  getEstadoCivils: async ({ commit }, options) => {
    const tipo = await estadocivil._getEstadoCivils(
      options || { page: 0, size: 99999 }
    );

    if (tipo.status != 200) {
      showErrorToast("Erro ao consultar For de pagamento");
    } else commit("SET_ESTADOCIVILS", tipo.data);
  },

  getEstadoCivil: async ({ commit }, id) => {
    const estadocivilGet = await estadocivil._getEstadoCivilbyID(id);

    if (estadocivilGet.status != 200) {
      showErrorToast("Erro ao consultar For de pagamento");
    } else commit("SET_ESTADOCIVIL", estadocivilGet.data);
  },

  postEstadoCivil: async ({ commit, dispatch }, payload) => {
    const estadocivilPost = await estadocivil._postEstadoCivil(payload);

    if (estadocivilPost.status != 200) {
      showErrorToast("Erro ao adicionar For de pagamento");
    }
  },

  putEstadoCivil: async ({ commit, dispatch }, payload) => {
    const estadocivilPut = await estadocivil._putEstadoCivil(payload);

    if (estadocivilPut.status != 200) {
      showErrorToast("Erro ao alterar For de pagamento");
    }
  },

  deleteEstadoCivil: async ({ commit, dispatch }, payload) => {
    const estadocivilDel = await estadocivil._deleteEstadoCivil(payload);

    if (estadocivilDel.status != 200) {
      showErrorToast("Erro ao deletar For de pagamento");
    }
  },

  addEstadoCivil: async ({ commit }, estadocivils) => {
    commit("setAddEstadoCivil", estadocivils);
  }
};
