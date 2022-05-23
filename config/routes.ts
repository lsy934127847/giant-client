export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './user/Login',
      },
      {
        name: 'register',
        path: '/user/register',
        component: './user/Register',
      },
    ],
  },

  {
    path: '/welcome',
    name: 'welcome',
    icon: 'smile',
    component: './Welcome',
  },
  {
    path: '/admin',
    name: 'admin',
    icon: 'crown',
    access: 'canAdmin',
    component: './Admin',
    routes: [
      {
        path: '/admin/sub-page',
        name: 'sub-page',
        icon: 'smile',
        component: './Welcome',
      },
    ],
  },

  // 系统配置 用户管理 菜单管理 角色管理 权限管理
  {
    path: '/system',
    name: 'system',
    icon: 'SettingOutlined',
    // access: 'canAdmin',
    // component: './Admin',
    routes: [
      {
        path: '/system/user',
        name: 'user',
        icon: 'UsergroupAddOutlined',
        component: './system/user',
      },
      {
        path: '/system/menu',
        name: 'menu',
        icon: 'smile',
        component: './Welcome',
      },
      {
        path: '/system/role',
        name: 'role',
        icon: 'smile',
        component: './Welcome',
      },
      {
        path: '/system/authorize',
        name: 'authorize',
        icon: 'smile',
        component: './Welcome',
      },
    ],
  },

  // 聊天
  {
    path: '/chat',
    name: 'chat',
    icon: 'SettingOutlined',
    // access: 'canAdmin',
    // component: './Admin',
    routes: [
      {
        path: '/chat/text',
        name: 'text',
        icon: 'UsergroupAddOutlined',
        component: './chat/text',
      },
      {
        path: '/chat/video',
        name: 'video',
        icon: 'smile',
        component: './chat/video',
      },
    ],
  },
  {
    name: 'list.table-list',
    icon: 'table',
    path: '/list',
    component: './TableList',
  },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    component: './404',
  },
];
