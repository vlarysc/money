import { getField, updateField } from "vuex-map-fields";
import { userKey, showErrorToast, showSuccessToast } from "../../shared/global";
import filial from "../../services/modules/filial.service";
import enderecoService from "../../services/modules/enderecos.service";

import Router from "../../router/index";

export const namespaced = true;
export const state = {
  filiais: [],
  filial: {},
  endereco: "",
  erro: {},
  pessoa: {}
};

export const getters = {
  getField
};

export const mutations = {
  updateField,
  SET_FILIAIS: (state, filiais) => {
    state.filiais = filiais;
  },
  SET_FILIAL: (state, filial) => {
    state.filial = filial;
  },
  SET_PESSOA: (state, pessoa) => {
    state.pessoa = pessoa;
  },
  SET_ENDERECOS: (state, endereco) => {
    state.endereco = endereco;
  },
  setAddEndereco: (state, endereco) => {
    !endereco.id
      ? state.filial.pessoa.enderecos.push(endereco)
      : (state.filial.pessoa.enderecos = state.filial.pessoa.enderecos.map(
          end => (end.id == endereco.id ? endereco : end)
        ));
  },
  setDeleteEndereco: async (state, endereco) => {
    !!endereco.id ? await enderecoService._deleteEnderecos(endereco.id) : null;
    state.filial.pessoa.enderecos = state.filial.pessoa.enderecos.filter(
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
//commit - executa um mutation
//dispatch - executa uma action
export const actions = {
  getFiliais: async ({ commit }, options) => {
    const filiais = await filial._getFiliais(
      options || { page: 0, size: 999999 }
    );

    if (filiais.status != 200) {
      showErrorToast("Erro ao consultar o tipo de cobrança");
    } else commit("SET_FILIAIS", filiais.data);
  },

  //buscar por id
  getFilial: async ({ commit }, id) => {
    const filialGet = await filial._getFilialbyID(id);
    // console.log(filialGet);
    if (filialGet.status != 200) {
      showErrorToast("Erro ao consultar o tipo de cobrança");
    } else commit("SET_FILIAL", filialGet.data);
  },
  getFilialByDocumento1: async ({ commit }, documento1) => {
    const filialGet = await filial._getFilialbyDocumento1(documento1);
    // console.log(filialGet);
    if (filialGet.status != 200) {
      showErrorToast("Erro ao consultar o tipo de cobrança");
    } else commit("SET_FILIAL", filialGet.data.results[0]);
  },

  getPessoaByDocumento1: async ({ commit }, documento1) => {
    const pessoaGet = await filial._getPessoabyDocumento1(documento1);

    // console.log(filialGet);
    if (pessoaGet.status != 200) {
      showErrorToast("Erro ao consultar o tipo de cobrança");
    } else
      commit(
        "SET_PESSOA",
        pessoaGet.data.results != [] ? pessoaGet.data.results[0] : null
      );
  },

  //salvar post
  //{descricao:"nova descricao"}
  postFilial: async ({ commit, dispatch }, payload) => {
    const filialPost = await filial._postFilial(payload);
    if (filialPost.status != 201) {
      const erro = filialPost.data;
      showErrorToast(
        "Erro ao adicionar a filial \n" + erro.nativeError.sqlMessage
      );
    }
  },
  //alterar put
  // {id : 1 , payload: {descricao:"nova descricao"}}
  putFilial: async ({ commit, dispatch }, payload) => {
    const filialPut = await filial._putFilial(payload);
    //console.log(filialPut);
    if (filialPut.status != 200 && filialPut.status != 201) {
      const erro = filialPut.data;
      showErrorToast(
        "Erro ao alterar a filial \n" + erro.nativeError.sqlMessage
      );
    }
  },

  deleteFilial: async ({ commit, dispatch }, payload) => {
    const filialDel = await filial._deleteFilial(payload);

    if (filialDel.status != 200 && filialPut.status != 201) {
      showErrorToast(
        "Erro ao deletar a filial \n" + filialDel.data.nativeError.sqlMessage
      );
    }
  },
  //delete 1

  setFilial: ({ commit }, filial) => {
    commit("SET_FILIAL", filial);
  },
  addEndereco: async ({ commit }, enderecos) => {
    commit("setAddEndereco", enderecos);
  },

  deleteEndereco: async ({ commit }, enderecos) => {
    commit("setDeleteEndereco", enderecos);
  }
};
