<template>
  <div class="edit-table-container">
    <div class="edit-table-toolbar">
      <div class="style-setter">{{ `${Store.global}: ${Store.count}` }}</div>
      <div class="formula-setter" @click="handleClick"></div>
    </div>
    <div class="edit-table-workboard">
      <div class="table-column-bar"></div>
      <div class="table-row-bar"></div>
      <!-- 表格编辑区 -->
      <el-scrollbar class="edit-stage" always :min-size="10">
        <div style="padding: 14px;">
          <el-skeleton v-for="item in 10" :key="`skeleton_${item}`" />
        </div>
      </el-scrollbar>

      <div class="table-scrollbar-right"></div>
      <div class="table-scrollbar-bottom"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import mainStore from '@/store/index'
const Store = mainStore()

const handleClick = () => {
  Store.$patch({
    global: `Hello count ${Store.count}`,
    count: Store.count + 2
  })
}
</script>

<style lang="scss" scoped>
.edit-table-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: #f7f7f7;

  .edit-table-toolbar {
    display: flex;
    flex-shrink: 0;
    box-sizing: border-box;
    height: 50px;
    padding: 8px;
    background-color: #f3f3f3;

    .style-setter {
      height: 34px;
      flex: 3;
      border-radius: 3px;
      background-color: #fff;
    }

    .formula-setter {
      height: 34px;
      flex: 7;
      margin-left: 8px;
      border-radius: 3px;
      background-color: #fff;
    }
  }

  .edit-table-workboard {
    position: relative;
    flex: auto;
    background-color: #fff;

    .table-column-bar {
      position: absolute;
      top: 0;
      left: 34px;
      right: 12px;
      z-index: 3;
      height: 34px;
      overflow: hidden;
      background-color: #f6f6f6;
    }

    .table-row-bar {
      position: absolute;
      top: 34px;
      left: 0;
      bottom: 12px;
      z-index: 4;
      width: 34px;
      overflow: hidden;
      background-color: #f6f6f6;
    }

    .table-scrollbar-right {
      position: absolute;
      top: 34px;
      right: 0;
      bottom: 12px;
      z-index: 3;
      width: 12px;
      overflow: hidden;
      background-color: #f6f6f6;
      // display: none;
    }

    .table-scrollbar-bottom {
      position: absolute;
      left: 34px;
      right: 12px;
      bottom: 0;
      z-index: 3;
      height: 12px;
      overflow: hidden;
      background-color: #f6f6f6;
      // display: none;
    }

    .edit-stage {
      position: absolute;
      top: 34px;
      right: 12px;
      bottom: 12px;
      left: 34px;
      height: auto;

      :deep(.is-vertical) {
        right: -11px;
        width: 10px;
      }
      :deep(.is-horizontal) {
        bottom: -11px;
        height: 10px;
      }
      
    }
  }
}
</style>