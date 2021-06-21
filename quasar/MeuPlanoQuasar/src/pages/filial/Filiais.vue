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

export default {
  name: "Filial",
  components: { pageMain }
};
</script>

<style></style>
