<style lang="scss" scoped>
@import "@assets/styles/variables.scss"; //公共样式变量
</style>

<style lang="scss">
@import "@assets/styles/variables.scss"; //公共样式变量

.page-container {
  width: 100%;
  height: calc(100% - 40px);
  background: $body-background;
  box-sizing: border-box;
  padding: 15px 15px 0;
  overflow-y: auto;
}

.page-child-contianer {
  height: 100%;
}

/*滚动条样式*/
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.15);
  &:hover {
    background: rgba(0, 0, 0, 0.1);
  }
}
::-webkit-scrollbar-track {
  border-radius: 10px;
  background: transparent;
}

.el-tabs__header {
  margin-bottom: 0;
}

.el-tabs--card > .el-tabs__header .el-tabs__item,
.el-tabs--card > .el-tabs__header .el-tabs__nav {
  border: none;
}
.el-tabs__item {
  padding: 0 15px !important;
  color: $color-text-secondary;
  &.is-closable,
  &.is-closable:hover {
    padding: 0 8px 0 15px !important;
  }
  &:hover {
    color: $color-text-primary;
    background: $tool-hover-bg;
  }
  &.is-active {
    color: $color-primary;
    background: $color-primary-1;
    position: relative;
    &::after {
      content: "";
      width: 100%;
      height: 2px;
      background: $color-primary;
      position: absolute;
      bottom: 0;
      left: 0;
    }
  }
}

.el-tabs--card > .el-tabs__header .el-tabs__item .el-icon-close {
  width: 14px;
  overflow: visible;
  &:hover {
    background-color: $color-danger;
  }
}

.el-table thead {
  color: $color-text-primary;
  font-weight: 500;
}
.el-table th {
  background-color: $background-color-base;
}
.el-table td,
.el-table th.is-leaf {
  border-bottom: 1px solid $border-color-lighter;
}
// .el-table::before {
//   height: 0;
// }

.el-timeline-item:last-child {
  padding-bottom: 0;
}
</style>

<template>
  <section class="app-main">
    <el-tabs
      type="card"
      v-model="activeTab"
      @tab-click="handleTarget"
      @contextmenu.native="mMouseClickEventHandler"
      @tab-remove="handleRemoveTab"
    >
      <template v-for="(item, index) in tabPane">
        <el-tab-pane
          :key="item.path"
          :label="item.title"
          :name="item.path"
          :closable="index != 0"
        >
          <span
            slot="label"
            @mouseenter="mouseEnterEventHandler(item.path, index)"
            >{{ item.title }}</span
          >
        </el-tab-pane>
      </template>
    </el-tabs>
    <!-- 需要缓存的页面 -->
    <!-- <keep-alive exclude="member,articleList,articleForm,memberForm">
      <router-view :key="key" />
    </keep-alive> -->
    <!-- 不用缓存的页面 -->
    <router-view :key="key" />
    <!-- <router-view :key="key" v-if="!$route.meta.keepAlive" /> -->
    <contextmousemenucom
      @menuClickEventHandler="menuClickEventHandler"
      ref="contextmousemenucom"
    ></contextmousemenucom>
  </section>
</template>

<script>
import contextmousemenucom from "@/components/contextmousemenucom";
export default {
  name: "AppMain",
  /**
   * 组件
   */
  components: { contextmousemenucom },
  computed: {
    key() {
      return this.$route.path;
    },
  },
  data() {
    return {
      activeTab: "/homepage",
      isTabTablesMouse: false,
      tabPane: [],
      contentMenuCurrentPath: undefined,
      contentMenuCurrentIndex: 0,
      contextMenuList: [
        {
          name: "关闭",
          key: "closecurrent",
        },
        {
          name: "关闭其他标签页",
          key: "closeother",
        },
        {
          name: "关闭右侧标签页",
          key: "closeright",
        },
        {
          name: "关闭左侧标签页",
          key: "closeleft",
        },
        {
          name: "关闭所有标签页",
          key: "closeall",
        },
      ],
      keepAliveList: ["member", "articleList"],
    };
  },
  watch: {
    /** 实时监听路由 */
    $route(val) {
      this.initTab(val);
    },
  },
  created() {
    this.initTab(this.$route);
    let T = this;
    window.oncontextmenu = function (e) {
      if (T.isTabTablesMouse) {
        e.preventDefault();
      }
    };
    window.onclick = function () {
      T.isTabTablesMouse = false;
      T.contentMenuCurrentPath = undefined;
      T.contentMenuCurrentIndex = 0;
      T.$refs.contextmousemenucom.hide();
    };
  },
  methods: {
    mouseEnterEventHandler: function (event, index) {
      this.contentMenuCurrentPath = event;
      this.contentMenuCurrentIndex = index;
      this.$forceUpdate();
    },
    /**
     * 右键菜单点击事件
     */
    menuClickEventHandler: function (event) {
      switch (event.type) {
        case "refresh":
          this.handleTarget();
          break;
        case "closecurrent":
          this.handleRemoveTab(this.contentMenuCurrentPath);
          break;
        case "closeother":
          this.tabPane = this.tabPane.filter(
            (a) =>
              a.path == this.contentMenuCurrentPath || a.path == "/homepage"
          );
          if (
            this.tabPane.filter((a) => a.path == this.activeTab).length == 0
          ) {
            this.activeTab = this.contentMenuCurrentPath;
            this.handleTarget();
          }
          break;
        case "closeright":
          this.tabPane = this.tabPane.filter(
            (a, index) => index <= this.contentMenuCurrentIndex
          );
          if (
            this.tabPane.filter((a) => a.path == this.activeTab).length == 0
          ) {
            this.activeTab = this.contentMenuCurrentPath;
            this.handleTarget();
          }
          break;
        case "closeleft":
          this.tabPane = this.tabPane.filter(
            (a, index) =>
              index >= this.contentMenuCurrentIndex || a.path == "/homepage"
          );
          if (
            this.tabPane.filter((a) => a.path == this.activeTab).length == 0
          ) {
            this.activeTab = this.contentMenuCurrentPath;
            this.handleTarget();
          }
          break;
        case "closeall":
          this.tabPane = this.tabPane.filter((a) => a.path == "/homepage");
          this.activeTab = "/homepage";
          this.handleTarget();
          break;
      }
      this.saveStorage();
    },
    mMouseClickEventHandler: function (event) {
      this.isTabTablesMouse = true;
      let mousePoint = { x: event.clientX, y: event.clientY };
      this.$refs.contextmousemenucom.show(mousePoint, this.contextMenuList);
    },
    /** 初始化窗口分页 */
    initTab(route) {
      let tabPane = sessionStorage.getItem("tabPane"); //缓存的窗口历史
      let isRepeat; //当前路由是否存在于窗口分页

      if (tabPane)
        this.tabPane = tabPane.split("&").map((item) => JSON.parse(item));

      //窗口分页列表数据大于0时，判断当前路由是否存在
      if (this.tabPane.length > 0) {
        isRepeat = this.tabPane.findIndex((item) => item.path == route.path);
      }
      //若暂无窗口分页或当前路由不存在于窗口,添加数据
      if ((isRepeat == -1 || this.tabPane.length == 0) && !route.meta.operate) {
        this.tabPane.push({
          title: route.meta.parent || route.meta.title,
          path: route.path,
        });
      }
      //高亮窗口赋值
      this.activeTab = route.meta.parentPath || route.path;
      //保存数据到本地缓存
      this.saveStorage();
    },
    /** 缓存数据..防止页面刷新数据丢失 */
    saveStorage() {
      let tabPane = this.tabPane.map((item) => JSON.stringify(item));
      sessionStorage.setItem("tabPane", tabPane.join("&"));
    },
    /** 窗口改变时..跳转对应页面 */
    handleTarget() {
      this.$router.replace(this.activeTab);
    },
    /** 删除窗口 */
    handleRemoveTab(targetName) {
      this.tabPane.forEach((item, index) => {
        // 遍历查询对应窗口并删除
        if (item.path == targetName) {
          this.$delete(this.tabPane, index);
          // 若删除窗口为当前页面..修改当前显示页面并跳转
          if (targetName == this.activeTab) {
            this.activeTab = this.tabPane[index - 1].path;
            this.handleTarget();
          }
        }
      });
      //更新数据缓存
      this.saveStorage();
    },
  },
};
</script>
