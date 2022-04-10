<template>
  <DoughnutChart
    v-if="type == 'DoughnutChart'"
    :chartData="structureData"
    :options="structureOptions"
  />
  <BarChart
    v-if="type == 'BarChart'"
    :chartData="dynamicData"
    :options="dynamicOptions"
  />
</template>

<script>
import { DoughnutChart } from "vue-chart-3";
import { BarChart } from "vue-chart-3";
import { computed, ref } from "vue";
import { Chart, registerables } from "chart.js";

import helpers from "../helpers";

Chart.register(...registerables);

export default {
  components: { DoughnutChart, BarChart },
  props: {
    data: Object,
    data2: Object,
    type: String,
    title: String,
  },
  data() {
    return {};
  },
  computed: {},
  methods: {},
  setup(props) {
    const structureOptions = ref({
      responsive: true,
      plugins: {
        legend: {
          position: "bottom",
          labels: {
            color: "#FFFFFF",
          },
        },
        title: {
          display: true,
          text: props.title,
          color: "#FFFFFF",
        },
      },
    });

    const dynamicOptions = ref({
      responsive: true,
      plugins: {
        legend: {
          display: false,
        },
        title: {
          display: true,
          text: props.title,
          color: "#FFFFFF",
        },
      },
    });

    const colors = helpers.randomColors();
    const color = helpers.randomCleanColor();
    const color2 = helpers.randomCleanColor();

    const structureData = computed(() => ({
      labels: props.data.description,
      datasets: [
        {
          data: props.data.sum,
          backgroundColor: colors,
          borderColor: colors,
        },
      ],
    }));

    let dynamicData = {};

    if (props.data2) {
      dynamicData = computed(() => ({
        labels: props.data.description,
        datasets: [
          {
            data: props.data.sum,
            backgroundColor: color,
            borderColor: color,
          },
          {
            data: props.data2.sum,
            backgroundColor: color2,
            borderColor: color2,
          },
        ],
      }));
    }
    else {
      dynamicData = computed(() => ({
        labels: props.data.description,
        datasets: [
          {
            data: props.data.sum,
            backgroundColor: color,
            borderColor: color,
          },          
        ],
      }));
    }

    return { structureData, structureOptions, dynamicData, dynamicOptions };
  },
};
</script>