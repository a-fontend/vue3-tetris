import Block from "@/Model/Block";
import { ElMessage } from "element-plus";

class Game {
  private _state: "start" | "pause" | "over"; // 游戏状态
  private _width: number; // 宽度格子数
  private _height: number; // 高度上的格子数
  private _cellSize: number; // 单元格的大小
  private _paddingSize: number; // padding 尺寸
  private _matrix: number[][]; // 矩阵数据
  private _curBlock: Block; // 当前在移动的方块
  private _nextBlock: Block; // 下一次的方块
  private _downInterval?: NodeJS.Timeout; // 自动下落的计时器的 time
  private _speed: number; // 下落速度，也就是 setTimeout 的延时
  private _score: number; //分数统计

  public get state(): "start" | "pause" | "over" {
    return this._state;
  }
  public set state(value: "start" | "pause" | "over") {
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
  public get score(): number {
    return this._score;
  }
  public set score(value: number) {
    this._score = value;
  }

  constructor(
    state: "over" | "start" | "pause",
    width = 10,
    height = 20,
    cellSize = 20,
    paddingSize = 2,
    speed = 500,
    score = 0,
    downInterval = undefined
  ) {
    this._state = state;
    this._height = height;
    this._width = width;
    this._cellSize = cellSize;
    this._paddingSize = paddingSize;
    this._matrix = this.renderDefaultMatrix();
    this._curBlock = Block.prototype.randomRenderBlock();
    this._nextBlock = Block.prototype.randomRenderBlock();
    this._speed = speed;
    this._downInterval = downInterval;
    this._score = score;
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
    // 这里是因为，constructor 直接时调用两次 random
    // Math.random 时间戳种子伪随机，然后每次初始化都会出两个一个样的
    if (this._state === "over") {
      this._curBlock = this._nextBlock;
      this._nextBlock = Block.prototype.randomRenderBlock();
    }
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
    this._score = 0;
    this._matrix = this.renderDefaultMatrix();
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
    // 方块的宽度
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
      // 如果可以清除，那就同时也更新分数
      // 加一的操作就是, 如果同时清了很多行，分数也多加一点
      this.computedScore(clearArr.length * (this._width + 1) - 1);
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

  // 渲染默认矩阵, 也就是空白矩阵
  private renderDefaultMatrix(): number[][] {
    const defaultMatrix: number[][] = [[]];
    for (let i = 0; i < this._height; i++) {
      defaultMatrix[i] = new Array(this._width).fill(0);
    }
    return defaultMatrix;
  }

  // 渲染最新的矩阵
  // 触底的方块在矩阵中值设为 2 和移动中的方块进行区分
  private renderNewMatrix(curBlock: Block, matrix: number[][], data: number) {
    const { shape, x, y } = curBlock;
    const newMatrix: number[][] = JSON.parse(JSON.stringify(matrix));
    const clearArr = this.clearLine(matrix);
    let idx = 0;
    newMatrix.some((row) => {
      row.some((val, colIdx, arr) => {
        if (val === 1) {
          arr[colIdx] = 0;
          idx++;
        }
        // 如果已经清除了 4 个就跳出
        if (idx >= 4) {
          return true;
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
    return newMatrix;
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
        // 触底的时候检查能否消除行
        const newMatrix: number[][] = this.renderNewMatrix(
          this._curBlock,
          this._matrix,
          2
        );
        const canClearLine = this.clearLine(newMatrix);
        this.nextAround(canClearLine ? canClearLine : newMatrix);
      }
    };
    clearTimeout(this._downInterval as NodeJS.Timeout);
    this._downInterval = setTimeout(downWithTimeout, this._speed);
  }

  // 一个方块结束, 触发下一个
  private nextAround(matrix: number[][]) {
    clearTimeout(this._downInterval as NodeJS.Timeout);
    this._matrix = matrix;
    setTimeout(() => {
      this._curBlock = this._nextBlock;
      this._nextBlock = Block.prototype.randomRenderBlock();
      this.autoDown();
    }, 100);
  }

  // 更新分数
  private computedScore(n: number) {
    this._score = this._score + n;
  }
}

export default Game;
