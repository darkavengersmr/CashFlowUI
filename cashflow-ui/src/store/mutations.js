export default {
    setIsMobile(state, payload) {
        state.isMobile = payload;
    },
    setIsDemo(state, payload) {
        state.isDemo = payload;
    },
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
    setMonth(state, payload) {
        state.calendar.month = payload;
    },
    setYear(state, payload) {
        state.calendar.year = payload;
    },
    setDateIn(state, payload) {
        state.calendar.dateIn = payload;
    },
    setDateOut(state, payload) {
        state.calendar.dateOut = payload;
    },
    setDateAdd(state, payload) {
        state.calendar.dateAdd = payload;
    },
    setInflow(state, payload) {
        state.inflow = payload;
    },
    addToInflow(state, payload) {
        state.inflow.inflow.push(payload);
    },
    deleteFromInflow(state, payload) {
        var newInflow = state.inflow.inflow.filter(function (f) { return f.id !== payload })
        state.inflow.inflow = newInflow;
    },    
    setInflowAll(state, payload) {
        state.inflowAll = payload;
    },
    setInflowRegular(state, payload) {
        state.inflowRegular = payload;
    },
    addToInflowRegular(state, payload) {
        state.inflowRegular.inflow_regular.push(payload);
    },
    deleteFromInflowRegular(state, payload) {
        var newInflow = state.inflowRegular.inflow_regular.filter(function (f) { return f.id !== payload })
        state.inflowRegular.inflow_regular = newInflow;
    },
    setOutflow(state, payload) {
        state.outflow = payload;
    },
    addToOutflow(state, payload) {
        state.outflow.outflow.push(payload);
    },
    deleteFromOutflow(state, payload) {
        var newOutflow = state.outflow.outflow.filter(function (f) { return f.id !== payload })
        state.outflow.outflow = newOutflow;
    },
    setOutflowAll(state, payload) {
        state.outflowAll = payload;
    },
    setOutflowRegular(state, payload) {
        state.outflowRegular = payload;
    },
    addToOutflowRegular(state, payload) {
        state.outflowRegular.outflow_regular.push(payload);
    },
    deleteFromOutflowRegular(state, payload) {
        var newInflow = state.outflowRegular.outflow_regular.filter(function (f) { return f.id !== payload })
        state.outflowRegular.outflow_regular = newInflow;
    },
    setAssets(state, payload) {
        state.assets = payload;
    },
    addToAssets(state, payload) {
        state.assets.assets.push(payload);
    },
    deleteFromAssets(state, payload) {
        var newAssets = state.assets.assets.filter(function (f) { return f.id !== payload })
        state.assets.assets = newAssets;
    },
    setAssetsAll(state, payload) {
        state.assetsAll = payload;
    },
    setLiabilities(state, payload) {
        state.liabilities = payload;
    },
    addToLiabilities(state, payload) {
        state.liabilities.liabilities.push(payload);
    },
    deleteFromLiabilities(state, payload) {
        var newLiabilities = state.liabilities.liabilities.filter(function (f) { return f.id !== payload })
        state.liabilities.liabilities = newLiabilities;
    },
    setLiabilitiesAll(state, payload) {
        state.liabilitiesAll = payload;
    },
    setCategories(state, payload) {
        state.categories = payload;
    },
    addToCategories(state, payload) {
        state.categories.categories.push(payload);
    },
    deleteCategories(state, payload) {
        var newCategories = state.categories.categories.filter(function (f) { return f.id !== payload })
        state.categories.categories = newCategories;
    },
    setMostPopular(state, payload) {
        state.mostPopular = payload;
    },
    setLoginOrRegistrationError(state, payload) {
        state.loginOrRegistrationError = payload;
    },
    setSelectedReport(state, payload) {
        state.selectedReport = payload;
    },
}