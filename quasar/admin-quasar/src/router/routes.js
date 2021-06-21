import { novaEmpresa } from "../utils/newDatas";

const myRoutes = (store) => {
  return [
    {
      path: "/",
      component: () => import("layouts/MainLayout.vue"),

      meta: {
        public: false,
        name: "Home",
        icon: "home"
      },
      children: [
        {
          path: "/",
          name: "home",
          component: () => import("pages/Index.vue"),
          meta: {
            public: false
          }
        },
        {
          path: "/empresas",
          component: () => import("pages/empresas/Empresas.vue"),
          meta: {
            public: false,
            name: "Empresas",
            icon: "people"
          },
          children: [
            {
              path: "/",
              component: () => import("pages/empresas/EmpresaTable.vue"),
              meta: {
                public: false
              }
            },
            {
              path: ":id",
              component: () => import("pages/empresas/EmpresaBotoes.vue"),
              meta: {
                public: false,
                name: "Cadastro",
                icon: "people"
              },
              beforeEnter: async (to, from, next) => {
                store.dispatch("tipocobranca/getTipoCobrancas");
                await store.dispatch("empresa/getEmpresaByDocumento1", to.params.id);
                if (!store.state.empresa.empresa) {
                  await store.dispatch("empresa/getPessoaByDocumento1", to.params.id);
                  let empresa = novaEmpresa();
                  if (!store.state.empresa.pessoa) {
                    empresa.pessoa.documento1 = to.params.id;
                    if (empresa.pessoa.documento1.length == 11) empresa.pessoa.tipoPessoa = "PF";
                    else empresa.pessoa.tipoPessoa = "PJ";
                  } else {
                    empresa.pessoa = store.state.empresa.pessoa;
                  }
                  await store.dispatch("empresa/setEmpresa", empresa);
                } else {
                  //se existir a empresa chamar contato e parcelas.
                  store.dispatch("contato/getContatos", store.state.empresa.empresa.id);
                  store.dispatch("parcela/getParcelas", store.state.empresa.empresa.id);
                }
                /* if (to.params.id == "new") {
                  const empresa = novaEmpresa();
                  await store.dispatch("empresa/setEmpresa", empresa);
                } else {
                  const empresa = store.dispatch("empresa/getEmpresaByDocumento1",{documento:to.params.id})
                  console.log()
                  await store.dispatch("empresa/getEmpresaByDocumento1", to.params.id);
                } */
                next();
              }
            }
          ]
        },

        {
          path: "/usuarios",
          component: () => import("pages/usuarios/Usuarios.vue"),
          meta: {
            public: false,
            name: "Usuários",
            icon: "account_box"
          },
          children: [
            {
              path: "/",
              component: () => import("pages/usuarios/UsuariosTable.vue"),
              meta: {
                public: false
              },

              beforeEnter: async (to, from, next) => {
                store.dispatch("tipocobranca/getTipoCobrancas");
                await store.dispatch("usuario/getUsuarioByDocumento1", to.params.id);
                if (!store.state.usuario.usuario) {
                  await store.dispatch("usuario/getPessoaByDocumento1", to.params.id);
                  let usuario = novoUsuario();
                  if (!store.state.usuario.pessoa) {
                    usuario.pessoa.documento1 = to.params.id;
                    if (usuario.pessoa.documento1.length == 11) usuario.pessoa.tipoPessoa = "PF";
                    else usuario.pessoa.tipoPessoa = "PJ";
                  } else {
                    usuario.pessoa = store.state.usuario.pessoa;
                  }
                  await store.dispatch("usuario/setUsuario", usuario);
                } else {
                  //se existir a usuario chamar contato e parcelas.
                  /* store.dispatch("contato/getContatos", store.state.usuario.usuario.id);
                  store.dispatch("parcela/getParcelas", store.state.usuario.usuario.id); */
                }
                /* if (to.params.id == "new") {
                  const usuario = novaEmpresa();
                  await store.dispatch("usuario/setEmpresa", usuario);
                } else {
                  const usuario = store.dispatch("usuario/getEmpresaByDocumento1",{documento:to.params.id})
                  console.log()
                  await store.dispatch("usuario/getEmpresaByDocumento1", to.params.id);
                } */
                next();
              }
            }
          ]
        },
        {
          path: "/tipocobrancas",
          component: () => import("pages/tipoCobranca/TipoCobrancas.vue"),
          meta: {
            public: false,
            name: "Tipo de Cobrança",
            icon: "local_atm"
          }
        }
      ]
    },

    {
      path: "/login",
      component: () => import("pages/Login.vue"),
      name: "login",
      meta: {
        public: true
      }
    },
    {
      path: "/lockscreen",
      component: () => import("pages/LockScreen.vue"),
      meta: {
        public: true
      }
    },
    // Always leave this as last one,
    // but you can also remove it
    {
      path: "*",
      component: () => import("pages/Error404.vue"),
      meta: {
        public: true
      }
    }
  ];
};

export default myRoutes;
