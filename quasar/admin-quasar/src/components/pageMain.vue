<template>
  <div class="q-px-md q-pb-xs q-pt-md q-gutter-xs">
    <q-breadcrumbs class="q-ma-none">
      <q-breadcrumbs-el
        v-for="item in $route.matched"
        :key="item.meta.name"
        :label="item.meta.name"
        :icon="item.meta.icon"
        :to="item.path + '/'"
        class="text-blue-grey-10"
      />
    </q-breadcrumbs>
    <!-- <div class="q-ma-none">
      <p class="text-color-base text-h4 text-weight-bold q-ma-none q-pa-none">{{ $route.meta.name }}</p>
    </div> -->
  </div>
</template>

<script>
export default {
  created() {}
};
</script>

<style lang="scss">
.text-color-base {
  color: $blue-grey-10;
}
</style>
