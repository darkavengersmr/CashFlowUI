import axios from "axios";

export default {
  registerNewUser(obj) {    
    return axios({
      method: 'post',
      url: '/register',
      headers: {
          "accept": "application/json"          
      },
     data: obj 
    })
  },
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
  readObject({token, user_id, url, params}) {
    return axios({
      method: 'get',
      url: '/users/' + user_id + url,
      headers: {
          "accept": "application/json",
          "Authorization": "Bearer " + token
      },
      params: params 
  })
  },
  createObject({token, user_id, url, obj}) {
    return axios({
      method: 'post',
      url: '/users/' + user_id + url,
      headers: {
          "accept": "application/json",
          "Authorization": "Bearer " + token
      },
     data: obj 
    })
  },
  deleteObject({token, user_id, url, params}) {
    return axios({
      method: 'delete',
      url: '/users/' + user_id + url,
      headers: {
          "accept": "application/json",
          "Authorization": "Bearer " + token
      },
      params: params 
    })
  },
  updateObject({token, user_id, url, obj}) {
    return axios({
      method: 'delete',
      url: '/users/' + user_id + url,
      headers: {
          "accept": "application/json",
          "Authorization": "Bearer " + token
      },
      data: obj
    })
  },
  downloadFile({token, user_id, url}) {
    return axios({
      method: 'get',
      url: '/users/' + user_id + url,
      responseType: "blob",
      headers: {
          "accept": "application/json",
          "Authorization": "Bearer " + token
      }
  })
  },
}