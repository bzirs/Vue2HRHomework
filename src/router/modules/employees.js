
import Layout from '@/layout'

const employees = {
  path: '',
  component: Layout,
  children: [
    {
      path: '/employees',
      component: _ => import('@/views/employees'),
      name: 'employees',
      meta: { title: '员工管理', icon: 'employees' }
    }
  ]
}

export default employees
