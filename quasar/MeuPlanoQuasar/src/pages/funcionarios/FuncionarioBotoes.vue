<template>
  <div class="q-pa-none  no-box-shadow no-outline">
    <div>
      <div class=" q-gutter-y-md">
        <q-tabs
          active-bg-color="blue-8"
          active-color="white"
          align="left"
          v-model="tab"
          class="bg-white text-grey-8 tabs"
          flat
          inline-label
          indicator-color="transparent"
          dense
        >
          <q-tab
            name="cadastro"
            flat
            class="q-mr-xs q-mt-xs "
            label="Dados"
            icon="app_registration"
          />

          <q-tab
            name="comissao"
            class="q-mr-xs q-mt-xs "
            label="Comissões"
            icon="paid"
          />
          <q-tab
            name="endereco"
            class="q-mr-xs q-mt-xs "
            label="Endereço"
            icon="place"
          />

          <q-space />
        </q-tabs>
        <q-tab-panels
          v-model="tab"
          class="q-ma-none"
          animated
          vertical
          transition-prev="jump-up"
          transition-next="jump-up"
        >
          <q-tab-panel
            class="q-pa-none"
            style="text-align: right;"
            name="cadastro"
          >
            <FuncionarioForm
              :newFuncionario="funcionario"
              ref="funcionarioForm"
            ></FuncionarioForm>

            <q-space />

            <q-page-sticky position="bottom-right" :offset="[18, 35]">
              <div class=" row q-pa-xs q-gutter-xs" style="text-align: right;">
                <q-btn
                  label="Salvar"
                  v-if="!funcionario.id"
                  color="blue-8"
                  type="submit"
                  text-color="white"
                  @click="save(true)"
                  size="md"
                ></q-btn>
                <q-btn
                  label="Salvar"
                  v-if="funcionario.id"
                  color="blue-8"
                  type="submit"
                  text-color="white"
                  size="md"
                  @click="save(false)"
                ></q-btn>
                <q-btn
                  label="Voltar"
                  class="btnLateral"
                  color="grey-6"
                  text-color="white"
                  @click="back"
                ></q-btn>
              </div>
            </q-page-sticky>
          </q-tab-panel>

          <q-tab-panel name="comissao">
            <ComissaoForm ref="comissaoForm"></ComissaoForm>
          </q-tab-panel>
          <q-tab-panel name="endereco">
            <FuncionarioEnderecos></FuncionarioEnderecos>
          </q-tab-panel>
        </q-tab-panels>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import FuncionarioEnderecos from "./enderecos/FuncionarioEnderecos";
import FuncionarioForm from "./FuncionarioForm";
import ComissaoForm from "./ComissaoForm";

export default {
  name: "FuncionarioBotoes",
  components: {
    FuncionarioForm,
    FuncionarioEnderecos,
    ComissaoForm
  },
  async beforeMount() {},
  data() {
    return { tab: "cadastro" };
  },
  computed: {
    ...mapState("funcionario", ["funcionario"])
  },
  methods: {
    ...mapActions("funcionario", [
      "getFuncionarios",
      "postFuncionario",
      "putFuncionario"
    ]),

    novoFuncionario() {
      this.funcionario = {
        pessoa_id: "",
        filial_id: null,
        salario_atual: null,
        login: null,
        password: "",
        supervisor_id: null,
        comissao_venda: "N",
        valor_comissao_venda: null,
        valor_comissao_venda_pct: null,
        comissao_cobranca: "N",
        valor_comissao_cobranca: null,
        valor_comissao_cobranca_pct: null,
        comissao_servico: "N",
        valor_comissao_servico: null,
        valor_comissao_servico_pct: null,
        comissao_entrega: "N",
        valor_comissao_entrega: null,
        valor_comissao_entrega_pct: null,
        comissao_pagamento: "N",
        valor_comissao_pagamento: null,
        valor_comissao_pagamento_pct: null,
        status: "A",
        senha_expirada: "S",
        ativo: "S",
        id_aux: null,
        created_id: 0,
        updated_id: 0,
        pessoa: {
          nome: "",
          apelido: "",
          email: "",
          tipoPessoa: "PJ",
          documento1: "",
          documento2: "",
          documento3: "",
          telefone1: "",
          telefone2: "",
          telefone3: "",
          nascimento: null,
          ativo: "S",
          created_id: 0,
          updated_id: 0,
          created_at: "2021-03-29 15:02:06",
          updated_at: "2021-03-31 12:14:22",
          enderecos: []
        }
      };
    },
    //fazer um if na tag para apenas aparecer o botão adicionar se tiver um cep
    async save(insert) {
      if (this.funcionario.pessoa.enderecos.length > 0) {
        this.tab = "cadastro";
        this.$refs.funcionarioForm.$refs.myForm
          .validate()
          .then(async success => {
            if (success) {
              insert
                ? await this.postFuncionario(this.funcionario)
                : await this.putFuncionario({
                    id: this.funcionario.id,
                    payload: this.funcionario
                  });

              this.$router.push(
                `/funcionarios?page=${this.$route.query.page}&size=${this.$route.query.size}`
              );
            } else {
              this.$q.notify("Por favor informe obrigatórios da funcionario");
            }
          });
      } else {
        this.tab = "endereco";
        this.$q.notify("Por favor informe pelo menos um endereço");
      }
    },

    back() {
      this.$router.push(
        `/funcionarios?page=${this.$route.query.page}&size=${this.$route.query.size}`
      );
    }
  }
};
</script>

<style lang="scss">
.btnLateral {
  margin-right: 30px;
  text-align: right;
}
.tabs {
  border-bottom: 1px solid;
  border-color: $indigo;
}
.tab {
  border: 1px solid;
  border-color: $grey-6;
  border-radius: 7px 7px 0px 0px;
}
</style>
