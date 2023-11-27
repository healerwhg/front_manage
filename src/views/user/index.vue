<template>
  <div id="user" class="page-container">
    <!-- 需要缓存的页面 -->
    <keep-alive>
      <router-view :key="key" v-if="$route.meta.keepAlive" />
    </keep-alive>
    <!-- 不用缓存的页面 -->
    <router-view :key="key" v-if="!$route.meta.keepAlive" />
  </div>
</template>

<script>
export default {
  name: "user",
  computed: {
    key() {
      return this.$route.path;
    },
  },
};
</script>