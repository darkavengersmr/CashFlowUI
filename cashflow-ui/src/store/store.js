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
      calendar: {
        month: 3,
        year: 2022,
        dateIn: undefined,
        dateOut: undefined,
        dateAdd: undefined,
      },
      user: {},
      cashflow: 0,
      inflow: undefined,
      inflowRegular: undefined,
      outflow: undefined,
      outflowRegular: undefined,
      assets: undefined,
      liabilities: undefined,
    };
  },
  mutations: mutations,
  actions: actions,

  getters: {},
})
