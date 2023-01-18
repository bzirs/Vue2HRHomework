
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

/**
 * @description 获取角色详情
 * @param {*} id
 * @returns
 */
export const getRoleInfo = id => request.get(`/sys/role/${id}`)

/**
 * @description 修改角色详情
 * @param {*} obj
 * @returns
 */
export const editRoleInfo = obj => request.put(`/sys/role/${obj.id}`, obj)
