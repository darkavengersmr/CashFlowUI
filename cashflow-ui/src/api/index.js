import axios from "axios";

export default {
  readToken({username, password}) {
    return axios({
      method: 'post',
      url: '/token',
      headers: {
          "accept": "application/json",
          "Content-Type": "application/x-www-form-urlencoded"
      },
      data: 'username=' + username + '&password=' + password,
  })
  },
  readUserId(token) {
    return axios({
      method: 'get',
      url: '/user',
      headers: {
          "accept": "application/json",
          "Authorization": "Bearer " + token
      },
    })
  },
  readObject({token, user_id, url}) {
    return axios({
      method: 'get',
      url: '/users/' + user_id + url,
      headers: {
          "accept": "application/json",
          "Authorization": "Bearer " + token
      },
  })
  }  
}