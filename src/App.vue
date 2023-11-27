<template>
  <div id="app">
    <router-view v-if="isRouterAlive" />
  </div>
</template>

<script>
export default {
  name: "App",
  provide() {
    return {
      reload: this.reload,
    };
  },
  watch: {
    $route: {
      handler(val, oldval) {},
      // 深度观察监听
      deep: true,
    },
  },
  data() {
    return {
      isRouterAlive: true,
    };
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function () {
        this.isRouterAlive = true;
      });
    },
  },
  created() {
    //this.getMemberMenuList();
  },
};
</script>
<style>
#tableContainer{
  height: 740px;
}

</style>