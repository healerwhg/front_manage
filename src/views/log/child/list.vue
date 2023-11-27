<style lang="scss" scoped>
@import "@assets/styles/variables.scss"; //公共样式变量
</style>

<template>
  <!-- 用户管理 -->
  <section class="page-child-contianer">
    <div class="table-box">
      <!-- 搜索表单 -->
      <el-form :inline="true" :model="searchForm" class="search-form">
        <el-form-item label="类型">
          <el-select v-model="searchForm.type" placeholder="类型">
            <el-option
              v-for="item in typeList"
              :key="item.value"
              :label="item.name"
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
        <!-- 内页工具栏 -->
        <div class="tool-bar">
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
            v-loading="tableLoading"
            ref="tableBox"
            border
            style="width: 100%"
            :max-height="tableHeight"
            :data="tableData"
            @selection-change="handleSelectionChange"
          >
            <el-table-column prop="id" label="ID" width="80" align="center" />
            <el-table-column
              prop="member_name"
              label="管理员名称"
              width="100"
              align="center"
            />
            <el-table-column
              prop="role_acts_name"
              label="操作权限项名称"
              width="120"
              align="center"
            />
            <el-table-column
              prop="module_name"
              label="模块名称"
              width="100"
              align="center"
            />
            <el-table-column
              prop="controller_name"
              label="控制器名称"
              width="100"
              align="center"
            >
              <template slot-scope="scope">
                <el-tooltip
                  class="item"
                  effect="light"
                  :content="scope.row.controller_name"
                  placement="top"
                >
                  <p class="textflow">
                    {{ scope.row.controller_name }}
                  </p>
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column
              prop="action_name"
              label="方法名称"
              width="160"
              align="center"
            >
              <template slot-scope="scope">
                <el-tooltip
                  class="item"
                  effect="light"
                  :content="scope.row.action_name"
                  placement="top"
                >
                  <p class="textflow">
                    {{ scope.row.action_name }}
                  </p>
                </el-tooltip>
              </template>
            </el-table-column>

            <el-table-column
              prop="content_json"
              label="操作内容"
              width="180"
              align="center"
            >
              <template slot-scope="scope">
                <el-tooltip
                  class="item"
                  effect="light"
                  :content="scope.row.content_json"
                  placement="top"
                >
                  <p class="textflow">
                    {{ scope.row.content_json }}
                  </p>
                </el-tooltip>
              </template>
            </el-table-column>

            <el-table-column
              prop="ip"
              label="IP地址"
              width="140"
              align="center"
            />

            <el-table-column
              prop="user_agent"
              label="客户端信息"
              width="180"
              align="center"
            >
              <template slot-scope="scope">
                <el-tooltip
                  class="item"
                  effect="light"
                  :content="scope.row.user_agent"
                  placement="top"
                >
                  <p class="textflow">
                    {{ scope.row.user_agent }}
                  </p>
                </el-tooltip>
              </template>
            </el-table-column>

            <el-table-column prop="type_name" label="日志类型" align="center" />

            <el-table-column label="创建时间" width="160" align="center">
              <template slot-scope="scope">
                <p>
                  {{
                    (scope.row.create_time * 1000)
                      | formatTime("YYYY-MM-DD HH:mm:ss")
                  }}
                </p>
              </template>
            </el-table-column>
            <el-table-column
              prop="remarks"
              label="备注"
              width="140"
              align="center"
            >
              <template slot-scope="scope">
                <el-tooltip
                  class="item"
                  effect="light"
                  :content="scope.row.remarks"
                  placement="top"
                >
                  <p class="textflow">
                    {{ scope.row.remarks }}
                  </p>
                </el-tooltip>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <!-- 分页控件 -->
        <div style="display: flex; justify-content: flex-end">
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
import { mapState } from "vuex";
import { getLogList } from "@api/log";
import { systemConfig } from "@api/systemConfig";
import { PAGE_SIZE, PAGE_SIZES } from "@config";
export default {
  name: "logList",
  inject: ["reload"],
  data() {
    return {
      tableLoading: false,
      tableHeight: 0, //表格最大高度
      searchForm: {
        type: "2",
      }, //搜索表单
      isFull: false, //全屏开启
      tableData: [], //表格数据
      multipleSelection: [], //表格多选储存数据

      typeList: [
        {
          value: "1",
          name: "登录日志",
        },
        {
          value: "2",
          name: "操作日志",
        },
      ],

      smallRoleObj: {},
      pagination: {
        page: 1,
        total: 0,
        current: 1,
        size: 25,
        sizes: [25, 50, 75, 100],
      }, //分页数据
    };
  },
  computed: {
    ...mapState("system", ["departmentListSearch"]),
  },
  async created() {
    let tempParams = {
      ...this.searchForm,
      page: this.pagination.page,
      rows: this.pagination.size,
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
    this.smallRoleObj = await this.validateSmallRole();
    this.$forceUpdate();
  },
  methods: {
    /** 获取表格数据 */
    async getData(tempParams) {
      this.tableLoading = true;
      /**
       * 请求接口数据
       */
      let res = await getLogList(tempParams);
      this.tableData = res.data.list;

      this.pagination.total = res.data.count;
      this.$forceUpdate();
      this.tableLoading = false;
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
        rows: this.pagination.size,
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
        rows: this.pagination.size,
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
        rows: this.pagination.size,
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
    /** 表格多选触发 */
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleCancle() {
      this.dialogFormVisible = false;
      this.mobileUpdateId = 0;
      this.mobileUpdateForm = {};
    },
  },
};
</script>