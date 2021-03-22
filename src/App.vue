<template>
  <div class="app">
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
    <Menu
      :state="game.state"
      :keySpace="keySpace"
      :keyUp="keyUp"
      :keyDown="keyDown"
      :keyLeft="keyLeft"
      :keyRight="keyRight"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, reactive } from "vue";
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
    const game = reactive<GameClass>(
      new GameClass("over", 10, 20, 20, 2)
    ) as GameClass;

    const event = new EventClass();

    const keySpace = () => {
      event.key_space(game);
    };
    const keyDown = () => {
      event.key_down(game);
    };
    const keyUp = () => {
      event.key_up(game);
    };
    const keyLeft = () => {
      event.key_left(game);
    };
    const keyRight = () => {
      event.key_right(game);
    };
    const keyRefresh = () => {
      event.key_refresh(game);
    };

    const keyEvents = (e: KeyboardEvent) => {
      switch (e.code) {
        case "Space":
          keySpace();
          return;
        case "ArrowUp":
          keyUp();
          return;
        case "ArrowLeft":
          keyLeft();
          return;
        case "ArrowRight":
          keyRight();
          return;
        case "ArrowDown":
          keyDown();
          return;
        case "KeyR":
          keyRefresh();
          return;
      }
    };

    onMounted(() => {
      window.addEventListener("keydown", keyEvents);
    });

    onUnmounted(() => {
      window.removeEventListener("keydown", keyEvents);
    });

    return {
      game,
      keySpace,
      keyDown,
      keyUp,
      keyLeft,
      keyRight,
      keyRefresh,
    };
  },
});
</script>

<style>
#app {
  display: flex;
  justify-content: center;
  align-items: center;
}
.app {
  height: 500px;
}
</style>
