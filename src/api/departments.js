
import request from '@/utils/request'

/**
 * @description 获取部门列表
 * @param {*} _
 * @returns
 */
export const getDepartmentsList = _ => request.get('/company/department')
