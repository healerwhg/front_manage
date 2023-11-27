<style lang="scss" scoped>
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
      <el-form-item label="权限名称:" prop="name">
        <el-input v-model="formData.name" placeholder="权限名称" />
      </el-form-item>
      <el-form-item label="权限描述:" prop="name">
        <el-input v-model="formData.description" placeholder="权限描述" />
      </el-form-item>
      <el-form-item>
        <el-button @click="handleCancle">取 消</el-button>
        <el-button type="primary" @click="handleSubmit"> 确 定 </el-button>
      </el-form-item>
    </el-form>
  </section>
</template>

<script>
import ueditorcom from "@/components/ueditorcom";
import { roleGroupUpdate, roleGroupAdd } from "@api/role";
export default {
  name: "roleGroupForm",
  inject: ["reload"],
  /**
   * 组件
   */
  components: {
    ueditorcom,
  },
  data() {
    return {
      id: null, //修改用户id
      imageUrl: "", //图片上传成功回显链接
      formData: {}, //表单存储数据
      rules: {
        name: [{ required: true, message: "角色名称", trigger: "blur" }],
      }, //表单校验规则
    };
  },
  async created() {
    console.log(this.$route.params);
    if (this.$route.params.id) {
      this.formData = this.$route.params;
    }
  },
  mounted() {},
  methods: {
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
          if (this.formData.id) {
            // 存在id，执行编辑请求
            delete this.formData.key
            var res = await roleGroupUpdate(this.formData, "post");
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