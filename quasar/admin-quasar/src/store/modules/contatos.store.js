import { userKey, showErrorToast, showSuccessToast } from "../../shared/global";
import { getField, updateField } from "vuex-map-fields";

import contato from "../../services/modules/contatos.service";
import Router from "../../router/index";

export const namespaced = true;

export const state = {
  contatos: [],
  contato: ""
};

export const getters = {
  getField
};

export const mutations = {
  updateField,
  SET_CONTATOS: (state, contatos) => {
    state.contatos = contatos;
  },
  SET_CONTATO: (state, contato) => {
    state.contato = contato;
  },
  setAddContato: (state, contato) => {
    !contato.id ? state.contato.pessoa.push(contato) : null;
  }
};
//commit - executa um mutation
//dispatch - executa uma action
export const actions = {
  getContatos: async ({ commit }, id) => {
    const contatos = await contato._getContatos({ id, page: 0, size: 999999 });

    if (contatos.status != 200) {
      showErrorToast("Erro ao consultar o contato");
    } else commit("SET_CONTATOS", contatos.data);
  },

  //buscar por id
  getContato: async ({ commit }, id) => {
    const contatoGet = await contato._getContatobyID(id);
    // console.log(contatoGet);
    if (contatoGet.status != 200) {
      showErrorToast("Erro ao consultar o contato");
    } else commit("SET_CONTATO", contatoGet.data);
  },

  //salvar post
  //{descricao:"nova descricao"}
  postContato: async ({ commit, dispatch }, payload) => {
    console.log("chamou", payload);
    const contatoPost = await contato._postContato(payload);
    if (contatoPost.status != 201) {
      const erro = contatoPost.data;
      showErrorToast("Erro ao adicionar o contato \n" + erro.message);
    }
  },
  //alterar put
  // {id : 1 , payload: {descricao:"nova descricao"}}
  putContato: async ({ commit, dispatch }, payload) => {
    const contatoPut = await contato._putContato(payload);
    //console.log(contatoPut);
    if (contatoPut.status != 200) {
      erro = contatoPut.data;
      showErrorToast("Erro ao alterar o contato");
    }
  },

  deleteContato: async ({ commit, dispatch }, payload) => {
    const contatoDel = await contato._deleteContato(payload);

    if (contatoDel.status != 200) {
      showErrorToast("Erro ao deletar o contato");
    }
  },
  //delete 1

  setContato: ({ commit }, contato) => {
    commit("SET_CONTATO", contato);
  },
  addContato: async ({ commit }, contatos) => {
    commit("setAddContato", contatos);
  }
};
