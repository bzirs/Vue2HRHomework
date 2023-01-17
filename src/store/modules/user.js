import { userLogin } from '@/api/user'
import { setToken } from '@/utils/auth'


const getUserState = _ => ({
  userInfo: {},
  token: ''
})

const mutations = {
  // 更新token
  updateToken(state, payload) {
    state.token = payload

    // 持久化处理
    setToken(payload)
  }
}

const actions = {

  async toUserLogin({ commit }, payload) {
    // 用户登录
    const { data, message } = await userLogin(payload)

    commit('updateToken', data)
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
