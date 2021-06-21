<template>
  <div class=" q-pa-none  no-box-shadow no-outline">
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
            class="q-pa-none q-pl-xs q-pr-xs"
            style="text-align: right;"
            name="cadastro"
          >
            <PlanoEmpresaForm
              :newPlanoEmpresa="planoempresa"
              ref="planoempresaForm"
            ></PlanoEmpresaForm>

            <q-space />

            <q-page-sticky position="bottom-right" :offset="[0, 33]">
              <div class=" row q-pa-xs q-gutter-xs" style="text-align: right;">
                <q-btn
                  label="Salvar"
                  v-if="!planoempresa.id"
                  color="blue-8"
                  type="submit"
                  text-color="white"
                  @click="save(true)"
                  size="md"
                ></q-btn>
                <q-btn
                  label="Salvar"
                  v-if="planoempresa.id"
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

          <q-tab-panel name="endereco">
            <EnderecoTable></EnderecoTable>
          </q-tab-panel>
        </q-tab-panels>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import EnderecoTable from "./planoenderecos/EnderecoTable";

import PlanoEmpresaForm from "./PlanoEmpresaForm";

export default {
  name: "PlanoEmpresaBotoes",
  components: {
    PlanoEmpresaForm,
    EnderecoTable
  },
  async beforeMount() {},
  data() {
    return { tab: "cadastro" };
  },
  computed: {
    ...mapState("planoempresa", ["planoempresa"])
  },
  methods: {
    ...mapActions("planoempresa", [
      "getPlanoEmpresas",
      "postPlanoEmpresa",
      "putPlanoEmpresa"
    ]),

    novoPlanoEmpresa() {
      this.planoempresa = {
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
          created_at: "",
          updated_at: "",
          enderecos: []
        },
        vendedor_id: 0,
        supervisor_id: 0,
        formapagamento_id: 0,
        dia_vencimento: 0,
        data_inicio: "",
        data_fim: "",
        responsavel_legal: "",
        observacoes: "",
        id_aux: "",
        created_id: 0,
        updated_id: 0
      };
    },

    async save(insert) {
      if (this.planoempresa.pessoa.enderecos.length > 0) {
        this.tab = "cadastro";
        this.$refs.planoempresaForm.$refs.planoempresaValid
          .validate()
          .then(async success => {
            if (success) {
              insert
                ? await this.postPlanoEmpresa(this.planoempresa)
                : await this.putPlanoEmpresa({
                    id: this.planoempresa.id,
                    payload: this.planoempresa
                  });

              this.$router.push(
                `/planoempresas?page=${this.$route.query.page}&size=${this.$route.query.size}`
              );
            } else {
              this.$q.notify("Por favor informe obrigatórios da planoempresa");
            }
          });
      } else {
        this.tab = "endereco";
        this.$q.notify("Por favor informe pelo menos um endereço");
      }
    },

    back() {
      this.$router.push(
        `/planoempresas?page=${this.$route.query.page}&size=${this.$route.query.size}`
      );
    },

    async update() {
      await this.putPlanoEmpresa({
        id: this.planoempresa.id,
        payload: this.planoempresa
      });
      this.$router.push(
        `/planoempresas?page=${this.$route.query.page}&size=${this.$route.query.size}`
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
