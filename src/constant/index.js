import employees from './employees'

/**
 * @description 键值对形式聘用形式
 * @param {*} _
 * @returns Object
 */
// eslint-disable-next-line no-sequences
const hireType = _ => employees.hireType.reduce((a, b) => ((a[b['id']] = b['value']), a), {})

// 聘用形式
export const hireTypeList = hireType()
