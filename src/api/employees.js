import request from '@/utils/request'

/**
 * @description 获取员工列表
 * @param {*} params
 * @returns
 */
export const getEmpList = params => request.get('/sys/user', { params })

/**
 * @description 删除员工
 * @param {*} id
 * @returns
 */
export const EmpDel = id => request.delete(`/sys/user/${id}`)
