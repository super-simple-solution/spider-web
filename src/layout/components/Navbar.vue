<template>
  <div class="navbar">
    <div class="flex items-center">
      <div class="nav-left flex">
        <div class="logo-container">
          <span>spider-web</span>
        </div>
        <div class="nav-home">
          <svg-icon name="home" />
          <span class="ml10">应用中心</span>
        </div>
      </div>

      <sidebar class="sidebar-horizontal-container" style="flex: 1" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import Sidebar from './Sidebar/index.vue'
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
