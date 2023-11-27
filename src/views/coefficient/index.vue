<style lang="scss" scoped>
@import "@assets/styles/variables.scss"; //公共样式变量
</style>

<template>
  <!-- 用户管理 -->
  <section class="page-child-contianer">
    <div class="table-box">
      <!-- 数据内容 -->
      <div class="table-container" id="tableContainer">
        <div class="table-data" ref="tableContainer">
          <!-- 内页表格数据 -->
          <el-table
            ref="tableBox"
            border
            style="width: 100%"
            :max-height="tableHeight"
            :data="tableData"
          >
            <el-table-column
              prop="id"
              label="ID"
              width="80"
              align="center"
              fixed
            />
            <el-table-column prop="amount" label="金额" align="center" />
            <el-table-column prop="cloud_power_amount" label="云算力" align="center" />
            <el-table-column prop="kdate" label="日期" align="center" />
            <!-- <el-table-column prop="parent" min-width="300" label="推荐人地址" align="center" />
            <el-table-column prop="tparent" min-width="300" label="33推荐人地址" align="center" /> -->
            <!-- <el-table-column
              label="操作"
              width="240"
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
            </el-table-column> -->
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
import { getCoefficientList } from "@api/coefficient"; // 引用./src/api/member.js中的'getMemberList'方法
import { PAGE_SIZE, PAGE_SIZES } from "@config";
export default {
  name: "member",
  inject: ["reload"],
  data() {
    return {
      tableHeight: 0, //表格最大高度
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
    this.getData();
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
    /** 获取表格数据 */
    async getData(tempParams) {
      tempParams = {
        page: this.pagination.page,
        size: this.pagination.size,
      };
      /**
       * 请求接口数据
       */
      let res = await getCoefficientList(tempParams);
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
      this.getData({ ...tempParams });
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
