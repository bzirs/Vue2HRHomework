
import Layout from '@/layout'

const permissions = {
  path: '/permissions',
  component: Layout,
  children: [
    {
      path: '',
      component: _ => import('@/views/permissions'),
      name: 'permissions',
      meta: { title: '权限管理', icon: 'permissions' }
    }
  ]
}

export default permissions
