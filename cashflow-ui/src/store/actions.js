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
                    //console.log("Token : " + response.data.access_token);
                }
            }
            return true;
        })
            .catch(function (error) {
                console.log("Get token error: " + error);
                return false;
            });
    },
    async getUserInfo(context) {
        let token = await VueCookies.get("token");

        if (token != null) {
            axios({
                method: 'get',
                url: '/user',
                headers: {
                    "accept": "application/json",
                    "Authorization": "Bearer " + token
                },
            }).then(function (response) {
                if (response != undefined && response.status === 200) {
                    context.commit("setUserid", response.data.id);
                }
                return true;
            })
                .catch(function (error) {
                    if (error.response.status === 401) {
                    context.commit("setAuthorized", false);
                    }
                    return false;
                });
        }
    },
}