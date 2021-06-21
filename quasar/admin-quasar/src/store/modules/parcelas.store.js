import { userKey, showErrorToast, showSuccessToast } from "../../shared/global";
import { getField, updateField } from "vuex-map-fields";

import parcela from "../../services/modules/parcelas.service";
import Router from "../../router/index";

export const namespaced = true;

export const state = {
  parcelas: [],
  parcela: ""
};

export const getters = {
  getField
};

export const mutations = {
  updateField,
  SET_PARCELAS: (state, parcelas) => {
    state.parcelas = parcelas;
  },
  SET_PARCELA: (state, parcela) => {
    state.parcela = parcela;
  },
  setAddParcela: (state, parcela) => {
    !parcela.id ? state.parcela.empresa.push(parcela) : null;
  }
};
//commit - executa um mutation
//dispatch - executa uma action
export const actions = {
  getParcelas: async ({ commit }, id) => {
    const parcelas = await parcela._getParcelas({ id, page: 0, size: 999999 });

    if (parcelas.status != 200) {
      showErrorToast("Erro ao consultar o parcela");
    } else commit("SET_PARCELAS", parcelas.data);
  },

  //buscar por id
  getParcela: async ({ commit }, id) => {
    const parcelaGet = await parcela._getParcelabyID(id);
    // console.log(parcelaGet);
    if (parcelaGet.status != 200) {
      showErrorToast("Erro ao consultar o parcela");
    } else commit("SET_PARCELA", parcelaGet.data);
  },

  //salvar post
  //{descricao:"nova descricao"}
  postParcela: async ({ commit, dispatch }, payload) => {
    console.log("chamou", payload);
    const parcelaPost = await parcela._postParcela(payload);
    if (parcelaPost.status != 201) {
      const erro = parcelaPost.data;
      showErrorToast("Erro ao adicionar o parcela \n" + erro.message);
    }
  },
  //alterar put
  // {id : 1 , payload: {descricao:"nova descricao"}}
  putParcela: async ({ commit, dispatch }, payload) => {
    const parcelaPut = await parcela._putParcela(payload);
    //console.log(parcelaPut);
    if (parcelaPut.status != 200) {
      erro = parcelaPut.data;
      showErrorToast("Erro ao alterar o parcela");
    }
  },

  deleteParcela: async ({ commit, dispatch }, payload) => {
    const parcelaDel = await parcela._deleteParcela(payload);

    if (parcelaDel.status != 200) {
      showErrorToast("Erro ao deletar o parcela");
    }
  },
  //delete 1

  setParcela: ({ commit }, parcela) => {
    commit("SET_PARCELA", parcela);
  },
  addParcela: async ({ commit }, parcelas) => {
    commit("setAddParcela", parcelas);
  }
};
