<template>
  <div v-if="isMobile" class="cashflow_mobile">
    <div >Баланс:</div>
    <div>{{ cashflow }}</div>
  </div>
  <div v-if="!isMobile" class="cashflow">
    <span >Баланс: </span>
    <span>{{ cashflow }} &nbsp;</span>
  </div>
</template>

<script>

import { mapState } from "vuex";

export default {
  props: {
    inflow: Object,
    outflow: Object,
  },
  data() {
    return {};
  },
  computed: {
    cashflow: function () {
      var cashflow = 0;
      if (this.inflow && this.outflow) {
        for (var index = 0; index < this.inflow.inflow.length; ++index) {
          if (this.inflow.inflow[index].sum) {
            cashflow += this.inflow.inflow[index].sum;
          }
        }
        for (index = 0; index < this.outflow.outflow.length; ++index) {
          if (this.outflow.outflow[index].sum) {
            cashflow -= this.outflow.outflow[index].sum;
          }
        }
      }
      return cashflow;
    },
    ...mapState({
      isMobile: "isMobile",
    }),
  },
  methods: {},
};
</script>
<style scoped>
.cashflow_mobile {
  width: 100px;
}

.cashflow {
  width: 220px;
}

</style>