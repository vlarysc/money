import { userKey, showErrorToast } from "../../shared/global";

import auth from "../../services/modules/auth.service";
import user from "../../services/modules/user.service";
import route from "../../router/index";

export const namespaced = true;
export const state = {
  token: "",
  user: { teste: "teste" },
  resetCode: ""
};

export const getters = {
  getToken: (state) => state.token,
  loggedIn: (state) => !!state.token
};

export const mutations = {
  SET_TOKEN: (state, token) => {
    sessionStorage.setItem(userKey, token);
    state.token = token;
  },
  SET_RESETCODE: (state, resetcode) => {
    state.resetCode = resetcode;
  },
  SET_USERLOGIN: (state, user) => {
    state.user = user;
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

      await commit("SET_TOKEN", token);
      // commit('conveniados/SET_LOGADO', data)
    } else {
      showErrorToast("Login ou senha inválidos ");

      dispatch("removeToken");
    }

    return response;
  },
  getUserLogin: async ({ commit }) => {
    const response = await user._getUserLoggedIn();

    if (response.status === 200) {
      const { data } = response;

      commit("SET_USERLOGIN", data);

      // commit('conveniados/SET_LOGADO', data)
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
    commit("SET_TOKEN", null);
    sessionStorage.clear();
    /* route.push({
      name: "login"
    }); */
  },

  removeToken: ({ commit }) => {
    auth._removeToken();
    localStorage.removeItem(userKey);
    commit("SET_TOKEN", "");
  }
};
