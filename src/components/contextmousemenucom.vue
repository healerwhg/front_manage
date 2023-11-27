<style lang="scss" scoped>
@import "@assets/styles/variables.scss"; //公共样式变量
.mousemenu-box {
  position: absolute;
  border-radius: 5px;
  background-color: #ffffff;
  z-index: 100000;
  box-shadow: 0px 0px 10px #cccccc;
  ul {
    li {
      padding-top: 5px;
      padding: 10px 15px 10px 15px;
      border-bottom: 1px solid #ececec;
      font-size: 14px;
      color: #333333;
      cursor: pointer;
      &:last-child {
        border: none;
      }
      &:hover {
        background-color: #efefef;
      }
    }
  }
}
</style>
<template>
  <div
    :style="`top:${point.y}px;left:${point.x}px;`"
    class="mousemenu-box"
    v-if="showContextMenuVisible"
  >
    <ul>
      <li
        v-for="(item, index) in contextMenuList"
        :key="index"
        @click="menuClickEvent(item.key)"
      >
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  /**
   * 组件
   */
  components: {},
  props: {},
  /**
   * 数字
   */
  data() {
    return {
      editoredit: undefined,
      showContextMenuVisible: false,
      point: { x: 0, y: 0 },
      contextMenuList: [],
    };
  },
  /**
   * 监听Vue实例上的数据变动
   */
  watch: {},
  /**
   * 方法、函数
   */
  methods: {
    show: function (point, data) {
      this.point = point;
      this.contextMenuList = data;
      this.showContextMenuVisible = true;
    },
    hide: function () {
      this.showContextMenuVisible = false;
    },
    menuClickEvent: function (event) {
      this.$emit("menuClickEventHandler", {
        type: event,
      });
    },
  },
  /**
   * 完成挂载
   */
  mounted() {},
  /**
   * 更新完成状态
   */
  updated: function () {},
  /**
   * 完成了 data 数据的初始化
   */
  async created() {},
};
</script>
