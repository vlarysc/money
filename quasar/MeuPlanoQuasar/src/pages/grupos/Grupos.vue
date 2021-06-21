<template>
  <q-card style="height: 86vh;" class="q-mt-sm">
    <page-main class="q-pa-none q-ma-none"> </page-main>
    <div class="bg-white">
      <router-view />
    </div>
  </q-card>
</template>

<script>
import { mapState, mapActions } from "vuex";
import pageMain from "src/components/pageMain.vue";

export default {
  name: "Grupo",
  components: { pageMain },

  computed: {
    ...mapState("grupo", ["grupos"])
  },
  methods: {
    ...mapActions("grupo", ["getGrupos"])
  }
};
</script>

<style></style>
