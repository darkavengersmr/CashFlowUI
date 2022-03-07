<template>
  <div class="card">
    <div>Общая сумма за месяц: {{ totalSum }}</div>        
    <div>
      <span><button class="btn add" @click="addToFlow">+</button></span>
      <span v-if="repeat"><button class="btn add" @click="repeat = !repeat">&#128259;</button></span>
      <span v-if="!repeat"><button class="btn add" @click="repeat = !repeat">1</button></span>
      <span>
      <input
        class="flowdesc"
        type="text"
        v-model="add_description"
        @keypress.enter="addToFlow"        
      />
      </span>
      <span>      
      <input
        class="flowsum"
        type="number"
        v-model="add_sum"
        @keypress.enter="addToFlow"
      />
    </span>    
    </div>  
    <div div class="card_item" v-for="(item, idx) in flow.slice().reverse()" :key="idx">
        <button class="btn add" @click="deleteFromFlow(item.id)">&#128465;</button>
        <div class="flowdesc_item">{{ item.description }}</div>    
        <div class="flowsum_item">{{ item.sum }}</div>    
    </div>
    <div div class="card_item" v-for="(item, idx) in flowRegular.slice().reverse()" :key="idx">
        <button class="btn add" @click="deleteFromFlowRegular(item.id)">&#128465;</button>
        <div class="regularflowdesc_item" @click="add_description = item.description; add_sum = item.sum">{{ item.description }}</div>    
        <div class="regularflowsum_item" @click="add_description = item.description; add_sum = item.sum">{{ item.sum }}</div>    
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: {
    flow: Array,
    flowRegular: Array,
  },
  emits: ["clickBtnAddToFlow", "clickBtnAddToFlowRegular", "clickBtnDeleteFromFlow", "clickBtnDeleteFromFlowRegular"],
  data() {
    return {
      add_description: "",
      add_sum: 0,
      repeat: false,
    };
  },
  computed: {
    ...mapState({      
    }),
    totalSum: function () {
      var sum = 0;
      for (var index = 0; index < this.flow.length; ++index) {
        if (this.flow[index].sum) {            
            sum += this.flow[index].sum;
        }
      }
      return sum;
    },
    flowRegularDescriptions: function () {    
      let new_flow = [];      
      if (this.flowRegular) {
        for (let i = 0; i < this.flowRegular.length; i++) {
            let { description } = this.flowRegular[i];
            new_flow.push(description);            
        }        
      }
      return new_flow;      
    },
  },
  methods: {
    addToFlow() {
        if (this.add_description.length > 0 && this.add_sum > 0) {
          this.$emit("clickBtnAddToFlow", {        
                add_description: this.add_description,
                add_sum: this.add_sum,        
            });
          if (this.repeat && !this.flowRegularDescriptions.includes(this.add_description)) {
            this.$emit("clickBtnAddToFlowRegular", {        
                add_description: this.add_description,
                add_sum: this.add_sum,        
            });            
          }
          this.add_description = "";
          this.add_sum = 0;
          this.repeat = false;      
        }      
    },
    deleteFromFlow(id) {          
      this.$emit("clickBtnDeleteFromFlow", {        
        id: id
      });
    },
    deleteFromFlowRegular(id) {          
      this.$emit("clickBtnDeleteFromFlowRegular", {        
        id: id
      });
    },
  },
};
</script>