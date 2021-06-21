<template>
  <div>
    <page-main></page-main>
    <div class="hello">
      CPF: {{ cpf | vueBrazil("cpf") }}
      {{ validacpf }}

      <!-- será exibido 123.456.789.01 --->
    </div>
  </div>
</template>

<script>
import pageMain from "src/components/pageMain.vue";
import { validateBr } from "js-brasil";
export default {
  components: { pageMain },
  computed: {
    validacpf() {
      return validateBr.cpf(this.cpf);
    }
  },
  data() {
    return {
      cpf: "32045189813"
    };
  }
};
</script>

<style></style>
