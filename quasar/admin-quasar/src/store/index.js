import Vue from "vue";
import Vuex from "vuex";
import * as auth from "./modules/auth.store";
import * as tipocobranca from "./modules/tipocobranca.store";
import * as empresa from "./modules/empresas.store";
import * as contato from "./modules/contatos.store";
import * as parcela from "./modules/parcelas.store";
import * as usuario from "./modules/usuarios.store";
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
      tipocobranca,
      empresa,
      contato,
      parcela,
      usuario

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
