import { getField, updateField } from "vuex-map-fields";
import { userKey, showErrorToast, showSuccessToast } from "../../shared/global";
import funcionario from "../../services/modules/funcionario.service";
import enderecoService from "../../services/modules/enderecos.service";

import Router from "../../router/index";

export const namespaced = true;
export const state = {
  funcionarios: [],
  funcionario: {},
  endereco: "",
  role: "",
  erro: {},
  pessoa: {}
};

export const getters = {
  getField
};

export const mutations = {
  updateField,
  SET_FUNCIONARIOS: (state, funcionarios) => {
    state.funcionarios = funcionarios;
  },
  SET_FUNCIONARIO: (state, funcionario) => {
    state.funcionario = funcionario;
  },
  SET_PESSOA: (state, pessoa) => {
    state.pessoa = pessoa;
  },
  SET_ENDERECOS: (state, endereco) => {
    state.endereco = endereco;
  },
  setAddEndereco: (state, endereco) => {
    !endereco.id
      ? state.funcionario.pessoa.enderecos.push(endereco)
      : (state.funcionario.pessoa.enderecos = state.funcionario.pessoa.enderecos.map(
          end => (end.id == endereco.id ? endereco : end)
        ));
  },

  updateRoles: (state, roles) => {
    if (roles.length > 0) {
      state.funcionario.roles = [];
      roles.forEach(element => {
        state.funcionario.roles.push({ role_id: element });
      });
    } else state.funcionario.roles = [];
  },
  setDeleteEndereco: async (state, endereco) => {
    console.log("setDelete", endereco);
    !!endereco.id ? await enderecoService._deleteEnderecos(endereco.id) : null;
    state.funcionario.pessoa.enderecos = state.funcionario.pessoa.enderecos.filter(
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
  getFuncionarios: async ({ commit }, options) => {
    const funcionarios = await funcionario._getFuncionarios(
      options || { page: 0, size: 999999 }
    );

    if (funcionarios.status != 200) {
      showErrorToast("Erro ao consultar o tipo de cobrança");
    } else commit("SET_FUNCIONARIOS", funcionarios.data);
  },

  //buscar por id
  getFuncionario: async ({ commit }, id) => {
    const funcionarioGet = await funcionario._getFuncionariobyID(id);
    // console.log(funcionarioGet);
    if (funcionarioGet.status != 200) {
      showErrorToast("Erro ao consultar o tipo de cobrança");
    } else commit("SET_FUNCIONARIO", funcionarioGet.data);
  },
  getFuncionarioByDocumento1: async ({ commit }, documento1) => {
    const funcionarioGet = await funcionario._getFuncionariobyDocumento1(
      documento1
    );
    // console.log(funcionarioGet);
    if (funcionarioGet.status != 200) {
      showErrorToast("Erro ao consultar o tipo de cobrança");
    } else commit("SET_FUNCIONARIO", funcionarioGet.data.results[0]);
  },

  getPessoaByDocumento1: async ({ commit }, documento1) => {
    const pessoaGet = await funcionario._getPessoabyDocumento1(documento1);
    // console.log(funcionarioGet);
    if (pessoaGet.status != 200) {
      showErrorToast("Erro ao consultar o tipo de cobrança");
    } else commit("SET_PESSOA", pessoaGet.data.results[0]);
  },

  //salvar post
  //{descricao:"nova descricao"}
  postFuncionario: async ({ commit, dispatch }, payload) => {
    const funcionarioPost = await funcionario._postFuncionario(payload);
    if (funcionarioPost.status != 201) {
      const erro = funcionarioPost.data;
      showErrorToast(
        "Erro ao adicionar a funcionario \n" + erro.nativeError.sqlMessage
      );
    }
  },
  //alterar put
  // {id : 1 , payload: {descricao:"nova descricao"}}
  putFuncionario: async ({ commit, dispatch }, payload) => {
    const funcionarioPut = await funcionario._putFuncionario(payload);
    //console.log(funcionarioPut);
    if (funcionarioPut.status != 200 && funcionarioPut.status != 201) {
      const erro = funcionarioPut.data;
      showErrorToast(
        "Erro ao alterar a funcionario \n" + erro.nativeError.sqlMessage
      );
    }
  },

  deleteFuncionario: async ({ commit, dispatch }, payload) => {
    const funcionarioDel = await funcionario._deleteFuncionario(payload);

    if (funcionarioDel.status != 200 && funcionarioPut.status != 201) {
      showErrorToast(
        "Erro ao deletar a funcionario \n" +
          funcionarioDel.data.nativeError.sqlMessage
      );
    }
  },
  //delete 1

  setFuncionario: ({ commit }, funcionario) => {
    commit("SET_FUNCIONARIO", funcionario);
  },
  addEndereco: async ({ commit }, enderecos) => {
    commit("setAddEndereco", enderecos);
  },

  deleteEndereco: async ({ commit }, enderecos) => {
    console.log("delete");
  }
};
