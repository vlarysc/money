import { userKey, showErrorToast, showSuccessToast } from "../../shared/global";
import { getField, updateField } from "vuex-map-fields";
import grupo from "../../services/modules/grupo.service";
import Router from "../../router/index";

export const namespaced = true;
export const state = {
  grupos: [],
  grupo: ""
};

export const getters = {
  getField
};

export const mutations = {
  updateField,
  SET_GRUPOS: (state, grupos) => {
    state.grupos = grupos;
  },
  SET_GRUPO: (state, grupo) => {
    state.grupo = grupo;
  }
};

export const actions = {
  getGrupos: async ({ commit }, options) => {
    const gruposGet = await grupo._getGrupos(
      options || { page: 0, size: 99999 }
    );

    if (gruposGet.status != 200) {
      showErrorToast("Erro ao consultar Grupo");
    } else commit("SET_GRUPOS", gruposGet.data);
  },

  getGrupo: async ({ commit }, id) => {
    const grupoGet = await grupo._getGrupobyID(id);

    if (grupoGet.status != 200) {
      showErrorToast("Erro ao consultar Grupo");
    } else commit("SET_GRUPO", grupoGet.data);
  },

  postGrupo: async ({ commit, dispatch }, payload) => {
    const grupoPost = await grupo._postGrupo(payload);

    if (grupoPost.status != 200) {
      showErrorToast("Erro ao adicionar Grupo");
    }
  },

  putGrupo: async ({ commit, dispatch }, payload) => {
    const grupoPut = await grupo._putGrupo(payload);

    if (grupoPut.status != 200) {
      showErrorToast("Erro ao alterar Grupo");
    }
  },

  deleteGrupo: async ({ commit, dispatch }, payload) => {
    const grupoDel = await grupo._deleteGrupo(payload);

    if (grupoDel.status != 200) {
      showErrorToast("Erro ao deletar Grupo");
    }
  },
  //delete 1
  addGrupo: async ({ commit }, grupos) => {
    commit("setAddGrupo", grupos);
  }
};
