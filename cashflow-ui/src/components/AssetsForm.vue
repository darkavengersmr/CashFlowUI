<template>
  <div class="card">
    <div v-if="showByCategory" class="card">
      <div
        class="card_item"
        v-for="(item, idx) in sumByCategories"
        :key="idx"
        @click="showByCategory = !showByCategory"
      >
        {{ item }}
      </div>
    </div>
    <div @click="showByCategory = !showByCategory">
      <span>Всего: {{ totalSum.toLocaleString() }}</span
      ><span v-if="!showByCategory"> (?)</span>
    </div>
    <div class="card_item">
      <span>
        <input
          class="assetsdesc"
          type="text"
          v-model="add_description"
          @keypress.enter="addToAssets"
          @input="btnAddUpdateControl"
        />
      </span>
      <span>
        <input
          class="assetssum"
          type="number"
          v-model="add_sum"
          @keypress.enter="addToAssets"
          @input="btnAddUpdateControl"
        />
      </span>
    </div>
    <div class="card_item">
      <select
        v-model="category_id"
        class="category"
        @change="btnAddUpdateControl"
      >
        <option disabled value="">Выберите...</option>
        <option
          v-for="(item, idx) in categories"
          :key="idx"
          v-bind:value="item.id"
        >
          {{ item.category }}
        </option>
      </select>
      <button
        v-if="btnAddIsActive && !btnUpdateIsActive"
        class="btn add active"
        @click="addToAssets"
      >
        Добавить
      </button>
      <button
        v-if="!btnAddIsActive && !btnUpdateIsActive"
        class="btn add notactive"
        @click="addToAssets"
      >
        Добавить
      </button>
      <button
        v-if="btnUpdateIsActive && !btnAddIsActive"
        class="btn update active"
        @click="updateAssets"
      >
        Изменить
      </button>
      <!--button
        v-if="!btnUpdateIsActive"
        class="btn update notactive"
        @click="updateAssets"
      >
        Изменить
      </button-->
    </div>
    <br />
    <div
      class="card_item"
      v-for="(item, idx) in assetsByCategories.slice().reverse()"
      :key="idx"
    >
      <button
        class="btn delete"
        @click="
          delete_func = deleteFromAssets;
          delete_arg = item.id;
          showModal = true;
        "
      >
        &#128465;
      </button>
      <div
        class="assetsdesc_item"
        @click="
          add_description = item.description;
          add_sum = item.sum;
          id = item.id;
          category_id = item.category_id;
          btnAddUpdateControl();
        "
      >
        {{ item.description.slice(0, 24) }}
      </div>
      <div
        class="assetssum_item"
        @click="
          add_description = item.description;
          add_sum = item.sum;
          id = item.id;
          category_id = item.category_id;
          btnAddUpdateControl();
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
    assets: Array,
    categories: Array,
  },
  emits: ["clickBtnAddToAssets", "clickBtnDeleteFromAssets"],
  data() {
    return {
      add_description: "",
      add_sum: "",
      id: undefined,
      category_id: undefined,
      showModal: false,
      delete_func: null,
      delete_arg: null,
      showByCategory: false,
      btnAddIsActive: false,
      btnUpdateIsActive: false,
    };
  },
  computed: {
    ...mapState({
      isMobile: "isMobile",
    }),
    assetsByCategories: function () {
      let result = this.assets;      
      result.sort((a, b) => (a.category_id < b.category_id ? 1 : -1));
      return result;
    },
    totalSum: function () {
      var sum = 0;
      for (var index = 0; index < this.assets.length; ++index) {
        if (this.assets[index].sum) {
          sum += this.assets[index].sum;
        }
      }
      return sum;
    },
    sumByCategories: function () {
      let result = {};
      let categories = {};

      for (var index = 0; index < this.categories.length; index++) {
        categories[this.categories[index].id] = this.categories[index].category;
      }

      for (index = 0; index < this.assets.length; ++index) {
        if (this.assets[index].category_id) {
          if (!result[categories[this.assets[index].category_id]]) {
            result[categories[this.assets[index].category_id]] = 0;
          }
          result[categories[this.assets[index].category_id]] +=
            this.assets[index].sum;
        }
      }

      let out = [];
      for (let category in result) {
        out.push(category + ": " + result[category].toLocaleString());
      }

      return out;
    },
  },
  methods: {
    ...mapActions({      
      refreshAssets: "refreshAssets",
      refreshLiabilities: "refreshLiabilities",
      refreshFlowsAll: "refreshFlowsAll",
    }),
    btnAddUpdateControl() {
      let descriptions = this.assets.map((el) => el.description);
      if (
        this.assets &&
        descriptions.indexOf(this.add_description) != -1 &&
        this.assets[descriptions.indexOf(this.add_description)].sum !=
          this.add_sum
      ) {
        this.btnUpdateIsActive = true;
        this.btnAddIsActive = false;
      } else if (
        this.assets &&
        descriptions.indexOf(this.add_description) != -1 &&
        this.assets[descriptions.indexOf(this.add_description)].sum ==
          this.add_sum
      ) {
        this.btnUpdateIsActive = false;
        this.btnAddIsActive = false;
      } else {
        this.btnUpdateIsActive = false;
        if (
          this.add_description.length > 2 &&
          parseInt(this.add_sum) > 0 &&
          this.category_id
        ) {
          this.btnAddIsActive = true;
        } else {
          this.btnAddIsActive = false;
        }
      }
    },
    addToAssets() {
      if (this.add_description.length > 0 && this.add_sum > 0) {
        this.$emit("clickBtnAddToAssets", {
          add_description: this.add_description,
          add_sum: this.add_sum,
          category_id: this.category_id,
        });
        this.add_description = "";
        this.add_sum = 0;
        this.category_id = undefined;

        if (!this.isMobile) {
          this.refreshFlowsAll();         
        }
      }
    },
    updateAssets() {
      if (this.add_description.length > 0 && this.add_sum > 0 && this.id) {
        this.deleteFromAssets(this.id);
        this.addToAssets();
        if (!this.isMobile) {
          this.refreshFlowsAll();
        }
      }
    },
    deleteFromAssets(id) {
      this.$emit("clickBtnDeleteFromAssets", { id: id });
      if (!this.isMobile) {
          this.refreshFlowsAll();
        }
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

.btn.update.active {
  font-size: 16px;
  background: #010042;
  color: rgb(255, 255, 255);
  width: 132px;
  height: 32px;
  border-radius: 8px;
  padding: 0px;
  margin: 8px 0px 0px 0px;
}

.btn.update.notactive {
  font-size: 16px;
  background: #323232;
  color: rgb(192, 192, 192);
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
  margin: 20px 0px 20px 0px;
  border: 0;
  box-shadow: none;
  margin: 10px 2px 10px 2px;
}

.assetsdesc {
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

.category {
  font-size: 16px;
  background: #323232;
  color: rgb(255, 255, 255);
  width: 220px;
  height: 32px;
  border-radius: 8px;

  border: 0;
  box-shadow: none;
  padding: 0px;
  margin: 8px 2px 0px 0px;
}

.category_desc {
  width: 150px;
  height: 18px;
  margin: 2px 0px 2px 0px;
}

.assetssum {
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

.assetsdesc_item {
  background: #323232;
  color: rgb(255, 255, 255);
  width: 220px;
  height: 32px;
  border-radius: 8px;
  margin: 2px 2px 2px 2px;
  padding: 7px;
  text-align: left;
}

.assetssum_item {
  background: #323232;
  color: rgb(255, 255, 255);
  width: 100px;
  height: 32px;
  border-radius: 8px;
  padding: 7px;
  text-align: end;
}

.assetsbtn_item {
  display: inline-block;
  background: #323232;
  color: rgb(255, 255, 255);
}

.regularassetsdesc_item {
  background: #323232;
  color: rgb(128, 128, 128);
  width: 240px;
  height: 32px;
  border-radius: 8px;
  margin: 2px 2px 2px 2px;
  padding: 7px;
  text-align: left;
}

.regularassetssum_item {
  background: #323232;
  color: rgb(128, 128, 128);
  width: 80px;
  height: 32px;
  border-radius: 8px;
  padding: 7px;
}
</style>