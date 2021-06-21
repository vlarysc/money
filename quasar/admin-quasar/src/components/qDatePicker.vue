<template>
  <q-field no-error-icon style="width=100%;" class="q-pa-xs" :rules="rules" outlined :value="value" dense label-slot>
    <template v-slot:label class="q-ma-none q-pa-none">
      <div class="row items-center all-pointer-events">
        <q-icon v-if="!!label_icon" class="q-mr-xs" size="24px" :name="label_icon" />
        <div class="q-pa-none q-ma-none ">
          {{ label }}
        </div>
      </div>
    </template>
    <template v-slot:control style="width=100%;" class="q-pa-none q-ma-none">
      <date-picker
        style="width=100%; height: 33px; size: 100px "
        :value="value"
        @input="handler"
        prefix-class="xmx"
        :type="type"
        :format="format"
        :value-type="value_type"
      ></date-picker>
    </template>
  </q-field>
</template>

<script>
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";

export default {
  name: "qDatePicker",
  components: { DatePicker },
  props: ["rules", "value", "type", "format", "value_type", "label", "label_icon"],
  data() {
    return {};
  },
  methods: {
    handler(e) {
      this.$emit("input", e);
    }
  }
};
</script>

<style lang="scss">
@import "src/utils/datepicker.scss";
.xmx-input {
  box-shadow: inset 0 0px 0px rgb(0 0 0 / 8%) !important;
  width: 100%;
}
.xmx-datepicker {
  width: 100%;
}
</style>
