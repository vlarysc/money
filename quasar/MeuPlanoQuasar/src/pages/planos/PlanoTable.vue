<template>
  <div class="q-pa-xs">
    <q-table
      :grid="$q.screen.xs"
      :visible-grid="['option']"
      :pagination.sync="myPagination"
      flat
      bordered
      dense
      :data="planos.results"
      :columns="columns"
      @request="onRequest"
      :loading="loading"
      row-key="name"
      hide-pagination
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
                  Código
                  <br />
                  <strong>{{ props.row.codigo }}</strong>
                </q-card-section>
              </div>
              <div class="col-8">
                <q-card-section class="text-left">
                  Descrição
                  <br />
                  <strong>{{ props.row.descricao }}</strong>
                </q-card-section>
              </div>
              <div class="row">
                <div class="col-5">
                  <q-card-section class="text-left">
                    Pagamento
                    <br />
                    <strong>{{ props.row.carencia_pagamento }}</strong>
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
        <q-td :props="props">
          {{ props.row.carencia_pagamento | currency }}
        </q-td>
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
    <div class="q-pa-lg flex flex-center">
      <q-pagination
        v-model="page"
        :max="
          Math.max(
            1,
            Math.ceil(
              this.myPagination.rowsNumber / this.myPagination.rowsPerPage
            )
          )
        "
      />
    </div>

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
          <q-card
            class="scroll q-ma-md"
            style="width:790px;height:525px; border-radius: 15px;"
          >
            <q-toolbar>
              <q-header></q-header>
              <q-toolbar-title
                ><span class="text-weight-bold">Meu</span>
                Plano.APP</q-toolbar-title
              >

              <q-btn flat round dense icon="close" v-close-popup></q-btn>
            </q-toolbar>
            <q-card-section>
              <PlanoForm
                :newPlano="plano"
                @atualizar="atualizar"
                @salvar="salvarPlanos"
              />
            </q-card-section>
          </q-card>
        </q-dialog>
      </q-form>
    </div>

    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <div class="q-pa-md" style="text-align: right;">
        <q-fab
          icon="add"
          class="btnAdd bg-blue-6 text-white"
          @click="novoPlano()"
        />
      </div>
    </q-page-sticky>

    <!-- <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <div class="q-pa-sm" style="text-align: right;">
        <q-fab direction="up" icon="add" @click="novoPlano()" class="btnAdd bg-blue-8 text-white"></q-fab>
      </div>
    </q-page-sticky> -->
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import PlanoForm from "./PlanoForm";
import { pageSizeDefault } from "src/utils/newDatas";

export default {
  components: { PlanoForm },
  computed: {
    ...mapState("plano", ["planos"])
  },
  async mounted() {
    await this.onRequest({
      pagination: {
        ...pageSizeDefault()
      }
    });
  },
  watch: {
    page: function(newValue, oldValue) {
      this.onRequest({
        pagination: {
          page: newValue
        }
      });
    }
  },
  data() {
    return {
      page: 1,
      myPagination: {
        sortBy: "desc",
        descending: false,
        page: 0,
        rowsPerPage: pageSizeDefault().size,
        rowsNumber: 10
      },
      toolbar: false,
      plano: {},
      loading: false,
      columns: [
        {
          name: "id",
          required: true,
          label: "ID",
          align: "left",
          style: "width: 50px;",
          field: row => row.id,
          sortable: true
        },

        {
          name: "codigo",

          label: "Código ",
          align: "left",
          field: row => row.codigo
        },

        {
          name: "descricao",
          style: "width: 50%;",
          label: "Descrição",
          align: "left",
          field: row => row.descricao,
          sortable: true
        },
        {
          name: "valor",
          label: "Valor ",
          align: "right",
          field: row => row.valor
        },

        {
          name: "option",
          align: "center",
          style: "width: 100px",
          label: "Opções"
        }
      ]
    };
  },
  methods: {
    ...mapActions("plano", [
      "getPlanos",
      "getPlano",
      "putPlano",
      "postPlano",
      "deletePlano"
    ]),

    async onRequest(props) {
      console.log("onrequesta");
      this.loading = true;

      const pagination = props ? props.pagination : null;

      const pageSize = {
        ...pageSizeDefault(),
        page: pagination ? pagination.page - 1 : this.page - 1
      };

      await this.getPlanos(pageSize);

      this.myPagination = {
        ...this.myPagination,
        ...pagination,
        rowsNumber: this.planos.total
      };
      this.loading = false;
    },
    novoPlano() {
      this.plano = {
        codigo: null,
        descricao: null,
        valor: 0,
        carencia_atend_tit: null,
        carencia_atend_dep: null,
        carencia_funeral_tit: null,
        carencia_funeral_dep: null,
        carencia_pagamento: null,
        cobrar_dep_idade: "S",
        ativo: "S",
        created_id: 0,
        updated_id: 0
      };

      this.toolbar = true;
    },

    async salvarPlanos(plano) {
      await this.postPlano(plano);
      this.onRequest();
      this.toolbar = false;
    },
    async atualizar(plano) {
      await this.putPlano({ id: plano.id, payload: plano });
      this.onRequest();
      this.toolbar = false;
    },

    update(plano) {
      this.plano = { ...plano };
      this.toolbar = true;
    }
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
