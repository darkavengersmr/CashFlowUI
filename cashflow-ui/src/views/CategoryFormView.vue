<template>
  <div class="card">
    <CategoryForm
      :categories="categories_view"

      @clickBtnAddToCategories="
        createObj({
          url: '/categories/',
          storepoint: 'addToCategories',
          obj: { category: $event.category },
        })
      "
      @clickBtnDeleteFromCategories="
        deleteObj({
          url: '/categories/',
          storepoint: 'deleteCategories',
          id: $event.id,
          params: { category_id: $event.id },
        })
      "
    />
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";

// @ is an alias to /src
import CategoryForm from "@/components/CategoryForm.vue";

export default {
  name: "CategoryFormView",
  components: {
    CategoryForm,
  },
  data() {
    return {};
  },
  computed: {
    ...mapState({
      authorized: "authorized",
      categories: "categories",      
    }),
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
      deleteObj: "deleteObj",
      refreshCategories: "refreshCategories",
    }),
  },
  mounted() {
      this.setSelectedReport(12);
  },
};
</script>
