export default {
    setAuthorized(state, payload) {
        state.authorized = payload;
    },      
    setUsername(state, payload) {
        state.auth.username = payload;
    },
    setPassword(state, payload) {
        state.auth.password = payload;
    },
    setToken(state, payload) {
        state.auth.token = payload;
    },
    setUser(state, payload) {
        state.user = payload;
    },
    setInflow(state, payload) {
        state.inflow = payload;
    },
    setInflowRegular(state, payload) {
        state.inflowRegular = payload;
    },
    setOutflow(state, payload) {
        state.outflow = payload;
    },
    setOutflowRegular(state, payload) {
        state.outflowRegular = payload;
    },
}