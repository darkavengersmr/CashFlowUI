<template>
  <div class="card">
    <h2 v-if="!authorized">Cashflow</h2>
    <div v-if="isDemo" class="demo">ДЕМО-РЕЖИМ. ИЗМЕНЕНИЯ НЕ СОХРАНЯЮТСЯ</div>
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
      <router-link v-if="authorized && isMobile" to="/reports">Отчеты</router-link
      ><span v-if="authorized && isMobile"> | </span>
      <router-link v-if="authorized" to="/preferences">Профиль</router-link>
    </nav>

    <div v-if="!isMobile && authorized" class="nomobile">
      <div class="nomobile_item">
      <router-view />
      </div>
      <div>
        <ReportsFormView/>
      </div>
    </div>

    <div v-if="isMobile || !authorized">
      <router-view />
    </div>

</div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import CalendarForm from "./components/CalendarForm.vue";
import CashFlow from "./components/CashFlow.vue";
import ReportsFormView from './views/ReportsFormView.vue'

export default {
  name: "App",
  created() {
    //Detect window resize
    window.addEventListener("resize", this.setViewport);
    this.setViewport();

    this.getTokenFromCookie()
      .then((token) => {                
        return this.getUserId(token);
      })
      .then(() => {      
        this.refreshFlows();
        this.refreshAssets();
        this.refreshLiabilities();
        this.refreshFlowsAll();
        this.refreshCategories();
        if (this.user.username == 'demo') {
          this.setIsDemo(true);
        }
      })      
       .then(() => {
         return this.$router.push({ name: "outflow" });
      });
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.setViewport);
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
      isMobile: "isMobile",
      isDemo: "isDemo",
    }),
  },
  methods: {
    ...mapMutations({
      setAuthorized: "setAuthorized",
      setUserid: "setUserid",
      setIsMobile: "setIsMobile",
      setIsDemo: "setIsDemo",
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
      refreshFlowsAll: "refreshFlowsAll",
      refreshCategories: "refreshCategories",
    }),
    setViewport: function () {
      let viewportContent =
        "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no";
      document
        .querySelector("meta[name='viewport']")
        .setAttribute("content", viewportContent);
    },
    updateData() {
      this.updatePeriod();
      this.refreshFlows();
      if (this.$route.path == "/assets") {
        this.refreshAssets();
      }
      if (this.$route.path == "/liabilities") {
        this.refreshLiabilities();
      }
      if (this.$route.path == "/preferences") {
        this.refreshAssets();
        this.refreshLiabilities();
      }
    },
    isMobileOrDesktop() {
      //this.setWindowinnerWidth(window.innerWidth);

      if (window.innerWidth <= 900) {
        this.setIsMobile(true);
      } else {
        if (
          /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(
            navigator.userAgent
          )
        ) {
          this.setIsMobile(true);
        } else {
          this.setIsMobile(false);
        }
      }
    },
  },
  mounted() {

    this.setPeriod();

    this.isMobileOrDesktop();

    window.onresize = () => {
      this.isMobileOrDesktop();
    };

    
  },
  components: {
    CalendarForm,
    CashFlow,
    ReportsFormView,
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

.nomobile {
  display: flex;
  flex-wrap: nowrap;
  margin: 0px 0px 0px 0px;
}

.nomobile_item {
  margin: 0px 40px 0px 0px;
}

.demo {
  width: 100%;
  background: #240000;
  margin: 0px 0px 10px 0px;
}

</style>
