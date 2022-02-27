import { createStore } from 'vuex'

import mutations from "./mutations";
import actions from "./actions";

export default createStore({
  state() {
    return {
      authorized: true,
      auth: {
        username: "",
        password: "",
        token: "",
      },
      user: {},
      inflow: {},
      inflowRegular: {},
      outflow: {},
      outflowRegular: {},
    };
  },
  mutations: mutations,
  actions: actions,

  getters: {},
})
