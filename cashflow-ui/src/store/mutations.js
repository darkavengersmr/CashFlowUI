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
    setUserid(state, payload) {
        state.userid = payload;
    },
}