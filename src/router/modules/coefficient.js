
 /**
 *系数列表
 */
 import Layout from "@views/layout";

 const coefficientRouter = {
     path: '/coefficient',
     name: 'COEFFICIENT',
     component: Layout,
     redirect: {
         name: 'COEFFICIENT_INDEX'
     },
     meta: {
         title: '系数列表',
         sort: 0
     },
     children: [
         {
             path: 'index',
             name: 'COEFFICIENT',
             component: () => import("@views/coefficient/index.vue"),
             meta: {
                 title: '系数列表',
                 sort: 1
             },
             redirect: {
                 name: 'COEFFICIENT'
             },
             children: [
                 {
                     path: 'list',
                     name: 'COEFFICIENT',
                     meta: {
                         title: '系数列表',
                         parentPath: '/coefficient/index/list',
                         operate: true,
                     },
                     component: () => import("@views/coefficient/index.vue")
                 },
             ]
         },
         
     ]
 }
 
 export default coefficientRouter;