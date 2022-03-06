<template>
  <div class="card">      
    <FlowForm 
        :flow="flow"
        @clickBtnLogin="
          getObj({url: '/outflow/', storepoint: 'setIOutflow'})
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
      this.getObj({url: '/outflow/', storepoint: 'setOutflow'});    
    }
  },
}
</script>
