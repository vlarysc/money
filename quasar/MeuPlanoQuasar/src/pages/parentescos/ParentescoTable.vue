<template>
  <div class="q-pa-xs">
    <q-table
      :grid="$q.screen.xs"
      :visible-grid="['option']"
      :pagination.sync="myPagination"
      flat
      bordered
      dense
      :data="parentescos.results"
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
                  Grau
                  <br />
                  <strong>{{ props.row.grau }}°</strong>
                </q-card-section>
              </div>
              <div class="col-4">
                <q-card-section class="text-left">
                  Observações
                  <br />
                  <strong>{{ props.row.observacoes }}</strong>
                </q-card-section>
              </div>
            </div>
          </q-card>
        </div>
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
            style="width:490px;height:390px; border-radius: 15px;"
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
              <ParentescoForm
                :newParentesco="parentesco"
                @atualizar="atualizar"
                @salvar="salvarParentescos"
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
          @click="novoParentesco()"
        />
      </div>
    </q-page-sticky>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import ParentescoForm from "./ParentescoForm";
import { pageSizeDefault } from "src/utils/newDatas";

export default {
  components: { ParentescoForm },
  computed: {
    ...mapState("parentesco", ["parentescos"])
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
      parentesco: {},
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
          style: "width: 250px;",
          label: "Descrição ",
          align: "left",
          field: row => row.descricao
        },

        {
          name: "observacoes",

          label: "Observações",
          align: "left",
          field: row => row.observacoes
        },
        {
          name: "grau",

          label: "Grau",
          align: "right",
          field: row => row.grau
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
    ...mapActions("parentesco", [
      "getParentescos",
      "getParentesco",
      "putParentesco",
      "postParentesco",
      "deleteParentesco"
    ]),

    async onRequest(props) {
      this.loading = true;

      const pagination = props ? props.pagination : null;

      const pageSize = {
        ...pageSizeDefault(),
        page: pagination ? pagination.page - 1 : this.page - 1
      };

      await this.getParentescos(pageSize);

      this.myPagination = {
        ...this.myPagination,
        ...pagination,
        rowsNumber: this.parentescos.total
      };
      this.loading = false;
    },

    novoParentesco() {
      this.parentesco = {
        descricao: "",
        grau: 0,
        observacoes: "",
        ativo: "S",
        created_id: 0,
        updated_id: 0
      };

      this.toolbar = true;
    },

    async salvarParentescos(parentesco) {
      await this.postParentesco(parentesco);
      this.onRequest();
      this.toolbar = false;
    },
    async atualizar(parentesco) {
      await this.putParentesco({
        id: parentesco.id,
        payload: parentesco
      });
      this.onRequest();
      this.toolbar = false;
    },

    update(parentesco) {
      this.parentesco = { ...parentesco };
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
