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
    addToInflow(state, payload) {
        state.inflow.inflow.push(payload);     
    },
    deleteFromInflow(state, payload) {        
        var newInflow = state.inflow.inflow.filter(function(f) { return f.id !== payload })        
        state.inflow.inflow = newInflow;     
    },
    setInflowRegular(state, payload) {
        state.inflowRegular = payload;
    },
    addToInflowRegular(state, payload) {
        state.inflowRegular.inflow_regular.push(payload);     
    },
    deleteFromInflowRegular(state, payload) {        
        var newInflow = state.inflowRegular.inflow_regular.filter(function(f) { return f.id !== payload })        
        state.inflowRegular.inflow_regular = newInflow;     
    },
    setOutflow(state, payload) {
        state.outflow = payload;
    },
    addToOutflow(state, payload) {
        state.outflow.outflow.push(payload);  
    },
    deleteFromOutflow(state, payload) {        
        var newOutflow = state.outflow.outflow.filter(function(f) { return f.id !== payload })        
        state.outflow.outflow = newOutflow;
    },
    setOutflowRegular(state, payload) {
        state.outflowRegular = payload;
    },
    addToOutflowRegular(state, payload) {
        state.outflowRegular.outflow_regular.push(payload);     
    },
    deleteFromOutflowRegular(state, payload) {        
        var newInflow = state.outflowRegular.outflow_regular.filter(function(f) { return f.id !== payload })        
        state.outflowRegular.outflow_regular = newInflow;
    },
}