<template>
  <div class="ueditorbox">
    <script :id="idName" type="text/plain" style="width: 100%"></script>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

export default {
  /**
   * 组件
   */
  components: {},
  props: {
    idName: "", //接收参数
  },
  /**
   * 数字
   */
  data() {
    return {
      editoredit: undefined,
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
    /**
     * 设置Ueditor的内容
     */
    setUeditorContent: function (content) {
      if (this.editoredit)
        this.editoredit.ready(() => {
          if (this.editoredit === undefined) return false;
          else {
            this.editoredit.setContent(content||'');
          }
        });
    },
    getUeditorContent: function () {
      return this.editoredit === undefined ? "" : this.editoredit.getContent();
    },
  },
  /**
   * 完成挂载
   */
  mounted() {
    //渲染编辑器
    this.editoredit = UE.getEditor(this.idName, this.config);
    this.editoredit.addListener("ready", (_) => {
      this.$emit("ueditorInitCompleteEventHandler", this.editoredit);
    });
  },
  beforeDestroy() {
    setTimeout(() => {
      if (this.editoredit) this.editoredit.destroy();
    }, 1000);
  },
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
