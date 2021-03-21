import Game from "./Game";

class Event {
  // 空格事件
  public key_space(game: Game) {
    if (game.state === "over" || game.state === "pause") {
      game.start();
    } else if (game.state === "start") {
      game.pause();
    }
  }

  // 左移事件
  public key_left(game: Game) {
    game.b_move("left");
  }

  // 右移事件
  public key_right(game: Game) {
    game.b_move("right");
  }

  // 旋转
  public key_up(game: Game) {
    game.b_move("rotate");
  }

  // 加速下落
  public key_down(game: Game) {
    game.b_down();
  }

  // 刷新
  public key_refresh(game: Game) {
    game.refresh();
  }
}

export default Event;
