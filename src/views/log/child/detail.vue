<style lang="scss" scoped>
.upload-tip {
  color: #e6a23c;
  font-size: 12px;
}
</style>

<template>
  <!-- 用户新增/编辑 -->
  <section class="page-child-contianer">
    <el-form
      class="page-form"
      :model="formData"
      :rules="rules"
      ref="formData"
      label-width="84px"
    >
      <el-form-item label="类型:" prop="type">
        <el-select v-model="formData.type" placeholder="类型">
          <el-option
            v-for="(item, index) in typeList"
            :key="Number(index)"
            :label="item"
            :value="Number(index)"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="名称:" prop="name">
        <el-input v-model="formData.name" placeholder="请输入名称" />
      </el-form-item>

      <el-form-item label="封面图:">
        <el-upload
          class="img-uploader"
          action="/index/uploadAnnex"
          name="files[]"
          accept=".jpg,.jpeg,.png,.gif"
          :show-file-list="false"
          :before-upload="uploadBefore"
          :on-error="uploadError"
          :on-success="uploadSuccess"
        >
          <img v-if="imageUrl" :src="imageUrl" class="img" />
          <i
            style="font-size: 28px; color: #8c939d; margin-left: 35px"
            v-else
            class="el-icon-plus avatar-uploader-icon"
          ></i>
          <el-input type="hidden" v-model="formData.thumb" prop="thumb" />
        </el-upload>
        <span class="upload-tip"> 建议尺寸686x300(px)</span>
      </el-form-item>

      <div v-if="formData.type == 2">
        <el-form-item label="季度打卡开始时间:" prop="start_time">
          <el-date-picker
            v-model="formData.start_time"
            type="datetime"
            placeholder="选择日期时间"
          >
          </el-date-picker>
        </el-form-item>

        <el-form-item label="季度打卡结束时间:" prop="end_time">
          <el-date-picker
            v-model="formData.end_time"
            type="datetime"
            placeholder="选择日期时间"
          >
          </el-date-picker>
        </el-form-item>
      </div>

      <div v-if="formData.type != 2">
        <el-form-item label="达标天数:" prop="value">
          <el-input-number
            v-model="formData.value"
            :min="1"
            label="达标天数"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="奖励金额（元）:" prop="money">
          <el-input-number
            v-model="formData.money"
            :precision="2"
            :step="1"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="不达标最大奖励金额（元）:" prop="max_money">
          <el-input-number
            v-model="formData.max_money"
            :precision="2"
            :step="1"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="奖励结算时间:" prop="settlement_time">
          <el-date-picker
            v-model="formData.settlement_time"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>
      </div>

      <el-form-item label="排序:" prop="sort">
        <el-input-number
          v-model="formData.sort"
          :min="1"
          label="值越大越靠前"
        ></el-input-number>
      </el-form-item>

      <el-form-item
        label="关联奖励:"
        prop="relation_id"
        v-if="formData.type == 3"
      >
        <el-select v-model="formData.relation_id" placeholder="关联奖励">
          <el-option
            v-for="item in relationPrizeList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button @click="handleCancle">取 消</el-button>
        <el-button type="primary" @click="handleSubmit"> 确 定 </el-button>
      </el-form-item>
    </el-form>
  </section>
</template>

<script>
import { mapState } from "vuex";
import { validPhone } from "@utils/validate"; //引入手机号码校验规则
import ueditorcom from "@/components/ueditorcom";
import { prizeAdd, prizeUpdate, getRelationPrizeList } from "@api/prize";
import { systemConfig } from "@api/systemConfig";
export default {
  name: "prizeForm",
  inject: ["reload"],
  /**
   * 组件
   */
  components: {
    ueditorcom,
  },
  data() {
    // 校验手机号码
    let phoneValidator = (rule, value, callback) => {
      if (!value) {
        callback();
      } else {
        if (!validPhone(value)) {
          callback(new Error("手机号码格式错误！"));
        }
        callback();
      }
    };
    return {
      id: null, //修改用户id
      imageUrl: "", //图片上传成功回显链接

      typeList: [],
      relationPrizeList: [],

      formData: {
        type: 1,
        sort: "200",
      }, //表单存储数据
      checkAll: false,
      isIndeterminate: true,
      rules: {
        name: [{ required: true, message: "请输入标题", trigger: "blur" }],
      }, //表单校验规则
    };
  },
  computed: {},
  async created() {
    let res = await systemConfig();
    this.typeList = res.data.prize_type;

    let res2 = await getRelationPrizeList();
    this.relationPrizeList = res2.data;

    if (this.$route.params.id) {
      this.id = this.$route.params.id;
      this.getDetail();
    }
  },
  mounted() {},
  methods: {
    /** 修改前获取详情信息 */
    async getDetail() {
      /**
       * 请求接口获取详情数据
       */
      let res = await prizeUpdate({ id: this.id }, "get");
      this.formData = {
        ...this.formData,
        ...res.data,
      };
      this.imageUrl = res.data.thumb_path;

      //请求返回成功后打开弹窗
      this.formDialogVisible = true;
    },
    /** 取消用户编辑 */
    handleCancle() {
      this.$refs["formData"].clearValidate();
      this.$router.go(-1);
    },

    handleSubmit() {
      this.formData = {
        ...this.formData,
      };
      if (this.formData.type != 3) {
        this.formData.relation_id = 0;
      }
      this.$refs["formData"].validate(async (valid) => {
        if (valid) {
          /**
           * 请求接口
           */
          // delete this.formData.delete_time;
          // delete this.formData.update_time;
          if (this.id) {
            // 存在id，执行编辑请求
            var res = await prizeUpdate(this.formData, "post");
          } else {
            // 不存在id，执行添加请求
            var res = await prizeAdd(this.formData);
          }
          if (res.code == 200) {
            this.$message({
              message: res.msg,
              type: "success",
            });
            // 请求后，不论是否成功，调用方法关闭弹窗

            this.handleCancle();
          }
        }
      });
    },
    /** 上传前处理 */
    uploadBefore(file) {
      const isImg =
        file.type == "image/jpeg" ||
        file.type == "image/jpg" ||
        file.type == "image/png" ||
        file.type == "image/gif";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isImg) {
        this.$message.error("上传图片只能是 .jpg,.jpeg,.png,.gif 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传图片大小不能超过 2MB!");
      }
      return isImg && isLt2M;
    },
    /** 上传成功 */
    uploadSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.formData = {
        ...this.formData,
        thumb: res.data.list[0].id,
      };
    },
    /** 上传失败 */
    uploadError(err, file) {
      this.$message.warning("上传失败");
    },
  },
};
</script>
