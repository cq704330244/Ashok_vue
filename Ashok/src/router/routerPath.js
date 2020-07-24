const routerPath = [
  {
    path: '/path4',
    name: '新手引导',
    meta: {
      title: '新手引导',
      icon: 'el-icon-s-promotion'
    },
    component: '',
    redirect: '',
    children: [
      {
        path: '/home/guide',
        name: '新手指导指南',
        component: '',
        redirect: '',
        children: []
      }
    ]
  },
  {
    path: '/path1',
    name: '导航一',
    meta: {
      title: '导航一',
      icon: 'el-icon-star-off'
    },
    component: '',
    redirect: '',
    children: [
      {
        path: '/home/deskTop',
        name: 'deskTop',
        component: '',
        redirect: '',
        children: []
      }
    ]
  },
  {
    path: '/path2',
    name: '导航二',
    meta: {
      title: '导航二',
      icon: 'el-icon-date'
    },
    component: '',
    redirect: '',
    children: [
      {
        path: '/home/upLoad',
        name: 'upLoad',
        component: '',
        redirect: '',
        children: []
      }
    ]
  },
  {
    path: '/path3',
    name: '导航三',
    meta: {
      title: '导航三',
      icon: 'el-icon-sunny'
    },
    component: '',
    redirect: '',
    children: [
      {
        path: '/home/product',
        name: 'product',
        component: '',
        redirect: '',
        children: [
          {
            path: '/path4',
            name: '导航3-1-1',
            component: '',
            redirect: '',
            children: []
          }
        ]
      }
    ]
  }
]

export default routerPath
