import request from '@/utils/request'

/**
 * @description 获取token
 * @param {*} obj
 * @returns Promise
 */
export const userLogin = obj => request.post('/sys/login', obj)

/**
 * @description 获取用户信息
 * @param {*} _
 * @returns Promise
 */
export const userInfo = _ => request.post('/sys/profile')
