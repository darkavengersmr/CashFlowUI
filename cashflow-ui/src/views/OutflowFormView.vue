<template>
  <div class="card">      
    <FlowForm 
        :flow="flow"
        :flowRegular="flowRegular"
        @clickBtnAddToFlow="
          createObj({url: '/outflow/', storepoint: 'addToOutflow', obj: { description: $event.add_description, sum: $event.add_sum }})
        "
        @clickBtnAddToFlowRegular="
          createObj({url: '/outflow_regular/', storepoint: 'addToOutflowRegular', obj: { description: $event.add_description, sum: $event.add_sum }})
        "
        @clickBtnDeleteFromFlow="
          deleteObj({url: '/outflow/', storepoint: 'deleteFromOutflow', id: $event.id, params: { outflow_id: $event.id }})
        "
        @clickBtnDeleteFromFlowRegular="
          deleteObj({url: '/outflow_regular/', storepoint: 'deleteFromOutflowRegular', id: $event.id, params: { outflow_regular_id: $event.id }})
        "/>    
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";

// @ is an alias to /src
import FlowForm from '@/components/FlowForm.vue'

export default {
  name: 'IOutflowFormView',
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
      outflow: "outflow",
      outflowRegular: "outflowRegular",    
    }),
    flow: function () {    
      let new_flow = [];
      if (this.outflow) {
        for (let i = 0; i < this.outflow.outflow.length; i++) {
            let { id, description, sum } = this.outflow.outflow[i];
            new_flow.push({id, description, sum});
        }       
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
      this.getObj({url: '/outflow/', storepoint: 'setOutflow'});
      this.getObj({url: '/outflow_regular/', storepoint: 'setOutflowRegular'});
    }
  },
}
</script>
