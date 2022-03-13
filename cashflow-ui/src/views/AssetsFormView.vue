<template>
  <div class="card">
    <AssetsForm
      :assets="assets_filter"
      @clickBtnAddToAssets="
        createAsset({
          description: $event.add_description,
          sum: $event.add_sum,
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
      calendar: "calendar",
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
      refreshAssets: "refreshAssets",
    }),
    createAsset({ description, sum }) {
      var date = new Date();
      var obj = {
        description: description,
        sum: sum,
        date_in: this.calendar.dateIn,
        date_out: "2295-12-31T23:59:59",
      };
      if (
        this.calendar.year == date.getFullYear() &&
        this.calendar.month - 1 == date.getMonth()
      ) {
        obj = { description: description, sum: sum };
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
    this.refreshAssets();
  },
};
</script>
