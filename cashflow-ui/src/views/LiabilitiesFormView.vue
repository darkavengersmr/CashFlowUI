<template>
  <div class="card">
    <AssetsForm
      :assets="assets_filter"
      @clickBtnAddToAssets="
        createObj({
          url: '/liabilities/',
          storepoint: 'addToLiabilities',
          obj: { description: $event.add_description, sum: $event.add_sum },
        })
      "
      @clickBtnDeleteFromAssets="
        updateObj({
          url: '/liabilities/',
          storepoint: 'deleteFromLiabilities',
          id: $event.id,
          obj: { id: $event.id },
        })
      "
    />
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";

// @ is an alias to /src
import AssetsForm from "@/components/AssetsForm.vue";

export default {
  name: "LiabilitiesFormView",
  components: {
    AssetsForm,
  },
  data() {
    return {};
  },
  computed: {
    ...mapState({
      authorized: "authorized",
      liabilities: "liabilities",
    }),
    assets_filter: function () {
      let new_assets = [];
      if (this.liabilities) {
        for (let i = 0; i < this.liabilities.liabilities.length; i++) {
          let { id, description, sum } = this.liabilities.liabilities[i];
          new_assets.push({ id, description, sum });
        }
      }
      return new_assets;
    },
  },
  methods: {
    ...mapMutations({}),
    ...mapActions({
      getObj: "getObj",
      createObj: "createObj",
      updateObj: "updateObj",
    }),
  },
  mounted() {
    if (this.authorized) {
      this.getObj({ url: "/liabilities/", storepoint: "setLiabilities" });
    }
  },
};
</script>
