<style lang="scss" scoped>
@import "@assets/styles/variables.scss"; //公共样式变量

.header {
  width: 100%;
  height: 60px;
  border-bottom: $borderSlide;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 0 12px;
  .tool-left,
  .tool-right {
    height: 100%;
    font-size: 20px;
    font-weight: 400;
    display: flex;
    align-items: center;
    .tool-item {
      color: $color-text-regular;
      cursor: pointer;
      padding: 0 12px;
      height: 60px;
      display: flex;
      align-items: center;
      &:hover {
        background: $tool-hover-bg;
      }
      .user-name {
        font-size: 14px;
        color: $color-text-regular;
        margin-left: 4px;
        span {
          margin-left: 4px;
        }
      }
    }
  }
}
</style>

<style lang="scss">
@import "@assets/styles/variables.scss"; //公共样式变量

.el-badge__content {
  padding: 0 5px;
}
.el-badge__content.is-fixed {
  top: 20px;
  right: 24px;
}
.el-dropdown-menu__item span {
  margin-right: 5px;
}
.el-breadcrumb__inner,
.el-breadcrumb__inner.is-link,
.el-breadcrumb__inner a {
  color: $color-text-secondary;
}
</style>

<template>
  <section class="header">
    <!-- 左侧工具栏 -->
    <div class="tool-left">
      <!-- 导航栏收起/展开 -->
      <div class="tool-item" @click="handleChangeCollapse">
        <div v-if="isCollapse" class="iconfont">&#xe8fc;</div>
        <div v-if="!isCollapse" class="iconfont">&#xe600;</div>
      </div>
      <!-- 页面刷新 -->
      <div
        class="tool-item refresh el-icon-refresh-right"
        @click="handleRefresh"
      />
      <!-- 面包屑 -->
      <el-breadcrumb separator="/">
        <template v-for="(item, index) in breadcrumbData">
          <el-breadcrumb-item :key="index" v-if="item.meta.title">
            {{ item.meta.title }}
          </el-breadcrumb-item>
        </template>
      </el-breadcrumb>
    </div>
    <!-- 右侧工具栏 -->
    <div class="tool-right">
      <!-- 全屏展开/收起 -->
      <div class="tool-item" @click="handleFullScreen">
        <div class="iconfont">{{ (isFull && "&#xe641;") || "&#xe8fa;" }}</div>
      </div>
      <!-- <el-popover placement="bottom" width="330" trigger="click">
        <el-badge slot="reference" :value="10" class="tool-item">
          <span class="el-icon-bell" />
        </el-badge>
        <el-tabs v-model="activeName" @tab-click="handleTabClick" stretch>
          <el-tab-pane label="通知" name="1">数据内容</el-tab-pane>
          <el-tab-pane label="私信" name="2">数据内容</el-tab-pane>
          <el-tab-pane label="待办" name="3">数据内容</el-tab-pane>
        </el-tabs>
      </el-popover> -->
      <el-dropdown @command="handleDropdownItem">
        <div class="tool-item">
          <!-- <el-avatar
            :size="28"
            :src="userData.avatar"
          >
            <img
              src="@assets/images/default/default-thumb.png"
            />
          </el-avatar> -->
          <p class="user-name">{{userData.nickname}}<span class="el-icon-arrow-down" /></p>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="modifyPwd">
            <span class="el-icon-key" />修改密码
          </el-dropdown-item>
          <el-dropdown-item divided command="loginOut">
            <span class="el-icon-switch-button" />退出登录
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <!-- 修改密码弹窗 -->
    <el-dialog title="修改密码" :visible.sync="pwdDialogVisible" width="420px">
      <el-form :model="pwdForm" :rules="rules" ref="pwdForm" label-width="84px">
        <el-form-item label="原密码:" prop="oldPwd">
          <el-input
            type="password"
            v-model="pwdForm.old_password "
            placeholder="请输入原密码"
          />
        </el-form-item>
        <el-form-item label="新密码:" prop="new_password">
          <el-input
            type="password"
            v-model="pwdForm.new_password"
            placeholder="请输入新密码"
          />
        </el-form-item>
        <el-form-item label="确认密码:" prop="password2">
          <el-input
            type="password"
            v-model="pwdForm.password2"
            placeholder="请再次输入密码"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleCancle">取 消</el-button>
        <el-button type="primary" @click="handleSubmit"> 确 定 </el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script>
import { validPassword } from "@utils/validate"; //引入密码校验规则
import { mapActions } from "vuex";
import { getMyInfo,memberPasswordUpdate} from "@api/member";
export default {
  name: "Navbar",
  inject: ["reload"],
  props: ["isCollapse"],
  data() {
    // 初次输入新密码校验规则
    let newPwdValidator = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入新密码！"));
      } else {
        if (value.length < 8 || value.length > 20) {
          callback(new Error("密码长度在 8 到 20 个字符"));
        } else if (!validPassword(value)) {
          callback(new Error("必须包含数字、大小写字母、特殊符号"));
        }
        callback();
      }
    };
    // 确认密码校验规则
    let newPwd2Validator = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请确认密码！"));
      } else {
        if (value.length < 8 || value.length > 20) {
          callback(new Error("密码长度在 8 到 20 个字符"));
        } else if (value != this.pwdForm.new_password ) {
          callback(new Error("两次输入密码不相同！"));
        }
        callback();
      }
    };
    return {
      isFull: false, //全屏显示
      activeName: "1", //消息通知高亮栏目
      breadcrumbData: [], // 面包屑数据
      pwdDialogVisible: false, //修改密码弹窗显示
      pwdForm: {}, //表单存储数据
      userData:[],//用户信息
      rules: {
        old_password: [
          { required: true, message: "请输入原密码！", trigger: "blur" },
        ],
        new_password : [
          // { required: true, validator: newPwdValidator, trigger: "blur" },
          { required: true, message: "请输入密码！", trigger: "blur" },
        ],
        password2: [
          { required: true, validator: newPwd2Validator, trigger: "blur" },
        ],
      }, //表单校验规则
    };
  },
  watch: {
    $route(val) {
      this.breadcrumbData = val.matched;
    },
  },
  created() {
    this.breadcrumbData = this.$route.matched;
    this.getMyInfo();
    // this.getDepartmentList();
    // this.getCompanyList();
    // this.getMenuList();
  },
  mounted() {
    window.addEventListener("resize", () => {
      // 窗口尺寸改变时触发事件
      if (!this.$screenfull.isFullscreen) {
        this.isFull = false;
      }
    });
  },
  methods: {
    ...mapActions("system", ["getDepartmentList", "getMenuList"]),
    /** 获取登录人信息 */
    async getMyInfo(){
      let res=await getMyInfo();
      this.userData=res.data;
    },
    /** 收起/展开导航栏 */
    handleChangeCollapse() {
      this.$emit("handleChangeCollapse");
    },
    /** 刷新页面 */
    handleRefresh() {
      this.reload();
    },
    /** 点击全屏 */
    handleFullScreen() {
      this.isFull = !this.isFull;
      if (this.isFull) {
        this.$screenfull.request();
      } else {
        this.$screenfull.exit();
      }
    },
    /** 消息类型切换 */
    handleTabClick() {
      console.log("消息通知栏目切换");
    },
    /** 下拉列表项点击 */
    handleDropdownItem(command) {
      switch (command) {
        case "modifyPwd":
          // 修改密码
          this.pwdDialogVisible = true;
          break;
        case "loginOut":
          // 退出登录
          sessionStorage.clear();
          this.$router.replace("/login");
          break;
        default:
          break;
      }
    },
    /** 取消修改密码 */
    handleCancle() {
      this.pwdDialogVisible = false;
      this.pwdForm = {};
      this.$refs["formData"].clearValidate();
    },
    /** 提交密码修改 */
    handleSubmit() {
      this.$refs["pwdForm"].validate(async (valid) => {
        if (valid) {
          /**
           * 请求接口，修改密码
           */
          let params={
            old_password:this.pwdForm.old_password,
            new_password:this.pwdForm.new_password
          };
          let res=await memberPasswordUpdate(params);
          
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
  },
};
</script>