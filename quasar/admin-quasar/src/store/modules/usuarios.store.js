import { userKey, showErrorToast, showSuccessToast } from "../../shared/global";
import { getField, updateField } from "vuex-map-fields";

import usuario from "../../services/modules/usuarios.service";
import enderecoService from "../../services/modules/enderecos.service";
import Router from "../../router/index";

export const namespaced = true;
export const state = {
  usuarios: [],
  usuario: "",
  endereco: "",
  erro: {},
  pessoa: {}
};

export const getters = {
  getField
};

export const mutations = {
  updateField,
  SET_USUARIOS: (state, usuarios) => {
    state.usuarios = usuarios;
  },
  SET_USUARIO: (state, usuario) => {
    state.usuario = usuario;
  },
  SET_PESSOA: (state, pessoa) => {
    state.pessoa = pessoa;
  },
  SET_ENDERECOS: (state, endereco) => {
    state.endereco = endereco;
  }
};
//commit - executa um mutation
//dispatch - executa uma action
export const actions = {
  getUsuarios: async ({ commit }, options) => {
    const usuarios = await usuario._getUsuarios(options || { page: 0, size: 999999 });

    if (usuarios.status != 200) {
      showErrorToast("Erro ao consultar o usuário");
    } else commit("SET_USUARIOS", usuarios.data);
  },

  //buscar por id
  getUsuario: async ({ commit }, id) => {
    const usuarioGet = await usuario._getUsuariobyID(id);
    // console.log(usuarioGet);
    if (usuarioGet.status != 200) {
      showErrorToast("Erro ao consultar o usuário");
    } else commit("SET_USUARIO", usuarioGet.data);
  },

  getUsuarioByDocumento1: async ({ commit }, documento1) => {
    const usuarioGet = await usuario._getUsuariobyDocumento1(documento1);
    // console.log(usuarioGet);
    if (usuarioGet.status != 200) {
      showErrorToast("Erro ao consultar o usuário");
    } else commit("SET_USUARIO", usuarioGet.data.content[0]);
  },

  getPessoaByDocumento1: async ({ commit }, documento1) => {
    const pessoaGet = await usuario._getPessoabyDocumento1(documento1);
    // console.log(usuarioGet);
    if (pessoaGet.status != 200) {
      showErrorToast("Erro ao consultar o usuário");
    } else commit("SET_PESSOA", pessoaGet.data.content[0]);
  },

  //salvar post
  //{descricao:"nova descricao"}
  postUsuario: async ({ commit, dispatch }, payload) => {
    const usuarioPost = await usuario._postUsuario(payload);
    if (usuarioPost.status != 201) {
      const erro = usuarioPost.data;
      showErrorToast("Erro ao adicionar o usuário \n" + erro.message);
    }
  },
  //alterar put
  // {id : 1 , payload: {descricao:"nova descricao"}}
  putUsuario: async ({ commit, dispatch }, payload) => {
    const usuarioPut = await usuario._putUsuario(payload);
    //console.log(usuarioPut);
    if (usuarioPut.status != 200) {
      const erro = usuarioPut.data;
      showErrorToast("Erro ao alterar o usuário \n" + erro.message);
    }
  },

  deleteUsuario: async ({ commit, dispatch }, payload) => {
    const usuarioDel = await usuario._deleteUsuario(payload);

    if (usuarioDel.status != 200) {
      showErrorToast("Erro ao deletar o usuário");
    }
  },
  //delete 1

  setUsuario: ({ commit }, usuario) => {
    commit("SET_USUARIO", usuario);
  }
};
