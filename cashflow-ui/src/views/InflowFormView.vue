<template>
  <div class="card">
    <FlowForm
      :flow="flow"
      :flowRegular="flowRegular"
      @clickBtnAddToFlow="
        createInflow({
          description: $event.add_description,
          sum: $event.add_sum,
        })
      "
      @clickBtnAddToFlowRegular="
        createObj({
          url: '/inflow_regular/',
          storepoint: 'addToInflowRegular',
          obj: { description: $event.add_description, sum: $event.add_sum },
        })
      "
      @clickBtnDeleteFromFlow="
        deleteObj({
          url: '/inflow/',
          storepoint: 'deleteFromInflow',
          id: $event.id,
          params: { inflow_id: $event.id },
        })
      "
      @clickBtnDeleteFromFlowRegular="
        deleteObj({
          url: '/inflow_regular/',
          storepoint: 'deleteFromInflowRegular',
          id: $event.id,
          params: { inflow_regular_id: $event.id },
        })
      "
    />
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";

// @ is an alias to /src
import FlowForm from "@/components/FlowForm.vue";

export default {
  name: "InflowFormView",
  components: {
    FlowForm,
  },
  data() {
    return {};
  },
  computed: {
    ...mapState({
      authorized: "authorized",
      inflow: "inflow",
      inflowRegular: "inflowRegular",
      calendar: "calendar",
    }),
    flow: function () {
      let new_flow = [];
      if (this.inflow) {
        for (let i = 0; i < this.inflow.inflow.length; i++) {
          let { id, description, sum } = this.inflow.inflow[i];
          new_flow.push({ id, description, sum });
        }
        new_flow.sort((a, b) => a.id > b.id ? 1 : -1);
      }            
      return new_flow;
    },
    flowVisible: function () {
      let new_flow = [];
      if (this.inflow) {
        for (let i = 0; i < this.inflow.inflow.length; i++) {
          let { description } = this.inflow.inflow[i];
          new_flow.push(description);
        }
      }
      return new_flow;
    },
    flowRegular: function () {
      let new_flow = [];
      if (this.inflowRegular) {
        for (let i = 0; i < this.inflowRegular.inflow_regular.length; i++) {
          let { id, description, sum } = this.inflowRegular.inflow_regular[i];
          if (!this.flowVisible.includes(description)) {
            new_flow.push({ id, description, sum });
          }
        }
      }
      return new_flow;
    },
  },
  methods: {
    ...mapMutations({}),
    ...mapActions({
      getObj: "getObj",
      createObj: "createObj",
      deleteObj: "deleteObj",
      refreshFlows: "refreshFlows",
    }),
    createInflow({ description, sum }) {
      var date = new Date();
      var obj = { description: description, sum: sum, date: this.calendar.dateAdd };
      if (
        this.calendar.year == date.getFullYear() &&
        this.calendar.month - 1 == date.getMonth()
      ) {
        obj = { description: description, sum: sum };
      }
      this.createObj({
          url: "/inflow/",
          storepoint: "addToInflow",
          obj: obj,
        });
    },
  },
  mounted() {
    this.refreshFlows();
  },
};
</script>
