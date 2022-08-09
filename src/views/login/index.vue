<script setup lang="ts">
import { useRouter } from "vue-router";
import { loginRules } from "./utils/rule";
import { initRouter } from "/@/router/utils";
import { ElMessage } from "element-plus";
import type { FormInstance } from "element-plus";
import { storageSession } from "@pureadmin/utils";
import { useUserStoreHook } from "/@/store/modules/user";
import { bg, avatar, currentWeek } from "./utils/static";
import { ref, reactive, computed, getCurrentInstance } from "vue";

defineOptions({
  name: "Login"
});
const title =
  getCurrentInstance().appContext.config.globalProperties.$config?.Title;
const router = useRouter();
const loading = ref(false);
const ruleFormRef = ref<FormInstance>();
const currentPage = computed(() => {
  return useUserStoreHook().currentPage;
});

const ruleForm = reactive({
  username: "admin",
  password: "admin123"
});

const onLogin = async (formEl: FormInstance | undefined) => {
  loading.value = true;
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      // 模拟请求，需根据实际开发进行修改
      setTimeout(() => {
        loading.value = false;
        storageSession.setItem("info", {
          username: "admin",
          accessToken: "eyJhbGciOiJIUzUxMiJ9.test"
        });
        initRouter("admin").then(() => {});
        ElMessage.success("登录成功");
        router.push("/");
      }, 2000);
    } else {
      loading.value = false;
      return fields;
    }
  });
};
</script>

<template>
  <div class="wh-full select-none">
    <img :src="bg" class="wave" />
    <div class="login-container">
      <div class="img">
        <component :is="currentWeek" />
      </div>
      <div class="login-box">
        <div class="login-form">
          <avatar class="avatar" />
          <h2 class="outline-none">{{ title }}</h2>

          <el-form
            v-if="currentPage === 0"
            ref="ruleFormRef"
            :model="ruleForm"
            :rules="loginRules"
            size="large"
            @keyup.enter="onLogin(ruleFormRef)"
          >
            <el-form-item prop="username">
              <el-input
                clearable
                v-model="ruleForm.username"
                placeholder="账号"
              />
            </el-form-item>

            <el-form-item prop="password">
              <el-input
                clearable
                show-password
                v-model="ruleForm.password"
                placeholder="密码"
              />
            </el-form-item>

            <el-form-item>
              <el-button
                class="w-full mt-4"
                size="default"
                type="primary"
                :loading="loading"
                @click="onLogin(ruleFormRef)"
              >
                登录
              </el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url("/@/style/login.css");
</style>

<style lang="scss" scoped>
:deep(.el-input-group__append, .el-input-group__prepend) {
  padding: 0;
}

.translation {
  ::v-deep(.el-dropdown-menu__item) {
    padding: 5px 40px;
  }

  .check-zh {
    position: absolute;
    left: 20px;
  }

  .check-en {
    position: absolute;
    left: 20px;
  }
}
</style>
