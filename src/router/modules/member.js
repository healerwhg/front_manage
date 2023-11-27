/**
 * 后台人员
 */
import Layout from "@views/layout";

const memberRouter={
    path:'/member',
    name:'MEMBER',
    component:Layout,
    redirect:{
        name:"MEMBER_INDEX"
    },
    meta:{
        title:'后台管理中心',
        sort:0
    },
    children:[
        {
            path:"index",
            name:"MEMBER_INDEX",
            meta:{
                title:'后台账号管理',
                sort:1
            },
            component:()=>import("@views/member/index.vue"),
            redirect:{
                name:"MEMBER_LIST"
            },
            children:[
                {
                    path:'list',
                    name:"MEMBER_LIST",
                    meta:{
                        title:'列表',
                        sort:2
                    },
                    component:()=>import("@views/member/child/list.vue")
                },
                {
                    path:'add',
                    name:"MEMBER_ADD",
                    meta:{
                        title:'新增',
                        sort:3
                    },
                    component:()=>import("@views/member/child/form.vue")
                },
                {
                    path:'edit/:id',
                    name:'MEMBER_EDIT',
                    meta:{
                        title:'修改',
                        sort:4
                    },
                    component:()=>import("@views/member/child/form.vue")
                }
            ]
        }
    ]

}

export default memberRouter;