<template>    
  <CategoryFormView/>

  <div class="card" v-if="!isMobile">    
    <button class="btn report" @click="reportBtn">Отчеты в Excel</button>
  </div>

  <div class="card">Пользователь: {{ user.username }}</div>
  <div class="card">Email: {{ user.email }}</div>
  <div class="card">    
    <button class="btn exit" @click="exitBtn">Выйти</button>
  </div>
  <br><br>
</template>

<script>
import CategoryFormView from '../views/CategoryFormView.vue'
import { mapState, mapMutations } from "vuex";

export default {
  props: {},
  components: { CategoryFormView },
  data() {
    return {};
  },
  computed: {
    ...mapState({
      user: "user",
      authorized: "authorized",
      isMobile: "isMobile",
    }),
  },
  methods: {
    ...mapMutations({
      setAuthorized: "setAuthorized",
      setIsDemo: "setIsDemo",
    }),
    exitBtn() {
      this.setIsDemo(false);
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

.btn.report {
  font-size: 16px;
  background: #010042;
  color: rgb(255, 255, 255);
  width: 176px;
  height: 32px;
  border-radius: 8px;
  padding: 8px 8px 8px 8px;
  margin: 20px 0px 20px 0px;
}
</style>