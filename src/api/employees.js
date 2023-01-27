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

/**
 * @description 新增员工
 * @param {*} obj
 * @returns
 */
export const addEmp = obj => request.post('/sys/user', obj)

/**
 * @description 批量导入员工
 * @param {*} arr
 * @returns
 */
export const batchAddEmps = arr => request.post('/sys/user/batch', arr)
