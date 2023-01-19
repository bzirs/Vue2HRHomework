import Layout from '@/layout'

const settings = {

  path: '/settings',
  component: Layout,
  children: [
    {
      path: '',
      component: _ => import('@/views/settings'),
      name: 'settings',
      meta: { title: '角色管理', icon: 'settings' }
    }
  ]
}

export default settings
