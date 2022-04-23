import { createStore } from 'vuex'

import mutations from "./mutations";
import actions from "./actions";

export default createStore({
  state() {
    return {
      isMobile: true,
      authorized: true,
      loginOrRegistrationError: "",
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
      inflowAll: undefined,
      outflow: undefined,
      outflowRegular: undefined,
      outflowAll: undefined,
      assets: undefined,
      assetsAll: undefined,
      liabilities: undefined,
      liabilitiesAll: undefined,
      categories: undefined,
      mostPopular: undefined,
      selectedReport: 5,   
    };
  },
  mutations: mutations,
  actions: actions,

  getters: {},
})
