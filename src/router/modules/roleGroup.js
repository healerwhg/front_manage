/**
 * 前台角色
 */
 import Layout from "@views/layout";

 const roleGroupRouter = {
     path: "/roleGroup",
     name: "ROLE_GROUP",
     component: Layout,
     redirect: { name: "ROLE_GROUP_INDEX" },
     meta: {
         title: "后台管理中心",
         sort: 0,
     },
     children: [{
         path: 'index',
         name: 'ROLE_GROUP_INDEX',
         meta: {
             title: '后台角色管理',
             sort: 2
         },
         component: () => import("@views/roleGroup/index.vue"),
         redirect: {
             name: "ROLE_GROUP_LIST",
         },
         children: [
             {
                 path: 'list',
                 name: 'ROLE_GROUP_LIST',
                 meta: {
                     title: '列表',
                     sort: 2
                 },
                 component: () => import("@views/roleGroup/child/list.vue")
             },
             {
                 path: 'add/:pid',
                 name: 'ROLE_GROUP_ADD',
                 meta: {
                     title: '新增',
                     operate: true,
                     parentPath: "/roleGroup/index/list",
                 },
                 component: () => import("@views/roleGroup/child/form.vue")
             },
             {
                 path: "edit/:id",
                 name: 'ROLE_GROUP_EDIT',
                 meta: {
                     title: '修改',
                     operate: true,
                     parentPath: "/roleGroup/index/list"
                 },
                 component: () => import("@views/roleGroup/child/form.vue")
             }
         ]
     }]
 }
 
 
 export default roleGroupRouter;