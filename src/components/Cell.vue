<template>
  <div
    :class="value === 0 ? 'block' : 'block-active'"
    :style="{
      width: `${size}rem`,
      height: `${size}rem`,
      padding: `${paddingSize}px`,
    }"
  >
    <div
      :class="value === 0 ? 'block-container' : 'block-active-container'"
    ></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    size: Number,
    paddingSize: Number,
    value: Number,
  },
});
</script>

<style lang="less" scoped>
.block {
  display: inline-block;
  border: 2px solid #dcdfe6;
  box-sizing: border-box;
  margin: "1px";
  &-active {
    display: inline-block;
    border: 2px solid #409eff;
    box-sizing: border-box;
    &-container {
      width: 100%;
      height: 100%;
      background: #409eff;
    }
  }
  &-container {
    width: 100%;
    height: 100%;
    background: #ebeef5;
  }
}
</style>
