<template>
  <ReportsFormView/>
  <br>
  <div class="card">Пользователь: {{ user.username }}</div>
  <div class="card">Email: {{ user.email }}</div>
  <div class="card">    
    <button class="btn exit" @click="exitBtn">Выйти</button>
  </div>
</template>

<script>
import ReportsFormView from '../views/ReportsFormView.vue'
import { mapState, mapMutations } from "vuex";

export default {
  props: {},
  components: { ReportsFormView },
  data() {
    return {};
  },
  computed: {
    ...mapState({
      user: "user",
      authorized: "authorized",
    }),
  },
  methods: {
    ...mapMutations({
      setAuthorized: "setAuthorized",
    }),
    exitBtn() {
      this.setAuthorized(false);
      this.$router.push({ name: "login" });
    },
  },
};
</script>

<style scoped>
.btn.exit {
  font-size: 16px;
  background: #240000;
  color: rgb(255, 255, 255);
  width: 176px;
  height: 32px;
  border-radius: 8px;
  padding: 0px;
  margin: 8px 0px 0px 0px;
}
</style>