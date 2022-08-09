<script setup lang="ts">
import { ref } from "vue";
let listData = ref([
  {
    date: "2021-09-01",
    name: "spider",
    star: "1000"
  },
  {
    date: "2021-09-02",
    name: "spider",
    star: "1100"
  },
  {
    date: "2021-09-08",
    name: "spider",
    star: "1700"
  },
  {
    date: "2021-09-09",
    name: "spider",
    star: "1800"
  },
  {
    date: "2021-09-10",
    name: "spider",
    star: "1900"
  }
]);
</script>

<template>
  <div class="infinite bg-[#fafafa] dark:bg-dark">
    <ul class="top">
      <li>更新日期</li>
      <li>项目名称</li>
      <li>Star数量</li>
    </ul>
    <ul class="item">
      <li v-for="(item, index) in listData" :key="index">
        <span v-text="item.date" />
        <span v-text="item.name" />
        <span v-text="item.star" />
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.infinite {
  .top {
    width: 95%;
    height: 40px;
    line-height: 40px;
    display: flex;
    margin: 0 auto;
    font-size: 14px;
    color: #909399;
    font-weight: 400;
    // background: #fafafa;

    li {
      width: 34%;
      text-align: center;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

  .warp {
    width: 95%;
    height: 215px;
    margin: 0 auto;
    overflow: hidden;

    li {
      height: 30px;
      line-height: 30px;
      display: flex;
      font-size: 15px;
    }

    span {
      width: 34%;
      text-align: center;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
</style>
