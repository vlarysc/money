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
  name: "Role",
  components: { pageMain }
};
</script>

<style></style>
