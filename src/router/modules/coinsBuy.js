
 /**
 *买币列表
 */
 import Layout from "@views/layout";

 const buyRouter = {
     path: '/coinsBuy',
     name: 'COINS_BUY',
     component: Layout,
     redirect: {
         name: 'COINS_BUY_INDEX'
     },
     meta: {
         title: '买币列表',
         sort: 0
     },
     children: [
         {
             path: 'index',
             name: 'COINS_BUY',
             component: () => import("@views/coinsBuy/index.vue"),
             meta: {
                 title: '买币列表',
                 sort: 1
             },
             redirect: {
                 name: 'COINS_BUY'
             },
             children: [
                 {
                     path: 'list',
                     name: 'COINS_BUY',
                     meta: {
                         title: '买币列表',
                         parentPath: '/coinsBuy/index/list',
                         operate: true,
                     },
                     component: () => import("@views/coinsBuy/index.vue")
                 },
             ]
         },
         
     ]
 }
 
 export default buyRouter;