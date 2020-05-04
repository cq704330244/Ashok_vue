const routerPath = [
  {
    path: '/path1',
    name: '导航一',
    meta: {
      title: '导航一',
      icon: 'el-icon-star-off'
    },
    component: '',
    redirect: ''
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
        path: '/home/deskTop',
        name: 'deskTop',
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