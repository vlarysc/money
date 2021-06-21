import { userKey, showErrorToast, showSuccessToast } from "../../shared/global";

import tipocobranca from "../../services/modules/tipocobranca.service";
import Router from "../../router/index";

export const namespaced = true;
export const state = {
  tipocobrancas: [],
  tipocobranca: ""
};

export const getters = {};

export const mutations = {
  SET_TIPOCOBRANCAS: (state, tipocobrancas) => {
    state.tipocobrancas = tipocobrancas;
  },
  SET_TIPOCOBRANCA: (state, tipocobranca) => {
    state.tipocobranca = tipocobranca;
  }
};
//commit - executa um mutation
//dispatch - executa uma action
export const actions = {
  getTipoCobrancas: async ({ commit }, options) => {
    const tipo = await tipocobranca._getTipoCobrancas(options || {page:0,size:99999});
    //console.log(tipo);
    // showSuccessToast("Erro ao consultas o tipo de cobranca");
    if (tipo.status != 200) {
      showErrorToast("Erro ao consultar o tipo de cobrança");
    } else commit("SET_TIPOCOBRANCAS", tipo.data);
  },

  //buscar por id
  getTipoCobranca: async ({ commit }, id) => {
    const tipoCobrancaGet = await tipocobranca._getTipoCobrancabyID(id);
    // console.log(tipoCobrancaGet);
    if (tipoCobrancaGet.status != 200) {
      showErrorToast("Erro ao consultar o tipo de cobrança");
    } else commit("SET_TIPOCOBRANCA", tipoCobrancaGet.data);
  },

  //salvar post
  //{descricao:"nova descricao"}
  postTipoCobranca: async ({ commit, dispatch }, payload) => {
    const tipoCobrancaPost = await tipocobranca._postTipoCobranca(payload);
    //console.log(tipoCobrancaPost);
    if (tipoCobrancaPost.status != 201) {
      showErrorToast("Erro ao adicionar o tipo de cobrança");
    }
  },
  //alterar put
  // {id : 1 , payload: {descricao:"nova descricao"}}
  putTipoCobranca: async ({ commit, dispatch }, payload) => {
    const tipoCobrancaPut = await tipocobranca._putTipoCobranca(payload);
    //console.log(tipoCobrancaPut);
    if (tipoCobrancaPut.status != 200) {
      showErrorToast("Erro ao alterar o tipo de cobrança");
    }
  },

  deleteTipoCobranca: async ({ commit, dispatch }, payload) => {
    const tipoCobrancaDel = await tipocobranca._deleteTipoCobranca(payload);

    if (tipoCobrancaDel.status != 200) {
      showErrorToast("Erro ao deletar o tipo de cobrança");
    }
  }
  //delete 1
};
