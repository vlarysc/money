<template>
  <q-form ref="usuarioForm" @submit="salvar()" class="q-gutter-md">
    <div class="q-xl">
      <div class="row q-pa-xs q-sm ">
        <div class="col-xs-12 col-md-4">
          <q-input
            :disable="!!newUsuario.id"
            class="q-pa-xs"
            outlined
            @blur="findPessoaByDocumento1"
            v-model="newUsuario.pessoa.documento1"
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
            v-model="newUsuario.pessoa.nome"
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
            v-model="newUsuario.email"
            label="E-mail"
            lazy-rules
            :rules="[(val) => !!val || 'Email is missing', isValidEmail]"
          />
        </div>
        <div class="col-xs-12 col-md-6">
          <q-input
            class="q-pa-xs"
            outlined
            v-model="newUsuario.pessoa.nickName"
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
            v-model="newUsuario.pessoa.telefone1"
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
            v-model="newUsuario.pessoa.telefone2"
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
            v-model="newUsuario.role"
            label="Role"
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || 'Campo obrigatório']"
          />
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col 6 q-pa-none q-mt-x q-pb-none" style="max-width: 300px">
        <div class="q-mx-sm">
          <q-select
            option-value="value"
            option-label="label"
            style="width: 110px"
            outlined
            v-model="newUsuario.ativo"
            :options="options"
            label="Status"
            emit-value
            map-options
          />
        </div>
      </div>

      <div class="col 6 q-pa-sm" style="text-align: right;">
        <q-btn
          v-if="!newUsuario.id"
          label="Finalizar"
          @click="salvar"
          class="add-row"
          color="blue-8"
          text-color="white"
        />
        <q-btn v-else label="Atualizar" @click="atualizar()" class="add-row" color="blue-8" text-color="white" />
      </div>
    </div>
  </q-form>
</template>

<script>
import { validateBr } from "js-brasil";
import { isValidEmail } from "src/utils/validarEmail";
import { mapActions, mapState } from "vuex";

export default {
  name: "usuario",
  props: ["newUsuario"],
  beforeMount() {},
  data() {
    return {
      options: [
        {
          label: "Ativo",
          value: "S"
        },
        {
          label: "Inativo",
          value: "N"
        }
      ],
      isValidEmail,
      model: null,
      ruleCpf: [
        (val) => val.length > 0 || val.length < 14 || "Campo Obrigatório",
        (val) => validateBr.cpf(val) || "CPF Inválido!"
      ]
    };
  },

  methods: {
    ...mapActions("usuario", ["getUsuario"]),

    async findPessoaByDocumento1() {
      if (!!this.newUsuario.pessoa.id) return;

      await this.$store.dispatch("usuario/getPessoaByDocumento1", this.newUsuario.pessoa.documento1);
      if (!!this.$store.state.usuario.pessoa) {
        console.log(this.$store.state.usuario.pessoa, this.newUsuario, "store");

        this.newUsuario.pessoa = { ...this.$store.state.usuario.pessoa };
        this.newUsuario.email = this.$store.state.usuario.pessoa.email;
      }
    },
    salvar() {
      this.$refs.usuarioForm.validate().then(async (success) => {
        if (success) {
          await this.$emit("salvar", this.newUsuario);
        } else {
          this.$q.notify("Por favor informe obrigatórios da Empresa");
        }
      });
    },
    async atualizar() {
      this.$refs.usuarioForm.validate().then(async (success) => {
        if (success) {
          await this.$emit("atualizar", this.newUsuario);
        } else {
          this.$q.notify("Por favor informe obrigatórios da Empresa");
        }
      });
    }
  }
};
</script>

<style></style>
