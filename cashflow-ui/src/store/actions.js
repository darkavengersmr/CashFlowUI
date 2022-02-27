import VueCookies from "vue-cookies";

import api from "../api";

export default {
    async getToken(context, { username, password }) {
        api.readToken({username: username, password: password})
        .then(function (response) {
            if (response != undefined && response.status === 200) {
                context.commit("setAuthorized", true);
                context.commit("setUsername", username);
                context.commit("setPassword", password);
                if (response.data.access_token.length > 10) {
                    VueCookies.set("username", username, -1);
                    VueCookies.set("token", response.data.access_token, -1);
                }
            }
        })
            .catch(function (error) {
                console.log("Get token error: " + error);
            });
    },
    async getTokenFromCookie(context) {
        if (this.state.auth.token == "") {
            context.commit("setToken", await VueCookies.get("token"));
        }
    },
    getObj(context, { url, storepoint }) {        
        if (this.state.user.id != undefined) {
            api.readObject({token: this.state.auth.token, user_id: this.state.user.id, url: url})
            .then(response => {
                context.commit(storepoint, response.data);
            })
                .catch(error => {
                    if (error.response.status === 401) {
                        context.commit("setAuthorized", false);
                    }
                });
        }
        else {
            api.readUserId(this.state.auth.token).then((user) => {
                context.commit("setUser", user.data)
                return api.readObject({token: this.state.auth.token, user_id: user.data.id, url: url})                
            }).then(response => {
                context.commit(storepoint, response.data);
            })
                .catch(error => {
                    if (error.response.status === 401) {
                        context.commit("setAuthorized", false);
                    }
                });
        }
    },
}