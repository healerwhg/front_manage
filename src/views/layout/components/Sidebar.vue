<style lang="scss" scoped>
@import "@assets/styles/variables.scss"; //公共样式变量

.side-bar {
  position: relative;
  background: $menuBg;
  .logo {
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    color: $menuTextColor;
    cursor: pointer;
    img {
      width: 30px;
      height: 30px;
    }
    span {
      margin-left: 10px;
    }
  }
  .side-menu {
    height: calc(100% - 60px);
    overflow-y: auto;
    border: none;
  }
  .side-menu:not(.el-menu--collapse) {
    width: 256px;
  }
}
</style>
<style lang="scss">
@import "@assets/styles/variables.scss"; //公共样式变量

.el-menu-item.is-active {
  background-color: $color-primary !important;
}
</style>

<template>
  <section class="side-bar">
    <h1 class="logo" @click="targetIndex">
      <!-- <img :src="logoImg" alt="" /> -->
      <span v-show="!isCollapse">EEOQ管理系统</span>
    </h1>
    <el-menu
      class="side-menu"
      unique-opened
      router
      background-color="#191a23"
      text-color="#fff"
      active-text-color="#fff"
      :default-active="active"
      :collapse="isCollapse"
    >
      <el-menu-item index="/homepage">
        <i class="el-icon-s-home"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-s-custom"></i>
          <span slot="title">用户管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/user/index/member_list">会员等级</el-menu-item>
          <el-menu-item index="/user/index/list">用户列表</el-menu-item>
          <el-menu-item index="/user/index/USDTList">USDT列表</el-menu-item>
          <el-menu-item index="/user/index/EEOQList">EEOQ列表</el-menu-item>
          <el-menu-item index="/user/index/Level_power_List"
            >级别算力列表</el-menu-item
          >
          <el-menu-item index="/user/index/Cloud_power_List"
            >云算力列表</el-menu-item
          >
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="106">
        <template slot="title">
          <i class="el-icon-upload"></i>
          <span slot="title">升级管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index='/level/index'>升级见点</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group>
          <el-menu-item index='/level/index/upgrade_list'>升级列表</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="88">
        <template slot="title">
          <i class="el-icon-s-shop"></i>
          <span slot="title">买卖币管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index='/coinsBuy/index/list'
            >买币列表</el-menu-item
          >

          <el-menu-item index='/coinsSell/index/list'
            >卖币列表</el-menu-item
          >
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="92">
        <template slot="title">
          <i class="el-icon-s-open"></i>
          <span slot="title">挖矿系数数据</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/coefficient/index/list">挖矿系数列表</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="8">
        <template slot="title">
          <i class="el-icon-s-tools"></i>
          <span slot="title">后台管理中心</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/roleGroup/index/list">权限管理</el-menu-item>
          <el-menu-item index="/role/index/list">角色管理</el-menu-item>
          <el-menu-item index="/member/index/list">账号管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </section>
</template>

<script>
export default {
  name: "Sidebar",
  props: ["isCollapse"],
  data() {
    return {
      active: "/homepage",
      logoImg: require("@/assets/logo.png"),
      currentMenuList: [],
    };
  },
  watch: {
    async $route(val) {
      this.active = val.meta.parentPath || val.path;
      // memberSmallRoleByPid({ pid: 2 });
      // console.log("sdfds", this.validateMenuVisible(2));
      // console.log("router", val);
    },
  },
  async created() {
    // await this.getMemberMenuList();
    this.currentMenuList = this.menuList;
    // setTimeout((_) => {
    //   this.validateSmallRole();
    // }, 500);
    this.active = this.$route.meta.parentPath || this.$route.path;
  },
  methods: {
    validateMenuVisible: function (id) {
      let isVisible = false;
      let findId = function (list, cid) {
        if (list)
          list.forEach((item) => {
            if (item.id == cid) {
              isVisible = true;
            } else findId(item._child, cid);
          });
      };
      findId(this.currentMenuList, id);
      return isVisible;
    },
    targetIndex() {
      if (this.$route.path != "/homepage") {
        this.$router.replace("/homepage");
      }
    },
  },
};
</script>
