<template>
  <q-form ref="parentescoValid" @submit="salvar()" class="q-gutter-md">
    <div class="q-pa-none">
      <div v-if="$q.screen.xs">
        <div class="row q-pa-xs">
          <div class=" q-pa-xs col-xs-12 col-md-8">
            <q-input
              lazy-rules
              :rules="[val => (val && val.length > 0) || 'Campo obrigatório']"
              outlined
              class="q-pa-xs"
              v-model="parentesco.descricao"
              unmasked-value
              label="Descrição"
            />
          </div>
          <div class=" q-pa-xs col-xs-12 col-md-4">
            <q-number
              outlined
              class="q-pa-xs"
              v-model="parentesco.grau"
              unmasked-value
              label="Grau"
            />
          </div>
          <div class=" q-pa-xs col-xs-12 col-md-12" style="width: 565px">
            <q-input
              outlined
              class="q-pa-xs"
              v-model="parentesco.observacoes"
              unmasked-value
              label="Observações"
              type="textarea"
            />
          </div>
        </div>
      </div>
      <div v-else>
        <div class="row q-pa-xs">
          <div class=" q-pa-xs col-xs-12 col-md-8">
            <q-input
              lazy-rules
              :rules="[val => (val && val.length > 0) || 'Campo obrigatório']"
              outlined
              class="q-pa-xs"
              v-model="parentesco.descricao"
              unmasked-value
              label="Descrição"
            />
          </div>
          <div class=" q-pa-xs col-xs-12 col-md-4">
            <q-number
              outlined
              class="q-pa-xs"
              v-model="parentesco.grau"
              unmasked-value
              label="Grau"
            />
          </div>
          <div class=" q-pa-xs col-xs-12 col-md-12" style="width: 565px">
            <q-input
              outlined
              class="q-pa-xs"
              v-model="parentesco.observacoes"
              unmasked-value
              label="Observações"
              type="textarea"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="q-pl-xs q-pa-xs q-pt-xs" style="text-align: right;">
      <q-btn
        v-if="!parentesco.id"
        label="Finalizar"
        @click="salvar"
        class="add-row"
        color="blue-8"
        text-color="white"
      />
      <q-btn
        v-else
        label="Atualizar"
        @click="atualizar()"
        class="add-row"
        color="blue-8"
        text-color="white"
      />
    </div>
  </q-form>
</template>

<script>
import qNumber from "src/components/qNumber";
import { mapActions, mapState } from "vuex";

export default {
  name: "parentesco",
  props: ["newParentesco"],
  components: { qNumber },
  mounted() {
    this.parentesco = { ...this.newParentesco };
  },
  computed: { ...mapState("parentesco", ["parentescos"]) },
  data() {
    return {
      parentesco: {}
    };
  },

  methods: {
    ...mapActions("parentesco", [
      "getParentescos",
      "postParentesco",
      "putParentesco"
    ]),
    async salvar() {
      await this.$refs.parentescoValid.validate().then(success => {
        if (success) {
          this.$emit("salvar", this.parentesco);
        } else {
          this.$q.notify({
            message: "Preencha todos os campos Obrigatórios!",
            color: "black"
          });
        }
      });
    },
    async atualizar() {
      this.$refs.parentescoValid.validate().then(async success => {
        if (success) {
          await this.$emit("atualizar", this.parentesco);
        } else {
          this.$q.notify({
            message: "Preencha todos os campos Obrigatórios!",
            color: "black"
          });
        }
      });
    }
  }
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
