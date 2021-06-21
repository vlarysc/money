<template>
  <q-form ref="religiaoValid" @submit="salvar()" class="q-gutter-md">
    <div class="q-xl">
      <div class="row q-pa-xs ">
        <div class=" q-pa-xs col-xs-12 col-md-12">
          <q-input
            outlined
            debounce="5000"
            class="q-pa-xs"
            v-model="religiao.descricao"
            unmasked-value
            label="Descrição *"
            lazy-rules
            :rules="[val => (val && val.length > 0) || 'Campo obrigatório']"
          />
        </div>
      </div>
      <div v-if="$q.screen.xs" class="row q-pa-xs">
        <div class=" q-pa-xs col-xs-12 col-md-12" style="width: 565px">
          <q-input
            outlined
            class="q-pa-xs"
            v-model="religiao.observacoes"
            unmasked-value
            label="Observações"
            type="textarea"
          />
        </div>
      </div>
      <div v-else class="row q-pa-xs">
        <div class=" q-pa-xs col-xs-12 col-md-12" style="width: 365px">
          <q-input
            outlined
            class="q-pa-xs"
            v-model="religiao.observacoes"
            unmasked-value
            label="Observações"
            type="textarea"
          />
        </div>
      </div>
    </div>

    <div class="q-pl-xs q-pa-xs q-pt-md" style="text-align: right;">
      <q-btn
        v-if="!religiao.id"
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
import { mapActions, mapState } from "vuex";

export default {
  name: "religiao",
  props: ["newReligiao"],
  mounted() {
    this.religiao = { ...this.newReligiao };
  },
  computed: { ...mapState("religiao", ["religioes"]) },
  data() {
    return {
      religiao: {}
    };
  },

  methods: {
    ...mapActions("religiao", ["getReligioes", "postReligiao", "putReligiao"]),
    async salvar() {
      await this.$refs.religiaoValid.validate().then(success => {
        if (success) {
          this.$emit("salvar", this.religiao);
        } else {
          this.$q.notify({
            message: "Preencha todos os campos Obrigatórios!",
            color: "black"
          });
        }
      });
    },
    async atualizar() {
      this.$refs.religiaoValid.validate().then(async success => {
        if (success) {
          await this.$emit("atualizar", this.religiao);
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
