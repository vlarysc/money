<template>
  <div ref="table" class="q-pa-xs">
    <q-table
      :grid="$q.screen.xs"
      :visible-grid="['option']"
      flat
      bordered
      dense
      :pagination.sync="myPagination"
      :data="tipocobrancas.content"
      :columns="columns"
      row-key="id"
      :loading="loading"
      :filter="filter"
      @request="onRequest"
    >
      <template v-slot:item="props">
        <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4">
          <q-card>
            <div class="q-pa-xs text-right">
              <q-btn
                outline
                size="xs"
                class="q-ma-none q-pa-none"
                color="grey-5"
                @click="del(props.row.id)"
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
              <div class="col-10">
                <q-card-section class="text-left">
                  Nome
                  <br />
                  <strong>{{ props.row.descricao }}</strong>
                </q-card-section>
              </div>
            </div>
          </q-card>
        </div>
      </template>

      <template v-slot:body-cell-option="props">
        <q-td :props="props">
          <div class="q-pa-xs ">
            <q-btn
              size="xs"
              class="q-ma-none q-pa-none q-mr-xs"
              color="blue-8"
              @click="update(props.row)"
              icon="create"
            />
            <q-btn
              size="xs"
              class="q-ma-none q-pa-none"
              color="red-8"
              @click="del(props.row.id)"
              text-color="white"
              icon="delete_forever"
            />
          </div>
        </q-td>
      </template>
    </q-table>
    <q-dialog v-model="prompt" persistent>
      <TipoCobrancaForm :tipocobranca="tipocobranca" :options="options" ref="tabs" />
    </q-dialog>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <div class="q-pa-md" style="text-align: right;">
        <q-fab class="btnAdd" fab icon="add" text-color="white" color="blue-8" @click="adicionar" />
      </div>
    </q-page-sticky>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import TipoCobrancaForm from "./TipoCobrancaForm.vue";

export default {
  components: { TipoCobrancaForm },

  data() {
    return {
      filter: "",
      loading: false,

      tipocobranca: {},
      prompt: false,
      columns: [
        {
          name: "desc",
          required: true,
          label: "ID",
          align: "left",
          style: "width: 50px",
          field: (row) => row.id
        },
        { name: "descricao", align: "left", label: "Descrição", field: "descricao" },

        { name: "option", align: "center", style: "width: 50px", label: "Opções" }
      ]
    };
  },
  computed: {
    ...mapState("tipocobranca", ["tipocobrancas"]),
    options() {
      return {
        page: this.tipocobrancas
          ? this.tipocobrancas.numberOfElements == this.tipocobrancas.size
            ? this.tipocobrancas.totalPages
            : this.tipocobrancas.totalPages - 1
          : 0,
        size: this.tipocobrancas ? this.tipocobrancas.size : 8
      };
    },
    myPagination() {
      return {
        sortBy: "desc",
        descending: false,
        page: this.tipocobrancas ? this.tipocobrancas.number + 1 : 1,
        rowsPerPage: this.tipocobrancas ? this.tipocobrancas.size : 8,
        rowsNumber: this.tipocobrancas ? this.tipocobrancas.totalElements : 5
      };
    }
  },
  methods: {
    ...mapActions("tipocobranca", ["getTipoCobrancas", "putTipoCobranca", "deleteTipoCobranca"]),
    async onRequest(props) {
      this.loading = true;
      await this.getTipoCobrancas({ page: props.pagination.page - 1, size: props.pagination.rowsPerPage });
      this.loading = false;
    },
    adicionar() {
      this.tipocobranca = { descricao: "" };
      this.prompt = true;
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
            await this.deleteTipoCobranca(id);
            await this.getTipoCobrancas(this.options);
            this.loading = false;
          }
        });
    },
    update(tipocobranca) {
      this.tipocobranca = tipocobranca;
      this.prompt = true;
    }
  }
};
</script>

<style>
.botao {
  width: 30px;
  height: 20px;
  margin: 2px;
  margin-right: 2px;
}

.btnAdd {
  margin-top: 160px;
}
</style>
