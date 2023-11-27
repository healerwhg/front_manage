
 /**
 *升级管理
 */
import Layout from "@views/layout";

const LevelRouter = {
    path: '/level',
    name: 'LEVEL',
    component: Layout,
    redirect: {
        name: 'LEVEL_INDEX'
    },
    meta: {
        title: '升级管理',
        sort: 0
    },
    children: [
        {
            path: 'index',
            name: 'LEVEL_INDEX',
            component: () => import("@views/upgrade/index.vue"),
            meta: {
                title: '升级管理',
                sort: 1
            },
            redirect: {
                name: 'UPGRADE'
            },
            children: [
                {
                    path: 'upgrade',
                    name: 'UPGRADE',
                    meta: {
                        title: '升级见点',
                        parentPath: '/level/index',
                        operate: true,
                    },
                    component: () => import("@views/upgrade/index.vue")
                },
            ]
        },
        {
            path: 'index',
            name: 'LEVEL_INDEX1',
            component: () => import("@views/upgrade/upgradeList.vue"),
            meta: {
                title: '升级列表',
                sort: 1
            },
            redirect: {
                name: 'UPGRADE_LIST'
            },
            children: [
                {
                    path: 'upgrade_list',
                    name: 'UPGRADE_LIST',
                    meta: {
                        title: '升级列表',
                        parentPath: '/level/index/upgrade_list',
                        sort: 2
                    },
                    component: () => import("@views/upgrade/upgradeList.vue")
                },
            ]
        },
    ]
}

export default LevelRouter;