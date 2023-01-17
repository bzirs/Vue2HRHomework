import { userLogin } from '@/api/user'

import { Message } from 'element-ui'

const getUserState = _ => ({
  userInfo: {},
  token: ''
})

const mutations = {
  // 更新token
  updateToken(state, payload) {
    console.log(payload)
  }
}

const actions = {

  async toUserLogin({ commit }, payload) {
    // 用户登录
    const { data, message } = await userLogin(payload)

    commit('updateToken', data)

    Message({
      showClose: true,
      message,
      type: 'success'
    })
  }
}

const state = getUserState()

const user = {
  namespaced: true,
  state,
  mutations,
  actions
}

export default user
