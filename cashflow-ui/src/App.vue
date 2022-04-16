<template>
  <div class="card">
    <h2 v-if="!authorized">Cashflow</h2>
    <div class="header">
      <CashFlow v-if="authorized" :inflow="inflow" :outflow="outflow" />
      <CalendarForm v-if="authorized" @updatePeriod="updateData" />
    </div>
    <nav>
      <router-link v-if="!authorized" to="/login">Войти</router-link
      ><span v-if="!authorized"> | </span>
      <router-link v-if="!authorized" to="/register"
        >Зарегистрироваться</router-link
      >
      <router-link v-if="authorized" to="/inflow">Доходы</router-link
      ><span v-if="authorized"> | </span>
      <router-link v-if="authorized" to="/outflow">Расходы</router-link
      ><span v-if="authorized"> | </span>
      <router-link v-if="authorized" to="/assets">Активы</router-link
      ><span v-if="authorized"> | </span>
      <router-link v-if="authorized" to="/liabilities">Пассивы</router-link
      ><span v-if="authorized"> | </span>
      <router-link v-if="authorized" to="/reports">Отчеты</router-link
      ><span v-if="authorized"> | </span>
      <router-link v-if="authorized" to="/preferences">Профиль</router-link>
    </nav>
    <router-view />
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import CalendarForm from "./components/CalendarForm.vue";
import CashFlow from "./components/CashFlow.vue";

export default {
  name: "App",
  created() {
        //Detect window risize
        window.addEventListener('resize', this.setViewport)
        this.setViewport();
    },
    beforeUnmount() {
        window.removeEventListener('resize', this.setViewport)
    },
  data() {
    return {};
  },
  computed: {
    ...mapState({
      authorized: "authorized",
      auth: "auth",
      user: "user",
      inflow: "inflow",
      inflowRegular: "inflowRegular",
      outflow: "outflow",
      outflowRegular: "outflowRegular",
    }),
  },
  methods: {
    ...mapMutations({
      setAuthorized: "setAuthorized",
      setUserid: "setUserid",
    }),
    ...mapActions({
      getToken: "getToken",
      getTokenFromCookie: "getTokenFromCookie",
      getObj: "getObj",
      setPeriod: "setPeriod",
      updatePeriod: "updatePeriod",
      refreshFlows: "refreshFlows", 
      getUserId: "getUserId",
      refreshAssets: "refreshAssets",
      refreshLiabilities: "refreshLiabilities",
    }),
    setViewport: function() {             
            let viewportContent = "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"             
            document.querySelector("meta[name='viewport']").setAttribute("content", viewportContent) 
    },
    updateData() {
      this.updatePeriod();
      this.refreshFlows();
      if(this.$route.path == '/assets') {
        this.refreshAssets();
      }
      if(this.$route.path == '/liabilities') {
        this.refreshLiabilities();
      }
      if(this.$route.path == '/preferences') {
        this.refreshAssets();
        this.refreshLiabilities();
      }      
    },
  },
  mounted() {
    this.setPeriod();
    this.getTokenFromCookie()
    .then(() => {
      return this.getUserId();
    })
    .then(() => {
      return this.$router.push({ name: "outflow" });
    });
  },
  components: {
    CalendarForm,
    CashFlow,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 16px;
}

nav {
  padding: 20px;
}

nav a {
  font-weight: bold;
  color: #555555;
}

nav a.router-link-exact-active {
  color: #ffffff;
}

.header {
  display: inline-flex;
}
</style>
