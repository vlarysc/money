<template>
  <q-card style="height:86vh;" class="q-mt-sm">
    <page-main class="q-pa-none q-ma-none"></page-main>
    <div class="bg-white">
      <router-view />
    </div>
  </q-card>
</template>

<script>
import pageMain from "src/components/pageMain.vue";
import { mapActions, mapState } from "vuex";

export default {
  name: "plano",
  components: { pageMain },
  computed: { ...mapState("plano", ["planos"]) },
  methods: {
    ...mapActions("plano", ["getPlanos"])
  },
  mounted() {}
};
</script>

<style></style>
