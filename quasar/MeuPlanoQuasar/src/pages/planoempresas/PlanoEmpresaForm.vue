<template>
  <div class="q-pa-md">
    <q-form ref="planoempresaValid" @submit="salvar()">
      <div class="q-xl">
        <div>
          <div class="row q-pb-xs q-ma-none">
            <div
              :class="
                tipoPessoa == 'PJ' ? 'col-xs-12 col-md-2' : 'col-xs-12 col-md-2'
              "
            >
              <q-select
                outlined
                disable
                class="q-pa-xs"
                v-model="tipoPessoa"
                :options="optionsPessoa"
                option-value="value"
                option-label="label"
                label="Tipo de pessoa"
                emit-value
                map-options
              />
            </div>

            <div
              :class="
                tipoPessoa == 'PJ'
                  ? 'col-xs-12 col-md-2 '
                  : 'col-xs-12 col-md-2 '
              "
            >
              <q-input
                disable
                outlined
                v-model="documento1"
                :label="tipoPessoa == 'PJ' ? 'CNPJ' : 'CPF'"
                :mask="
                  tipoPessoa == 'PF' ? '###.###.###-##' : '##.###.###/####-##'
                "
                class="q-pa-xs"
                lazy-rules
                :rules="tipoPessoa == 'PF' ? ruleCpf : ruleCpnj"
                unmasked-value
              />
            </div>
            <div
              :class="
                tipoPessoa == 'PJ'
                  ? 'col-xs-12 col-md-8 '
                  : 'col-xs-12 col-md-8'
              "
            >
              <q-input
                v-focus
                outlined
                v-model="nome"
                :label="tipoPessoa == 'PF' ? 'Nome *' : 'Razão Social *'"
                class="q-pa-xs"
                lazy-rules
                :rules="[val => (val && val.length > 0) || 'Campo obrigatório']"
              />
            </div>
          </div>
          <div class="row q-pb-xs q-pt-xs q-ma-none">
            <div
              :class="
                tipoPessoa == 'PJ'
                  ? 'col-xs-12 col-md-6 '
                  : 'col-xs-12 col-md-9'
              "
            >
              <q-input
                outlined
                v-model="apelido"
                :label="tipoPessoa == 'PF' ? 'Apelido' : 'Nome Fantasia'"
                class="q-pa-xs"
                lazy-rules
                :rules="[val => (val && val.length > 0) || 'Campo obrigatório']"
              />
            </div>
            <div v-if="tipoPessoa == 'PJ'" class="col-xs-12 col-md-3">
              <q-input
                outlined
                v-model="documento3"
                label="Inscrição Municipal"
                class="q-pa-xs"
              />
            </div>
            <div class="col-xs-12 col-md-3">
              <q-input
                outlined
                v-model="documento2"
                class="q-pa-xs"
                lazy-rules
                :label="tipoPessoa == 'PJ' ? 'Inscrição Estadual' : 'RG'"
              />
            </div>
          </div>

          <div class="row q-pb-xs q-pt-xs q-ma-none ">
            <div class="col-xs-12 col-md-2">
              <q-input
                outlined
                v-model="telefone1"
                label="Telefone *"
                class="q-pa-xs"
                lazy-rules
                :rules="[val => (val && val.length > 0) || 'Campo obrigatório']"
                v-mask="['(##) ####-####', '(##) #####-####']"
              />
            </div>

            <div class="col-xs-12 col-md-6">
              <q-input
                outlined
                v-model="email"
                type="email"
                label="E-mail *"
                class="q-pa-xs"
                :rules="[val => !!val || 'Campo obrigatório', isValidEmail]"
              />
            </div>
            <div class=" col-xs-12 col-md-4">
              <q-input
                outlined
                class="q-pa-xs"
                v-model="responsavel_legal"
                unmasked-value
                label="Responsável Legal *"
              />
            </div>
          </div>

          <div class="row q-pb-xs q-pt-xs q-ma-none">
            <div class="col-xs-12 col-md-2">
              <q-input
                outlined
                v-model="telefone2"
                label="Telefone"
                class="q-pa-xs"
                v-mask="['(##) ####-####', '(##) #####-####']"
              />
            </div>

            <div class="col-xs-12 col-md-2">
              <q-input
                outlined
                v-model="telefone3"
                label="Telefone"
                class="q-pa-xs"
                v-mask="['(##) ####-####', '(##) #####-####']"
              />
            </div>
            <div class=" col-xs-12 col-md-3">
              <q-select
                outlined
                class="q-pa-xs"
                v-model="formapagamento_id"
                :options="formapagamentos.results"
                option-value="id"
                :option-label="formapagamento => formapagamento.descricao"
                label="Forma de Pagamento"
                emit-value
                map-options
              />
            </div>

            <div class=" col-xs-12 col-md-2">
              <q-date-picker
                class="q-pa-xs"
                v-model="data_inicio"
                format="DD/MM/YYYY"
                value_type="YYYY-MM-DD HH:mm:ss"
                label="Data Inicial"
              ></q-date-picker>
            </div>
            <div class=" col-xs-12 col-md-2">
              <q-date-picker
                class="q-pa-xs"
                v-model="data_fim"
                format="DD/MM/YYYY"
                value_type="YYYY-MM-DD HH:mm:ss"
                label="Data Final"
              ></q-date-picker>
            </div>
            <div class="  col-xs-12 col-md-1">
              <q-number
                class="q-pa-none"
                v-model="dia_vencimento"
                unmasked-value
                label="Dia de Vencimento"
              />
            </div>
          </div>
          <div class="row q-pb-md q-ma-none">
            <div class=" col-xs-12 col-md-6">
              <q-select
                outlined
                class="q-pa-xs"
                v-model="vendedor_id"
                :options="funcionarios.results"
                option-value="id"
                :option-label="func => func.pessoa.nome"
                label="Vendedor"
                emit-value
                map-options
              />
            </div>
            <div class=" col-xs-12 col-md-6">
              <q-select
                outlined
                class="q-pa-xs"
                v-model="supervisor_id"
                :options="funcionarios.results"
                option-value="id"
                :option-label="func => func.pessoa.nome"
                label="Supervisor"
                emit-value
                map-options
              />
            </div>
            <div class=" col-xs-12 col-md-12">
              <q-input
                outlined
                type="textarea"
                class="q-pa-xs"
                v-model="observacoes"
                unmasked-value
                label="Observações"
              />
            </div>
          </div>
        </div>
      </div>
    </q-form>
  </div>
</template>

<script>
import qNumber from "src/components/qNumber";
import { mapActions, mapState } from "vuex";

import { mapFields } from "vuex-map-fields";
import { validateBr } from "js-brasil";
import { isValidEmail } from "src/utils/validarEmail";
import qDatePicker from "src/components/qDatePicker";

export default {
  name: "planoempresa",
  props: ["newPlanoEmpresa"],
  components: { qNumber, qDatePicker },
  async mounted() {},

  data() {
    return {
      momentFormat: {
        stringify: date => {
          return date ? moment(date).format("LL") : "";
        },

        parse: value => {
          return value ? moment(value, "LL").toDate() : null;
        },

        getWeek: date => {
          return;
        }
      },

      planoempresa: {},
      isValidEmail,
      optionsPessoa: [
        { label: "Pessoa Física", value: "PF" },
        { label: "Pessoa Jurídica", value: "PJ" }
      ],
      ruleCpnj: [
        val => val.length > 0 || val.length < 18 || "Campo Obrigatório",
        val => validateBr.cnpj(val) || "CNPJ Inválido!"
      ],
      ruleCpf: [
        val => val.length > 0 || val.length < 14 || "Campo Obrigatório",
        val => validateBr.cpf(val) || "CPF Inválido!"
      ]
    };
  },

  computed: {
    ...mapState("funcionario", ["funcionarios"]),
    ...mapState("formapagamento", ["formapagamentos"]),
    ...mapFields("planoempresa", [
      "planoempresa.pessoa.tipoPessoa",
      "planoempresa.pessoa.created_id",
      "planoempresa.pessoa.updated_id",
      "planoempresa.formapagamento_id",
      "planoempresa.observacoes",
      "planoempresa.responsavel_legal",
      "planoempresa.data_fim",
      "planoempresa.data_inicio",
      "planoempresa.dia_vencimento",
      "planoempresa.vendedor_id",
      "planoempresa.supervisor_id",
      "planoempresa.pessoa.nome",
      "planoempresa.pessoa.apelido",
      "planoempresa.pessoa.email",
      "planoempresa.pessoa.telefone1",
      "planoempresa.pessoa.telefone2",
      "planoempresa.pessoa.telefone3",
      "planoempresa.pessoa.documento1",
      "planoempresa.pessoa.documento2",
      "planoempresa.pessoa.documento3"
    ])
  },

  methods: {}
};
</script>

<style>
.card-carencias {
  display: flex;
  padding: none;
  justify-content: space-between;
}
.toggle {
  flex-wrap: nowrap;
}
.q-field--auto-height.q-field--dense.q-field--labeled
  .q-field__control-container {
  padding-top: 20px;
}
</style>
