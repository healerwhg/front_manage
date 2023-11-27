<style lang="scss" scoped></style>

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
      <!-- <el-form-item label="头像:" v-if="id">
        <el-upload
          class="img-uploader"
          action="https://eeoq-v1-api-v1.netlify.app/api/back/upload/params"
          name="files[]"
          accept=".jpg,.jpeg,.png,.gif"
          :headers="{
            token: uploadToken,
          }"
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
          <el-input type="hidden" v-model="formData.avatar" prop="avatar" />
        </el-upload>
      </el-form-item> -->
      <el-form-item label="账号昵称:" prop="nickname">
        <el-input v-model="formData.nickname" placeholder="请输入账号昵称" />
      </el-form-item>
      <el-form-item label="账号:" prop="username" v-if="!id">
        <el-input v-model="formData.username" placeholder="请输入账号" />
      </el-form-item>
      <el-form-item label="密码:" prop="password" v-if="!id">
        <el-input v-model="formData.password" placeholder="请输入密码" />
      </el-form-item>
      <el-form-item label="简介:" prop="summary">
        <el-input v-model="formData.summary" placeholder="请输入内容" />
      </el-form-item>
      <el-form-item label="账号ID:" prop="role_id " v-if="!id">
        <el-input v-model="formData.role_id" placeholder="请输入内容" />
      </el-form-item>
      <el-form-item>
        <el-button @click="handleCancle">取 消</el-button>
        <el-button type="primary" @click="handleSubmit"> 确 定 </el-button>
      </el-form-item>
    </el-form>
  </section>
</template>

<script>
import { validPhone } from "@utils/validate"; //引入手机号码校验规则
import ueditorcom from "@/components/ueditorcom";
import { memberUpdate, memberAdd } from "@api/member";
export default {
  name: "memberForm",
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
      uploadToken: "",
      formData: {}, //表单存储数据
      rules: {
        name: [{ required: true, message: "请输入用户姓名", trigger: "blur" }],
        account: [
          { required: true, message: "请输入用户账号", trigger: "blur" },
        ],

        mobile: [{ validator: phoneValidator, trigger: "blur" }],
      }, //表单校验规则
    };
  },
  created() {
    if (this.$route.params.id) {
      this.id = this.$route.params.id;
      this.getDetail();
    }
  },
  mounted() {
    this.uploadToken = sessionStorage.getItem("token");
  },
  methods: {
    /** 修改前获取详情信息 */
    async getDetail() {
      /**
       * 请求接口获取详情数据
       */
      let res = await memberUpdate({ id: this.id }, "get");
      this.formData = res.data;

      this.imageUrl = res.data.avatar;

      //请求返回成功后打开弹窗
      this.formDialogVisible = true;
    },
    /** 取消用户编辑 */
    handleCancle() {
      this.$refs["formData"].clearValidate();
      this.$router.go(-1);
    },
    /** 提交用户信息*/
    handleSubmit() {
      this.formData = {
        ...this.formData,
      };
      this.$refs["formData"].validate(async (valid) => {
        if (valid) {
          /**
           * 请求接口
           */
          // delete this.formData.delete_time;
          // delete this.formData.update_time;
          if (this.id) {
            this.formData.id = this.id;
            // 存在id，执行编辑请求
            var res = await memberUpdate(this.formData, "post");
          } else {
            // 不存在id，执行添加请求
            var res = await memberAdd(this.formData);
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
