<template>
  <div class="edit-table-container">
    <div class="edit-table-toolbar">
      <div class="style-setter"></div>
      <div class="formula-setter"></div>
    </div>
    <div class="edit-table-workboard">
      <div class="table-column-bar" ref="$tableColumnBar">
        <div
          class="column-bar-scroll-warp"
          :style="`width:${columnBarWidth}px`">
          <div class="column-item" v-for="item in columnCodesObject" :key="item.code">
            {{ item.code }}
          </div>
        </div>
      </div>
      <div class="table-row-bar" ref="$tableRowBar">
        <div
          class="row-bar-scroll-warp"
          :style="`height:${rowBarHeight}px`">
          <div class="row-item" v-for="item in rowNames" :key="item.name">
            {{ item.name }}
          </div>
        </div>
      </div>
      <!-- 表格编辑区 -->
      <el-scrollbar
        class="edit-stage-container"
        always
        :min-size="8"
        @scroll="stageScroll">
        <div
          class="edit-stage"
          :style="`width:${columnBarWidth}px;height:${rowBarHeight}px`"
          @click="handleClick">
          {{ `${Store.global}: ${Store.count}` }}
        </div>
      </el-scrollbar>

      <div class="table-scrollbar-right"></div>
      <div class="table-scrollbar-bottom"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { createColumnCodes, createColumnCodesObject, createRowNamesObject } from './utils/index'

// 引入与 pinia
import mainStore from '@/store/index'
const Store = mainStore()

const handleClick = () => {
  Store.$patch({
    global: `Hello count ${Store.count}`,
    count: Store.count + 2
  })
}

// 生成列名数组
let columnCodes = ref()
let columnCodesObject = ref()
columnCodes.value = createColumnCodes()
columnCodesObject.value = createColumnCodesObject(columnCodes.value)
// console.log(columnCodesObject.value)
// 列名栏宽度计算值
let columnBarWidth = computed(() => {
  return columnCodesObject.value.map((item:{ width: number }) => item.width).reduce((total:number, width:number) => {
    return total + width
  })
})

// 生成行号数组
let rowNames = ref()
rowNames.value = createRowNamesObject(40) // 生成 20 行
// 行号栏高度计算值
let rowBarHeight = computed(() => {
  return rowNames.value.map((item:{ height: number }) => item.height).reduce((total:number, height:number) => {
    return total + height
  })
})

// 内容滚动时列名栏及行号栏跟随偏移
let $tableColumnBar = ref<HTMLDivElement | undefined>()
let $tableRowBar = ref<HTMLDivElement | undefined>()
let stageScroll = (e:{ scrollLeft:number, scrollTop:number }) => {
  // console.log(e.scrollLeft, e.scrollTop)
  // console.log($tableColumnBar?.value?.scrollLeft)
  $tableColumnBar!.value!.scrollLeft = e.scrollLeft
  $tableRowBar!.value!.scrollTop = e.scrollTop
}

onMounted(() => {
  // let $tableColumnBar = ref<HTMLDivElement>()
  // console.log([$tableColumnBar.value])
  // console.log([$tableRowBar.value])
})

</script>

<style lang="scss" scoped>
$cell-border-color: #ededed;

.edit-table-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  font-size: 14px;
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

      .column-item {
        box-sizing: border-box;
        display: inline-block;
        width: 80px;
        height: 34px;
        line-height: 34px;
        text-align: center;
        border: 1px $cell-border-color solid;
      }
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

      .row-item {
        box-sizing: border-box;
        display: inline-block;
        width: 34px;
        height: 34px;
        line-height: 34px;
        padding: 0 4px;
        border: 1px $cell-border-color solid;
      }
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
        // width: 2000px;
        // height: 2000px;
        background-color: #fff;
        // linear-gradient 参数可理解为：边线水平向角度，边线颜色，边线宽度起始值，填充色，边线宽度结束值
        // 边线宽度 = Math.abs(边线宽度起始值 - 边线宽度结束值)
        background-image:
          linear-gradient(90deg, $cell-border-color 1px, transparent 0px),
          linear-gradient(0deg, $cell-border-color 1px, transparent 0px);
        // background-position-x: -1px; // 取消左边第一根竖线
        background-size: 80px 34px; // 格子宽高
      }

    }
  }
}
</style>