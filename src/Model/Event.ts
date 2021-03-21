import Game from "./Game";

class Event {
  public key_space(game: Game) {
    if (game.state === "over" || game.state === "pause") {
      game.start();
    } else if (game.state === "start") {
      game.pause();
    }
  }

  public key_left(game: Game) {
    game.b_move("left");
  }

  public key_right(game: Game) {
    game.b_move("right");
  }

  public key_up(game: Game) {
    game.b_move("rotate");
  }

  public key_down(game: Game) {
    game.b_down();
  }

  public key_refresh(game: Game) {
    game.refresh();
  }
}

export default Event;
