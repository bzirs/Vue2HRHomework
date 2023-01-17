import { userInfo, userLogin } from '@/api/user'
import { getToken, setToken } from '@/utils/auth'

const getUserState = _ => ({
  userInfo: {},
  token: getToken()
})

const mutations = {
  // 更新token
  updateToken(state, payload) {
    state.token = payload

    // 持久化处理
    setToken(payload)
  },
  // 更新用户信息
  updateUserInfo(state, payload) {
    state.userInfo = payload
  }
}

const actions = {

  // 用户登录
  async toUserLogin({ commit }, payload) {
    const { data } = await userLogin(payload)

    commit('updateToken', data)
  },
  // 获取用户信息
  async getUserInfo({ commit }, payload) {
    const { data } = await userInfo()

    commit('updateUserInfo', data)
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
