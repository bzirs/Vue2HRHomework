import Layout from '@/layout'

const settings = {

  path: '',
  component: Layout,
  children: [
    {
      path: '/settings',
      component: _ => import('@/views/settings'),
      name: 'settings',
      meta: { title: '角色管理', icon: 'settings' }
    }
  ]
}

export default settings
