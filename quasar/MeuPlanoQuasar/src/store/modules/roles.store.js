import { userKey, showErrorToast, showSuccessToast } from "../../shared/global";
import { getField, updateField } from "vuex-map-fields";
import role from "../../services/modules/role.service";
import Router from "../../router/index";

export const namespaced = true;
export const state = {
  roles: [],
  role: null,
  erro: false
};

export const getters = {
  getField,
  rolesFormatted: state => {
    return state.roles.results.map(role => {
      return {
        role_name: role.role_name,
        role_id: role.id
      };
    });
  }
};

export const mutations = {
  updateField,
  SET_ROLES: (state, roles) => {
    state.roles = roles;
  },
  SET_ROLE: (state, role) => {
    state.role = role;
  },
  SET_ERRO: (state, erro) => {
    state.erro = erro;
  }
};

export const actions = {
  getRoles: async ({ commit }, options) => {
    const rolesGet = await role._getRoles(options || { page: 0, size: 99999 });

    if (rolesGet.status != 200) {
      showErrorToast("Erro ao consultar role");
    } else commit("SET_ROLES", rolesGet.data);
  },

  getRole: async ({ commit }, id) => {
    const roleGet = await role._getRolebyID(id);

    if (roleGet.status != 200) {
      showErrorToast("Erro ao consultar role");
    } else commit("SET_ROLE", roleGet.data[0]);
  },

  postRole: async ({ commit, dispatch }, payload) => {
    commit("SET_ERRO", false);
    const rolePost = await role._postRole(payload);

    if (rolePost.status != 200) {
      commit("SET_ERRO", true);
      showErrorToast("Erro ao adicionar role " + rolePost.data);
    } else {
      commit("SET_ROLE", rolePost.data[0]);
    }
  },

  putRole: async ({ commit, dispatch }, payload) => {
    commit("SET_ERRO", false);
    const rolePut = await role._putRole(payload);

    if (rolePut.status != 200) {
      commit("SET_ERRO", true);
      showErrorToast("Erro ao alterar role " + rolePut.data);
    }
  },

  deleteRole: async ({ commit, dispatch }, payload) => {
    const roleDel = await role._deleteRole(payload);

    if (roleDel.status != 200) {
      showErrorToast("Erro ao deletar role");
    }
  },

  addRole: async ({ commit }, roles) => {
    commit("setAddRole", roles);
  }
};
