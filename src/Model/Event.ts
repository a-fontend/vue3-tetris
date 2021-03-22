import Game from "./Game";

// export type keyType =
//   | "Space"
//   | "ArrowUp"
//   | "ArrowDown"
//   | "ArrowLeft"
//   | "ArrowRight"
//   | "KeyR"
class Event {
  public keyEvents(type: string, game: Game) {
    // 阻止非游戏状态下的操作
    if (type !== "Space" && game.state !== "start" && type !== "KeyR") {
      return;
    }
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
    switch (type) {
      case "Space":
        if (game.state === "over" || game.state === "pause") {
          game.start();
        } else if (game.state === "start") {
          game.pause();
        }
        return;

      case "ArrowLeft":
      case "KeyA":
        game.b_move("left");
        return;

      case "ArrowRight":
      case "KeyD":
        game.b_move("right");
        return;

      case "ArrowUp":
      case "KeyW":
        game.b_move("rotate");
        return;

      case "ArrowDown":
      case "KeyS":
        game.b_down();
        return;

      case "KeyR":
        game.refresh();
        return;
    }
  }
}

export default Event;
