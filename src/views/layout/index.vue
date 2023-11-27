<style lang="scss">
@import "@assets/styles/variables.scss"; //公共样式变量

.vue-body {
  width: 100%;
  height: 100%;
  overflow: hidden;
  .el-aside {
    width: auto !important;
    .side-bar {
      height: 100%;
      flex-shrink: 0;
    }
  }
  .body-container {
    height: 100%;
    .el-header {
      padding: 0;
    }
    .el-main {
      width: 100%;
      padding: 0;
      height: calc(100% - 132px);
      .app-main {
        width: 100%;
        height: 100%;
      }
    }
    .el-footer {
      height: 72px;
      line-height: 72px;
      font-size: 14px;
      color: $color-text-secondary;
      text-align: center;
      background: $body-background;
    }
  }
}
</style>

<template>
  <el-container class="vue-body">
    <el-aside>
      <sidebar :isCollapse="isCollapse" />
    </el-aside>
    <el-container class="body-container">
      <el-header>
        <navbar
          @handleChangeCollapse="changeCollapse"
          :isCollapse="isCollapse"
        />
      </el-header>
      <el-main>
        <app-main />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Navbar from "./components/Navbar";
import AppMain from "./components/AppMain";
import Sidebar from "./components/Sidebar";

export default {
  name: "Layout",
  components: {
    Navbar,
    AppMain,
    Sidebar,
  },
  data() {
    return {
      isCollapse: false,
    };
  },
  computed: {},
  updated() {},
  methods: {
    changeCollapse() {
      this.isCollapse = !this.isCollapse;
    },
  },
};
</script>
