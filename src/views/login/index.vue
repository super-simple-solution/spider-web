<script setup lang="ts">
import Motion from "./utils/motion";
import { useRouter } from "vue-router";
import { loginRules } from "./utils/rule";
import { initRouter } from "/@/router/utils";
import { useNav } from "/@/layout/hooks/nav";
import { ElMessage } from "element-plus";
import type { FormInstance } from "element-plus";
import { storageSession } from "@pureadmin/utils";
import { useLayout } from "/@/layout/hooks/useLayout";
import { useUserStoreHook } from "/@/store/modules/user";
import { bg, avatar, currentWeek } from "./utils/static";
import { useRenderIcon } from "/@/components/ReIcon/src/hooks";
import { useTranslationLang } from "/@/layout/hooks/useTranslationLang";
import { useDataThemeChange } from "/@/layout/hooks/useDataThemeChange";
import { ref, reactive, computed, getCurrentInstance } from "vue";

import dayIcon from "/@/assets/svg/day.svg?component";
import darkIcon from "/@/assets/svg/dark.svg?component";
import globalization from "/@/assets/svg/globalization.svg?component";

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

const { initStorage } = useLayout();
initStorage();

const { dataTheme, dataThemeChange } = useDataThemeChange();
const { getDropdownItemStyle, getDropdownItemClass } = useNav();
const { locale, translationCh, translationEn } = useTranslationLang();

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

dataThemeChange();
</script>

<template>
  <div class="wh-full select-none">
    <img :src="bg" class="wave" />
    <div class="flex-c absolute right-5 top-3">
      <!-- 主题 -->
      <el-switch
        v-model="dataTheme"
        inline-prompt
        :active-icon="dayIcon"
        :inactive-icon="darkIcon"
        @change="dataThemeChange"
      />
      <!-- 国际化 -->
      <el-dropdown trigger="click">
        <globalization
          class="hover:color-primary !hover:bg-transparent w-20px h-20px ml-1.5 cursor-pointer outline-none duration-300"
        />
        <template #dropdown>
          <el-dropdown-menu class="translation">
            <el-dropdown-item
              :style="getDropdownItemStyle(locale, 'zh')"
              :class="['!dark:color-white', getDropdownItemClass(locale, 'zh')]"
              @click="translationCh"
            >
              <IconifyIconOffline
                class="check-zh"
                v-show="locale === 'zh'"
                icon="check"
              />
              简体中文
            </el-dropdown-item>
            <el-dropdown-item
              :style="getDropdownItemStyle(locale, 'en')"
              :class="['!dark:color-white', getDropdownItemClass(locale, 'en')]"
              @click="translationEn"
            >
              <span class="check-en" v-show="locale === 'en'">
                <IconifyIconOffline icon="check" />
              </span>
              English
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
    <div class="login-container">
      <div class="img">
        <component :is="currentWeek" />
      </div>
      <div class="login-box">
        <div class="login-form">
          <avatar class="avatar" />
          <Motion>
            <h2 class="outline-none">{{ title }}</h2>
          </Motion>

          <el-form
            v-if="currentPage === 0"
            ref="ruleFormRef"
            :model="ruleForm"
            :rules="loginRules"
            size="large"
            @keyup.enter="onLogin(ruleFormRef)"
          >
            <Motion :delay="100">
              <el-form-item prop="username">
                <el-input
                  clearable
                  v-model="ruleForm.username"
                  placeholder="账号"
                  :prefix-icon="useRenderIcon('user')"
                />
              </el-form-item>
            </Motion>

            <Motion :delay="150">
              <el-form-item prop="password">
                <el-input
                  clearable
                  show-password
                  v-model="ruleForm.password"
                  placeholder="密码"
                  :prefix-icon="useRenderIcon('lock')"
                />
              </el-form-item>
            </Motion>

            <Motion :delay="250">
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
            </Motion>
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
