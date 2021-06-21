import { userKey, showErrorToast, showSuccessToast } from "../../shared/global";
import { getField, updateField } from "vuex-map-fields";
import plano from "../../services/modules/plano.service";
import Router from "../../router/index";

export const namespaced = true;
export const state = {
  planos: [],
  plano: ""
};

export const getters = {
  getField
};

export const mutations = {
  updateField,
  SET_PLANOS: (state, planos) => {
    state.planos = planos;
  },
  SET_PLANO: (state, plano) => {
    state.plano = plano;
  },
  setAddPlano: (state, plano) => {
    !plano.id ? state.plano.empresa.push(plano) : null;
  }
};
//commit - executa um mutation
//dispatch - executa uma action
export const actions = {
  getPlanos: async ({ commit }, options) => {
    const tipo = await plano._getPlanos(options || { page: 0, size: 99999 });

    if (tipo.status != 200) {
      showErrorToast("Erro ao consultar Plano");
    } else commit("SET_PLANOS", tipo.data);
  },

  //buscar por id
  getPlano: async ({ commit }, id) => {
    const planoGet = await plano._getPlanobyID(id);
    // console.log(planoGet);
    if (planoGet.status != 200) {
      showErrorToast("Erro ao consultar Plano");
    } else commit("SET_PLANO", planoGet.data);
  },

  //salvar post
  //{descricao:"nova descricao"}
  postPlano: async ({ commit, dispatch }, payload) => {
    const planoPost = await plano._postPlano(payload);
    //console.log(planoPost);
    if (planoPost.status != 200) {
      showErrorToast("Erro ao adicionar Plano");
    }
  },
  //alterar put
  // {id : 1 , payload: {descricao:"nova descricao"}}
  putPlano: async ({ commit, dispatch }, payload) => {
    const planoPut = await plano._putPlano(payload);
    //console.log(planoPut);
    if (planoPut.status != 200) {
      showErrorToast("Erro ao alterar Plano");
    }
  },

  deletePlano: async ({ commit, dispatch }, payload) => {
    const planoDel = await plano._deletePlano(payload);

    if (planoDel.status != 200) {
      showErrorToast("Erro ao deletar Plano");
    }
  },
  //delete 1
  addPlano: async ({ commit }, planos) => {
    commit("setAddPlano", planos);
  }
};
