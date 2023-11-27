<style lang="scss" scoped>
@import "@assets/styles/variables.scss"; //公共样式变量

.login-container {
  min-height: 100%;
  width: 100%;
  background: url("../../assets/images/bg-login.png") no-repeat;
  background-size: cover;
  overflow: hidden;

  .login-form {
    width: 430px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    background: #fff;
    box-sizing: border-box;
    padding: 15px 30px 30px;
    .logo {
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
      color: $menuTextColor;
      cursor: default;
      img {
        width: 30px;
      }
      span {
        margin-left: 10px;
        color: $color-text-primary;
      }
    }
    .form-box {
      margin-top: 20px;
      width: 100%;
    }
    .verify-code {
      ::v-deep {
        .el-form-item__content {
          display: flex;
          align-items: center;
          .verify-img {
            width: 140px;
            height: 40px;
            border-radius: 2px;
            margin-left: 12px;
            background: #fff;
            img {
              width: 100%;
              height: 100%;
              object-fit: cover;
            }
          }
        }
      }
    }
    .submit {
      margin-top: 40px;
      margin-bottom: 0;
      .el-button {
        width: 100%;
        height: 100%;
        font-size: 14px;
        color: #fff;
        font-weight: 400;
        &.is-disabled {
          background: #d9d9d9;
          border-color: #d9d9d9;
        }
      }
      &.blue {
        background: #08f;
        border-color: #08f;
      }
    }
  }
}
</style>

<style lang="scss">
.el-input__prefix {
  left: 12px;
}
</style>

<template>
  <div class="login-container">
    <div class="login-form">
      <h1 class="logo">
        <!-- <img src="@assets/logo.png" alt="" /> -->
        <span>EEOQ管理系统</span>
      </h1>
      <el-form
        class="form-box sc"
        ref="loginForm"
        :model="loginForm"
        :rules="rules"
      >
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            placeholder="账号"
            @keyup.enter.native="handleLogin"
          >
            <span slot="prefix" class="el-icon-user"></span>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            type="password"
            placeholder="密码"
            @keyup.enter.native="handleLogin"
          >
            <span slot="prefix" class="el-icon-lock"></span>
          </el-input>
        </el-form-item>
        <el-form-item class="submit">
          <el-button
            class="blue"
            type="primary"
            v-loading="loading"
            @click="handleLogin"
          >
            登录
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { login } from "@api/member";
export default {
  name: "Login",
  components: {},
  data() {
    let validatePass = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
      },
      rules: {
        username: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [
          { required: true, validator: validatePass, trigger: "blur" },
        ],
      },
      loading: false,
      verifyImg: "",
    };
  },

  watch: {},

  created() {
  },

  mounted() {},

  methods: {
    /** 用户登录 */
    handleLogin() {
      this.$refs["loginForm"].validate(async (valid) => {
        if (valid) {
          this.loading = true;
          /**
           * 请求接口登录
           */
          let res = await login(this.loginForm);
          this.loading = false;
          if (res.code != 200) {
            return;
          }

          // 保存token
          sessionStorage.setItem("token", res.data.token);
          this.$message({
            message: "登录成功",
            type: "success",
          });
          setTimeout(() => {
            this.$router.replace("/homepage");
          }, 1500);
        }
      });
    },
  },
};
</script>
