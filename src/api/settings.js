
import request from '@/utils/request'

/**
 * @description 获取角色信息
 * @param {*} params
 * @returns
 */
export const getRoles = params => request.get('/sys/role', { params })
