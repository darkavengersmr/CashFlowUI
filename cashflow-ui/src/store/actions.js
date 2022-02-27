import axios from "axios";
import VueCookies from "vue-cookies";

export default {
    async getToken(context, { username, password }) {
        axios({
            method: 'post',
            url: '/token',
            headers: {
                "accept": "application/json",
                "Content-Type": "application/x-www-form-urlencoded"
            },
            data: 'username=' + username + '&password=' + password,
        }).then(function (response) {
            if (response != undefined && response.status === 200) {
                context.commit("setAuthorized", true);
                context.commit("setUsername", username);
                context.commit("setPassword", password);
                if (response.data.access_token.length > 10) {
                    VueCookies.set("username", username, -1);
                    VueCookies.set("token", response.data.access_token, -1);
                }
            }
            return true;
        })
            .catch(function (error) {
                console.log("Get token error: " + error);
                return false;
            });
    },
    getTokenFromCookie(context) {
        if (this.state.auth.token == "") {
            context.commit("setToken", VueCookies.get("token"));
        }
    },
    getObj(context, { url, storepoint }) {
        if (this.state.user.id != undefined) {
            axios({
                method: 'get',
                url: '/users/' + this.state.user.id + url,
                headers: {
                    "accept": "application/json",
                    "Authorization": "Bearer " + this.state.auth.token
                },
            }).then(response => {
                context.commit(storepoint, response.data);
                return true;
            })
                .catch(error => {
                    if (error.response.status === 401) {
                        context.commit("setAuthorized", false);
                    }
                    return false;
                });
        }
        else {
            axios({
                method: 'get',
                url: '/user',
                headers: {
                    "accept": "application/json",
                    "Authorization": "Bearer " + this.state.auth.token
                },
            }).then((user) => {
                context.commit("setUser", user.data)
                return axios({
                    method: 'get',
                    url: '/users/' + user.data.id + url,
                    headers: {
                        "accept": "application/json",
                        "Authorization": "Bearer " + this.state.auth.token
                    },
                })
            }).then(response => {
                context.commit(storepoint, response.data);
                return true;
            })
                .catch(error => {
                    if (error.response.status === 401) {
                        context.commit("setAuthorized", false);
                    }
                    return false;
                });
        }
    },
}