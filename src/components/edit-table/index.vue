<template>
  <div class="edit-table-container">
    <div class="edit-table-toolbar">
      <div class="style-setter"></div>
      <div class="formula-setter"></div>
    </div>
    <div class="edit-table-workboard">
      <div class="table-column-bar"></div>
      <div class="table-row-bar"></div>
      <!-- 表格编辑区 -->
      <el-scrollbar class="edit-stage-container" always :min-size="8">
        <div class="edit-stage" @click="handleClick">
          {{ `${Store.global}: ${Store.count}` }}
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
    background-color: #f6f6f6;

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
      display: none;
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
      display: none;
    }

    .edit-stage-container {
      position: absolute;
      top: 34px;
      right: 12px;
      bottom: 14px;
      left: 34px;
      height: auto;
      overflow: unset;

      :deep(.is-vertical) {
        right: -11px;
        width: 8px;
      }

      :deep(.is-horizontal) {
        bottom: -11px;
        height: 8px;
      }

      .edit-stage {
        position: relative;
        width: 2000px;
        height: 2000px;
        background-color: #fff;
        // linear-gradient 参数可理解为：边线水平向角度，边线颜色，边线宽度起始值，填充色，边线宽度结束值
        // 边线宽度 = Math.abs(边线宽度起始值 - 边线宽度结束值)
        background-image:
          linear-gradient(90deg, #dedede 1px, transparent 0px),
          linear-gradient(0deg, #dedede 1px, transparent 0px);
        background-position-x: -1px; // 取消左边第一根竖线
        background-size: 80px 34px; // 格子宽高
      }

    }
  }
}
</style>