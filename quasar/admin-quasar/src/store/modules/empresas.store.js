import { userKey, showErrorToast, showSuccessToast } from "../../shared/global";
import { getField, updateField } from "vuex-map-fields";

import empresa from "../../services/modules/empresas.service";
import enderecoService from "../../services/modules/enderecos.service";
import Router from "../../router/index";

export const namespaced = true;
export const state = {
  empresas: [],
  empresa: "",
  endereco: "",
  erro: {},
  pessoa: {}
};

export const getters = {
  getField
};

export const mutations = {
  updateField,
  SET_EMPRESAS: (state, empresas) => {
    state.empresas = empresas;
  },
  SET_EMPRESA: (state, empresa) => {
    state.empresa = empresa;
  },
  SET_PESSOA: (state, pessoa) => {
    state.pessoa = pessoa;
  },
  SET_ENDERECOS: (state, endereco) => {
    state.endereco = endereco;
  },
  setAddEndereco: (state, endereco) => {
    !endereco.id
      ? state.empresa.pessoa.enderecos.push(endereco)
      : (state.empresa.pessoa.enderecos = state.empresa.pessoa.enderecos.map((end) =>
          end.id == endereco.id ? endereco : end
        ));
  },
  setDeleteEndereco: async (state, endereco) => {
    console.log("setdelete", endereco);
    !!endereco.id ? await enderecoService._deleteEnderecos(endereco.id) : null;
    state.empresa.pessoa.enderecos = state.empresa.pessoa.enderecos.filter((end) => {
      return !(end.cep == endereco.cep && end.lagradouro == endereco.lagradouro && end.numero == endereco.numero);
    });
  }
};
//commit - executa um mutation
//dispatch - executa uma action
export const actions = {
  getEmpresas: async ({ commit }, options) => {
    const empresas = await empresa._getEmpresas(options || { page: 0, size: 999999 });

    if (empresas.status != 200) {
      showErrorToast("Erro ao consultar o tipo de cobrança");
    } else commit("SET_EMPRESAS", empresas.data);
  },

  //buscar por id
  getEmpresa: async ({ commit }, id) => {
    const empresaGet = await empresa._getEmpresabyID(id);
    // console.log(empresaGet);
    if (empresaGet.status != 200) {
      showErrorToast("Erro ao consultar o tipo de cobrança");
    } else commit("SET_EMPRESA", empresaGet.data);
  },

  getEmpresaByDocumento1: async ({ commit }, documento1) => {
    const empresaGet = await empresa._getEmpresabyDocumento1(documento1);
    // console.log(empresaGet);
    if (empresaGet.status != 200) {
      showErrorToast("Erro ao consultar o tipo de cobrança");
    } else commit("SET_EMPRESA", empresaGet.data.content[0]);
  },

  getPessoaByDocumento1: async ({ commit }, documento1) => {
    const pessoaGet = await empresa._getPessoabyDocumento1(documento1);
    // console.log(empresaGet);
    if (pessoaGet.status != 200) {
      showErrorToast("Erro ao consultar o tipo de cobrança");
    } else commit("SET_PESSOA", pessoaGet.data.content[0]);
  },

  //salvar post
  //{descricao:"nova descricao"}
  postEmpresa: async ({ commit, dispatch }, payload) => {
    const empresaPost = await empresa._postEmpresa(payload);
    if (empresaPost.status != 201) {
      const erro = empresaPost.data;
      console.log(erro);
      showErrorToast("Erro ao adicionar o tipo de cobrança \n" + erro.message);
    }
  },
  //alterar put
  // {id : 1 , payload: {descricao:"nova descricao"}}
  putEmpresa: async ({ commit, dispatch }, payload) => {
    const empresaPut = await empresa._putEmpresa(payload);
    //console.log(empresaPut);
    if (empresaPut.status != 200) {
      const erro = empresaPut.data;
      showErrorToast("Erro ao alterar o tipo de cobrança \n" + erro.message);
    }
  },

  deleteEmpresa: async ({ commit, dispatch }, payload) => {
    const empresaDel = await empresa._deleteEmpresa(payload);

    if (empresaDel.status != 200) {
      showErrorToast("Erro ao deletar o tipo de cobrança");
    }
  },
  //delete 1

  setEmpresa: ({ commit }, empresa) => {
    commit("SET_EMPRESA", empresa);
  },

  addEndereco: async ({ commit }, enderecos) => {
    commit("setAddEndereco", enderecos);
  },

  deleteEndereco: async ({ commit }, enderecos) => {
    console.log("delete");
    commit("setDeleteEndereco", enderecos);
  }
};
