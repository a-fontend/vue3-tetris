import Block from "@/Model/Block";
import { ElMessage } from "element-plus";

class Game {
  private _state: string;
  private _width: number;
  private _height: number;
  private _cellSize: number;
  private _paddingSize: number;
  private _matrix: number[][];
  private _curBlock: Block;
  private _nextBlock: Block;
  private _downInterval?: NodeJS.Timeout;
  private _speed: number;

  public get state(): string {
    return this._state;
  }
  public set state(value: string) {
    this._state = value;
  }

  public get width(): number {
    return this._width;
  }
  public set width(value: number) {
    this._width = value;
  }

  public get height(): number {
    return this._height;
  }
  public set height(value: number) {
    this._height = value;
  }

  public get cellSize(): number {
    return this._cellSize;
  }
  public set cellSize(value: number) {
    this._cellSize = value;
  }

  public get paddingSize(): number {
    return this._paddingSize;
  }
  public set paddingSize(value: number) {
    this._paddingSize = value;
  }

  public get matrix(): number[][] {
    return this._matrix;
  }
  public set matrix(value: number[][]) {
    this._matrix = value;
  }

  public get curBlock(): Block {
    return this._curBlock;
  }
  public set curBlock(value: Block) {
    this._curBlock = value;
  }
  public get nextBlock(): Block {
    return this._nextBlock;
  }
  public set nextBlock(value: Block) {
    this._nextBlock = value;
  }
  public get speed(): number {
    return this._speed;
  }
  public set speed(value: number) {
    this._speed = value;
  }

  constructor(
    state = "over",
    width = 10,
    height = 20,
    cellSize = 20,
    paddingSize = 2,
    speed = 500,
    downInterval = undefined
  ) {
    this._state = state;
    this._height = height;
    this._width = width;
    this._cellSize = cellSize;
    this._paddingSize = paddingSize;
    const defaultMatrix: number[][] = [[]];
    for (let i = 0; i < height; i++) {
      defaultMatrix[i] = new Array(width).fill(0);
    }
    this._matrix = defaultMatrix;
    this._curBlock = Block.prototype.randomRenderBlock();
    this._nextBlock = Block.prototype.randomRenderBlock();
    this._speed = speed;
    this._downInterval = downInterval;
  }

  // 游戏结束判断
  public over(matrix: number[][]): boolean {
    //如果第一行的有下落方块就证明触顶了
    let flag = false;
    matrix[0].forEach((val) => {
      if (val === 2) {
        flag = true;
        this._state = "over";
        clearTimeout(this._downInterval as NodeJS.Timeout);
      }
    });
    return flag;
  }

  // 游戏开始
  public start() {
    this._state = "start";
    this.autoDown();
  }

  // 游戏暂停
  public pause() {
    this._state = "pause";
    clearTimeout(this._downInterval as NodeJS.Timeout);
  }

  // 刷新游戏
  public refresh() {
    clearTimeout(this._downInterval as NodeJS.Timeout);
    this._state = "over";
    this._height = 20;
    this._width = 10;
    this._cellSize = 20;
    this._paddingSize = 2;
    const defaultMatrix: number[][] = [[]];
    for (let i = 0; i < this._height; i++) {
      defaultMatrix[i] = new Array(this._width).fill(0);
    }
    this._matrix = defaultMatrix;
    this._curBlock = Block.prototype.randomRenderBlock();
    this._nextBlock = Block.prototype.randomRenderBlock();
    this._speed = 500;
    this._downInterval = undefined;
    return;
  }

  // 控制方块移动
  public b_move(options: "left" | "right" | "rotate") {
    const nextBlock = this._curBlock[options]();
    if (this.canNext(nextBlock)) {
      this._curBlock = nextBlock;
      this._matrix = this.renderNewMatrix(this._curBlock, this._matrix, 1);
    }
  }

  // 手动加速下坠
  public b_down() {
    clearTimeout(this._downInterval as NodeJS.Timeout);
    const nextBlock = this._curBlock.down();
    if (this.canNext(nextBlock)) {
      this._curBlock = nextBlock;
      this._matrix = this.renderNewMatrix(this._curBlock, this._matrix, 1);
    }
    this.autoDown();
  }

  // 下一位置是否合法
  public canNext(nextBlock: Block): boolean {
    const { x, y, shape } = nextBlock;
    // 最长的那条基准线的长度
    const baseLineLen = shape[0].length;
    return shape.every((row, rowIdx) =>
      row.every((val, colIdx) => {
        // 碰到左边
        if (y < 0) {
          return false;
        }

        // 碰到右边
        if (y + baseLineLen > this._width) {
          return false;
        }

        // 碰到底部
        if (x + rowIdx >= this._height) {
          return false;
        }

        // 从顶部出来是可以的
        if (x + rowIdx < 0) {
          return true;
        }

        // 方块模型碰到已经固定在矩阵中的部分
        if (val) {
          if (this._matrix[rowIdx + x][colIdx + y] === 2) {
            return false;
          }
          return true;
        }
        return true;
      })
    );
  }

  // 判断是否可以清除
  public clearLine(matrix: number[][]): number[][] | void {
    // 存储需要清除的行，因为可能同时很多行一起清除
    const clearArr: number[] = [];
    matrix.forEach((row, rowIdx) => {
      if (row.every((val) => val === 2)) {
        clearArr.push(rowIdx);
      }
    });

    if (clearArr.length > 0) {
      const newMatrix = JSON.parse(JSON.stringify(matrix));
      clearArr.forEach((rowIdx) => {
        newMatrix.splice(rowIdx, 1);
        //再追加一个空白行进去
        newMatrix.unshift(new Array(this._width).fill(0));
      });
      return newMatrix;
    }
    return;
  }

  // 渲染最新的矩阵
  private renderNewMatrix(curBlock: Block, matrix: number[][], data: number) {
    const { shape, x, y } = curBlock;
    const newMatrix: number[][] = JSON.parse(JSON.stringify(matrix));
    const clearArr = this.clearLine(matrix);
    newMatrix.forEach((row) => {
      row.forEach((val, colIdx, arr) => {
        if (val === 1) {
          arr[colIdx] = 0;
        }
      });
    });
    shape.forEach((row, rowIdx) =>
      row.forEach((val, colIdx) => {
        if (val && x + rowIdx >= 0) {
          const matrixRow = newMatrix[x + rowIdx];
          if (!clearArr) {
            matrixRow[y + colIdx] = data;
            newMatrix[x + rowIdx] = matrixRow;
          }
        }
      })
    );
    const canClearLine = this.clearLine(newMatrix);
    return canClearLine ? canClearLine : newMatrix;
  }

  // 方块自动下落
  private autoDown() {
    if (this.over(this._matrix)) {
      clearTimeout(this._downInterval as NodeJS.Timeout);
      ElMessage({
        type: "error",
        message: "Game Over! 重新开始吧！",
      });
      this.refresh();
      return;
    }
    const downWithTimeout = () => {
      const curBlock = this._curBlock;
      const nextBlock = curBlock.down();
      // 如果可以下落就将当前块置为下一状态
      if (this.canNext(nextBlock)) {
        this._curBlock = nextBlock;
        this._matrix = this.renderNewMatrix(this._curBlock, this._matrix, 1);
        this._downInterval = setTimeout(downWithTimeout, this._speed);
      } else {
        // 否则则触底
        const newMatrix: number[][] = this.renderNewMatrix(
          this._curBlock,
          this._matrix,
          2
        );
        this.nextAround(newMatrix);
      }
    };
    clearTimeout(this._downInterval as NodeJS.Timeout);
    this._downInterval = setTimeout(downWithTimeout, this._speed);
  }

  // 一个方块结束, 触发下一个
  private nextAround(matrix: number[][], stopDownTrigger?: VoidFunction) {
    clearTimeout(this._downInterval as NodeJS.Timeout);
    this._matrix = matrix;
    if (stopDownTrigger) {
      stopDownTrigger();
    }

    setTimeout(() => {
      this._curBlock = this._nextBlock;
      this._nextBlock = Block.prototype.randomRenderBlock();
      this.autoDown();
    }, 100);
  }
}

export default Game;
