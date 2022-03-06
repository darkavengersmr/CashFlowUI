<template>
  <div class="card">      
    <FlowForm 
        :flow="flow"
        @clickBtnLogin="
          getObj({url: '/inflow/', storepoint: 'setInflow'})
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
  },
  methods: {
    ...mapMutations({
    }),
    ...mapActions({
      getObj: "getObj"
    }),
  },
  mounted() {
    if (this.authorized) {
      this.getObj({url: '/inflow/', storepoint: 'setInflow'});    
    }    
  },
}
</script>
