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
        @click="keySpace()"
      />
    </div>
    <div class="right">
      <div class="up_btn">
        <el-button
          size="small"
          icon="el-icon-caret-top"
          type="primary"
          circle
          @click="keyUp()"
        />
      </div>
      <div class="left_right_btns">
        <el-button
          size="small"
          icon="el-icon-caret-left"
          type="primary"
          circle
          @click="keyLeft()"
        />
        <el-button
          size="small"
          icon="el-icon-caret-right"
          type="primary"
          circle
          @click="keyRight()"
        />
      </div>
      <div class="down_btn">
        <el-button
          size="small"
          icon="el-icon-caret-bottom"
          type="primary"
          circle
          @click="keyDown()"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";

export default defineComponent({
  props: {
    state: {
      type: String,
      required: true,
    },
    keySpace: {
      type: Function,
    },
    keyUp: {
      type: Function,
    },
    keyDown: {
      type: Function,
    },
    keyLeft: {
      type: Function,
    },
    keyRight: {
      type: Function,
    },
  },
  setup(props) {
    onMounted(() => {
      console.log(props);
    });
  },
});
</script>
<style lang="less" scoped>
.menu-container {
  height: 100px;
  border: 3px solid #67c23a;
  border-top: none;
  background: #e1f3d8;
  display: flex;
  justify-content: center;

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
