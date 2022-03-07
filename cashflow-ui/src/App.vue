<template>  
  <div class="card">
  <h2 v-if="!authorized">Cashflow</h2>  
  <nav>    
    <router-link v-if="!authorized" to="/login">Войти</router-link><span v-if="!authorized"> | </span>
    <router-link v-if="!authorized" to="/register">Зарегистрироваться</router-link>
    <router-link v-if="authorized" to="/inflow">Доходы</router-link><span v-if="authorized"> | </span>
    <router-link v-if="authorized" to="/outflow">Расходы</router-link><span v-if="authorized"> | </span>
    <router-link v-if="authorized" to="/assets">Активы</router-link><span v-if="authorized"> | </span>
    <router-link v-if="authorized" to="/liabilities">Пассивы</router-link><span v-if="authorized"> | </span>
    <router-link v-if="authorized" to="/preferences">Настройки</router-link>
  </nav>
  <router-view/> 
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";

export default {
  name: "App",
  data() {
    return {};
  },
  computed: {
    ...mapState({
      authorized: "authorized",
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
    }),
  },
  mounted() {
    this.getTokenFromCookie().then(() => {
      return this.getObj({url: '/inflow/', storepoint: 'setInflow'}) 
    })
    .then(() => {
      return this.$router.push({ name: 'inflow' }) 
    });
    //this.getTokenFromCookie();
    //this.getObj({url: '/inflow/', storepoint: 'setInflow'});
  },
  components: {
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
  margin-top: 60px;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #555555;
}

nav a.router-link-exact-active {
  color: #ffffff;
}

</style>
