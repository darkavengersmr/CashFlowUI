<template>
  <div class="card">      
    <div>
      Описание
      <input
        class="flow input"
        type="text"
        v-model="add_description"
        @keypress.enter="addToFlow"        
      />
      <div></div>
      Сумма
      <input
        class="flow input"
        type="number"
        v-model="add_sum"
        @keypress.enter="addToFlow"
      />
    </div>
    <br />
    <div class="card">
      <button class="btn main" @click="addToFlow">добавить</button>
    </div>
    <br/>
    <h3 v-for="(item, idx) in flow" :key="idx">
        {{ item.description }} - {{ item.sum }} 
    </h3>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: {
    flow: Array,
  },
  emits: ["clickBtnAddToFlow"],
  data() {
    return {
      add_description: "",
      add_sum: 0,
    };
  },
  computed: {
    ...mapState({      
    }),
  },
  methods: {
    addToFlow() {      
      this.$emit("clickBtnAddToFlow", {        
        add_description: this.add_description,
        add_sum: this.add_sum,
      });
    },
  },
};
</script>