<template>
  <q-form ref="formapagamentoValid" @submit="salvar()" class="q-gutter-md">
    <div class="q-xl">
      <div v-if="$q.screen.xs">
        <div class="row q-pa-xs ">
          <div class=" q-pa-xs col-xs-12 col-md-4">
            <q-input
              lazy-rules
              :rules="[val => (val && val.length > 0) || 'Campo obrigatório']"
              outlined
              class="q-pa-xs"
              v-model="formapagamento.descricao"
              unmasked-value
              label="Descrição"
            />
          </div>
          <div class=" q-pa-xs col-xs-12 col-md-4">
            <q-number
              outlined
              class="q-pa-xs"
              v-model="formapagamento.porcentagem_descontar"
              unmasked-value
              label="Desconto %"
            />
          </div>
          <div class=" q-pa-xs col-xs-12 col-md-4">
            <q-number
              outlined
              class="q-pa-xs"
              v-model="formapagamento.porcentagem_adicionar"
              unmasked-value
              label="Adicional %"
            />
          </div>
        </div>
        <div class="row q-pa-xs ">
          <div class=" q-pa-xs col-xs-12 col-md-4">
            <q-money
              outlined
              class="q-pa-xs"
              v-model="formapagamento.valor_descontar"
              unmasked-value
              label="Desconto"
            />
          </div>
          <div class=" q-pa-xs col-xs-12 col-md-4">
            <q-money
              outlined
              class="q-pa-xs"
              v-model="formapagamento.valor_adicionar"
              unmasked-value
              label="Adicional"
            />
          </div>
        </div>
        <div class="row q-pa-xs">
          <div class="q-pa-xs col-xs-12 col-md-6">
            <div>
              <q-toggle
                class="q-pa-xs"
                false-value="N"
                true-value="S"
                v-model="formapagamento.mostrar_caixa"
                checked-icon="check"
                unchecked-icon="clear"
                label="Mostrar Caixa"
              />
            </div>
          </div>
          <div class="q-pa-xs col-xs-12  col-md-6">
            <div>
              <q-toggle
                class="q-pa-xs"
                v-model="formapagamento.sangria"
                false-value="N"
                true-value="S"
                checked-icon="check"
                unchecked-icon="clear"
                label="Sangria"
              />
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="row q-pa-xs ">
          <div class=" q-pa-xs col-xs-4 col-md-4">
            <q-input
              lazy-rules
              :rules="[val => !!val || 'Campo obrigatório']"
              outlined
              class="q-pa-xs"
              v-model="formapagamento.descricao"
              unmasked-value
              label="Descrição"
            />
          </div>
          <div class=" q-pa-xs col-xs-4 col-md-4">
            <q-number
              outlined
              class="q-pa-xs"
              v-model="formapagamento.porcentagem_descontar"
              unmasked-value
              label="Desconto %"
            />
          </div>
          <div class=" q-pa-xs col-xs-4 col-md-4">
            <q-number
              outlined
              class="q-pa-xs"
              v-model="formapagamento.porcentagem_adicionar"
              unmasked-value
              label="Adicional %"
            />
          </div>
        </div>
        <div class="row q-pa-xs ">
          <div class=" q-pa-xs col-xs-4 col-md-4">
            <q-money
              outlined
              class="q-pa-xs"
              v-model="formapagamento.valor_descontar"
              unmasked-value
              label="Desconto"
            />
          </div>
          <div class=" q-pa-xs col-xs-4 col-md-4">
            <q-money
              outlined
              class="q-pa-xs"
              v-model="formapagamento.valor_adicionar"
              unmasked-value
              label="Adicional"
            />
          </div>
        </div>
        <div class="row q-pa-xs">
          <div class="q-pa-xs col-xs-6 col-md-6">
            <div>
              <q-toggle
                class="q-pa-xs"
                false-value="N"
                true-value="S"
                v-model="formapagamento.mostrar_caixa"
                checked-icon="check"
                unchecked-icon="clear"
                label="Mostrar Caixa"
              />
            </div>
          </div>
          <div class="q-pa-xs col-xs-6 col-md-6">
            <div>
              <q-toggle
                class="q-pa-xs"
                false-value="N"
                true-value="S"
                v-model="formapagamento.sangria"
                checked-icon="check"
                unchecked-icon="clear"
                label="Sangria"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="q-pl-xs q-pa-xs q-pt-md" style="text-align: right;">
      <q-btn
        v-if="!formapagamento.id"
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
import qMoney from "src/components/qMoney";
import { mask } from "vue-the-mask";

export default {
  name: "formapagamento",
  props: ["newFormaPagamento"],
  directives: { mask },
  components: { qMoney, qNumber },
  mounted() {
    this.formapagamento = { ...this.newFormaPagamento };
  },
  computed: { ...mapState("formapagamento", ["formapagamentos"]) },
  data() {
    return {
      formapagamento: {}
    };
  },

  methods: {
    ...mapActions("formapagamento", [
      "getFormaPagamentos",
      "postFormaPagamento",
      "putFormaPagamento"
    ]),
    async salvar() {
      await this.$refs.formapagamentoValid.validate().then(success => {
        if (success) {
          this.$emit("salvar", this.formapagamento);
        } else {
          this.$q.notify({
            message: "Preencha todos os campos Obrigatórios!",
            color: "black"
          });
        }
      });
    },
    async atualizar() {
      this.$refs.formapagamentoValid.validate().then(async success => {
        if (success) {
          await this.$emit("atualizar", this.formapagamento);
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
