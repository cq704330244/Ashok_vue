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
      icon: 'el-icon-star-off'
    },
    component: '',
    redirect: '',
    children: [
      {
        path: '/path2-1',
        name: '导航2-1',
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
      icon: 'el-icon-star-off'
    },
    component: '',
    redirect: '',
    children: [
      {
        path: '/path3-1',
        name: '导航3-1',
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
