<template>
  <div class="card">
    <div
      class="card_item"
      v-if="showByCategory"
      @click="showByCategory = !showByCategory"
    >
      Регулярные: {{ flowRegularTotalSum.toLocaleString() }}
    </div>
    <div
      class="card_item"
      v-if="showByCategory"
      @click="showByCategory = !showByCategory"
    >
      Разовые: {{ (totalSum - flowRegularTotalSum).toLocaleString() }}
    </div>
    <div @click="showByCategory = !showByCategory">
      <span>Общая сумма за месяц: {{ totalSum.toLocaleString() }}</span
      ><span v-if="!showByCategory"> (?)</span>
    </div>
    <div div class="card_item">
      <span>
        <input
          class="flowdesc"
          type="text"
          v-model="add_description"
          @keypress.enter="addToFlow"
          @input="btnAddControl"
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
          @input="btnAddControl"
          @focus="mostPopularVisible = true"
          @blur="unFocus"
        />
      </span>
    </div>
    <div div class="card_item">
      <div class="regular" @click="repeat = !repeat">
        <input type="checkbox" id="checkbox" v-model="repeat" /> Сделать
        регулярным
      </div>
      <button v-if="btnAddIsActive" class="btn add active" @click="addToFlow">
        Добавить
      </button>
      <button v-if="btnUpdateIsActive" class="btn update" @click="updateFlow">
        Изменить
      </button>
      <button
        v-if="!btnAddIsActive && !btnUpdateIsActive"
        class="btn add notactive"
      >
        Добавить
      </button>
    </div>

    <div class="card">
      <div
        class="card_item"
        v-for="(item, idx) in filtered_autocomplete"
        :key="idx"
      >
        <div class="mostpopulardesc_item" @click="add_description = item">
          {{ item }}
        </div>
      </div>
    </div>

    <div class="card" v-if="mostPopularVisible && add_description.length == 0">
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
      <button
        class="btn delete"
        @click="
          delete_func = deleteFromFlow;
          delete_arg = item.id;
          showModal = true;
        "
      >
        &#128465;
      </button>
      <div
        class="flowdesc_item"
        @click="
          add_description = item.description;
          add_sum = item.sum;
          selected_flow_id = item.id;
          btnAddControl();
        "
      >
        {{ item.description.slice(0, 24) }}
      </div>
      <div
        class="flowsum_item"
        @click="
          add_description = item.description;
          add_sum = item.sum;
          selected_flow_id = item.id;
          btnAddControl();
        "
      >
        {{ item.sum.toLocaleString() }}
      </div>
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
      <button
        class="btn delete"
        @click="
          delete_func = deleteFromFlowRegular;
          delete_arg = item.id;
          showModal = true;
        "
      >
        &#128465;
      </button>
      <div
        class="regularflowdesc_item"
        @click="
          add_description = item.description;
          add_sum = item.sum;
          selected_flow_id = null;
          btnAddControl();
        "
      >
        {{ item.description.slice(0, 24) }}
      </div>
      <div
        class="regularflowsum_item"
        @click="
          add_description = item.description;
          add_sum = item.sum;
          selected_flow_id = null;
          btnAddControl();
        "
      >
        {{ item.sum.toLocaleString() }}
      </div>
    </div>
  </div>

  <vue-final-modal v-model="showModal" class="modal-container">
    <div class="confirm_box">
      Хотите удалить?
      <button
        class="btn confirm_yes"
        @click="
          delete_func(delete_arg);
          delete_func = null;
          delete_arg = null;
          showModal = false;
        "
      >
        Да
      </button>
      <button
        class="btn confirm_no"
        @click="
          delete_func = null;
          delete_arg = null;
          showModal = false;
        "
      >
        Нет
      </button>
    </div>
  </vue-final-modal>
</template>

<script>
import { mapState, mapActions } from "vuex";

import { VueFinalModal } from "vue-final-modal";

export default {
  components: {
    VueFinalModal,    
  },
  props: {
    flow: Array,
    flowRegular: Array,
    mostPopular: Array,
    flowRegularTotalSum: Number,
    autocomplete: Array,
  },
  emits: [
    "clickBtnAddToFlow",
    "clickBtnAddToFlowRegular",
    "clickBtnDeleteFromFlow",
    "clickBtnDeleteFromFlowRegular",
    "refreshMostPopular",
    "clickBtnUpdateFlow",
  ],
  data() {
    return {
      add_description: "",
      add_sum: "",
      repeat: false,
      mostPopularVisible: false,
      showModal: false,
      delete_func: null,
      delete_arg: null,
      showByCategory: false,
      btnAddIsActive: false,
      btnUpdateIsActive: false,
      selected_flow_id: null,
    };
  },
  computed: {
    ...mapState({
      isMobile: "isMobile",
    }),
    totalSum: function () {
      var sum = 0;
      for (var index = 0; index < this.flow.length; index++) {
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
    filtered_autocomplete: function () {
      if (this.autocomplete && this.add_description.length > 1) {
        return this.autocomplete.filter(
          (el) =>
            el.toUpperCase().indexOf(this.add_description.toUpperCase()) >= 0 &&
            el.toUpperCase() != this.add_description.toUpperCase()
        );
      } else {
        return [];
      }
    },
  },
  methods: {
    ...mapActions({
      refreshFlowsAll: "refreshFlowsAll",
    }),
    btnAddControl() {
      if (this.add_description.length > 2 && parseInt(this.add_sum) > 0) {
        if (this.selected_flow_id) {
          let existInFlow = this.flow.reduce(
            (sum, el) =>
              sum ||
              (el.description == this.add_description &&
                el.sum != this.add_sum),
            false
          );
          if (existInFlow) {
            this.btnAddIsActive = false;
            this.btnUpdateIsActive = true;
          } else {
            this.btnAddIsActive = true;
            this.btnUpdateIsActive = false;
          }
        } else {
          this.btnAddIsActive = true;
          this.btnUpdateIsActive = false;
        }
      } else {
        this.btnAddIsActive = false;
        this.btnUpdateIsActive = false;
      }
    },
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
        this.selected_flow_id = null;
        this.repeat = false;
        this.mostPopularVisible = false;
        this.$emit("refreshMostPopular");
        this.btnAddControl();        
        if (!this.isMobile) {
          this.refreshFlowsAll();
        }
      }
    },
    updateFlow() {
      if (this.add_description.length > 0 && this.add_sum > 0) {
        this.$emit("clickBtnUpdateFlow", {
          description: this.add_description,
          sum: this.add_sum,
          id: this.selected_flow_id,
        });
        this.add_description = "";
        this.add_sum = 0;
        this.selected_flow_id = null;
        this.repeat = false;
        this.mostPopularVisible = false;
        this.$emit("refreshMostPopular");
        this.btnAddControl();
        if (!this.isMobile) {
          this.refreshFlowsAll();
        }
      }
    },
    deleteFromFlow(id) {
      this.selected_flow_id = null;
      this.$emit("clickBtnDeleteFromFlow", {
        id: id,
      });
      if (!this.isMobile) {
          this.refreshFlowsAll();
        }
    },
    deleteFromFlowRegular(id) {
      this.selected_flow_id = null;
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

.btn.add.active {
  font-size: 16px;
  background: #004209;
  color: rgb(255, 255, 255);
  width: 132px;
  height: 32px;
  border-radius: 8px;
  padding: 0px;
  margin: 8px 0px 0px 0px;
}

.btn.add.notactive {
  font-size: 16px;
  background: #323232;
  color: rgb(192, 192, 192);
  width: 132px;
  height: 32px;
  border-radius: 8px;
  padding: 0px;
  margin: 8px 0px 0px 0px;
}

.btn.update {
  font-size: 16px;
  background: #010042;
  color: rgb(255, 255, 255);
  width: 132px;
  height: 32px;
  border-radius: 8px;
  padding: 0px;
  margin: 8px 0px 0px 0px;
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
  margin: 0px;
  border: 0;
  box-shadow: none;
  margin: 8px 2px 0px 0px;
}

.flowdesc {
  font-size: 16px;
  background: #323232;
  color: rgb(255, 255, 255);
  width: 252px;
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
  width: 100px;
  height: 32px;
  border-radius: 8px;
  padding: 15px;
  margin: 0px;
  text-align: right;
  border: 0;
  box-shadow: none;
  margin: 10px 2px 2px 2px;
}

.flowdesc_item {
  background: #323232;
  color: rgb(255, 255, 255);
  width: 220px;
  height: 32px;
  border-radius: 8px;
  margin: 2px 2px 2px 2px;
  padding: 7px;
  text-align: left;
}

.flowsum_item {
  background: #323232;
  color: rgb(255, 255, 255);
  width: 100px;
  height: 32px;
  border-radius: 8px;
  padding: 7px;
  text-align: end;
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
  width: 220px;
  height: 32px;
  border-radius: 8px;
  margin: 2px 2px 2px 2px;
  padding: 7px;
  text-align: left;
}

.regularflowsum_item {
  background: #323232;
  color: rgb(128, 128, 128);
  width: 100px;
  height: 32px;
  border-radius: 8px;
  padding: 7px;
  text-align: end;
}
</style>