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
      userid: 0,
    };
  },
  mutations: mutations,
  actions: actions,

  getters: {},
})
