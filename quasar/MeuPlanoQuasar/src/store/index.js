import Vue from "vue";
import Vuex from "vuex";
import * as auth from "./modules/auth.store";
import * as filial from "./modules/filiais.store";
import * as plano from "./modules/planos.store";
import * as grupo from "./modules/grupos.store";
import * as role from "./modules/roles.store";
import * as religiao from "./modules/religioes.store";
import * as formapagamento from "./modules/formapagamentos.store";
import * as planoempresa from "./modules/planoempresas.store";
import * as estadocivil from "./modules/estadocivil.store";
import * as parentesco from "./modules/parentescos.store";
import * as funcionario from "./modules/funcionarios.store";
import * as paper from "./modules/papers.store";

import { store } from "quasar/wrappers";

// import example from './module-example'

Vue.use(Vuex);

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

const Store = function(/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      auth,
      filial,
      plano,
      grupo,
      role,
      religiao,
      formapagamento,
      planoempresa,
      estadocivil,
      parentesco,
      funcionario,
      paper

      // example
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEBUGGING
  });
  return Store;
};

export default Store;
// }
