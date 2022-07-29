<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { useFullscreen } from "@vueuse/core";

const { t } = useI18n();
const { isFullscreen, toggle } = useFullscreen();
</script>

<template>
  <div
    class="screen-full w-36px flex align-center justify-center flex-ac cursor-pointer navbar-bg-hover"
    @click="toggle"
  >
    <template v-if="isFullscreen">{{ t("buttons.hsexitfullscreen") }}</template>
    <template v-else>{{ t("buttons.hsfullscreen") }}</template>
  </div>
</template>
