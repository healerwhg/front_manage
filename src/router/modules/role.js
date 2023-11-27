/**
 * 前台角色
 */
 import Layout from "@views/layout";

 const roleRouter = {
     path: "/role",
     name: "ROLE",
     component: Layout,
     redirect: { name: "ROLE_INDEX" },
     meta: {
         title: "后台管理中心",
         sort: 0,
     },
     children: [{
         path: 'index',
         name: 'ROLE_INDEX',
         meta: {
             title: '后台权限资源管理',
             sort: 2
         },
         component: () => import("@views/role/index.vue"),
         redirect: {
             name: "ROLE_LIST",
         },
         children: [
             {
                 path: 'list',
                 name: 'ROLE_LIST',
                 meta: {
                     title: '列表',
                     sort: 2
                 },
                 component: () => import("@views/role/child/list.vue")
             },
             {
                 path: 'add/:pid',
                 name: 'ROLE_ADD',
                 meta: {
                     title: '新增',
                     operate: true,
                     parentPath: "/role/index/list",
                 },
                 component: () => import("@views/role/child/form.vue")
             },
             {
                 path: "edit/:id",
                 name: 'ROLE_EDIT',
                 meta: {
                     title: '修改',
                     operate: true,
                     parentPath: "/role/index/list"
                 },
                 component: () => import("@views/role/child/form.vue")
             }
         ]
     }]
 }
 
 
 export default roleRouter;