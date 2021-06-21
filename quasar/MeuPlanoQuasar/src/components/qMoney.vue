<template>
  <q-field class="q-pa-xs" :rules="rules" :value="value" outlined dense :label="label">
    <template v-slot:control>
      <money
        class="q-pa-xs q-ma-xs q-field__input text-right"
        :value="value"
        @input="handler"
        v-bind="moneyFormatForComponent"
        unmasked-value
      />
    </template>
  </q-field>
</template>

<script>
import { Money } from "v-money";

export default {
  name: "qMoney",
  components: { Money },
  props: ["rules", "value", "label"],
  data() {
    return {
      moneyFormatForComponent: {
        decimal: ",",
        thousands: ".",
        prefix: "R$ ",
        suffix: "",
        precision: 2,
        masked: false
      }
    };
  },
  methods: {
    handler(e) {
      this.$emit("input", e);
    }
  }
};
</script>

<style></style>
