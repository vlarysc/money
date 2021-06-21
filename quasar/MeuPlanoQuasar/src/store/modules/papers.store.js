import { userKey, showErrorToast, showSuccessToast } from "../../shared/global";
import { getField, updateField } from "vuex-map-fields";
import paper from "../../services/modules/paper.service";
import Router from "../../router/index";

export const namespaced = true;
export const state = {
  papers: [],
  paper: ""
};

export const getters = {
  getField,
  papersFormatted: state => {
    return state.papers.results.map(paper => {
      return {
        paper_name: paper.paper_name,
        paper_id: paper.id
      };
    });
  }
};

export const mutations = {
  updateField,
  SET_PAPERS: (state, papers) => {
    state.papers = papers;
  },
  SET_PAPER: (state, paper) => {
    state.paper = paper;
  }
};

export const actions = {
  getPapers: async ({ commit }, options) => {
    const papersGet = await paper._getPapers(
      options || { page: 0, size: 99999 }
    );

    if (papersGet.status != 200) {
      showErrorToast("Erro ao consultar paper");
    } else commit("SET_PAPERS", papersGet.data);
  },

  getPaper: async ({ commit }, id) => {
    const paperGet = await paper._getPaperbyID(id);

    if (paperGet.status != 200) {
      showErrorToast("Erro ao consultar paper");
    } else commit("SET_PAPER", paperGet.data);
  },

  postPaper: async ({ commit, dispatch }, payload) => {
    const paperPost = await paper._postPaper(payload);

    if (paperPost.status != 201) {
      showErrorToast("Erro ao adicionar paper");
    }
  },

  putPaper: async ({ commit, dispatch }, payload) => {
    const paperPut = await paper._putPaper(payload);

    if (paperPut.status != 200) {
      showErrorToast("Erro ao alterar paper");
    }
  },

  deletePaper: async ({ commit, dispatch }, payload) => {
    const paperDel = await paper._deletePaper(payload);

    if (paperDel.status != 200) {
      showErrorToast("Erro ao deletar paper");
    }
  },

  addPaper: async ({ commit }, papers) => {
    commit("setAddPaper", papers);
  }
};
