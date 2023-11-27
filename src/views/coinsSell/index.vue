<style lang="scss" scoped>
@import "@assets/styles/variables.scss"; //公共样式变量
</style>

<template>
  <!-- 用户管理 -->
  <section class="page-child-contianer">
    <div class="table-box">
      <!-- 搜索表单 -->
      <el-form :inline="true" :model="searchForm" class="search-form">
        <el-form-item label="钱包地址：">
          <el-input
            v-model="searchForm.address"
            clearable
            placeholder="钱包地址"
          ></el-input>
        </el-form-item>
        <el-form-item label="订单号：">
          <el-input
            v-model="searchForm.order_id"
            clearable
            placeholder="订单号"
          ></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="searchForm.channel" clearable placeholder="状态">
            <el-option
              v-for="(item, index) in status_list"
              :key="index"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch" icon="el-icon-search">
            查询
          </el-button>
        </el-form-item>
      </el-form>
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
            <el-table-column prop="address" label="钱包地址" width="360" align="center" fixed/>
            <el-table-column prop="amount" width="180" label="金额" align="center" />
            <el-table-column prop="faddress" width="360" label="转出地址" align="center" />
            <el-table-column prop="taddress" width="360" label="转入地址" align="center" />
            <el-table-column prop="status_str" label="状态" align="center" />
            <el-table-column prop="order_id" width="300" label="订单号" align="center" />
            <el-table-column prop="extime" width="180" label="过期时间" align="center" />
            <el-table-column prop="pay_time" width="180" label="支付时间" align="center" />
            <el-table-column prop="create_time" width="180" label="创建时间" align="center" />
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
import { getSellList, getSellStatusList } from "@api/buy_sell"; // 引用./src/api/member.js中的'getMemberList'方法
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
      status_list: [],
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
    this.getStatusList();
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
    //状态列表
    async getStatusList() {
      let res = await getSellStatusList();
      this.status_list = res.data;
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
      let res = await getSellList(tempParams);
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
      if (!this.searchForm.channel) delete this.searchForm.channel;
      let tempParams = {
        ...this.searchForm,
        page: this.pagination.page,
        size: this.pagination.size,
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
