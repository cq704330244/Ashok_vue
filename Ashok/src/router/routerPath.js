const routerPath = [
  {
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
    name: '首页',
    meta: {
      title: '首页',
      icon: 'el-icon-star-off'
    },
    component: '',
    redirect: '',
    children: [
      {
        path: '/home/deskTop',
        name: '工作台',
        component: '',
        redirect: '',
        children: []
      }
    ]
  },
  {
    name: '工具',
    meta: {
      title: '工具',
      icon: 'el-icon-date'
    },
    component: '',
    redirect: '',
    children: [
      {
        path: '/home/upLoad',
        name: '上传',
        component: '',
        redirect: '',
        children: []
      }
    ]
  },
  {
    name: '产品中心',
    meta: {
      title: '产品中心',
      icon: 'el-icon-sunny'
    },
    component: '',
    redirect: '',
    children: [
      {
        path: '/home/product',
        name: '产品列表',
        component: '',
        redirect: '',
        children: [
          {
            path: '/home/tree',
            name: '人员选择',
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
