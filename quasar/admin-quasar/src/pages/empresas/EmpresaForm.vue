<template>
  <q-form ref="myForm" @submit="save()" class="q-gutter-md">
    <div class="q-pa-md">
      <div class="row q-pb-md q-ma-none">
        <div :class="tipoPessoa == 'PJ' ? 'col-xs-12 col-sm-3' : 'col-xs-12 col-sm-4'">
          <q-select
            outlined
            class="q-pa-xs"
            v-model="tipoPessoa"
            :options="optionsPessoa"
            option-value="value"
            option-label="label"
            label="Tipo de pessoa *"
            emit-value
            map-options
          />
        </div>

        <div :class="tipoPessoa == 'PJ' ? 'col-xs-12 col-sm-3 q-pr-xs' : 'col-xs-12 col-sm-4 q-pr-xs'">
          <q-input
            outlined
            v-model="documento1"
            :label="tipoPessoa == 'PJ' ? 'CNPJ *' : 'CPF *'"
            :mask="tipoPessoa == 'PF' ? '###.###.###-##' : '##.###.###/####-##'"
            class="q-pa-xs"
            lazy-rules
            :rules="tipoPessoa == 'PF' ? ruleCpf : ruleCpnj"
            unmasked-value
          />
        </div>
        <div :class="tipoPessoa == 'PJ' ? 'col-xs-12 col-sm-3' : 'col-xs-12 col-sm-4'">
          <q-input
            outlined
            v-model="documento2"
            class="q-pa-xs"
            lazy-rules
            :label="tipoPessoa == 'PJ' ? 'Inscrição Federal *' : 'RG *'"
          />
        </div>
        <div class="col-xs-12 col-sm-3">
          <q-input
            outlined
            v-if="tipoPessoa == 'PJ'"
            v-model="documento3"
            label="Inscrição Municipal *"
            class="q-pa-xs"
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || 'Campo obrigatório']"
          />
        </div>
      </div>
      <div class="row q-pb-md q-ma-none">
        <div class="col-xs-12 col-sm-6">
          <q-input
            outlined
            v-model="nome"
            :label="tipoPessoa == 'PF' ? 'Nome *' : 'Razão Social'"
            class="q-pa-xs"
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || 'Campo obrigatório']"
          />
        </div>
        <div class="col-xs-12 col-sm-6">
          <q-input
            outlined
            v-model="nickName"
            :label="tipoPessoa == 'PF' ? 'Apelido *' : 'Nome Fantasia'"
            class="q-pa-xs"
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || 'Campo obrigatório']"
          />
        </div>
      </div>

      <div class="row q-pb-md q-ma-none ">
        <div class="col-xs-12 col-sm-3">
          <q-input
            outlined
            mask="(##) # ####-####"
            v-model="telefone1"
            label="Telefone *"
            class="q-pa-xs"
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || 'Campo obrigatório']"
            unmasked-value
          />
        </div>
        <div class="col-xs-12 col-sm-3">
          <q-input
            outlined
            mask="(##) # ####-####"
            unmasked-value
            v-model="telefone2"
            label="Telefone"
            class="q-pa-xs"
          />
        </div>

        <div class="col-xs-12 col-sm-3">
          <q-input
            outlined
            mask="(##) # ####-####"
            unmasked-value
            v-model="telefone3"
            label="Telefone"
            class="q-pa-xs"
          />
        </div>
        <div class="col-xs-12 col-sm-3">
          <q-select
            outlined
            class="q-pa-xs"
            v-model="tipocobrancaId"
            :options="tipocobrancas.content"
            option-value="id"
            option-label="descricao"
            options-selected-class="tipoCobranca-select"
            label="Tipo de cobrança *"
            emit-value
            map-options
            :rules="[(val) => val || 'Campo obrigatório']"
          />
        </div>
      </div>
      <div class="row q-pb-xs q-ma-none">
        <div class="col-xs-12 col-sm-6">
          <q-input outlined v-model="url" type="url" label="URL" class="q-pa-xs" />
        </div>
        <div class="col-xs-12 col-sm-6">
          <q-input
            outlined
            v-model="email"
            type="email"
            label="E-mail *"
            class="q-pa-xs"
            :rules="[(val) => !!val || 'Campo obrigatório', isValidEmail]"
          />
        </div>
      </div>
    </div>
  </q-form>
</template>

<script>
import { mapState } from "vuex";
import { mapFields } from "vuex-map-fields";
import { validateBr } from "js-brasil";
import { isValidEmail } from "src/utils/validarEmail";

export default {
  name: "Cadastro",

  data() {
    return {
      isValidEmail,

      optionsPessoa: [
        { label: "Pessoa Física", value: "PF" },
        { label: "Pessoa Jurídica", value: "PJ" }
      ],
      ruleCpnj: [
        (val) => val.length > 0 || val.length < 18 || "Campo Obrigatório",
        (val) => validateBr.cnpj(val) || "CNPJ Inválido!"
      ],
      ruleCpf: [
        (val) => val.length > 0 || val.length < 14 || "Campo Obrigatório",
        (val) => validateBr.cpf(val) || "CPF Inválido!"
      ]
    };
  },
  computed: {
    ...mapState("tipocobranca", ["tipocobrancas"]),
    ...mapFields("empresa", {
      tipocobrancaId: "empresa.tipoCobranca.id"
    }),
    ...mapFields("empresa", [
      "empresa.pessoa.id",
      "empresa.pessoa.tipoPessoa",
      "empresa.pessoa.nome",
      "empresa.pessoa.nickName",
      "empresa.pessoa.email",
      "empresa.pessoa.telefone1",
      "empresa.pessoa.telefone2",
      "empresa.pessoa.telefone3",
      "empresa.pessoa.documento1",
      "empresa.pessoa.documento2",
      "empresa.pessoa.documento3",
      "empresa.url"
    ])
  },

  methods: {}
};
</script>

<style>
.tipoCobranca-select {
  width: 295px;
}
</style>
