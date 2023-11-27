

const state = {
    departmentListSearch: [], //部门列表（筛选用）
    departmentTreeList: [],
    menuListSearch: [], //菜单列表（筛选用）
    menuTreeList: [], //菜单列表
};

let hierarchy = 0;
let departmentList = [];
let menuList = [];

/**
 * 递归处理树状数据
 * @param {object} data 需要处理的树状数据
 * @param {string} type 类型.
 */
function mapData(data, type) {
    data.map(item => item.hierarchy = hierarchy)
    data.forEach((item) => {
        switch (type) {
            case 'department':
                departmentList.push(item);
                break;
            case 'menu':
                menuList.push(item);
                break;
            default:
                break;
        }
        if (item._child) {
            hierarchy = item.hierarchy + 1
            mapData(item._child, type);
        }
    });
}

const mutations = {
    setStateNewValue: (state, obj) => {
        state[obj.key] = obj.value;
    },
};

const actions = {
    /** 部门列表(下拉树状数据) */
    async getDepartmentList({
        commit
    }) {
        /** 请求接口数据 */
        let data = await getDepartmentList();
        hierarchy = 0;
        departmentList = [];
        mapData(data.data, 'department'); //处理数据
        // 数据去重
        const res = new Map();
        departmentList = departmentList.filter(item => !res.has(item.id) && res.set(item.id, 1));

        await commit("setStateNewValue", {
            key: "departmentTreeList",
            value: data.data,
        });
        await commit("setStateNewValue", {
            key: "departmentListSearch",
            value: departmentList,
        });
    },


    /** 菜单列表(下拉树状数据) */
    async getMenuList({
        commit
    }) {
        /** 请求接口数据 */
        let data = await roleList();
        menuList = [];
        mapData(data.data, 'menu');
        // 数据去重
        const res = new Map();
        menuList = menuList.filter(item => !res.has(item.id) && res.set(item.id, 1));

        await commit("setStateNewValue", {
            key: "menuTreeList",
            value: data.data,
        });

        await commit("setStateNewValue", {
            key: "menuListSearch",
            value: menuList,
        });
    },
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
};