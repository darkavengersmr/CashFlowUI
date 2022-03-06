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
      inflow: undefined,
      inflowRegular: undefined,
      outflow: undefined,
      outflowRegular: undefined,
    };
  },
  mutations: mutations,
  actions: actions,

  getters: {},
})
