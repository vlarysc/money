<template>
  <q-card style="min-width: 350px">
    <q-card-section class="row items-center q-pb-none">
      <div class="text-h6 q-pa-sm">Tipo de Cobrança</div>
      <q-space />
      <q-btn icon="close" flat round dense v-close-popup />
    </q-card-section>
    <q-form @submit="save"></q-form>

    <q-card-section class="q-pt-none">
      <q-input
        type="text"
        dense
        v-model="tipocobranca.descricao"
        lazy-rules
        outlined
        :rules="[(val) => (val && val.length > 0) || 'Preencha o formulário']"
        label="Descrição"
        autofocus
      />
    </q-card-section>

    <q-card-actions v-if="tipocobranca.descricao.length > 0" align="right" class="text-primary">
      <q-btn flat label="Cancel" v-close-popup />
      <q-btn type="@submit" flat v-if="!tipocobranca.id" label="Adicionar" @click="save()" v-close-popup />
      <q-btn type="submit" flat v-else label="Atualizar" @click.prevent="update()" v-close-popup />
    </q-card-actions>
  </q-card>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  props: ["tipocobranca", "options"],
  data() {
    return {
      creating: false,
      isEdit: false
    };
  },
  computed: {
    ...mapState("tipocobranca", ["tipocobrancas"])
  },
  methods: {
    ...mapActions("tipocobranca", ["getTipoCobrancas", "postTipoCobranca", "putTipoCobranca"]),
    async save() {
      await this.postTipoCobranca(this.tipocobranca);
      this.getTipoCobrancas(this.options);
      this.prompt = false;
    },
    async update() {
      await this.putTipoCobranca({ id: this.tipocobranca.id, payload: this.tipocobranca });
      this.getTipoCobrancas(this.options);
    }
  }
};
</script>

<style></style>
