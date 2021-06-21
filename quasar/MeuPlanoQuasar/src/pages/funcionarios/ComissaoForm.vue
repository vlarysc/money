<template>
  <q-form ref="myForm" @submit="save()">
    <q-card class="container">
      <div class="card-container">
        <div class="row q-pb-md q-ma-none">
          <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3">
            <q-toggle
              false-value="N"
              true-value="S"
              class="q-pa-xs q-ml-md"
              unchecked-icon="clear"
              v-model="comissao_venda"
              label="Comissão de venda"
            />

            <q-card
              :disabled="!comissao_venda"
              class="q-ma-md"
              style="width:240px; height:200px; border-radius: 8px; margin-top: 10px"
            >
              <q-toolbar class="text-center">
                <q-toolbar-title
                  ><span class="text-weight-bold">Vendas</span>
                </q-toolbar-title>
              </q-toolbar>
              <div class="row q-pb-md q-ma-none">
                <div class="q-pt-xs col-xs-12 col-md-12">
                  <q-money
                    class="q-pa-xs"
                    v-model="valor_comissao_venda"
                    v-bind="moneyFormatForComponent"
                    unmasked-value
                    label="Valor da comissão"
                  />
                </div>
                <div class="q-pt-xs col-xs-12 col-md-12">
                  <q-number
                    class="q-pa-xs"
                    v-model="valor_comissao_venda_pct"
                    unmasked-value
                    label="Porcentagem da comissão"
                  />
                </div>
              </div>
            </q-card>
          </div>
          <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3">
            <q-toggle
              false-value="N"
              true-value="S"
              class="q-pa-xs q-ml-md"
              unchecked-icon="clear"
              v-model="comissao_pagamento"
              label="Comissão de pagamento"
            />

            <q-card
              :disabled="!comissao_pagamento"
              class="q-ma-md"
              style="width:240px; height:200px; border-radius: 8px; margin-top: 10px"
            >
              <q-toolbar class="text-center">
                <q-toolbar-title
                  ><span class="text-weight-bold">Pagamentos</span>
                </q-toolbar-title>
              </q-toolbar>
              <div class="row q-pb-md q-ma-none ">
                <div class="q-pt-xs col-xs-12 col-md-12">
                  <q-money
                    class="q-pa-xs"
                    v-model="valor_comissao_pagamento"
                    v-bind="moneyFormatForComponent"
                    unmasked-value
                    label="Valor da comissão"
                  />
                </div>
                <div class="q-pt-xs col-xs-12 col-md-12">
                  <q-number
                    class="q-pa-xs"
                    v-model="valor_comissao_pagamento_pct"
                    unmasked-value
                    label="Porcentagem da comissão"
                  />
                </div>
              </div>
            </q-card>
          </div>

          <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3">
            <q-toggle
              false-value="N"
              true-value="S"
              class="q-pa-xs q-ml-md"
              unchecked-icon="clear"
              v-model="comissao_cobranca"
              label="Comissão de cobranca"
            />

            <q-card
              :disabled="!comissao_cobranca"
              class="q-ma-md"
              style="width:240px; height:200px; border-radius: 8px; margin-top: 10px"
            >
              <q-toolbar class="text-center">
                <q-toolbar-title
                  ><span class="text-weight-bold">Cobranças</span>
                </q-toolbar-title>
              </q-toolbar>
              <div class="row q-pb-xs q-ma-none">
                <div class="q-pt-xs col-xs-12 col-md-12">
                  <q-money
                    class="q-pa-xs"
                    v-model="valor_comissao_cobranca"
                    v-bind="moneyFormatForComponent"
                    unmasked-value
                    label="Valor da comissão"
                  />
                </div>
                <div class="q-pt-xs col-xs-12 col-md-12">
                  <q-number
                    class="q-pa-xs"
                    v-model="valor_comissao_cobranca_pct"
                    unmasked-value
                    label="Porcentagem da comissão"
                  />
                </div>
              </div>
            </q-card>
          </div>
          <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3">
            <q-toggle
              false-value="N"
              true-value="S"
              class="q-pa-xs q-ml-md"
              unchecked-icon="clear"
              v-model="comissao_entrega"
              label="Comissão de entrega"
            />

            <q-card
              :disabled="!comissao_entrega"
              class="q-ma-md"
              style="width:240px; height:200px; border-radius: 8px; margin-top: 10px"
            >
              <q-toolbar class="text-center">
                <q-toolbar-title
                  ><span class="text-weight-bold">Entregas</span>
                </q-toolbar-title>
              </q-toolbar>
              <div class="row q-pb-xs q-ma-none">
                <div class="q-pt-xs col-xs-12 col-md-12">
                  <q-money
                    class="q-pa-xs"
                    v-model="valor_comissao_entrega"
                    v-bind="moneyFormatForComponent"
                    unmasked-value
                    label="Valor da comissão"
                  />
                </div>
                <div class="q-pt-xs col-xs-12 col-md-12">
                  <q-number
                    class="q-pa-xs"
                    v-model="valor_comissao_entrega_pct"
                    unmasked-value
                    label="Porcentagem da comissão"
                  />
                </div>
              </div>
            </q-card>
          </div>
        </div>
      </div>
    </q-card>
  </q-form>
</template>

<script>
import qNumber from "src/components/qNumber";
import { mapFields } from "vuex-map-fields";
import qMoney from "src/components/qMoney";

export default {
  name: "funcionario",
  props: ["newFuncionario"],
  components: { qMoney, qNumber },
  mounted() {},
  computed: {
    ...mapFields("funcionario", [
      "funcionario.comissao_venda",
      "funcionario.comissao_cobranca",
      "funcionario.comissao_entrega",
      "funcionario.comissao_pagamento",
      "funcionario.valor_comissao_venda",
      "funcionario.valor_comissao_venda_pct",
      "funcionario.valor_comissao_pagamento",
      "funcionario.valor_comissao_pagamento_pct",
      "funcionario.valor_comissao_cobranca",
      "funcionario.valor_comissao_cobranca_pct",
      "funcionario.valor_comissao_entrega",
      "funcionario.valor_comissao_entrega_pct"
    ])
  },
  data() {
    return {
      comissaoVenda: true,
      comissaoPagamento: true,
      comissaoCobranca: true,
      comissaoEntrega: true,
      funcionario: {},
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
  /* watch: {
    comissaoVenda: function(newValue, oldValue) {
      this.comissao_venda = this.comissaoVenda ? "S" : "N";
    },
    comissaoPagamento: function(newValue, oldValue) {
      this.comissao_pagamento = this.comissaoPagamento ? "S" : "N";
    },
    comissaoCobranca: function(newValue, oldValue) {
      this.comissao_cobranca = this.comissaoCobranca ? "S" : "N";
    },
    comissaoEntrega: function(newValue, oldValue) {
      this.comissao_entrega = this.comissaoEntrega ? "S" : "N";
    }
  }, */
  methods: {}
};
</script>
<style>
.container {
  width: 100%;
}

.card-container {
  float: left;
  width: 90%;
  margin-left: 10%;

  min-height: 420px;
  border-radius: 8px;
  margin-top: 10px;
}
</style>
