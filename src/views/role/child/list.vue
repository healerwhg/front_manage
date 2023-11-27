<style lang="scss" scoped>
@import "@assets/styles/variables.scss"; //公共样式变量
.auth_list {
  width: 200px;
  margin: auto;
  .title {
    padding: 10px;
    text-align: center;
  }
  .box {
    height: 400px;
    border-radius: 5px;
    padding: 5px;
    .item {
      margin-top: 20px;
    }
  }
}
</style>

<template>
  <!-- 角色管理 -->
  <section class="page-container">
    <div class="table-box">
      <!-- 搜索表单 -->
      <!-- <el-form :inline="true" :model="searchForm" class="search-form">
        <el-form-item label="角色名称：">
          <el-input v-model="searchForm.name" placeholder="角色名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch" icon="el-icon-search">
            查询
          </el-button>
        </el-form-item>
      </el-form> -->
      <!-- 数据内容 -->
      <div class="table-container" id="tableContainer">
        <!-- 内页工具栏 -->
        <div class="tool-bar">
          <div class="tool-left">
            <el-button
              size="small"
              type="primary"
              icon="el-icon-plus"
              @click="$router.push({ name: 'ROLE_GROUP_ADD' })"
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
              prop="name"
              label="角色名称"
              min-width="180"
              align="center"
            />
            <el-table-column
              prop="description"
              label="角色描述"
              min-width="180"
              align="center"
            />
            <el-table-column
              label="操作"
              min-width="320"
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
                  @click="handleAuth(scope.row)"
                >
                  权限分配
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <!-- 分页控件 -->
        <el-pagination
          background
          layout="total,sizes,prev, pager, next,jumper"
          :current-page="pagination.current"
          :page-size="pagination.size"
          :page-sizes="pagination.sizes"
          :total="pagination.total"
          @size-change="handleSize"
          @current-change="handleCurrent"
        >
        </el-pagination>
      </div>
    </div>
    <!-- 操作权限分配弹窗start -->
    <el-dialog
      title="分配权限"
      :visible.sync="buttonDialogVisible"
      @close="handleCancle"
      width="300px"
    >
      <div style="display: flex; justify-content: space-between">
        <div class="auth_list">
          <div class="box">
            <el-checkbox-group v-model="check_id" @change="changeCheck">
              <el-checkbox
                v-for="item in auth_list"
                :label="item.id"
                :key="item.id"
                >{{ item.name }}</el-checkbox
              >
            </el-checkbox-group>
          </div>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleCancle">关 闭</el-button>
        <!-- <el-button type="primary" @click="handleSubmit"> 保 存 </el-button> -->
      </div>
    </el-dialog>
    <!-- 操作权限分配弹窗end -->
  </section>
</template>

<script>
import {
  roleList,
  roleGroupSelect,
  roleAuthList,
  roleAuthAdd,
  roleAuthReomve,
} from "@api/role";
import { PAGE_SIZE, PAGE_SIZES } from "@config";
export default {
  name: "role",
  inject: ["reload"],
  data() {
    return {
      tableHeight: 0, //表格最大高度
      searchForm: {}, //搜索表单
      isFull: false, //全屏开启
      change_before_list: [],
      auth_list: [],
      change_list: [],
      check_id: [],
      buttonDialogVisible: false,
      tableData: [],
      check_data: {},
      pagination: {
        page: 1,
        total: 100,
        current: 1,
        size: PAGE_SIZE,
        sizes: PAGE_SIZES,
      }, //分页数据
    };
  },
  async created() {
    if (sessionStorage.searchForm) {
      let searchForm = JSON.parse(sessionStorage.searchForm);
      this.searchForm = searchForm;
      sessionStorage.searchForm = "";
    }
    // 获取初始化数据
    let tempParams = {
      ...this.searchForm,
      page: this.pagination.page,
      size: this.pagination.size,
    };
    this.getData(tempParams);
    this.getAuthList();
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
    changeCheck(arr) {
      // 删除的数据
      const deletedItems = this.change_before_list.filter(
        (item) => !arr.includes(item)
      );
      // 新增的数据
      const addedItems = arr.filter(
        (item) => !this.change_before_list.includes(item)
      );
      if (addedItems.length > 0) {
        this.handleAdd(addedItems[0]);
      }
      if (deletedItems.length > 0) {
        this.handleRemove(deletedItems[0]);
      }
    },
    // 删除权限
    async handleRemove(id) {
      const res = await roleAuthReomve({
        role_id: this.check_data.id,
        permission_id: id,
      });
      if (res.code!=200) return;
      this.$message({
        message: "移除成功",
        type: "success",
      });
    },
    // 新增权限
    async handleAdd(id) {
      const res = await roleAuthAdd({
        role_id: this.check_data.id,
        permission_id: id,
      });
      if (res.code!=200) return;
      this.$message({
        message: "新增成功",
        type: "success",
      });
    },
    //关闭权限分配弹窗
    handleCancle() {
      this.buttonDialogVisible = false;
      this.check_id = [];
    },
    //分配权限
    handleAuth(row) {
      this.check_data = row;
      this.buttonDialogVisible = true;
      this.getRoleAuthList({ id: row.id });
    },
    // 获取权限列表
    async getAuthList() {
      let res = await roleGroupSelect();
      this.auth_list = res.data;
    },
    // 编辑数据
    changeData(row) {
      sessionStorage.searchForm = JSON.stringify(this.searchForm);
      this.$router.push({
        name: "ROLE_GROUP_EDIT",
        params: row,
      });
    },
    /** 获取角色权限列表 */
    async getRoleAuthList(tempParams) {
      let res = await roleAuthList(tempParams);
      let arr = [];
      res.data.permissions?.map((item) => arr.push(item.id));
      this.check_id = [...arr];
      this.change_before_list = [...arr];
      this.$forceUpdate();
    },
    /** 获取表格数据 */
    async getData(tempParams) {
      let res = await roleList(tempParams);
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
        ...this.searchForm,
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
        ...this.searchForm,
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
  },
};
</script>
