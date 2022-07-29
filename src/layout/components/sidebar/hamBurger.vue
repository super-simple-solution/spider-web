<script setup lang="ts">
import { Fold, Expand } from "@element-plus/icons-vue";
import { ref } from "vue";

interface Props {
  isActive: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  isActive: false
});
const isDark = ref(true);

const emit = defineEmits<{
  (e: "toggleClick"): void;
}>();

const toggleClick = () => {
  emit("toggleClick");
};
</script>

<template>
  <div class="hamburger-container">
    <el-tooltip
      placement="right"
      :effect="isDark ? 'dark' : 'light'"
      :content="props.isActive ? '点击折叠' : '点击展开'"
    >
      <el-icon
        v-if="props.isActive"
        @click="toggleClick"
        class="cursor-pointer inline-block align-middle color-primary hover:color-primary !dark:hover:color-white w-16px h-16px ml-4 mb-1"
        ><Fold
      /></el-icon>
      <el-icon
        v-else
        @click="toggleClick"
        class="cursor-pointer inline-block align-middle color-primary hover:color-primary !dark:hover:color-white w-16px h-16px ml-4 mb-1"
        ><Expand
      /></el-icon>
    </el-tooltip>
  </div>
</template>

<style lang="scss" scoped>
.hamburger-container {
  position: absolute;
  bottom: 0;
  width: 210px;
  height: 40px;
  line-height: 40px;
  box-shadow: 0 0 6px -2px var(--el-color-primary);
}
</style>
