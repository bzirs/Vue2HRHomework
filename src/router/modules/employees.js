
import Layout from '@/layout'

const employees = {
  path: '/employees',
  component: Layout,
  children: [
    {
      path: '',
      component: _ => import('@/views/employees'),
      name: 'employees',
      meta: { title: '员工管理', icon: 'employees' }
    }
  ]
}

export default employees
