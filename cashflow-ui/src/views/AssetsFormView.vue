<template>
  <div class="card">
    <AssetsForm
      :assets="assets_filter"
      @clickBtnAddToAssets="
        createObj({
          url: '/assets/',
          storepoint: 'addToAssets',
          obj: { description: $event.add_description, sum: $event.add_sum },
        })
      "
      @clickBtnDeleteFromAssets="
        updateObj({
          url: '/assets/',
          storepoint: 'deleteFromAssets',
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
    }),
    assets_filter: function () {
      let new_assets = [];
      if (this.assets) {
        for (let i = 0; i < this.assets.assets.length; i++) {
          let { id, description, sum } = this.assets.assets[i];
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
      this.getObj({ url: "/assets/", storepoint: "setAssets" });
    }
  },
};
</script>
