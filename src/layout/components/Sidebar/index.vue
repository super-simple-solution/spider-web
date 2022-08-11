<template>
  <div>
    <el-menu
      :default-active="activeMenu"
      :background-color="variables.menuBg"
      :text-color="variables.menuText"
      :unique-opened="true"
      :active-text-color="variables.menuActiveText"
      :collapse-transition="false"
      mode="horizontal"
    >
      <SidebarItem
        v-for="(route, index) in routes"
        :key="route.id"
        :item="route"
        :base-path="route.path"
        :index="index + ''"
      />
    </el-menu>
  </div>
</template>

<script>
import SidebarItem from './SidebarItem.vue'
import variables from '@/styles/variables.scss'
import { parseScssVariable } from '@/utils'

export default {
  name: 'Sidebar',
  components: { SidebarItem },
  data() {
    return {
      variables: parseScssVariable(variables),
    }
  },
  computed: {
    routes() {
      return this.$router.options.routes.filter((item) => !item.hidden && item.meta && item.meta.step !== 3)
    },
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
  },
}
</script>
