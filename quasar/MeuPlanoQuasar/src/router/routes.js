import {
  novaFilial,
  novoPlanoEmpresa,
  novoFuncionario
} from "../utils/newDatas";

const myRoutes = store => {
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
          path: "/filiais",
          component: () => import("pages/filial/Filiais.vue"),
          meta: {
            public: false,
            name: "Filiais",
            icon: "groups"
          },
          children: [
            {
              path: "/",
              component: () => import("pages/filial/FiliaisTable.vue"),
              meta: {
                public: false
              }
            },
            {
              path: ":id",
              component: () => import("pages/filial/FilialBotoes.vue"),
              meta: {
                public: false,
                name: "Cadastro",
                icon: "people"
              },
              beforeEnter: async (to, from, next) => {
                await store.dispatch(
                  "filial/getFilialByDocumento1",
                  to.params.id
                );
                if (!store.state.filial.filial) {
                  await store.dispatch(
                    "filial/getPessoaByDocumento1",
                    to.params.id
                  );
                  let filial = novaFilial();
                  if (!store.state.filial.pessoa) {
                    filial.pessoa.documento1 = to.params.id;
                    if (filial.pessoa.documento1.length == 11)
                      filial.pessoa.tipoPessoa = "PF";
                    else filial.pessoa.tipoPessoa = "PJ";
                  } else {
                    filial.pessoa = store.state.filial.pessoa;
                  }
                  await store.dispatch("filial/setFilial", filial);
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
          path: "/planos",
          component: () => import("pages/planos/Plano.vue"),
          meta: {
            public: false,
            name: "Planos",
            icon: "request_page"
          },
          children: [
            {
              path: "/",
              component: () => import("pages/planos/PlanoTable.vue"),
              meta: {
                public: false
              }
            }
          ]
        },
        {
          path: "/grupos",
          component: () => import("pages/grupos/Grupos.vue"),
          meta: {
            public: false,
            name: "Grupos",
            icon: "group_work"
          },
          children: [
            {
              path: "/",
              component: () => import("pages/grupos/GruposTable.vue"),
              meta: {
                public: false
              }
            }
          ]
        },
        {
          path: "/roles",
          component: () => import("pages/roles/Roles.vue"),
          meta: {
            public: false,
            name: "Roles",
            icon: "person_outline"
          },
          children: [
            {
              path: "/",
              component: () => import("pages/roles/RolesTable.vue"),
              meta: {
                public: false
              }
            },
            {
              path: ":id",
              component: () => import("pages/roles/RolesForm.vue"),
              meta: {
                public: false,
                name: "Paper",
                icon: "paper"
              },
              beforeEnter: async (to, from, next) => {
                await store.dispatch("role/getRole", to.params.id);

                next();
              }
            }
          ]
        },
        {
          path: "/religioes",
          component: () => import("pages/religioes/Religioes.vue"),
          meta: {
            public: false,
            name: "Religioes",
            icon: "auto_awesome"
          },
          children: [
            {
              path: "/",
              component: () => import("pages/religioes/ReligioesTable.vue"),
              meta: {
                public: false
              }
            }
          ]
        },
        {
          path: "/formapagamentos",
          component: () => import("pages/formapagamentos/FormaPagamento.vue"),
          meta: {
            public: false,
            name: "Forma de Pagamento",
            icon: "local_atm"
          },
          children: [
            {
              path: "/",
              component: () =>
                import("pages/formapagamentos/FormaPagamentoTable.vue"),
              meta: {
                public: false
              }
            }
          ]
        },
        {
          path: "/estadocivil",
          component: () => import("pages/estadocivil/EstadoCivil.vue"),
          meta: {
            public: false,
            name: "EstadoCivil",
            icon: "people_outline"
          },
          children: [
            {
              path: "/",
              component: () => import("pages/estadocivil/EstadoCivilTable.vue"),
              meta: {
                public: false
              }
            }
          ]
        },
        {
          path: "/parentescos",
          component: () => import("pages/parentescos/Parentesco.vue"),
          meta: {
            public: false,
            name: "Parentesco",
            icon: "family_restroom"
          },
          children: [
            {
              path: "/",
              component: () => import("pages/parentescos/ParentescoTable.vue"),
              meta: {
                public: false
              }
            }
          ]
        },
        {
          path: "/planoempresas",
          component: () => import("pages/planoempresas/PlanoEmpresa.vue"),
          meta: {
            public: false,
            name: "Plano Empresa",
            icon: "account_box"
          },
          children: [
            {
              path: "/",
              component: () =>
                import("pages/planoempresas/PlanoEmpresaTable.vue"),

              meta: {
                public: false
              }
            },
            {
              path: ":id",
              component: () =>
                import("pages/planoempresas/PlanoEmpresaBotoes.vue"),
              meta: {
                public: false,
                name: "Plano Empresa",
                icon: "people"
              },
              beforeEnter: async (to, from, next) => {
                await store.dispatch("funcionario/getFuncionarios", {
                  size: 99999
                });
                await store.dispatch("formapagamento/getFormaPagamentos", {
                  size: 99999
                });
                await store.dispatch(
                  "planoempresa/getPlanoEmpresaByDocumento1",
                  to.params.id
                );
                if (!store.state.planoempresa.planoempresa) {
                  await store.dispatch(
                    "filial/getPessoaByDocumento1",
                    to.params.id
                  );
                  let planoempresa = novoPlanoEmpresa();

                  if (!store.state.filial.pessoa) {
                    planoempresa.pessoa.documento1 = to.params.id;
                    if (planoempresa.pessoa.documento1.length == 11)
                      planoempresa.pessoa.tipoPessoa = "PF";
                    else planoempresa.pessoa.tipoPessoa = "PJ";
                  } else {
                    planoempresa.pessoa = store.state.filial.pessoa;
                  }
                  await store.dispatch(
                    "planoempresa/setPlanoEmpresa",
                    planoempresa
                  );
                }

                next();
              }
            }
          ]
        },
        {
          path: "/funcionarios",
          component: () => import("pages/funcionarios/Funcionario.vue"),
          meta: {
            public: false,
            name: "Funcionários",
            icon: "supervised_user_circle"
          },
          children: [
            {
              path: "/",
              component: () =>
                import("pages/funcionarios/FuncionarioTable.vue"),

              meta: {
                public: false
              }
            },
            {
              path: ":id",
              component: () =>
                import("pages/funcionarios/FuncionarioBotoes.vue"),
              meta: {
                public: false,
                name: "Funcionário",
                icon: "people"
              },
              beforeEnter: async (to, from, next) => {
                await store.dispatch("filial/getFiliais", { size: 99999 });
                await store.dispatch("role/getRoles", { size: 99999 });

                await store.dispatch(
                  "funcionario/getFuncionarioByDocumento1",
                  to.params.id
                );
                if (!store.state.funcionario.funcionario) {
                  await store.dispatch(
                    "filial/getPessoaByDocumento1",
                    to.params.id
                  );

                  let funcionario = novoFuncionario();
                  if (!store.state.filial.pessoa) {
                    funcionario.pessoa.documento1 = to.params.id;
                    if (funcionario.pessoa.documento1.length == 11)
                      funcionario.pessoa.tipoPessoa = "PF";
                    else funcionario.pessoa.tipoPessoa = "PJ";
                  } else {
                    funcionario.pessoa = store.state.filial.pessoa;
                  }
                  await store.dispatch(
                    "funcionario/setFuncionario",
                    funcionario
                  );
                }

                next();
              }
            }
          ]
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
