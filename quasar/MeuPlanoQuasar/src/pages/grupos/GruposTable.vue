<template>
  <div class="q-pa-xs">
    <q-table
      :grid="$q.screen.xs"
      :visible-grid="['option']"
      :pagination.sync="myPagination"
      flat
      bordered
      dense
      :data="grupos.results"
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
                    Valor de adesão
                    <br />
                    <strong>{{ props.row.valor_adesao | currency }}</strong>
                  </q-card-section>
                </div>
                <div class="col-7">
                  <q-card-section class="text-left">
                    Qtd Adesão
                    <br />
                    <strong>{{ props.row.qtde_adesao }}</strong>
                  </q-card-section>
                </div>
              </div>
            </div>
          </q-card>
        </div>
      </template>
      <template v-slot:body-cell-valor="props">
        <q-td :props="props">{{ props.row.valor_adesao | currency }} </q-td>
      </template>
      <template v-slot:body-cell-valorPago="props">
        <q-td :props="props">
          {{ props.row.qtde_adesao }}
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
            class="scroll"
            style="width:570px;height:549px; border-radius: 15px;"
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
              <GruposForm
                :newGrupo="grupo"
                @atualizar="atualizar"
                @salvar="salvarGrupos"
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
          @click="novoGrupo()"
        />
      </div>
    </q-page-sticky>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import GruposForm from "./GruposForm";
import { pageSizeDefault } from "src/utils/newDatas";

export default {
  components: { GruposForm },
  computed: {
    ...mapState("grupo", ["grupos"])
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
      grupo: {},
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
          style: "width: 100%;",
          label: "Descrição",
          align: "left",
          field: row => row.descricao,
          sortable: true
        },
        {
          name: "valor",
          label: "Valor ",
          style: "width: 100%;",
          align: "right",
          field: row => row.valor_adesao
        },

        {
          name: "option",
          align: "center",

          label: "Opções"
        }
      ]
    };
  },
  methods: {
    ...mapActions("grupo", [
      "getGrupos",
      "getGrupo",
      "putGrupo",
      "postGrupo",
      "deleteGrupo"
    ]),

    async onRequest(props) {
      console.log("onrequest grupos");
      this.loading = true;

      const pagination = props ? props.pagination : null;

      const pageSize = {
        ...pageSizeDefault(),
        page: pagination ? pagination.page - 1 : this.page - 1
      };

      await this.getGrupos(pageSize);

      this.myPagination = {
        ...this.myPagination,
        ...pagination,
        rowsNumber: this.grupos.total
      };
      this.loading = false;
    },
    novoGrupo() {
      this.grupo = {
        codigo: "",
        descricao: "",
        valor_adesao: 0,
        qtde_adesao: 0,
        lanca_adesao_paga: "N",
        debito_cluz: "N",
        debito_recorrencia: "N",
        plano_empresa: "N",
        lanca_ortopedico_agrupado: "N",
        ativo: "S",
        filial_id: null,
        created_id: 0,
        updated_id: 0
      };

      this.toolbar = true;
    },

    async salvarGrupos(grupo) {
      await this.postGrupo(grupo);
      this.onRequest();
      this.toolbar = false;
    },
    async atualizar(grupo) {
      await this.putGrupo({ id: grupo.id, payload: grupo });
      this.onRequest();
      this.toolbar = false;
    },

    update(grupo) {
      this.grupo = { ...grupo };
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
