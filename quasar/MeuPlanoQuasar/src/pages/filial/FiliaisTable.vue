<template>
  <div ref="table" class="q-pa-xs">
    <q-table
      :grid="$q.screen.xs"
      :visible-grid="['option']"
      :pagination.sync="myPagination"
      flat
      bordered
      dense
      :data="filiais.results"
      :columns="columns"
      @request="onRequest"
      :loading="loading"
      row-key="id"
      class="bg-white"
      color="black"
      :filter="filter"
      binary-state-sort
      hide-pagination
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
              <div class="col-1">
                <q-card-section class="text-left">
                  ID
                  <br />
                  <strong>{{ props.row.id }}</strong>
                </q-card-section>
              </div>

              <div class="col-6">
                <q-card-section class="text-left">
                  Razão Social
                  <br />
                  <strong>{{ props.row.pessoa.nome }}</strong>
                </q-card-section>
              </div>
              <div class="col-5">
                <q-card-section class="text-left">
                  CNPJ/CPF
                  <br />
                  <div v-if="props.row.pessoa.tipoPessoa == 'PF'">
                    <strong>{{
                      props.row.pessoa.documento1 | vueBrazil("cpf")
                    }}</strong>
                  </div>
                  <div v-else>
                    <strong>{{
                      props.row.pessoa.documento1 | vueBrazil("cnpj")
                    }}</strong>
                  </div>
                </q-card-section>
              </div>
            </div>
            <div class="row">
              <div class="col-7">
                <q-card-section class="text-left">
                  Telefone
                  <br />
                  <strong>
                    {{
                      props.row.pessoa.telefone1 | vueBrazil("telefone")
                    }}</strong
                  >
                </q-card-section>
              </div>
            </div>
          </q-card>
        </div>
      </template>

      <template v-slot:top>
        <q-select
          class="q-pr-xs q-mx-xs "
          outlined
          dense
          v-model="tipoFiltro"
          label="Tipo de Filtro"
          :options="['Nome', 'Documento']"
          style="width: 150px;"
          behavior="menu"
        />

        <q-input
          label="Filtro"
          class="q-pl-xs "
          borderless
          dense
          outlined
          debounce="1000"
          color="primary"
          style="width: 350px"
          v-model="filter"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
        <q-space />
        <div>
          <div>
            <q-form>
              <q-dialog v-model="medium">
                <q-card style="width: 300px;">
                  <div class="q-ml-md q-pt-md">
                    <p>
                      Informe o <strong>CPF ou CPNJ</strong> para prosseguir:
                    </p>
                  </div>
                  <q-input
                    class="q-pl-md q-pr-md"
                    dense
                    rounded
                    outlined
                    v-model="documento1"
                    square
                    label="CNPJ/CPF"
                    lazy-rules
                    :rules="[
                      val => ruleDocument1(val) || 'Documento Inválido!'
                    ]"
                  />

                  <q-card-actions
                    align="right"
                    class="q-pa-none bg-white text-teal"
                  >
                    <q-btn
                      class="q-pr-sm"
                      type="submit"
                      flat
                      label="Continuar"
                      v-close-popup
                      @click.prevent="search()"
                    />
                  </q-card-actions>
                </q-card>
              </q-dialog>
            </q-form>
          </div>
        </div>
      </template>

      <template v-slot:body-cell-documento1="props">
        <q-td :props="props">
          <div v-if="props.row.pessoa.tipoPessoa == 'PF'">
            {{ props.row.pessoa.documento1 | vueBrazil("cpf") }}
          </div>
          <div v-else>
            {{ props.row.pessoa.documento1 | vueBrazil("cnpj") }}
          </div>
        </q-td>
      </template>

      <template v-slot:body-cell-telefone1="props">
        <q-td :props="props">
          {{ props.row.pessoa.telefone1 | vueBrazil("telefone") }}
        </q-td>
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

    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <div class="q-pa-md" style="text-align: right;">
        <q-fab
          icon="add"
          class="btnAdd bg-blue-6 text-white"
          @click="medium = true"
        />
      </div>
    </q-page-sticky>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { Loading, QSpinnerGears } from "quasar";
import { pageSizeDefault } from "src/utils/newDatas";
import { validateBr } from "js-brasil";

export default {
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
      documento1: "",
      tipoPessoa: "PF",
      optionsp: [
        {
          label: "Pessoa Física",
          value: "PF"
        },
        {
          label: "Pessoa Jurídica",
          value: "PJ"
        }
      ],
      filter: "",
      loading: false,
      tipoFiltro: "Nome",
      medium: false,

      columns: [
        {
          name: "desc",
          required: true,
          label: "ID",
          align: "left",
          style: "width: 90px",
          field: row => row.pessoa.id
        },
        {
          name: "nome",
          align: "left",
          label: "Razão Social",
          field: row => row.pessoa.nome
        },
        {
          name: "documento1",
          align: "left",
          label: "CNPJ/CPF",
          field: row => row.pessoa.documento1
        },
        {
          name: "telefone1",
          align: "left",
          label: "Telefone",
          field: row => row.pessoa.telefone1
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
  computed: {
    ...mapState("filial", ["filiais"]),

    options() {
      return {
        page: 1,
        size: 10
      };
    }
  },
  methods: {
    ...mapActions("filial", ["getFiliais"]),
    async onRequest(props) {
      this.loading = true;
      let filtro = {};
      if (this.filter != "") {
        if (this.tipoFiltro == "Nome") filtro = { nome: this.filter };
        else filtro = { documento: this.filter };
      }

      await this.getFiliais({
        page: props.pagination.page - 1,
        size: props.pagination.rowsPerPage,
        ...filtro
      });
      this.loading = false;
    },
    search() {
      this.$router.push("/filiais/" + this.documento1);
    },
    adicionar() {
      Loading.show();
      this.$router.push(
        `/filiais/new?page=${this.options.page}&size=${this.options.size}`
      );
      Loading.hide();
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
        .then(async result => {
          if (result.isConfirmed) {
            this.loading = true;
            await this.deleteFilial(id);
            await this.getFiliais(this.options);
            this.loading = false;
          }
        });
    },
    update(filial) {
      this.$router.push(
        `/filiais/${filial.pessoa.documento1}?page=${this.options.page}&size=${this.options.size}`
      );
    },
    ruleDocument1(val) {
      if (val.length == 11) {
        return validateBr.cpf(val);
      }
      if (val.length == 14) {
        return validateBr.cnpj(val);
      }
      return false;
    }
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
  }
};
</script>

<style>
.btnAdd {
  margin-top: 90px;
}
.textoIpunt {
  padding-left: 17px;
  padding-top: none;
  padding-bottom: none;
  margin-top: 40px;
}

.q-field--dense .q-field__control,
.q-field--dense .q-field__marginal {
  height: 50px;
}
</style>
