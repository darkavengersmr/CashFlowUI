<template>
  <div class="card">      
    <FlowForm 
        :flow="flow"
        :flowRegular="flowRegular"
        @clickBtnAddToFlow="
          createObj({url: '/inflow/', storepoint: 'addToInflow', obj: { description: $event.add_description, sum: $event.add_sum }})
        "
        @clickBtnAddToFlowRegular="
          createObj({url: '/inflow_regular/', storepoint: 'addToInflowRegular', obj: { description: $event.add_description, sum: $event.add_sum }})
        "
        @clickBtnDeleteFromFlow="
          deleteObj({url: '/inflow/', storepoint: 'deleteFromInflow', id: $event.id, params: { inflow_id: $event.id }})
        "
        @clickBtnDeleteFromFlowRegular="
          deleteObj({url: '/inflow_regular/', storepoint: 'deleteFromInflowRegular', id: $event.id, params: { inflow_regular_id: $event.id }})
        "/>    
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";

// @ is an alias to /src
import FlowForm from '@/components/FlowForm.vue'

export default {
  name: 'InflowFormView',
  components: {
    FlowForm
  },
  data() {
    return {
    };
  },
  computed: {
    ...mapState({
      authorized: "authorized",
      inflow: "inflow",
      inflowRegular: "inflowRegular",      
    }),
    flow: function () {    
      let new_flow = [];      
      if (this.inflow) {
        for (let i = 0; i < this.inflow.inflow.length; i++) {
            let { id, description, sum } = this.inflow.inflow[i];
            new_flow.push({id, description, sum});            
        }        
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
              new_flow.push({id, description, sum});
            }
        }      
      }
      return new_flow;      
    },
  },
  methods: {
    ...mapMutations({
    }),
    ...mapActions({
      getObj: "getObj",
      createObj: "createObj",
      deleteObj: "deleteObj",
    }),
  },
  mounted() {
    if (this.authorized) {
      this.getObj({url: '/inflow/', storepoint: 'setInflow'});
      this.getObj({url: '/inflow_regular/', storepoint: 'setInflowRegular'});  
    }    
  },
}
</script>
