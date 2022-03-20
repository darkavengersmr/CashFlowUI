<template>
  <div class="card">
    <div class="card_inline">
      <button @click="prevReport">&#5130;</button>
      <div>отчеты</div>
      <button @click="nextReport">&#5125;</button>
    </div>
    <ReportsForm
      v-if="report == 1"
      :data="structureOutflowReport"
      :title="title.outflowStructure"
      :type="type.DoughnutChart"
    />
    <ReportsForm
      v-if="report == 2"
      :data="structureInflowReport"
      :title="title.inflowStructure"
      :type="type.DoughnutChart"
    />
    <ReportsForm
      v-if="report == 3"
      :data="structureAssetsReport"
      :title="title.assetsStructure"
      :type="type.DoughnutChart"
    />
    <ReportsForm
      v-if="report == 4"
      :data="structureLiabilitiesReport"
      :title="title.liabilitiesStructure"
      :type="type.DoughnutChart"
    />
    <ReportsForm
      v-if="report == 5"
      :data="dynamicOutflowReport"
      :title="title.outflowDynamic"
      :type="type.BarChart"
    />
    <ReportsForm
      v-if="report == 6"
      :data="dynamicInflowReport"
      :title="title.inflowDynamic"
      :type="type.BarChart"
    />
    <ReportsForm
      v-if="report == 7"
      :data="dynamicAssetsReport"
      :title="title.assetsDynamic"
      :type="type.BarChart"
    />
    <ReportsForm
      v-if="report == 8"
      :data="dynamicLiabilitiesReport"
      :title="title.liabilitiesDynamic"
      :type="type.BarChart"
    />
  </div>
</template>

<script>
// @ is an alias to /src
import ReportsForm from "@/components/ReportsForm.vue";
import { mapState, mapMutations, mapActions } from "vuex";

export default {
  name: "ReportsFormView",
  components: {
    ReportsForm,
  },
  data() {
    return {
      title: {
        inflowStructure: "Структура доходов",
        outflowStructure: "Структура расходов",
        assetsStructure: "Структура активов",
        liabilitiesStructure: "Структура пассивов",
        inflowDynamic: "Динамика доходов",
        outflowDynamic: "Динамика расходов",
        assetsDynamic: "Динамика активов",
        liabilitiesDynamic: "Динамика пассивов",
      },
      type: {
        DoughnutChart: "DoughnutChart",
        BarChart: "BarChart",
      },
      report: 1,
      totalReports: 8,
    };
  },
  computed: {
    ...mapState({
      outflow: "outflow",
      inflow: "inflow",
      assets: "assets",
      liabilities: "liabilities",
      outflowAll: "outflowAll",
      inflowAll: "inflowAll",
      assetsAll: "assetsAll",
      liabilitiesAll: "liabilitiesAll",
    }),
    structureOutflowReport: function () {
      const flow = this.outflow;
      const flowData = "outflow";
      return this.structureData({ flow: flow, flowData: flowData });
    },
    structureInflowReport: function () {
      const flow = this.inflow;
      const flowData = "inflow";
      return this.structureData({ flow: flow, flowData: flowData });
    },
    structureAssetsReport: function () {
      const flow = this.assets;
      const flowData = "assets";
      return this.structureData({ flow: flow, flowData: flowData });
    },
    structureLiabilitiesReport: function () {
      const flow = this.liabilities;
      const flowData = "liabilities";
      return this.structureData({ flow: flow, flowData: flowData });
    },
    dynamicOutflowReport: function () {
      const flow = this.outflowAll;
      const flowData = "outflow";
      return this.dynamicData({ flow: flow, flowData: flowData });
    },
    dynamicInflowReport: function () {
      const flow = this.inflowAll;
      const flowData = "inflow";
      return this.dynamicData({ flow: flow, flowData: flowData });
    },
    dynamicAssetsReport: function () {
      const flow = this.assetsAll;
      const flowData = "assets";
      return this.dynamicDataReport({ flow: flow, flowData: flowData });
    },
    dynamicLiabilitiesReport: function () {
      const flow = this.assetsAll;
      const flowData = "liabilities";
      return this.dynamicDataReport({ flow: flow, flowData: flowData });
    },
  },
  methods: {
    ...mapMutations({}),
    ...mapActions({
      refreshAssets: "refreshAssets",
      refreshLiabilities: "refreshLiabilities",
      refreshFlowsAll: "refreshFlowsAll",
    }),
    structureData({ flow, flowData }) {
      let descriptions = [];
      let sums = [];
      const dict = {};
      if (flowData in flow) {
        // суммируем повторяющиеся
        for (let i = 0; i < flow[flowData].length; i++) {
          let { description, sum } = flow[flowData][i];

          if (dict[description]) {
            dict[description] += sum;
          } else {
            dict[description] = sum;
          }
        }
        for (let el in dict) {
          descriptions.push(el);
          sums.push(dict[el]);
        }
      }
      return { description: descriptions, sum: sums };
    },
    dynamicData({ flow, flowData }) {
      let descriptions = [];
      let sums = [];
      const dict = {};
      if (flowData in flow) {
        // суммируем по периодам (месяцам)
        for (let i = 0; i < flow[flowData].length; i++) {
          let { date, sum } = flow[flowData][i];

          // date = "2022-03-07T10:49:23.383015"
          let description = date.slice(5, 7) + "." + date.slice(2, 4);

          if (dict[description]) {
            dict[description] += sum;
          } else {
            dict[description] = sum;
          }
        }
        for (let el in dict) {
          descriptions.push(el);
          sums.push(dict[el]);
        }
      }
      // параллельная сортировка массивов с периодами и суммами по году и месяцу (mm.yy)
      for (var i = 0, endI = descriptions.length - 1; i < endI; i++) {
        for (var j = 0, endJ = endI - i; j < endJ; j++) {
          if (
            descriptions[j].slice(3, 5) + descriptions[j].slice(0, 2) >
            descriptions[j + 1].slice(3, 5) + descriptions[j + 1].slice(0, 2)
          ) {
            var swap_descriptions = descriptions[j];
            descriptions[j] = descriptions[j + 1];
            descriptions[j + 1] = swap_descriptions;

            var swap_sums = sums[j];
            sums[j] = sums[j + 1];
            sums[j + 1] = swap_sums;
          }
        }
      }
      return { description: descriptions, sum: sums };
    },
    dynamicDataReport({ flow, flowData }) {
      let descriptions = [];
      let sums = [];
      if (flowData in flow) {
        // суммируем по периодам (месяцам)
        for (let i = 0; i < flow[flowData].length; i++) {
          let { description, sum } = flow[flowData][i];
          descriptions.push(description);
          sums.push(sum);
        }
      }

      // параллельная сортировка массивов с периодами и суммами по году и месяцу (mm.yy)
      for (var i = 0, endI = descriptions.length - 1; i < endI; i++) {
        for (var j = 0, endJ = endI - i; j < endJ; j++) {
          if (
            descriptions[j].slice(3, 5) + descriptions[j].slice(0, 2) >
            descriptions[j + 1].slice(3, 5) + descriptions[j + 1].slice(0, 2)
          ) {
            var swap_descriptions = descriptions[j];
            descriptions[j] = descriptions[j + 1];
            descriptions[j + 1] = swap_descriptions;

            var swap_sums = sums[j];
            sums[j] = sums[j + 1];
            sums[j + 1] = swap_sums;
          }
        }
      }
      return { description: descriptions, sum: sums };
    },
    prevReport() {
      if (this.report > 1) {
        this.report -= 1;
      }
    },
    nextReport() {
      if (this.report < this.totalReports) {
        this.report += 1;
      }
    },
  },
  mounted() {
    this.refreshAssets();
    this.refreshLiabilities();
    this.refreshFlowsAll();
  },
};
</script>

<style scoped>
.card_inline {
  display: inline-flex;
}

button {
  color: white;
  background-color: black;
  border: 0px solid;
}

.month {
  width: 75px;
  justify-content: flex-end;
  display: inline-block;
}
</style>