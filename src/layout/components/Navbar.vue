<template>
  <div class="navbar">
    <div class="flex-vertical-center">
      <div class="nav-left flex">
        <div class="logo-container">
          <img src="../../assets/logo_top.png" alt="logo" />
          <span style="margin-left: 6px">|</span>
          <span>&nbsp;Webus</span>
        </div>
        <div class="nav-home" @click="toHome">
          <svg-icon name="home" />
          <span class="ml10">应用中心</span>
        </div>
      </div>

      <sidebar class="sidebar-horizontal-container" style="flex: 1" />

      <div class="right-menu clearfix">
        <el-dropdown class="avatar-container" trigger="click">
          <div class="avatar-wrapper clearfix">
            <div class="user-name left">{{ userInfo.user_name }}</div>
            <el-icon class="el-icon--right">
              <arrow-down />
            </el-icon>
          </div>
          <template #dropdown>
            <el-dropdown-menu class="user-dropdown">
              <el-dropdown-item command="logout">
                <span style="display: block" @click="logout">退出登录</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { toHome } from '@/utils/auth'
import Sidebar from './Sidebar/index.vue'
import { useUserStore } from '@/store/user'
import { ArrowDown } from '@element-plus/icons-vue'

const userInfo = computed(() => {
  return useUserStore().userInfo
})
function logout() {
  useUserStore().logout()
}
</script>

<style lang="scss" scoped>
.navbar {
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  height: 48px;
  padding: 0 24px;
  overflow: hidden;
  background-color: #000429;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  color: #999;
  font-size: 14px;

  .nav-home {
    display: inline-block;
    cursor: pointer;
  }

  .right-menu {
    display: flex;
    height: 100%;
    line-height: 48px;

    &:focus {
      outline: none;
    }

    .avatar-container {
      margin-right: 30px;
      .avatar-wrapper {
        position: relative;
        cursor: pointer;
        .user-name {
          margin-right: 5px;
        }
        .el-icon-arrow-down {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 18px;
          font-size: 14px;
        }
      }
    }
  }
}
</style>
