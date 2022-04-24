<template>
  <div class="card">
    <AssetsForm
      :assets="assets_filter"
      :categories="categories_view"
      @clickBtnAddToAssets="
        createAsset({
          description: $event.add_description,
          sum: $event.add_sum,
          category_id: $event.category_id,
        })
      "
      @clickBtnDeleteFromAssets="updateAsset($event.id)"
    />
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";

// @ is an alias to /src
import AssetsForm from "@/components/AssetsForm.vue";

export default {
  name: "AssetsFormView",
  components: {
    AssetsForm,
  },
  data() {
    return {};
  },
  computed: {
    ...mapState({
      authorized: "authorized",
      assets: "assets",
      categories: "categories",
      calendar: "calendar",
      isMobile: "isMobile",
    }),
    assets_filter: function () {
      let new_assets = [];
      if (this.assets) {
        for (let i = 0; i < this.assets.assets.length; i++) {
          let { id, description, sum, category_id } = this.assets.assets[i];
          new_assets.push({ id, description, sum, category_id });
        }
      }
      return new_assets;
    },
    categories_view: function () {
      let new_categories = [];
      if (this.categories) {
        for (let i = 0; i < this.categories.categories.length; i++) {
          let { id, category } = this.categories.categories[i];
          new_categories.push({ id, category });
        }
        new_categories.sort((a, b) => a.id > b.id ? 1 : -1);
      }
      return new_categories;
    },
  },
  methods: {
    ...mapMutations({
      setSelectedReport: "setSelectedReport",
    }),
    ...mapActions({
      getObj: "getObj",
      createObj: "createObj",
      updateObj: "updateObj",
      refreshAssets: "refreshAssets",
      refreshCategories: "refreshCategories",
    }),
    createAsset({ description, sum, category_id }) {      
      var date = new Date();
      var obj = {
        description: description,
        sum: sum,
        category_id: category_id,
        date_in: this.calendar.dateIn,
        date_out: "2295-12-31T23:59:59",
      };
      if (
        this.calendar.year == date.getFullYear() &&
        this.calendar.month - 1 == date.getMonth()
      ) {
        obj = { description: description, sum: sum, category_id: category_id };
      }
      this.createObj({
        url: "/assets/",
        storepoint: "addToAssets",
        obj: obj,
      });
    },
    updateAsset(id) {
      var date = new Date();
      var obj = { id: id, date: this.calendar.dateAdd };
      if (
        this.calendar.year == date.getFullYear() &&
        this.calendar.month - 1 == date.getMonth()
      ) {
        obj = { id: id };
      }
      this.updateObj({
        url: "/assets/",
        storepoint: "deleteFromAssets",
        id: id,
        obj: obj,
      });
    },
  },
  mounted() {    
    this.setSelectedReport(9);
    if (this.isMobile) {
      this.refreshAssets();
      this.refreshCategories();
    }
    
  },
};
</script>
