<template>
  <q-form @submit="salvar()" class="q-pa-none q-ma-none">
    <div class="q-xl">
      <div class="row q-pa-sm q-sm ">
        <div class="col-xs-12 col-md-3">
          <q-input
            class="q-pa-xs"
            outlined
            @blur="consultar"
            v-model="endereco.cep"
            label="CEP"
            lazy-rules
            :rules="[val => (val && val.length > 0) || 'Campo obrigatório']"
          />
        </div>
        <div class="col-xs-12 col-md-7">
          <q-input
            class="q-pa-xs"
            outlined
            v-model="endereco.logradouro"
            label="Rua"
            lazy-rules
            :rules="[val => (val && val.length > 0) || 'Campo obrigatório']"
          />
        </div>
        <div class="col-xs-12 col-md-2">
          <q-input
            class="q-pa-xs"
            outlined
            v-model="endereco.numero"
            label="N°"
            lazy-rules
            :rules="[val => (val && val.length > 0) || 'Campo obrigatório']"
          />
        </div>
      </div>
      <div class="row q-pa-sm q-sm">
        <div class="col-xs-12 col-md-5">
          <q-input
            class="q-pa-xs"
            outlined
            v-model="endereco.bairro"
            label="Bairro"
            lazy-rules
            :rules="[val => (val && val.length > 0) || 'Campo obrigatório']"
          />
        </div>
        <div class="col-md-4 col-xs-12 ">
          <q-input
            class="q-pa-xs"
            outlined
            v-model="endereco.cidade"
            label="Cidade"
            lazy-rules
            :rules="[val => (val && val.length > 0) || 'Campo obrigatório']"
          />
        </div>
        <div class="col-xs-12 col-md-3">
          <q-select
            class="q-pa-xs q-ma-none"
            outlined
            v-model="endereco.uf"
            :options="ufOptions"
            option-value="uf"
            option-label="uf"
            label="UF"
            emit-value
            map-options
          >
            <template v-slot:prepend>
              <q-icon size="xs" name="place" />
            </template>
          </q-select>
        </div>
      </div>
      <div class="row q-pa-sm q-sm">
        <div class="col-xs-12">
          <q-input
            class="q-pa-xs"
            outlined
            v-model="endereco.complemento"
            label="Complemento"
          />
        </div>
      </div>
    </div>

    <div class="q-pa-none q-mx-sm" style="text-align: right;">
      <q-btn
        label="Finalizar"
        @click="salvar"
        class="add-row"
        color="blue-8"
        text-color="white"
      />
    </div>
  </q-form>
</template>

<script>
import { ufoptions } from "src/utils/uf";

export default {
  name: "endereco",
  props: ["enderecos"],

  computed: {
    ufOptions: () => ufoptions
  },
  mounted() {
    this.endereco = { ...this.enderecos };
  },
  data() {
    return {
      model: null,
      endereco: {}
    };
  },

  methods: {
    salvar() {
      if (this.endereco.cep > 0) {
        this.$emit("fechar", this.endereco);
      } else {
        this.$q.notify({
          message: "CEP Obrigatório!",
          color: "black",
          avatar:
            "https://findicons.com/files/icons/990/vistaico_toolbar/256/symbol_error.png"
        });
      }
    },
    async consultar() {
      delete this.$axios.defaults.headers.common["Authorization"];
      const result = await this.$axios
        .get(`https://viacep.com.br/ws/${this.endereco.cep}/json/`)
        .then(res => res)
        .catch(error => error);

      if (result.status == 200 && !result.data.erro) {
        const data = result.data;
        this.endereco.logradouro = data.logradouro;
        this.endereco.bairro = data.bairro;
        this.endereco.cidade = data.localidade;
        this.endereco.uf = data.uf;
      } else {
        this.$q.notify("Erro ao consultar o CEP");
      }
    }
  }
};
</script>

<style></style>
