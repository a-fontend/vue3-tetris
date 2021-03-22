<template>
  <div
    class="container"
    :style="{ width: `${(game.width + 6) * game.cellSize}rem` }"
  >
    <Scene
      :widthNum="game.width"
      :heightNum="game.height"
      :cellSize="game.cellSize"
      :paddingSize="game.paddingSize"
      :matrix="game.matrix"
      :nextBlock="game.nextBlock"
      :keyRefresh="keyRefresh"
      :score="game.score"
    />
    <Menu :state="game.state" :keyEvents="keyMobile" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, reactive, ref } from "vue";
import Scene from "./components/Scene.vue";
import Menu from "./components/Menu.vue";
import GameClass from "@/Model/Game";
import EventClass from "@/Model/Event";

export default defineComponent({
  name: "App",
  components: {
    Scene,
    Menu,
  },
  setup() {
    const heightNum = ref(24);
    const widthNum = ref(12);
    const offsetWidth = document.documentElement.clientWidth;
    if (offsetWidth >= 1200) {
      document.documentElement.style.fontSize = 14 + "px";
      heightNum.value = 20;
    }
    // 以 plus 为断点
    if (offsetWidth <= 500 && offsetWidth >= 340) {
      document.documentElement.style.fontSize = 10 + "px";
    }

    // 如果真的还有人在用 iphone5 的话
    if (offsetWidth <= 340) {
      document.documentElement.style.fontSize = 10 + "px";
      heightNum.value = 16;
      widthNum.value = 8;
    }

    const game = reactive<GameClass>(
      new GameClass("over", widthNum.value, heightNum.value, 2, 2)
    ) as GameClass;

    const eventInstance = new EventClass();

    const keyEvents = (e: KeyboardEvent) => {
      eventInstance.keyEvents(e.code, game);
    };
    const keyMobile = (type: string) => {
      eventInstance.keyEvents(type, game);
    };
    const keyRefresh = () => {
      eventInstance.keyEvents("KeyR", game);
    };

    onMounted(() => {
      window.addEventListener("keydown", keyEvents);
    });

    onUnmounted(() => {
      window.removeEventListener("keydown", keyEvents);
    });

    return {
      game,
      keyEvents,
      keyMobile,
      keyRefresh,
    };
  },
});
</script>

<style>
html,
body {
  font-size: 14px;
  width: 100%;
  height: 100%;
}
#app {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.container {
  height: 100%;
  /* height: 35rem; */
  display: flex;
  flex-flow: column nowrap;
}
</style>
