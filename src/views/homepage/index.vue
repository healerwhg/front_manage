<style lang="scss" scoped>
@import "@assets/styles/variables.scss"; //公共样式变量
.home_total {
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  .total_row {
    width: 100%;
    display: flex;
    align-items: center;
    margin-top: 30px;
    .total_item {
      margin-left: 40px;
      width: 380px;
      height: 160px;
      background: #fff;
      border-radius: 10px;
      display: flex;
      flex-direction: column;
      padding: 20px;
      .label {
        font-size: 30px;
        margin-bottom: 20px;
        display: flex;
        align-items: center;
      }
      .num {
        font-size: 20px;
        font-weight: bold;
      }
    }
  }
}
</style>

<template>
  <section class="page-container">
    <div class="home_total">
      <div class="total_row">
        <div class="total_item">
          <div class="label">
            <i
              class="el-icon-upload"
              style="color: #299e1aa2; font-size: 60px;margin-right: 20px;"
            ></i>
            <span>总云算力</span>
          </div>
          <div class="num">{{ totalData.all_cloud_power }}</div>
        </div>
        <div class="total_item">
          <div class="label">
            <i
              class="el-icon-eleme"
              style="color: #babd10a2; font-size: 60px;margin-right: 20px;"
            ></i>
            <span>总级别算力</span>
          </div>
          <div class="num">{{ totalData.all_level_power }}</div>
        </div>
        <div class="total_item">
          <div class="label">
            <i
              class="el-icon-s-open"
              style="color: #bd6410a2; font-size: 60px;margin-right: 20px;"
            ></i>
            <span>总挖矿</span>
            </div>
          <div class="num">{{ totalData.total_mining }}</div>
        </div>
        <div class="total_item">
          <div class="label">
            <i
              class="el-icon-s-promotion"
              style="color: #3bcac3a2; font-size: 60px;margin-right: 20px;"
            ></i>
            <span>今日挖矿</span>
          </div>
          <div class="num">{{ totalData.today_mining }}</div>
        </div>
      </div>
      <div class="total_row">
        <div class="total_item">
          <div class="label">
            <i
              class="el-icon-s-marketing"
              style="color: #5259b9a2; font-size: 60px;margin-right: 20px;"
            ></i>
            <span>今日系数</span>
          </div>
          <div class="num">{{ totalData.today_cloud_power_amount }}</div>
        </div>
        <div class="total_item">
          <div class="label">
            <i
              class="el-icon-user-solid"
              style="color: #2067d1a2; font-size: 60px;margin-right: 20px;"
            ></i>
            <span>总用户</span>
          </div>
          <div class="num">{{ totalData.all_user }}</div>
        </div>
        <div class="total_item">
          <div class="label">
            <i
              class="el-icon-s-custom"
              style="color: #b93cb3a2; font-size: 60px;margin-right: 20px;"
            ></i>
            <span>新增用户</span>
          </div>
          <div class="num">{{ totalData.today_add_user }}</div>
        </div>
        <div class="total_item">
          <div class="label">
            <i
              class="el-icon-s-check"
              style="color: #e44d4da2; font-size: 60px;margin-right: 20px;"
            ></i>
            <span>激活用户</span>
          </div>
          <div class="num">{{ totalData.active_user }}</div>
        </div>
      </div>
      <div class="total_row">
        <div class="total_item">
          <div class="label">
            <i
              class="el-icon-s-shop"
              style="color: #dbe72da2; font-size: 60px;margin-right: 20px;"
            ></i>
            <span>总买币</span>
          </div>
          <div class="num">{{ totalData.buy_coins_all }}</div>
        </div>
        <div class="total_item">
          <div class="label">
            <i
              class="el-icon-s-cooperation"
              style="color: #0af3e7a2; font-size: 60px;margin-right: 20px;"
            ></i>
            <span>总卖币</span>
          </div>
          <div class="num">{{ totalData.sell_coins_all }}</div>
        </div>
        <div class="total_item">
          <div class="label">
            <i
              class="el-icon-s-fold"
              style="color: #f11e1ea2; font-size: 60px;margin-right: 20px;"
            ></i>
            <span>已分红EEOQ</span>
          </div>
          <div class="num">{{ totalData.all_level_dividend }}</div>
        </div>
        <div class="total_item">
          <div class="label">
            <i
              class="el-icon-s-unfold"
              style="color: #37f11ea2; font-size: 60px;margin-right: 20px;"
            ></i>
            <span>已分红USDT</span>
          </div>
          <div class="num">{{ totalData.all_cloud_dividend }}</div>
        </div>
      </div>
      <div class="total_row">
        <div class="total_item">
          <div class="label">
            <i
              class="el-icon-warning"
              style="color: red; font-size: 60px;margin-right: 20px;"
            ></i>
            <span>总烧伤U</span>
          </div>
          <div class="num">{{ totalData.all_burn_amount }}</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { getHomeData } from "@api/home.js";
export default {
  name: "home",
  components: {},
  data() {
    return {
      tableHeight: 0,
      totalData: {},
    };
  },

  watch: {},

  created() {
    this.init();
  },

  mounted() {},

  methods: {
    async init() {
      const res = await getHomeData();
      if (!res) return;
      this.totalData = res.data || {};
    },
  },
};
</script>
