<script setup lang="ts"></script>

<template>
  <div class="sidebar-logo-container">
    <transition name="sidebarLogoFade">
      <router-link
        key="expand"
        title="spider-web"
        class="sidebar-logo-link"
        to="/"
      >
        <span class="sidebar-title">spider-web</span>
      </router-link>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: 48px;
  text-align: center;
  overflow: hidden;

  .sidebar-logo-link {
    height: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-top: 5px;

    .sidebar-title {
      color: #1890ff;
      font-weight: 600;
      font-size: 20px;
      margin-top: 10px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
    }
  }
}
</style>
