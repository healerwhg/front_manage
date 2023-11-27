/**
 *用户管理
 */
import Layout from "@views/layout";

const userRouter = {
    path: '/user',
    name: 'USER',
    component: Layout,
    redirect: {
        name: 'USER_INDEX'
    },
    meta: {
        title: '用户管理',
        sort: 0
    },
    children: [
        {
            path: 'index',
            name: 'USER_INDEX',
            component: () => import("@views/memberManagement/index.vue"),
            meta: {
                title: '会员等级',
                sort: 1
            },
            redirect: {
                name: 'MEMBER'
            },
            children: [
                {
                    path: 'member_list',
                    name: 'MEMBER',
                    meta: {
                        title: '会员等级',
                        parentPath: '/user/index/member_list',
                        operate: true,
                    },
                    component: () => import("@views/memberManagement/index.vue")
                },
            ]
        },
        {
            path: 'index',
            name: 'USER_INDEX1',
            component: () => import("@views/user/child/list.vue"),
            meta: {
                title: '用户列表',
                sort: 1
            },
            redirect: {
                name: 'USER_LIST'
            },
            children: [
                {
                    path: 'list',
                    name: 'USER_LIST',
                    meta: {
                        title: '用户列表',
                        parentPath: '/user/index/list',
                        sort: 2
                    },
                    component: () => import("@views/user/child/list.vue")
                },
            ]
        },
        {
            path: 'index',
            name: 'USER_INDEX2',
            component: () => import("@views/user/index.vue"),
            meta: {
                title: 'USDT列表',
                sort: 1
            },
            redirect: {
                name: 'USER_LIST2'
            },
            children: [
                {
                    path: 'USDTList',
                    name: 'USER_LIST2',
                    meta: {
                        title: 'USDT列表',
                        parentPath: '/user/index/USDTList',
                    },
                    component: () => import("@views/user/child/USDTList.vue")
                }
            ]
        },
        {
            path: 'index',
            name: 'USER_INDEX3',
            component: () => import("@views/user/index.vue"),
            meta: {
                title: 'EEOQ列表',
                sort: 1
            },
            redirect: {
                name: 'USER_LIST3'
            },
            children: [
                {
                    path: 'EEOQList',
                    name: 'USER_LIST3',
                    meta: {
                        title: 'EEOQ列表',
                        parentPath: '/user/index/EEOQList',
                    },
                    component: () => import("@views/user/child/EEOQList.vue")
                }
            ]
        },
        {
            path: 'index',
            name: 'USER_INDEX4',
            component: () => import("@views/user/index.vue"),
            meta: {
                title: '等级算力列表',
                sort: 1
            },
            redirect: {
                name: 'USER_LIST4'
            },
            children: [
                {
                    path: 'Level_power_List',
                    name: 'USER_LIST4',
                    meta: {
                        title: '等级算力列表',
                        parentPath: '/user/index/Level_power_List',
                    },
                    component: () => import("@views/user/child/levelList.vue")
                }
            ]
        },
        {
            path: 'index',
            name: 'USER_INDEX5',
            component: () => import("@views/user/index.vue"),
            meta: {
                title: '云算力列表',
                sort: 1
            },
            redirect: {
                name: 'USER_LIST5'
            },
            children: [
                {
                    path: 'Cloud_power_List',
                    name: 'USER_LIST5',
                    meta: {
                        title: '云算力列表',
                        parentPath: '/user/index/Cloud_power_List',
                    },
                    component: () => import("@views/user/child/cloudList.vue")
                }
            ]
        }
    ]
}

export default userRouter;