
 /**
 *卖币列表
 */
 import Layout from "@views/layout";

 const sellRouter = {
     path: '/coinsSell',
     name: 'COINS_SELL',
     component: Layout,
     redirect: {
         name: 'COINS_SELL_INDEX'
     },
     meta: {
         title: '卖币列表',
         sort: 0
     },
     children: [
         {
             path: 'index',
             name: 'COINS_SELL',
             component: () => import("@views/coinsSell/index.vue"),
             meta: {
                 title: '卖币列表',
                 sort: 1
             },
             redirect: {
                 name: 'COINS_SELL'
             },
             children: [
                 {
                     path: 'list',
                     name: 'COINS_SELL',
                     meta: {
                         title: '卖币列表',
                         parentPath: '/coinsSell/index/list',
                         operate: true,
                     },
                     component: () => import("@views/coinsSell/index.vue")
                 },
             ]
         },
         
     ]
 }
 
 export default sellRouter;