import { userKey, showErrorToast, showSuccessToast } from "../../shared/global";
import { getField, updateField } from "vuex-map-fields";
import religiao from "../../services/modules/religiao.service";
import Router from "../../router/index";

export const namespaced = true;
export const state = {
  religioes: [],
  religiao: ""
};

export const getters = {
  getField
};

export const mutations = {
  updateField,
  SET_RELIGIOES: (state, religioes) => {
    state.religioes = religioes;
  },
  SET_RELIGIAO: (state, religiao) => {
    state.religiao = religiao;
  }
};

export const actions = {
  getReligioes: async ({ commit }, options) => {
    const religioesGet = await religiao._getReligioes(
      options || { page: 0, size: 99999 }
    );

    if (religioesGet.status != 200) {
      showErrorToast("Erro ao consultar religiao");
    } else commit("SET_RELIGIOES", religioesGet.data);
  },

  getReligiao: async ({ commit }, id) => {
    const religiaoGet = await religiao._getReligiaobyID(id);

    if (religiaoGet.status != 200) {
      showErrorToast("Erro ao consultar religiao");
    } else commit("SET_RELIGIAO", religiaoGet.data);
  },

  postReligiao: async ({ commit, dispatch }, payload) => {
    const religiaoPost = await religiao._postReligiao(payload);

    if (religiaoPost.status != 201) {
      showErrorToast("Erro ao adicionar religiao");
    }
  },

  putReligiao: async ({ commit, dispatch }, payload) => {
    const religiaoPut = await religiao._putReligiao(payload);

    if (religiaoPut.status != 200) {
      showErrorToast("Erro ao alterar religiao");
    }
  },

  deleteReligiao: async ({ commit, dispatch }, payload) => {
    const religiaoDel = await religiao._deleteReligiao(payload);

    if (religiaoDel.status != 200) {
      showErrorToast("Erro ao deletar religiao");
    }
  },

  addReligiao: async ({ commit }, religioes) => {
    commit("setAddReligiao", religioes);
  }
};
