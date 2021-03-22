<template>
  <div class="menu-container">
    <div class="left">
      <el-button
        size="medium"
        type="primary"
        circle
        plain
        :icon="state === 'start' ? 'el-icon-video-pause' : 'el-icon-video-play'"
        style="transform: scale(2)"
        @click="keyEvents('Space')"
      />
    </div>
    <div class="right">
      <div class="up_btn">
        <el-button
          size="medium"
          icon="el-icon-caret-top"
          type="primary"
          circle
          @click="keyEvents('ArrowUp')"
        />
      </div>
      <div class="left_right_btns">
        <el-button
          size="medium"
          icon="el-icon-caret-left"
          type="primary"
          circle
          @click="keyEvents('ArrowLeft')"
        />
        <el-button
          size="medium"
          icon="el-icon-caret-right"
          type="primary"
          circle
          @click="keyEvents('ArrowRight')"
        />
      </div>
      <div class="down_btn">
        <el-button
          size="medium"
          icon="el-icon-caret-bottom"
          type="primary"
          circle
          @click="keyEvents('ArrowDown')"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    state: {
      type: String,
      required: true,
    },
    keyEvents: {
      type: Function,
      required: true,
    },
  },
});
</script>
<style lang="less" scoped>
.menu-container {
  border: 3px solid #67c23a;
  border-top: none;
  background: #e1f3d8;
  display: flex;
  justify-content: center;
  flex-grow: 1;
  .left {
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .right {
    padding-top: 2px;
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .up_btn,
    .left_right_btns,
    .down_btn {
      width: 100%;
      display: flex;
      justify-content: space-evenly;
    }
  }
}
</style>
