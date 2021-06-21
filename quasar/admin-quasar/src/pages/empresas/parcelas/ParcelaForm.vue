<template>
  <q-form ref="parcelaFtc" @submit="salvar()" class="q-gutter-md">
    <div class="q-xl">
      <div class="row q-pa-xs ">
        <div class="col-xs-12 col-md-4">
          <q-date-picker
            :rules="[(val) => !!val || 'Campo Obrigatorio']"
            v-model="newParcela.referencia"
            type="month"
            format="MM/YYYY"
            value_type="MM/YYYY"
            label="Referência *"
          ></q-date-picker>
        </div>
        <div class="col-xs-12 col-md-4">
          <q-date-picker
            :rules="[(val) => !!val || 'Campo obrigatório']"
            v-model="newParcela.vencimento"
            format="DD/MM/YYYY"
            label="Vencimento"
            value_type="YYYY-MM-DDTHH:mm:ss.SSSZ"
          ></q-date-picker>
        </div>
        <div class="col-xs-12 col-md-4">
          <q-date-picker
            v-model="newParcela.pagamento"
            format="DD/MM/YYYY"
            value-type="YYYY-MM-DDTHH:mm:ss.SSSZ"
            label="Pagamento"
          ></q-date-picker>
        </div>
      </div>
      <div class="row q-pa-xs q-sm ">
        <div class="q-pt-xs col-xs-12 col-md-4">
          <q-money
            :rules="[(val) => !!val || 'Campo obrigatório']"
            v-model="newParcela.valor"
            v-bind="moneyFormatForComponent"
            unmasked-value
            label="Valor *"
          />
        </div>
        <div class="q-pt-xs col-xs-12 col-md-4">
          <q-money v-bind="moneyFormatForComponent" v-model="newParcela.valorPago" unmasked-value label="Valor Pago" />
        </div>
      </div>
    </div>

    <div class="q-pa-sm q-pt-md" style="text-align: right;">
      <q-btn
        v-if="!newParcela.id"
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
import { mapActions, mapState } from "vuex";
import { Money } from "v-money";
import qDatePicker from "src/components/qDatePicker";
import qMoney from "src/components/qMoney";

export default {
  name: "parcela",
  components: { Money, qDatePicker, qMoney },
  props: ["newParcela"],
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
      }
    };
  },

  methods: {
    ...mapActions("parcela", ["getParcela"]),

    /* salvar() {
      this.$refs.parcelaFtc.validate().then(async (success) => {
        if (success) {
          await this.$emit("salvar", this.newParcela);
        } else {
          this.$q.notify({
            message: "Preencha todos os campos Obrigatórios!",
            color: "black"
          });
        }
      });
    }, */
    salvar() {
      this.$refs.parcelaFtc.validate().then((success) => {
        if (success) {
          this.$emit("salvar", this.newParcela);
        } else {
          this.$q.notify({
            message: "Preencha todos os campos Obrigatórios!",
            color: "black"
          });
        }
      });
    },
    async atualizar() {
      this.$refs.parcelaFtc.validate().then(async (success) => {
        if (success) {
          await this.$emit("atualizar", this.newParcela);
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
