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
            <el-table-column prop="id" label="ID" width="80" align="center" />
            <el-table-column prop="name" label="等级" align="center" />
            <el-table-column
              prop="description"
              label="等级描述"
              align="center"
            />
            <el-table-column prop="prices" label="等级价格" align="center" />
            <el-table-column prop="day_buy" label="每日限额" align="center" />
            <el-table-column prop="is_buy" label="是否限额" align="center">
              <template slot-scope="scope">
                <p>
                  {{ scope.row.is_buy ? "是" : "否" }}
                </p>
              </template>
            </el-table-column>
            <el-table-column prop="dividend" label="是否分红" align="center">
              <template slot-scope="scope">
                <p>
                  {{ scope.row.dividend ? "是" : "否" }}
                </p>
              </template>
            </el-table-column>
            <el-table-column
              prop="level_up_time"
              label="升级开放时间"
              align="center"
            />

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
import { getMemberList } from "@api/user"; // 引用./src/api/member.js中的'getMemberList'方法
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
        size: 20,
        sizes: [20, 50, 100],
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
