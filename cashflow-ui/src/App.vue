<template>
  <div class="card">
  <h3>{{inflowRegular}}</h3>
  <button @click="test">test</button>
  </div>
  <div class="card" v-if="!authorized">
  <br />
  <h2>Cashflow</h2>  
  <nav>    
    <router-link to="/">Войти</router-link> |
    <router-link to="/register">Зарегистрироваться</router-link>
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
    test(){
      this.getObj({url: '/inflow_regular/', storepoint: "setInflowRegular"});
    }
  },
  mounted() {
    this.getTokenFromCookie();
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
