import Vue from "vue";
import VueRouter from "vue-router";

import { userKey, logado } from "../shared/global";

import myRoutes from "./routes";

Vue.use(VueRouter);

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance. , ssrContext
 */

const Router = function({ store }) {
  const routes = myRoutes(store);
  let Router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,

    // Leave these as they are and change in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  });

  Router.beforeResolve(async (to, from, next) => {
    const isAuthenticated = sessionStorage.getItem(userKey);

    if (!to.meta.public && !isAuthenticated) {
      return next({
        name: "login"
      });
    }

    if (isAuthenticated && isAuthenticated != "null") {
      if (!store.getters["auth/loggedIn"]) {
        await store.dispatch("auth/getUserLogin");
        await store.commit("auth/SET_TOKEN", sessionStorage.getItem(userKey));
      }
      next();
    }

    next();
  });
  return Router;
};

export default Router;
// }
