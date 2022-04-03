<template>
  <div class="card">
    <h5>Категории активов и пассивов</h5>
    <div div class="card_item">
      <span>
        <input
          class="categorydesc"
          type="text"
          v-model="add_category"
          @keypress.enter="addToCategory"
        />
      </span>
      <button class="btn add" @click="addToCategory">Добавить</button>
    </div>
    <div class="card_item" v-for="(item, idx) in categories" :key="idx">
      <button
        class="btn delete"
        @click="
          delete_func = deleteFromCategory;
          delete_arg = item.id;
          showModal = true;
        "
      >
        &#128465;
      </button>
      <div class="categorydesc_item">{{ item.category }}</div>
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
import { mapState } from "vuex";

import { VueFinalModal } from "vue-final-modal";

export default {
  components: {
    VueFinalModal,
  },
  props: {
    categories: Array,
  },
  emits: ["clickBtnAddToCategories", "clickBtnDeleteFromCategories"],
  data() {
    return {
      add_category: "",
      showModal: false,
      delete_func: null,
      delete_arg: null,
    };
  },
  computed: {
    ...mapState({}),
  },
  methods: {
    addToCategory() {
      if (this.add_category.length > 0) {
        this.$emit("clickBtnAddToCategories", {
          category: this.add_category,
        });
        this.add_category = "";
      }
    },
    deleteFromCategory(id) {
      this.$emit("clickBtnDeleteFromCategories", {
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
  margin: 0px 0px 10px 0px;
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

h5 {
  margin: 30px 0px 10px 0px;
}

.categorydesc {
  font-size: 16px;
  background: #323232;
  color: rgb(255, 255, 255);
  width: 160px;
  height: 32px;
  border-radius: 8px;
  padding: 15px;
  margin: 0px 0px 0px 0px;
  border: 0;
  box-shadow: none;
  margin: 0px 2px 10px 2px;
}

.categorydesc_item {
  background: #323232;
  color: rgb(255, 255, 255);
  width: 262px;
  height: 32px;
  border-radius: 8px;
  margin: 2px 2px 2px 2px;
  padding: 7px;
  text-align: left;
}

.categorybtn_item {
  display: inline-block;
  background: #323232;
  color: rgb(255, 255, 255);
}

.regularcategorydesc_item {
  background: #323232;
  color: rgb(128, 128, 128);
  width: 240px;
  height: 32px;
  border-radius: 8px;
  margin: 2px 2px 2px 2px;
  padding: 7px;
  text-align: left;
}

.regularcategorysum_item {
  background: #323232;
  color: rgb(128, 128, 128);
  width: 80px;
  height: 32px;
  border-radius: 8px;
  padding: 7px;
}
</style>