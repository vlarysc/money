<template>
  <q-form ref="parcelaFM" @submit="salvar()" class="q-gutter-md">
    <div class="q-xl">
      <div class="row q-pa-none ">
        <div class="q-pa-none col-xs-12 col-md-6">
          <q-date-picker
            class="q-ma-xs q-mx-xs"
            v-model="newParcela2.referencia"
            type="month"
            format="MM/YYYY"
            value_type="MM/YYYY"
            label="Referência Inicial *"
            :rules="[(val) => !!val || 'Campo Obrigatorio']"
          ></q-date-picker>
        </div>

        <div class=" q-pa-xs col-xs-12 col-md-6">
          <q-number class="q-pa-xs" v-model="newParcela2.vencimento" unmasked-value label="Dia de vencimento *" />
        </div>
      </div>
      <div class="row q-pa-none">
        <div class=" q-pa-xs col-xs-12 col-md-6">
          <q-money
            class="q-pa-xs"
            v-model="newParcela2.valor"
            v-bind="moneyFormatForComponent"
            unmasked-value
            label="Valor *"
          />
        </div>
        <div class=" q-pa-xs col-xs-12 col-md-6">
          <q-number class="q-pa-none" v-model="newParcela2.qParcelas" unmasked-value label="Quantidade de parcelas *" />
        </div>
      </div>
      <div class="q-pa-sm q-pt-xl " style="text-align: right;">
        <q-btn
          v-if="!newParcela2.id"
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
import { mapActions, mapState } from "vuex";
import { Money } from "v-money";
import qDatePicker from "src/components/qDatePicker";
import qMoney from "src/components/qMoney";
import qNumber from "src/components/qNumber";

export default {
  name: "parcela",
  components: { Money, qDatePicker, qNumber, qMoney },
  props: ["newParcela2"],
  beforeMount() {},
  data() {
    return {
      model: null,
      momentFormat: {
        //[optional] Date to String
        stringify: (date) => {
          return date ? moment(date).format("LL") : "";
        },
        //[optional]  String to Date
        parse: (value) => {
          return value ? moment(value, "LL").toDate() : null;
        },
        //[optional] getWeekNumber
        getWeek: (date) => {
          return; // a number
        }
      },
      moneyFormatForComponent: {
        decimal: ",",
        thousands: ".",
        prefix: "R$ ",
        suffix: "",
        precision: 2,
        masked: false
      },
      moneyFormatForComponent2: {}
    };
  },

  methods: {
    ...mapActions("parcela", ["getParcela"]),

    salvar() {
      this.$refs.parcelaFM.validate().then((success) => {
        if (success) {
          this.$emit("salvar", this.newParcela2);
        } else {
          this.$q.notify({
            message: "Preencha todos os campos Obrigatórios!",
            color: "black"
          });
        }
      });
    },
    async atualizar() {
      this.$refs.parcelaFM.validate().then((success) => {
        if (success) {
          this.$emit("atualizar", this.newParcela2);
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

<style lang="scss"></style>
