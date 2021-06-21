<template>
  <q-form ref="contatoForm" @submit="salvar()" class="q-gutter-md">
    <div class="q-xl">
      <div class="row q-pa-xs q-sm ">
        <div class="col-xs-12 col-md-4">
          <q-input
            :disable="!!newContato.id"
            class="q-pa-xs"
            outlined
            @blur="findPessoaByDocumento1"
            v-model="newContato.pessoa.documento1"
            mask="###.###.###-##"
            unmasked-value
            label="CPF"
            lazy-rules
            :rules="ruleCpf"
          />
        </div>
        <div class="col-xs-12 col-md-8">
          <q-input
            class="q-pa-xs"
            outlined
            v-model="newContato.pessoa.nome"
            label="Nome"
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || 'Campo obrigatório']"
          />
        </div>
      </div>
      <div class="row q-pa-xs q-sm ">
        <div class="col-xs-12 col-md-6">
          <q-input
            class="q-pa-xs"
            outlined
            v-model="newContato.pessoa.email"
            label="E-mail"
            lazy-rules
            :rules="[(val) => !!val || 'Email is missing', isValidEmail]"
          />
        </div>
        <div class="col-xs-12 col-md-6">
          <q-input
            class="q-pa-xs"
            outlined
            v-model="newContato.pessoa.nickName"
            label="Apelido"
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || 'Campo obrigatório']"
          />
        </div>
      </div>

      <div class="row q-pa-xs q-sm ">
        <div class="col-xs-12 col-md-4">
          <q-input
            class="q-pa-xs"
            outlined
            v-model="newContato.pessoa.telefone1"
            label="Telefone *"
            mask="(##) # ####-####"
            unmasked-value
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || 'Campo obrigatório']"
          />
        </div>
        <div class="col-xs-12 col-md-4">
          <q-input
            class="q-pa-xs"
            outlined
            v-model="newContato.pessoa.telefone2"
            label="Telefone"
            mask="(##) # ####-####"
            unmasked-value
            lazy-rules
          />
        </div>

        <div class="col-xs-12 col-md-4">
          <q-input
            class="q-pa-xs"
            outlined
            v-model="newContato.cargo"
            label="Cargo"
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || 'Campo obrigatório']"
          />
        </div>
      </div>
    </div>

    <div class="q-pa-none q-mx-sm" style="text-align: right">
      <q-btn
        v-if="!newContato.id"
        label="Finalizar"
        @click="salvar"
        class="add-row"
        color="blue-8"
        text-color="white"
      />
      <q-btn v-else label="Atualizar" @click="atualizar()" class="add-row" color="blue-8" text-color="white" />
    </div>
  </q-form>
</template>

<script>
import { validateBr } from "js-brasil";
import { isValidEmail } from "src/utils/validarEmail";
import { mapActions, mapState } from "vuex";

export default {
  name: "contato",
  props: ["newContato"],
  beforeMount() {},
  data() {
    return {
      isValidEmail,
      model: null,
      contato2: {},
      ruleCpf: [
        (val) => val.length > 0 || val.length < 14 || "Campo Obrigatório",
        (val) => validateBr.cpf(val) || "CPF Inválido!"
      ]
    };
  },

  methods: {
    ...mapActions("contato", ["getContato"]),

    async findPessoaByDocumento1() {
      if (!!this.newContato.pessoa.id) return;

      await this.$store.dispatch("empresa/getPessoaByDocumento1", this.newContato.pessoa.documento1);
      if (!!this.$store.state.empresa.pessoa) {
        console.log(this.$store.state.empresa.pessoa, this.newContato, "store");

        this.newContato.pessoa = { ...this.$store.state.empresa.pessoa };
      }
    },
    salvar() {
      this.$refs.contatoForm.validate().then(async (success) => {
        if (success) {
          await this.$emit("salvar", this.newContato);
        } else {
          this.$q.notify("Por favor informe obrigatórios da Empresa");
        }
      });
    },
    async atualizar() {
      this.$refs.contatoForm.validate().then(async (success) => {
        if (success) {
          await this.$emit("atualizar", this.newContato);
        } else {
          this.$q.notify("Por favor informe obrigatórios da Empresa");
        }
      });
    }
  }
};
</script>

<style></style>
