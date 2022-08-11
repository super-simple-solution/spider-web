<template>
  <baidu-map
    ref="map"
    class="bm-view"
    :zoom="mapProps.zoom"
    :enable-wheel-zoom="mapProps.wheelZoom"
    :center="center"
    @ready="ready"
  >
    <!-- <bm-marker :show="!!finalConfig.marker" :point="finalConfig.marker"></bm-marker> -->
    <template v-if="finalConfig.markerList.length">
      <bm-marker
        v-for="marker in finalConfig.markerList"
        :key="`${marker.lat}_${marker.lng}`"
        :point="marker"
        :show="true"
      >
        <bm-marker-icon
          v-if="finalConfig.markerIcon"
          :src="finalConfig.markerIcon"
          :size="[14, 14]"
          :anchor="[5, 8]"
          :image-offset="[0, 0]"
        ></bm-marker-icon>
      </bm-marker>
    </template>
    <!-- 定位 -->
    <bm-location-control :show="finalConfig.locationControl" :offset="[60, 60]"></bm-location-control>
    <!-- 城市选择 -->
    <bm-city-list-control :show="finalConfig.cityListControl" :offset="[50, 30]"></bm-city-list-control>
    <!-- 右键菜单 -->
    <bm-context-menu :show="finalConfig.contextMenu">
      <bm-context-menu-item :text="`查找附近站点`"></bm-context-menu-item>
    </bm-context-menu>
    <!-- 多边形 -->
    <bm-polygon
      v-if="!!finalConfig.polygon.points.length"
      :show="!!finalConfig.polygon.points.length"
      :points="finalConfig.polygon.points"
      :overall-view="true"
    ></bm-polygon>
    <!-- 折线 -->
    <bm-polyline
      v-if="!!finalConfig.polyline.points.length"
      :show="!!finalConfig.polyline.points.length"
      :points="finalConfig.polyline.points"
      :overall-view="true"
    ></bm-polyline>
  </baidu-map>
</template>

<script lang="ts" setup>
import { mapProps } from '@/utils/map'
import { defineEmits, defineProps } from 'vue'
import { Location } from '@/types/local'
import { defaultConfig, Config } from './const'

const emit = defineEmits(['ready'])

function ready(map: any) {
  emit('ready', map)
}

interface Props {
  center?: Location
  config?: Config
}

const props = withDefaults(defineProps<Props>(), {
  center: () => mapProps.center,
  config: () => defaultConfig,
})

const finalConfig = computed(() => {
  const { config } = props
  return Object.assign(defaultConfig, config)
})
</script>

<style>
.bm-view > div {
  height: 100%;
}
</style>
