<template>
  <div class="q-pa-md">
    <q-form ref="myForm" @submit="save()">
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
          </div>

          <div class="row q-pb-xs q-ma-none">
            <div class="col-xs-12 col-sm-3">
              <q-select
                outlined
                class="q-pa-xs"
                v-model="status"
                :options="options"
                label="Status"
                emit-value
                map-options
              />
            </div>

            <div class="q-pa-xs col-xs-12 col-md-9">
              <q-select
                outlined
                class="q-pa-xs"
                v-model="filial_id"
                :options="filiais.results"
                option-value="id"
                :option-label="filial => filial.pessoa.nome"
                label="Filial"
                emit-value
                map-options
              />
            </div>
            <div class="q-pa-xs col-xs-12 col-md-12">
              <q-select
                class="q-pa-xs"
                label="Roles"
                v-model="model"
                use-input
                outlined
                use-chips
                emit-value
                map-options
                multiple
                input-debounce="0"
                option-value="role_id"
                :option-label="role => role.role_name"
                :options="rolesFormatted"
              />
            </div>
          </div>
        </div>
      </div>
    </q-form>
  </div>
</template>

<script>
/* import qNumber from "src/components/qNumber"; */
import { mapActions, mapState, mapGetters } from "vuex";

import { mapFields } from "vuex-map-fields";
import { mapMultiRowFields } from "vuex-map-fields";

import { validateBr } from "js-brasil";
import { isValidEmail } from "src/utils/validarEmail";
import { mask } from "vue-the-mask";

/* import qDatePicker from "src/components/qDatePicker"; */

export default {
  name: "funcionario",
  props: ["newFuncionario"],
  directives: { mask },
  /*  components: { qNumber, qDatePicker }, */

  async mounted() {},

  data() {
    return {
      isValidEmail,

      options: [
        { label: "Ativo", value: "A" },
        { label: "Inativo", value: "I" }
      ],

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
    ...mapMultiRowFields("funcionario", ["funcionario.roles"]),
    ...mapState("filial", ["filiais"]),
    ...mapGetters("role", ["rolesFormatted"]),
    ...mapFields("funcionario", [
      "funcionario.pessoa.tipoPessoa",
      "funcionario.filial_id",
      "funcionario.status",
      "funcionario.pessoa.created_id",
      "funcionario.pessoa.updated_id",
      "funcionario.pessoa.nome",
      "funcionario.pessoa.apelido",
      "funcionario.pessoa.email",
      "funcionario.pessoa.telefone1",
      "funcionario.pessoa.telefone2",
      "funcionario.pessoa.telefone3",
      "funcionario.pessoa.documento1",
      "funcionario.pessoa.documento2",
      "funcionario.pessoa.documento3"
    ]),
    model: {
      get: function() {
        return this.roles.map(role => role.role_id);
      },
      set: function(newValue) {
        this.$store.commit("funcionario/updateRoles", newValue);
      }
    }
  },

  methods: {
    ...mapActions("filial", ["getFiliais"]),
    ...mapActions("role", ["getRoles"]),

    isTel() {
      return val.replace(/\D/g, "").length === 11
        ? "(00) 00000-0000"
        : "(00) 0000-00009";
    }
  }
};
</script>

<style>
.q-field--auto-height .q-field__control {
  height: 56px;
}
</style>
