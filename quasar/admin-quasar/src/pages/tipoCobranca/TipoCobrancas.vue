<template>
  <q-card style="height:86vh;" class="q-mt-sm">
    <page-main class="q-pa-none q-ma-none"></page-main>
    <div class="bg-white">
      <TipoCobrancaTable />
    </div>
  </q-card>
</template>

<script>
import TipoCobrancaTable from "./TipoCobrancaTable.vue";
import pageMain from "src/components/pageMain.vue";
import { mapActions, mapState } from "vuex";
import { pageSizeDefault } from "src/utils/newDatas";
export default {
  name: "TipoCobranca",
  components: { pageMain, TipoCobrancaTable },
  computed: {
    ...mapState("tipocobranca", ["tipocobrancas", "tipocobranca"])
  },
  methods: {
    ...mapActions("tipocobranca", [
      "getTipoCobrancas",
      "getTipoCobranca",
      "postTipoCobranca",
      "putTipoCobranca",
      "deleteTipoCobranca"
    ])
  },
  mounted() {
    this.getTipoCobrancas(pageSizeDefault());

    /* this.postTipoCobranca({ descricao: "oi" }); */
  }
};
</script>

<style></style>
