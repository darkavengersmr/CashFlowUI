<template>
  <div class="card">
    <div class="cashflow">Баланс:</div>
    <div>{{ cashflow }}</div>
  </div>
</template>

<script>
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
  },
  methods: {},
};
</script>
<style scoped>
.cashflow {
  width: 120px;
  margin-top: 8px;
  margin-bottom: 0px;
}
</style>