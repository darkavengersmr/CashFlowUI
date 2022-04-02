<template>
  <div class="card">
    <div>Общая сумма за месяц: {{ totalSum }}</div>
    <div div class="card_item">
      <span>
        <input
          class="flowdesc"
          type="text"
          v-model="add_description"
          @keypress.enter="addToFlow"
          @focus="mostPopularVisible = true"
          @blur="unFocus"
        />
      </span>
      <span>
        <input
          class="flowsum"
          type="number"
          v-model="add_sum"
          @keypress.enter="addToFlow"
          @focus="mostPopularVisible = true"
          @blur="unFocus"
        />
      </span>
    </div>
    <div div class="card_item">
      <div class="regular">
        <input type="checkbox" id="checkbox" v-model="repeat" /> Сделать
        регулярным
      </div>
      <button class="btn add" @click="addToFlow">Добавить</button>
    </div>

    <div class="card" v-if="mostPopularVisible">
      <div class="card_item" v-for="(item, idx) in mostPopular" :key="idx">
        <div
          class="mostpopulardesc_item"
          @click="
            add_description = item.description;
            add_sum = 0;
          "
        >
          {{ item.description }}
        </div>
      </div>
    </div>

    <br />
    <div
      div
      class="card_item"
      v-for="(item, idx) in flow.slice().reverse()"
      :key="idx"
    >
      <button class="btn delete" @click="deleteFromFlow(item.id)">
        &#128465;
      </button>
      <div class="flowdesc_item">{{ item.description }}</div>
      <div class="flowsum_item">{{ item.sum }}</div>
    </div>

    <br />
    <div class="regularflowtitle" v-if="flowRegular.length > 0">
    Добавить регулярные:
    </div>    
    <div
      class="card_item"
      v-for="(item, idx) in flowRegular.slice().reverse()"
      :key="idx"
    >
      <button class="btn delete" @click="deleteFromFlowRegular(item.id)">
        &#128465;
      </button>
      <div
        class="regularflowdesc_item"
        @click="
          add_description = item.description;
          add_sum = item.sum;
        "
      >
        {{ item.description }}
      </div>
      <div
        class="regularflowsum_item"
        @click="
          add_description = item.description;
          add_sum = item.sum;
        "
      >
        {{ item.sum }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: {
    flow: Array,
    flowRegular: Array,
    mostPopular: Array,
  },
  emits: [
    "clickBtnAddToFlow",
    "clickBtnAddToFlowRegular",
    "clickBtnDeleteFromFlow",
    "clickBtnDeleteFromFlowRegular",
    "refreshMostPopular"
  ],
  data() {
    return {
      add_description: "",
      add_sum: 0,
      repeat: false,
      mostPopularVisible: false,
    };
  },
  computed: {
    ...mapState({}),
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
    unFocus() {      
      function my(context) {
        context.mostPopularVisible = false;        
      }      
      setTimeout(() => my(this), 1000);
    },
    addToFlow() {
      if (this.add_description.length > 0 && this.add_sum > 0) {
        this.$emit("clickBtnAddToFlow", {
          add_description: this.add_description,
          add_sum: this.add_sum,
        });
        if (
          this.repeat &&
          !this.flowRegularDescriptions.includes(this.add_description)
        ) {
          this.$emit("clickBtnAddToFlowRegular", {
            add_description: this.add_description,
            add_sum: this.add_sum,
          });
        }
        this.add_description = "";
        this.add_sum = 0;
        this.repeat = false;
        this.mostPopularVisible = false;
        this.$emit("refreshMostPopular");
      }
    },
    deleteFromFlow(id) {
      this.$emit("clickBtnDeleteFromFlow", {
        id: id,
      });
    },
    deleteFromFlowRegular(id) {
      this.$emit("clickBtnDeleteFromFlowRegular", {
        id: id,
      });
    },
  },
};
</script>

<style scoped>
.card_item {
  display: inline-flex;
  align-items: center;
  color: #ffffff;
}

.btn.add {
  font-size: 16px;
  background: #004209;
  color: rgb(255, 255, 255);
  width: 132px;
  height: 32px;
  border-radius: 8px;
  padding: 0px;
  margin: 0px 0px 0px 0px;
}

.btn.delete {
  font-size: 16px;
  background: #240000;
  color: rgb(255, 255, 255);
  width: 32px;
  height: 32px;
  border-radius: 8px;
  padding: 0px;
  margin: 2px 0px 2px 2px;
}

.regular {
  font-size: 16px;
  background: #323232;
  color: rgb(255, 255, 255);
  width: 220px;
  height: 32px;
  border-radius: 8px;
  padding: 6px;
  margin: 20px 0px 20px 0px;
  border: 0;
  box-shadow: none;
  margin: 10px 2px 10px 2px;
}

.flowdesc {
  font-size: 16px;
  background: #323232;
  color: rgb(255, 255, 255);
  width: 272px;
  height: 32px;
  border-radius: 8px;
  padding: 15px;
  margin: 20px 0px 20px 0px;
  border: 0;
  box-shadow: none;
  margin: 10px 0px 2px 2px;
}

.flowsum {
  font-size: 16px;
  background: #323232;
  color: rgb(255, 255, 255);
  width: 80px;
  height: 32px;
  border-radius: 8px;
  padding: 15px;
  margin: 0px;
  text-align: center;
  border: 0;
  box-shadow: none;
  margin: 10px 2px 2px 2px;
}

.flowdesc_item {
  background: #323232;
  color: rgb(255, 255, 255);
  width: 240px;
  height: 32px;
  border-radius: 8px;
  margin: 2px 2px 2px 2px;
  padding: 7px;
  text-align: left;
}

.flowsum_item {
  background: #323232;
  color: rgb(255, 255, 255);
  width: 80px;
  height: 32px;
  border-radius: 8px;
  padding: 7px;
}

.flowbtn_item {
  display: inline-block;
  background: #323232;
  color: rgb(255, 255, 255);
}

.mostpopulardesc_item {
  background: #323232;
  color: rgb(107, 107, 184);
  width: 356px;
  height: 32px;
  border-radius: 8px;
  margin: 2px 2px 2px 2px;
  padding: 7px;
  text-align: left;
}

.regularflowtitle {
  color: rgb(128, 128, 128);  
  margin: 0px 2px 8px 2px;    
}

.regularflowdesc_item {
  background: #323232;
  color: rgb(128, 128, 128);
  width: 240px;
  height: 32px;
  border-radius: 8px;
  margin: 2px 2px 2px 2px;
  padding: 7px;
  text-align: left;
}

.regularflowsum_item {
  background: #323232;
  color: rgb(128, 128, 128);
  width: 80px;
  height: 32px;
  border-radius: 8px;
  padding: 7px;
}
</style>