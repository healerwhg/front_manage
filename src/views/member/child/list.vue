<style lang="scss" scoped>
@import "@assets/styles/variables.scss"; //公共样式变量
</style>

<template>
  <!-- 用户管理 -->
  <section class="page-child-contianer">
    <div class="table-box">
      <!-- 搜索表单 -->
      <el-form :inline="true" :model="searchForm" class="search-form">
        <el-form-item label="昵称：">
          <el-input v-model="searchForm.nickname" placeholder="昵称"></el-input>
        </el-form-item>
        <el-form-item label="账号：">
          <el-input v-model="searchForm.username" placeholder="账号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch" icon="el-icon-search">
            查询
          </el-button>
        </el-form-item>
      </el-form>
      <!-- 数据内容 -->
      <div class="table-container" id="tableContainer">
        <!-- 内页工具栏 -->
        <div class="tool-bar">
          <div class="tool-left">
            <el-button
              size="small"
              type="primary"
              icon="el-icon-plus"
              @click="$router.push({ name: 'MEMBER_ADD' })"
            >
              添加
            </el-button>
          </div>
          <div class="tool-right">
            <el-tooltip effect="dark" content="刷新">
              <el-button
                size="small"
                icon="el-icon-refresh-right"
                @click="handleRefresh"
              />
            </el-tooltip>
            <el-tooltip effect="dark" content="全屏">
              <el-button size="small" @click="handleFullScreen">
                <span class="iconfont">
                  {{ (isFull && "&#xe641;") || "&#xe8fa;" }}
                </span>
              </el-button>
            </el-tooltip>
          </div>
        </div>
        <div class="table-data" ref="tableContainer">
          <!-- 内页表格数据 -->
          <el-table
            ref="tableBox"
            border
            style="width: 100%"
            :max-height="tableHeight"
            :data="tableData"
          >
            <el-table-column prop="id" label="ID" width="80" align="center" />
            <el-table-column
              prop="nickname"
              label="账号昵称"
              align="center"
            />
            <el-table-column
              prop="username"
              label="账号"
              align="center"
            />
            <el-table-column
              label="操作"
              align="center"
              fixed="right"
            >
              <template slot-scope="scope">
                <el-button
                  class="color-primary"
                  type="text"
                  icon="el-icon-edit"
                  @click="changeData(scope.row)"
                >
                  编辑
                </el-button>
                <el-button
                  class="color-success"
                  type="text"
                  icon="el-icon-key"
                  @click="handleResetPwd(scope.row)"
                >
                  重置密码
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <!-- 分页控件 -->
        <div>
          <el-pagination
            background
            layout="total,sizes,prev, pager, next,jumper"
            :current-page="pagination.page"
            :page-size="pagination.size"
            :page-sizes="pagination.sizes"
            :total="pagination.total"
            @size-change="handleSize"
            @current-change="handleCurrent"
          >
          </el-pagination>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import {
  getMemberList,
  restPwd
} from "@api/member"; // 引用./src/api/member.js中的'getMemberList'方法
import { PAGE_SIZE, PAGE_SIZES } from "@config";
export default {
  name: "member",
  inject: ["reload"],
  data() {
    return {
      tableHeight: 0, //表格最大高度
      searchForm: {}, //搜索表单
      isFull: false, //全屏开启
      tableData: [], //表格数据
      smallRoleObj: {},
      statusValue: 1,
      pagination: {
        page: 1,
        total: 0,
        current: 1,
        size: PAGE_SIZE,
        sizes: PAGE_SIZES,
      }, //分页数据
    };
  },
  created() {
    if (sessionStorage.searchForm) {
      let searchForm = JSON.parse(sessionStorage.searchForm);
      this.searchForm = searchForm;
      sessionStorage.searchForm = "";
    }
    let page = sessionStorage.page - 0;
    if (page) {
      this.pagination.page = page;
      sessionStorage.page = "";
    }
    // 获取初始化数据
    let tempParams = {
      ...this.searchForm,
      page: this.pagination.page,
      size: this.pagination.size,
    };
    this.getData(tempParams);
    /**
     * 页面dom元素加载完后调用，计算表格最大高度
     */
    this.$nextTick(function () {
      this.initTableHeight();
    });
  },
  async mounted() {
    window.addEventListener("resize", () => {
      // 窗口尺寸改变时触发事件
      if (!this.$screenfull.isFullscreen) {
        this.isFull = false;
      }
      this.initTableHeight();
    });
    this.$forceUpdate();
  },
  methods: {
    changeData(row) {
      sessionStorage.page = this.pagination.page;
      sessionStorage.searchForm = JSON.stringify(this.searchForm);
      this.$router.push({
        name: "MEMBER_EDIT",
        params: { id: row.id },
      });
    },
    /** 获取表格数据 */
    async getData(tempParams) {
      tempParams = {
        page: this.pagination.page,
        size: this.pagination.size,
        ...this.searchForm,
      };
      /**
       * 请求接口数据
       */
      let res = await getMemberList(tempParams);
      this.tableData = res.data;
      this.pagination.total = res.total;
      this.$forceUpdate();
    },
    /** 分页参数-每页显示条数改变 */
    handleSize(val) {
      this.pagination = {
        ...this.pagination,
        size: val,
      };
      let tempParams = {
        page: this.pagination.page,
        size: this.pagination.size,
      };
      this.getData(tempParams);
    },
    /** 分页参数-当前页改变 */
    handleCurrent(val) {
      this.pagination = {
        ...this.pagination,
        page: val,
      };
      let tempParams = {
        page: this.pagination.page,
        size: this.pagination.size,
      };
      this.getData(tempParams);
    },
    /** 查询 */
    handleSearch() {
      this.pagination = {
        ...this.pagination,
        page: 1,
      };
      let tempParams = {
        ...this.searchForm,
        page: this.pagination.page,
        size: this.pagination.size,
      };
      this.getData(tempParams);
    },
    /** 刷新页面 */
    handleRefresh() {
      this.reload();
    },
    /** 初始化表格高度 */
    initTableHeight() {
      if (this.$refs["tableContainer"]) {
        this.tableHeight = this.$refs["tableContainer"].offsetHeight;
      }
    },
    /** 全屏 */
    handleFullScreen() {
      const element = document.getElementById("tableContainer");
      this.isFull = !this.isFull;
      if (this.isFull) {
        this.$screenfull.request(element);
      } else {
        this.$screenfull.exit(element);
      }
    },
    /** 重置用户密码 */
    handleResetPwd(row) {
      /** 弹窗再次确认操作 */
      this.$confirm("此操作将重置该用户密码, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        /** 确认触发 */
        .then(async () => {
          /**
           * 请求接口重置用户密码
           */
          let params = {
            username:row.username,
          };
          let res = await restPwd(params, "post");
          if (res.code == 200) {
            this.$message({
              type: "success",
              message: "用户密码已重置!",
            });
            this.getData();
          }
        })
        /** 取消触发 */
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消重置密码操作",
          });
        });
    },
  },
};
</script>
