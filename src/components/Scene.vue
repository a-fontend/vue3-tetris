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
    </div>
  </div>
</template>

<script lang="ts">
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
    .refresh-btn {
      height: 10%;
      margin-top: 10px;
      display: flex;
      justify-content: center;
      align-items: baseline;
    }
  }
}
</style>
