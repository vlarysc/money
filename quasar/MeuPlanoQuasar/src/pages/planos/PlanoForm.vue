<template>
  <q-form ref="planoValid" @submit="salvar()">
    <div class="q-xl">
      <div class="row q-pa-xs ">
        <div class=" q-pa-xs col-xs-12 col-md-3">
          <q-input
            outlined
            class="q-pa-xs"
            v-model="plano.codigo"
            unmasked-value
            lazy-rules
            :rules="[val => (val && val.length > 0) || 'Campo obrigatório']"
            label="Código"
          />
        </div>

        <div class=" q-pa-xs col-xs-12 col-md-9">
          <q-input
            outlined
            class="q-pa-xs"
            v-model="plano.descricao"
            unmasked-value
            label="Descrição"
            lazy-rules
            :rules="[val => (val && val.length > 0) || 'Campo obrigatório']"
          />
        </div>
        <div class="row q-pa-xs">
          <div class="q-pt-xs col-xs-5 col-md-6">
            <q-money
              class="q-pa-xs"
              lazy-rules
              :rules="[val => !!val || 'Campo obrigatório']"
              v-model="plano.valor"
              v-bind="moneyFormatForComponent"
              unmasked-value
              label="Valor *"
            />
          </div>
          <div class="q-pa-xs col-xs-6 col-md-6">
            <div>
              <q-toggle
                class="q-pa-xs q-ml-xl"
                v-model="plano.cobrar_dep_idade"
                true-value="S"
                false-value="N"
                checked-icon="check"
                unchecked-icon="clear"
                label="Cobrar dependente"
              />
            </div>
          </div>
        </div>
      </div>
      <div v-if="$q.screen.xs" class="q-pa-xs">
        <div>
          <q-card
            class="q-ma-md"
            style="ABC width:200px; height:400px; border-radius: 8px; margin-top: 10px"
          >
            <q-toolbar class="text-center">
              <q-toolbar-title
                ><span class="text-weight-bold">Carências</span>
              </q-toolbar-title>
            </q-toolbar>
            <div class="row">
              <div class=" q-pa-xs col-xs-12 col-md-4">
                <q-number
                  class="q-pa-xs"
                  v-model="plano.carencia_atend_tit"
                  unmasked-value
                  label="Atendimento Titular"
                />
              </div>
              <div class=" q-pa-xs col-xs-12 col-md-4">
                <q-number
                  class="q-pa-xs"
                  v-model="plano.carencia_atend_dep"
                  unmasked-value
                  label="Atendimento Dependente"
                />
              </div>
              <div class=" q-pa-xs col-xs-12 col-md-4">
                <q-number
                  class="q-pa-xs"
                  v-model="plano.carencia_funeral_tit"
                  unmasked-value
                  label="Funeral Titular"
                />
              </div>
            </div>
            <div class="row">
              <div class=" q-pa-xs col-xs-12 col-md-6">
                <q-number
                  class="q-pa-xs"
                  v-model="plano.carencia_funeral_dep"
                  unmasked-value
                  label="Funeral Dependente"
                />
              </div>
              <div class=" q-pa-xs col-xs-12 col-md-6">
                <q-number
                  class="q-pa-xs"
                  v-model="plano.carencia_pagamento"
                  unmasked-value
                  label="Pagamento"
                />
              </div>
            </div>
          </q-card>
        </div>
      </div>
      <div v-else class="q-pa-xs">
        <div class="row">
          <q-card
            class="q-ma-sm  col-xs-12 col-md-12"
            style="width:735px; min-height:180px; border-radius: 8px; margin-top: 10px"
          >
            <q-toolbar class="text-center">
              <q-toolbar-title
                ><span class="text-weight-bold">Carências</span>
              </q-toolbar-title>
            </q-toolbar>
            <div class="row">
              <div class=" q-pa-xs col-xs-12 col-md-4">
                <q-number
                  class="q-pa-xs"
                  v-model="plano.carencia_atend_tit"
                  unmasked-value
                  label="Atendimento Titular"
                />
              </div>
              <div class=" q-pa-xs col-xs-12 col-md-4">
                <q-number
                  class="q-pa-xs"
                  v-model="plano.carencia_atend_dep"
                  unmasked-value
                  label="Atendimento Dependente"
                />
              </div>
              <div class=" q-pa-xs col-xs-12 col-md-4">
                <q-number
                  class="q-pa-xs"
                  v-model="plano.carencia_funeral_tit"
                  unmasked-value
                  label="Funeral Titular"
                />
              </div>
            </div>
            <div class="row">
              <div class=" q-pa-xs col-xs-12 col-md-4">
                <q-number
                  class="q-pa-xs"
                  v-model="plano.carencia_funeral_dep"
                  unmasked-value
                  label="Funeral Dependente"
                />
              </div>
              <div class=" q-pa-xs col-xs-12 col-md-4">
                <q-number
                  class="q-pa-xs"
                  v-model="plano.carencia_pagamento"
                  unmasked-value
                  label="Pagamento"
                />
              </div>
            </div>
          </q-card>
        </div>
      </div>
    </div>

    <div class="q-pl-xs q-pa-xs q-pt-md" style="text-align: right;">
      <q-btn
        v-if="!plano.id"
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
import qNumber from "src/components/qNumber";
import qMoney from "src/components/qMoney";

export default {
  name: "plano",
  components: { qNumber, qMoney },
  props: ["newPlano"],
  mounted() {
    this.plano = { ...this.newPlano };
  },
  computed: { ...mapState("plano", ["planos"]) },
  data() {
    return {
      plano: {},
      moneyFormatForComponent: {
        decimal: ",",
        thousands: ".",
        prefix: "R$ ",
        suffix: "",
        precision: 2,
        masked: false
      }
    };
  },

  methods: {
    ...mapActions("plano", ["getPlanos", "postPlano", "putPlano"]),
    async salvar() {
      await this.$refs.planoValid.validate().then(success => {
        if (success) {
          this.$emit("salvar", this.plano);
        } else {
          this.$q.notify({
            message: "Preencha todos os campos Obrigatórios!",
            color: "black"
          });
        }
      });
    },
    async atualizar() {
      this.$refs.planoValid.validate().then(async success => {
        if (success) {
          await this.$emit("atualizar", this.plano);
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
  padding-top: 18px;
}
</style>
