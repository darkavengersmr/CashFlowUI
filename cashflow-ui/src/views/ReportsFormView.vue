<template>
  <div class="card">
    <div class="card_inline">
      <button @click="prevReport">&#5130;</button>
      <div>отчеты</div>
      <button @click="nextReport">&#5125;</button>
    </div>
    <ReportsForm
      v-if="selectedReport == 1"
      :data="structureInflowReport"
      :title="title.inflowStructure"
      :type="type.DoughnutChart"
    />
    <ReportsForm
      v-if="selectedReport == 3"
      :data="structureOutflowReport"
      :title="title.outflowStructure"
      :type="type.DoughnutChart"
    />
    <ReportsForm
      v-if="selectedReport == 8"
      :data="structureAssetsReport"
      :title="title.assetsStructure"
      :type="type.DoughnutChart"
    />
    <ReportsForm
      v-if="selectedReport == 10"
      :data="structureLiabilitiesReport"
      :title="title.liabilitiesStructure"
      :type="type.DoughnutChart"
    />
    <ReportsForm
      v-if="selectedReport == 2"
      :data="dynamicInflowReport"
      :title="title.inflowDynamic"
      :type="type.BarChart"
    />
    <ReportsForm
      v-if="selectedReport == 4"
      :data="dynamicOutflowReport"
      :title="title.outflowDynamic"
      :type="type.BarChart"
    />
    <ReportsForm
      v-if="selectedReport == 9"
      :data="dynamicAssetsReport"
      :title="title.assetsDynamic"
      :type="type.BarChart"
    />
    <ReportsForm
      v-if="selectedReport == 11"
      :data="dynamicLiabilitiesReport"
      :title="title.liabilitiesDynamic"
      :type="type.BarChart"
    />
    <ReportsForm
      v-if="selectedReport == 7"
      :data="dynamicInflowRegularReport"
      :data2="dynamicOutflowRegularReport"
      :title="title.cashflowRegularDynamic"
      :type="type.BarChart"
    />
    <ReportsForm
      v-if="selectedReport == 5"
      :data="dynamicInflowReport"
      :data2="dynamicOutflowReport"
      :title="title.outflowInflowDynamic"
      :type="type.BarChart"
    />
    <ReportsForm
      v-if="selectedReport == 6"
      :data="dynamicCashflowReport"
      :data2="dynamicMACashflowReport"
      :title="title.cashflowDynamic"
      :type="type.BarChart"
    />
    <ReportsForm
      v-if="selectedReport == 12"
      :data="structureAssetsCategoriesReport"
      :title="title.assetsCategories"
      :type="type.DoughnutChart"
    />
  </div>
  <div class="card" v-if="isMobile">    
    <button class="btn report" @click="reportBtn">Отчеты в Excel</button>
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
        inflowDynamic: "Динамика доходов",
        outflowStructure: "Структура расходов",
        outflowDynamic: "Динамика расходов",
        outflowInflowDynamic: "Все доходы и расходы",
        cashflowDynamic: "Cashflow",
        cashflowRegularDynamic: "Регулярные доходы и расходы",        
        assetsStructure: "Структура активов",
        assetsDynamic: "Динамика активов",
        liabilitiesStructure: "Структура пассивов",                
        liabilitiesDynamic: "Динамика пассивов",        
        assetsCategories: "Категории активов",
      },
      type: {
        DoughnutChart: "DoughnutChart",
        BarChart: "BarChart",
      },
      totalReports: 12,
    };
  },
  computed: {
    ...mapState({
      selectedReport: "selectedReport",
      outflow: "outflow",
      inflow: "inflow",
      assets: "assets",
      liabilities: "liabilities",
      outflowAll: "outflowAll",
      inflowAll: "inflowAll",
      assetsAll: "assetsAll",
      liabilitiesAll: "liabilitiesAll",
      categories: "categories",
      isMobile: "isMobile",
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
    dynamicInflowRegularReport: function () {
      const flow = this.assetsAll;
      const flowData = "inflow_regular";
      return this.dynamicData({ flow: flow, flowData: flowData });
    },
    dynamicOutflowRegularReport: function () {
      const flow = this.assetsAll;
      const flowData = "outflow_regular";
      return this.dynamicData({ flow: flow, flowData: flowData });
    },
    structureAssetsCategoriesReport: function () {
      const flow = this.assets;
      const flowData = "assets";
      return this.structureCategoriesData({ flow: flow, flowData: flowData });
    },
    categories_view: function () {
      let new_categories = {};
      if (this.categories) {
        for (let i = 0; i < this.categories.categories.length; i++) {
          let { id, category } = this.categories.categories[i];
          new_categories[id] = category;
        }
      }
      return new_categories;
    },
    dynamicCashflowReport: function () {
      const inflow = this.inflowAll;
      const inflowData = "inflow";
      const inflowDynamic = this.dynamicData({
        flow: inflow,
        flowData: inflowData,
      });

      const outflow = this.outflowAll;
      const outflowData = "outflow";
      const outflowDynamic = this.dynamicData({
        flow: outflow,
        flowData: outflowData,
      });

      for (let i = 0; i < inflowDynamic.description.length; i++) {
        if (outflowDynamic.sum[i]) {
          inflowDynamic.sum[i] -= outflowDynamic.sum[i];
        }
      }
      return inflowDynamic;
    },
    dynamicMACashflowReport: function () {
      const flow = JSON.parse(JSON.stringify(this.dynamicCashflowReport));
      //const sum = flow.sum.reduce((a, b) => a + b, 0);
      //const avg = (sum / flow.sum.length) || 0;
      const k = 1/12

      for (let i = 1; i < flow.description.length; i++) {        
        flow.sum[i] = flow.sum[i] * k + flow.sum[i-1] * (1-k);
      }      
      return flow;
    },
  },
  methods: {
    ...mapMutations({
      setSelectedReport: "setSelectedReport",
    }),
    ...mapActions({
      refreshAssets: "refreshAssets",
      refreshLiabilities: "refreshLiabilities",
      refreshFlowsAll: "refreshFlowsAll",
      refreshCategories: "refreshCategories",
      exportToExcel: "exportToExcel",
      refreshFlows: "refreshFlows",
    }),
    reportBtn() {
      this.exportToExcel({url: '/export/'});
    },
    structureData({ flow, flowData }) {
      let descriptions = [];
      let sums = [];
      const dict = {};
      if (flow && flowData in flow) {
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
    structureCategoriesData({ flow, flowData }) {
      let category_id = [];
      let sums = [];
      const dict = {};
      if (flow && flowData in flow) {
        // суммируем повторяющиеся
        for (let i = 0; i < flow[flowData].length; i++) {
          let { category_id, sum } = flow[flowData][i];

          if (category_id && sum) {
            if (dict[category_id]) {
              dict[category_id] += sum;
            } else {
              dict[category_id] = sum;
            }
          }
        }
        for (let el in dict) {
          category_id.push(this.categories_view[el]);
          sums.push(dict[el]);
        }
      }
      return { description: category_id, sum: sums };
    },
    dynamicData({ flow, flowData }) {
      let descriptions = [];
      let sums = [];
      const dict = {};
      if (flow && flowData in flow) {
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
      if (flow && flowData in flow) {
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
      if (this.selectedReport > 1) {
        this.setSelectedReport(this.selectedReport - 1);        
      } else {
        this.setSelectedReport(this.totalReports);
      }
    },
    nextReport() {
      if (this.selectedReport < this.totalReports) {
        this.setSelectedReport(this.selectedReport + 1);    
      } else {
        this.setSelectedReport(1);    
      }
    },
  },
  mounted() {    
        this.refreshAssets();
        this.refreshLiabilities();
        this.refreshFlowsAll();
        this.refreshCategories();
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

.btn.report {
  font-size: 16px;
  background: #010042;
  color: rgb(255, 255, 255);
  width: 176px;
  height: 32px;
  border-radius: 8px;
  padding: 8px 8px 8px 8px;
  margin: 20px 0px 20px 0px;
}
</style>