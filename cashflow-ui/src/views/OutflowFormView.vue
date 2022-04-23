<template>
  <div class="card">
    <FlowForm
      :flow="flow"
      :flowRegular="flowRegular"
      :flowRegularTotalSum="flowRegularTotalSum"
      :mostPopular="popular"
      :autocomplete="complete"
      @clickBtnAddToFlow="
        createOutflow({
          description: $event.add_description,
          sum: $event.add_sum,
        })
      "
      @clickBtnUpdateFlow="
        deleteObj({
          url: '/outflow/',
          storepoint: 'deleteFromOutflow',
          id: $event.id,
          params: { outflow_id: $event.id },
        });
        createOutflow({
          description: $event.description,
          sum: $event.sum,
        })
      "
      @clickBtnAddToFlowRegular="
        createObj({
          url: '/outflow_regular/',
          storepoint: 'addToOutflowRegular',
          obj: { description: $event.add_description, sum: $event.add_sum },
        })
      "
      @clickBtnDeleteFromFlow="
        deleteObj({
          url: '/outflow/',
          storepoint: 'deleteFromOutflow',
          id: $event.id,
          params: { outflow_id: $event.id },
        })
      "
      @clickBtnDeleteFromFlowRegular="
        deleteObj({
          url: '/outflow_regular/',
          storepoint: 'deleteFromOutflowRegular',
          id: $event.id,
          params: { outflow_regular_id: $event.id },
        })
      "
      @refreshMostPopular="refreshMostPopular"
    />
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";

// @ is an alias to /src
import FlowForm from "@/components/FlowForm.vue";

export default {
  name: "OutflowFormView",
  components: {
    FlowForm,
  },
  data() {
    return {};
  },
  computed: {
    ...mapState({
      authorized: "authorized",
      outflow: "outflow",
      outflowRegular: "outflowRegular",
      calendar: "calendar",
      mostPopular: "mostPopular",
    }),
    flow: function () {
      let new_flow = [];
      if (this.outflow) {
        for (let i = 0; i < this.outflow.outflow.length; i++) {
          let { id, description, sum } = this.outflow.outflow[i];
          new_flow.push({ id, description, sum });
        }
        new_flow.sort((a, b) => a.id > b.id ? 1 : -1);
      }
      return new_flow;
    },
    flowVisible: function () {
      let new_flow = [];
      if (this.outflow) {
        for (let i = 0; i < this.outflow.outflow.length; i++) {
          let { description } = this.outflow.outflow[i];
          new_flow.push(description);
        }
      }
      return new_flow;
    },
    flowRegular: function () {
      let new_flow = [];
      if (this.outflowRegular) {
        for (let i = 0; i < this.outflowRegular.outflow_regular.length; i++) {
          let { id, description, sum } = this.outflowRegular.outflow_regular[i];
          if (!this.flowVisible.includes(description)) {
            new_flow.push({ id, description, sum });
          }
        }
      }
      return new_flow;
    },
    flowRegularTotalSum: function () {
      let regularTotalSum = 0;
      if (this.outflow && this.outflowRegular) {
        for (let i = 0; i < this.outflow.outflow.length; i++) {
          for (let j = 0; j < this.outflowRegular.outflow_regular.length; j++) {            
            if (this.outflow.outflow[i].description == this.outflowRegular.outflow_regular[j].description) {
              regularTotalSum += this.outflow.outflow[i].sum
            }
          }
        }
      }      
      return regularTotalSum;
    },
    popular: function () {
      let most_popular = [];
      if (this.mostPopular) {
        most_popular = this.mostPopular.most_popular;
      }
      return most_popular;
    },
    complete: function () {
      let autocomplete = [];
      if (this.mostPopular) {
        for (let i=0; i<this.mostPopular.autocomplete.length; i++) {
          autocomplete.push(this.mostPopular.autocomplete[i].description);
        }
      }      
      return autocomplete;
    },
  },
  methods: {
    ...mapMutations({
      setSelectedReport: "setSelectedReport",
    }),
    ...mapActions({
      getObj: "getObj",
      createObj: "createObj",
      deleteObj: "deleteObj",
      refreshMostPopular: "refreshMostPopular",
    }),
    createOutflow({ description, sum }) {
      var date = new Date();
      var obj = { description: description, sum: sum, date: this.calendar.dateAdd };
      if (
        this.calendar.year == date.getFullYear() &&
        this.calendar.month - 1 == date.getMonth()
      ) {
        obj = { description: description, sum: sum };
      }
      this.createObj({
          url: "/outflow/",
          storepoint: "addToOutflow",
          obj: obj,
        });
    },
  },
  mounted() {
    this.setSelectedReport(4);
  },
};
</script>

