<template>
  <div class="q-pa-xs">
    <q-table
      :grid="$q.screen.xs"
      :visible-grid="['option']"
      :pagination.sync="myPagination"
      flat
      bordered
      dense
      :data="formapagamentos.results"
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
              <div class="col-2">
                <q-card-section class="text-left">
                  ID
                  <br />
                  <strong>{{ props.row.id }}</strong>
                </q-card-section>
              </div>
              <div class="col-8">
                <q-card-section class="text-left">
                  Descrição
                  <br />
                  <strong>{{ props.row.descricao }}</strong>
                </q-card-section>
              </div>
              <div class="col-4">
                <q-card-section class="text-left">
                  Desconto %
                  <br />
                  <strong>{{ props.row.id }} %</strong>
                </q-card-section>
              </div>
              <div class="col-4">
                <q-card-section class="text-left">
                  Adicional
                  <br />
                  <strong>{{ props.row.id | currency }}</strong>
                </q-card-section>
              </div>
              <div class="col-4">
                <q-card-section class="text-left">
                  Desconto
                  <br />
                  <strong>{{ props.row.valor_descontar | currency }}</strong>
                </q-card-section>
              </div>
            </div>
          </q-card>
        </div>
      </template>

      <template v-slot:body-cell-descontar="props">
        <q-td :props="props">{{ props.row.valor_descontar | currency }} </q-td>
      </template>

      <template v-slot:body-cell-adicionar="props">
        <q-td :props="props">
          {{ props.row.valor_adicionar | currency }}
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
            class="q-ma-md"
            style="width:590px;height:385px; border-radius: 15px;"
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
              <FormaPagamentoForm
                :newFormaPagamento="formapagamento"
                @atualizar="atualizar"
                @salvar="salvarFormaPagamentos"
              />
            </q-card-section>
          </q-card>
        </q-dialog>
      </q-form>
    </div>
    <q-page-sticky position="bottom-right" :offset="[18, 28]">
      <div class="q-pa-md" style="text-align: right;">
        <q-fab
          icon="add"
          class="btnAdd bg-blue-6 text-white"
          @click="novoFormaPagamento()"
        />
      </div>
    </q-page-sticky>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import FormaPagamentoForm from "./FormaPagamentoForm";
import { pageSizeDefault } from "src/utils/newDatas";

export default {
  components: { FormaPagamentoForm },
  computed: {
    ...mapState("formapagamento", ["formapagamentos"])
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
      formapagamento: {},
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
          name: "descricao",
          style: "width: 100px;",
          label: "Descrição ",
          align: "left",
          field: row => row.descricao
        },
        {
          name: "porcentagem_descontar",

          label: "Desconto % ",
          align: "right",
          field: row => row.porcentagem_descontar + "%"
        },
        {
          name: "adicionar",

          label: "Adicional ",
          align: "right",
          field: row => row.valor_adicionar
        },
        {
          name: "descontar",

          label: "Desconto ",
          align: "right",
          field: row => row.valor_descontar
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
    ...mapActions("formapagamento", [
      "getFormaPagamentos",
      "getFormaPagamento",
      "putFormaPagamento",
      "postFormaPagamento",
      "deleteFormaPagamento"
    ]),

    async onRequest(props) {
      this.loading = true;

      const pagination = props ? props.pagination : null;

      const pageSize = {
        ...pageSizeDefault(),
        page: pagination ? pagination.page - 1 : this.page - 1
      };

      await this.getFormaPagamentos(pageSize);

      this.myPagination = {
        ...this.myPagination,
        ...pagination,
        rowsNumber: this.formapagamentos.total
      };
      this.loading = false;
    },

    novoFormaPagamento() {
      this.formapagamento = {
        descricao: "",
        porcentagem_descontar: 0,
        porcentagem_adicionar: 0,
        valor_descontar: 0,
        valor_adicionar: 0,
        mostrar_caixa: "S",
        sangria: "S",
        ativo: "S",
        created_id: 0,
        updated_id: 0
      };

      this.toolbar = true;
    },

    async salvarFormaPagamentos(formapagamento) {
      await this.postFormaPagamento(formapagamento);
      this.onRequest();
      this.toolbar = false;
    },
    async atualizar(formapagamento) {
      await this.putFormaPagamento({
        id: formapagamento.id,
        payload: formapagamento
      });
      this.onRequest();
      this.toolbar = false;
    },

    update(formapagamento) {
      this.formapagamento = { ...formapagamento };
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
