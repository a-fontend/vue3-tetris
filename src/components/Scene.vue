<template>
  <div
    class="scence-container"
    :style="{
      padding: `${paddingSize}px`,
    }"
  >
    <div class="game">
      <el-row v-for="(rowItem, rowIdx) in matrix" :key="rowIdx">
        <Cell
          v-for="(col, colIdx) in rowItem"
          :key="colIdx"
          :size="cellSize"
          :paddingSize="paddingSize"
          :value="col"
        />
      </el-row>
    </div>
    <div class="controller">
      <div class="refresh-btn">
        <el-button
          type="danger"
          circle
          size="small"
          icon="el-icon-refresh"
          plain
          @click="keyRefresh()"
        />
      </div>
      <div class="score">
        <span>分数: </span>
        <span>{{ score }}</span>
      </div>
      <div class="next_block">
        <span>Next</span>
        <el-row v-for="(rowItem, rowIdx) in nextBlock.shape" :key="rowIdx">
          <Cell
            v-for="(col, colIdx) in rowItem"
            :key="colIdx"
            :size="cellSize - 5"
            :paddingSize="paddingSize"
            :value="col"
          />
        </el-row>
      </div>
      <div class="options-info">
        <p>操作提示</p>
        <div>
          <span>空格：</span>
          <span>开始/暂停</span>
        </div>
        <div>
          <span>R：</span>
          <span>刷新</span>
        </div>
        <div>
          <span>↑/W：</span>
          <span>旋转</span>
        </div>
        <div>
          <span>←/S：</span>
          <span>左移</span>
        </div>
        <div>
          <span>→/D：</span>
          <span>右移</span>
        </div>
        <div>
          <span>↓/S：</span>
          <span>加速</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Block from "@/Model/Block";
import { defineComponent } from "vue";
import Cell from "./Cell.vue";

export default defineComponent({
  name: "Scene",
  props: {
    cellSize: {
      type: Number,
      required: true,
    },
    paddingSize: {
      type: Number,
      required: true,
    },
    matrix: {
      type: Array,
      required: true,
    },
    nextBlock: {
      type: Block,
      required: true,
    },
    score: {
      type: Number,
      required: true,
    },
    keyRefresh: {
      type: Function,
    },
  },
  components: {
    Cell,
  },
});
</script>

<style lang="less" scoped>
.scence-container {
  border: 3px solid #67c23a;
  background-color: #e1f3d8;
  display: flex;
  .controller {
    flex-grow: 1;
    display: flex;
    padding: 20px 5px;
    font-size: 14px;
    font-weight: bolder;
    color: #79bbff;
    flex-direction: column;
    justify-content: space-between;

    .refresh-btn {
      height: 10%;
      display: flex;
      justify-content: center;
      align-items: baseline;
    }
    .next_block {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      span {
        padding-bottom: 5px;
      }
    }
    .score {
      text-align: center;
    }
    .options-info {
      p {
        font-size: 14px;
        text-align: center;
        margin-bottom: 5px;
      }
      div {
        font-size: 12px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        span {
          text-align: start;
        }
      }
    }
  }
}
</style>
