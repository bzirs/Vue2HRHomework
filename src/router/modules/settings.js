import Layout from '@/layout'

const settings = {

  path: '',
  component: Layout,
  children: [
    {
      path: '/settings',
      component: _ => import('@/views/settings'),
      name: 'settings',
      meta: { title: '员工管理', icon: 'dashboard' }
    }
  ]
}

export default settings
