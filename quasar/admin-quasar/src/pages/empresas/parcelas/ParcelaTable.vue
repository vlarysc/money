<template>
  <div class="q-pa-xs">
    <q-table
      :grid="$q.screen.xs"
      :visible-grid="['option']"
      :title="`Empresa: ${empresa.pessoa.nome}`"
      flat
      bordered
      dense
      :data="parcelas.content"
      :columns="columns"
      flat
      row-key="name"
    >
      <template v-slot:item="props">
        <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4">
          <q-card>
            <div class="q-pa-xs text-right">
              <q-btn
                size="xs"
                class="q-ma-none q-pa-none"
                color="grey-5"
                @click="del(props.row.id)"
                text-color="white"
                icon="delete_forever"
              />
            </div>
            <div class="row" @click="update(props.row)">
              <div class="col-4">
                <q-card-section class="text-left">
                  Referência
                  <br />
                  <strong>{{ props.row.referencia }}</strong>
                </q-card-section>
              </div>
              <div class="col-8">
                <q-card-section class="text-left">
                  Vencimento
                  <br />
                  <strong>{{ formatDate(props.row.vencimento) }}</strong>
                </q-card-section>
              </div>
              <div class="row">
                <div class="col-5">
                  <q-card-section class="text-left">
                    Pagamento
                    <br />
                    <strong>{{ formatDate(props.row.pagamento) }}</strong>
                  </q-card-section>
                </div>
                <div class="col-7">
                  <q-card-section class="text-left">
                    Valor
                    <br />
                    <strong>{{ props.row.valor | currency }}</strong>
                  </q-card-section>
                </div>
              </div>
            </div>
          </q-card>
        </div>
      </template>

      <template v-slot:body-cell-valor="props">
        <q-td :props="props"> {{ props.row.valor | currency }} </q-td>
      </template>
      <template v-slot:body-cell-valorPago="props">
        <q-td :props="props"> {{ props.row.valorPago | currency }} </q-td>
      </template>

      <template v-slot:body-cell-option="props">
        <q-td :props="props">
          <div style="" class="q-pa-xs ">
            <q-btn
              size="xs"
              class="q-ma-none q-pa-none q-mr-xs"
              color="blue-8"
              @click="update(props.row)"
              icon="create"
            ></q-btn>
            <q-btn
              size="xs"
              class="q-ma-none q-pa-none"
              color="red-8"
              @click="del(props.row.id)"
              text-color="white"
              icon="delete_forever"
            ></q-btn>
          </div>
        </q-td>
      </template>
    </q-table>
    <div class="q-pa-none q-gutter-sm" style="text-align: right;">
      <q-form>
        <q-dialog
          v-model="toolbar"
          :full-width="$q.screen.xs"
          :full-height="$q.screen.xs"
          maximized
          persistent
          class="q-pa-none q-ma-none"
        >
          <q-card class="q-ma-md" style="width:590px;height:300px; border-radius: 15px;">
            <q-toolbar>
              <q-header></q-header>
              <q-toolbar-title><span class="text-weight-bold">Meu</span> Plano.APP</q-toolbar-title>

              <q-btn flat round dense icon="close" v-close-popup></q-btn>
            </q-toolbar>
            <q-card-section>
              <ParcelaForm :newParcela="newParcela" @atualizar="atualizar" @salvar="salvarParcela" />
            </q-card-section>
          </q-card>
        </q-dialog>
      </q-form>
    </div>

    <div class="q-pa-none q-gutter-sm" style="text-align: right;">
      <q-form>
        <q-dialog
          v-model="toolbar2"
          :full-width="$q.screen.xs"
          :full-height="$q.screen.xs"
          maximized
          persistent
          class="q-pa-none q-ma-none"
        >
          <q-card class="q-ma-md" style="width:590px;height:320px; border-radius: 15px;">
            <q-toolbar>
              <q-header></q-header>
              <q-toolbar-title><span class="text-weight-bold">Meu</span> Plano.APP</q-toolbar-title>

              <q-btn flat round dense icon="close" v-close-popup></q-btn>
            </q-toolbar>
            <q-card-section>
              <MultiplasParcelas :newParcela2="newParcela2" @atualizar="atualizar" @salvar="salvarMultiplasParcelas" />
            </q-card-section>
          </q-card>
        </q-dialog>
      </q-form>
    </div>

    <q-page-sticky position="bottom-right" :offset="[18, 20]">
      <q-fab icon="add" label-position="left" direction="up" color="blue-8">
        <q-fab-action
          @click="novoParcela()"
          class="btnAdd bg-blue-8 text-white"
          icon="monetization_on"
          label="Adicionar uma"
          external-label
          label-class="bg-black text-white"
          label-position="left"
        />
        <q-fab-action
          @click="multiplasParcelas()"
          color="primary"
          label-class="bg-black text-white"
          icon="price_change"
          class="btnAdd bg-blue-8 text-white"
          label="Adicionar várias"
          external-label
          label-position="left"
        />
      </q-fab>
    </q-page-sticky>

    <!-- <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <div class="q-pa-sm" style="text-align: right;">
        <q-fab direction="up" icon="add" @click="novoParcela()" class="btnAdd bg-blue-8 text-white"></q-fab>
      </div>
    </q-page-sticky> -->
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import ParcelaForm from "./ParcelaForm";
import MultiplasParcelas from "./MultiplasParcelas";
import { date } from "quasar";

export default {
  components: { ParcelaForm, MultiplasParcelas },
  data() {
    return {
      toolbar: false,
      toolbar2: false,
      newParcela: {},
      newParcela2: {},
      columns: [
        {
          name: "referencia",
          required: true,
          label: "Referencia",
          align: "left",

          field: (field) => field.referencia,
          sortable: true
        },

        {
          name: "vencimento",

          label: "Vencimento ",
          align: "left",
          field: (field) => date.formatDate(field.vencimento, "DD/MM/YYYY") || "-"
        },

        {
          name: "pagamento",

          label: "Pagamento",
          align: "right",
          field: (field) => date.formatDate(field.pagamento, "DD/MM/YYYY") || "-",
          sortable: true
        },
        { name: "valor", label: "Valor ", align: "right", field: (field) => field.valor },
        {
          name: "valorPago",
          style: "margin-right: 10px",
          label: "Valor Pago ",
          align: "right",
          field: (field) => field.valorPago
        },

        { name: "option", align: "center", style: "width: 100px", label: "Opções" }
      ]
    };
  },
  methods: {
    ...mapActions("parcela", ["getParcelas", "getParcela", "putParcela", "postParcela", "deleteParcela"]),
    novoParcela() {
      this.newParcela = {
        referencia: null,
        vencimento: 1,
        pagamento: null,
        valor: 0.0,
        valorPago: 0.0,
        empresaId: this.$store.state.empresa.empresa.id
      };

      this.toolbar = true;
    },
    multiplasParcelas() {
      this.newParcela2 = {
        qParcelas: 1,
        referencia: null,
        vencimento: 1,
        valor: 0.0,
        empresaId: this.$store.state.empresa.empresa.id
      };

      this.toolbar2 = true;
    },
    formatDate(dataApi) {
      return date.formatDate(dataApi, "DD/MM/YYYY") || "-";
    },
    async salvarMultiplasParcelas(parcela) {
      let valor = parcela.valor;
      let empresaId = parcela.empresaId;
      let parcelas = [];
      for (let i = 1; i <= parcela.qParcelas; i++) {
        const mesano = parcela.referencia.split("/");
        console.log(mesano);
        const vencimento = new Date(parseInt(mesano[1]), parseInt(mesano[0]) - 1 + (i - 1), parcela.vencimento);
        const referencia = date.formatDate(vencimento, "MM/YYYY");

        parcelas.push({ vencimento, referencia, valor, empresaId });
      }
      console.log(parcelas);
      await this.postParcela(parcelas);
      this.getParcelas(this.$store.state.empresa.empresa.id);
      this.toolbar2 = false;
    },

    async salvarParcela(parcela) {
      await this.postParcela([parcela]);
      this.getParcelas(this.$store.state.empresa.empresa.id);
      this.toolbar = false;
    },
    async atualizar(parcela) {
      console.log(parcela);
      await this.putParcela({ id: parcela.id, payload: parcela });
      this.getParcelas(this.$store.state.empresa.empresa.id);
      this.toolbar = false;
    },

    update(parcela) {
      const newParcela = { ...parcela };
      this.newParcela = newParcela;
      this.toolbar = true;
    },
    async del(id) {
      this.$swal
        .fire({
          title: "Tem certeza disso?",
          text: "Você não poderá reverter esse processo!",
          icon: "warning",

          inputAttributes: {
            autocapitalize: "off"
          },
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Sim, excluir!"
        })
        .then(async (result) => {
          if (result.isConfirmed) {
            this.loading = true;
            await this.deleteParcela(id);
            await this.getParcelas(this.$store.state.empresa.empresa.id);
            this.loading = false;
          }
        });
    }
  },
  computed: {
    ...mapState("parcela", ["parcelas"]),
    ...mapState("empresa", ["empresa"])
  }
};
</script>

<style>
.q-table__title {
  font-weight: 700;
  color: rgb(48, 48, 53);
}
.oi {
  margin-left: 1000px;
}
.btnAdd {
  margin-top: 100px;
}
</style>
