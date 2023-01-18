
import request from '@/utils/request'

/**
 * @description 获取角色信息
 * @param {*} params
 * @returns
 */
export const getRoles = params => request.get('/sys/role', { params })

/**
 * @description 删除角色
 * @param {*} id
 * @returns
 */
export const removeRole = id => request.delete(`/sys/role/${id}`)

/**
 * @description 新增角色
 * @param {*} obj
 * @returns
 */
export const addRole = obj => request.post('/sys/role', obj)
