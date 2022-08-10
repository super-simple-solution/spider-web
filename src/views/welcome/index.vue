<script setup lang="ts">
import { ref } from "vue";

defineOptions({
  name: "Welcome"
});

let loading = ref<boolean>(true);

setTimeout(() => {
  loading.value = !loading.value;
}, 800);
</script>

<template>
  <div class="welcome">
    <el-row :gutter="24" style="margin: 20px">
      <el-col :span="12">
        <el-card style="height: 360px">
          <template #header>
            <span style="font-size: 16px; font-weight: 500">GitHub信息</span>
          </template>
          <el-skeleton :rows="7" :loading="loading">
            <template #default> w </template>
          </el-skeleton>
        </el-card>
      </el-col>

      <el-col :span="12">
        <el-card style="height: 360px">
          <template #header>
            <span style="font-size: 16px; font-weight: 500">
              GitHub滚动信息
            </span>
          </template>
          <el-skeleton animated :rows="7" :loading="loading">
            <template #default />
          </el-skeleton>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
