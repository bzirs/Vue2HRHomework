import request from '@/utils/request'

/**
 *
 * @param {*} obj
 * @returns Promise
 */
export const userLogin = obj => request.post('/sys/login', obj)
