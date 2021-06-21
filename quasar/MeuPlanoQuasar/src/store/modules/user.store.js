import { userKey, showErrorToast } from "../../shared/global";

import auth from "../../services/modules/auth.service";
import Router from "../../router/index";

export const namespaced = true;
export const state = {
  users: [],
  user: ""
};

export const getters = {
  getToken: (state) => state.token
};

export const mutations = {
  SET_TOKEN: (state, token) => {
    localStorage.setItem(userKey, token);
    state.token = token;
  },
  SET_RESETCODE: (state, resetcode) => {
    state.resetCode = resetcode;
  }
};

export const actions = {
  login: async ({ commit, dispatch }, loginData) => {
    dispatch("removeToken");

    const response = await auth._login(loginData);

    if (response.status === 200) {
      const { data } = response;

      const token = JSON.stringify(data);

      auth._storeToken(data.access_token);

      commit("SET_TOKEN", token);
      // commit('conveniados/SET_LOGADO', data)
    } else {
      showErrorToast("Login ou senha inválidos ");

      dispatch("removeToken");
    }

    return response;
  },

  forgotPassword: async ({ commit, dispatch }, payload) => {
    dispatch("removeToken");

    const response = await auth._forgotPassword(payload);

    if (response.status === 200) {
      const { data } = response;
      const resetCode = data.recovery_code;
      commit("SET_RESETCODE", resetCode);
    } else {
      showErrorToast("Dados inválidos ");
    }

    return response;
  },
  newPassword: async (context, { payload, resetCode }) => {
    const response = await auth._resetPassword(payload, resetCode);
    return response;
  },

  logout: ({ commit }) => {
    Router.push({
      name: "login"
    });
    commit("conveniados/SET_LOGADO", {});
    commit("SET_TOKEN", "");
    localStorage.clear();
  },

  removeToken: ({ commit }) => {
    auth._removeToken();
    localStorage.removeItem(userKey);
    commit("SET_TOKEN", "");
  }
};
