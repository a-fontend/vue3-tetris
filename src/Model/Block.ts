/**
 * 16方格块组成的，各类方块
 */
const BlockModelList = [
  {
    key: "T",
    shape: [
      [1, 1, 1],
      [0, 1, 0],
    ],
    source: [
      [0, 0],
      [1, 0],
      [-1, 1],
      [0, -1],
    ],
    x: -1,
    y: 4,
  },
  {
    key: "L",
    shape: [
      [1, 0, 0],
      [1, 1, 1],
    ],
    source: [[0, 0]],
    x: -1,
    y: 4,
  },
  {
    key: "O",
    shape: [
      [1, 1],
      [1, 1],
    ],
    source: [[0, 0]],
    x: -1,
    y: 4,
  },
  {
    key: "I",
    shape: [[1, 1, 1, 1]],
    source: [
      [-1, 1],
      [1, -1],
    ],
    x: 0,
    y: 3,
  },
  {
    key: "Z",
    shape: [
      [1, 1, 0],
      [0, 1, 1],
    ],
    source: [[0, 0]],
    x: -1,
    y: 4,
  },
];

class Block {
  private _key; // 方块的类别
  private _shape; // 对应形状
  private _source; // 源点
  private _x; // 对应在矩阵的x , 也就是列
  private _y; // 对应在矩阵的y , 也就是行
  private _rotateIdx; // 旋转到第几次了

  public get key() {
    return this._key;
  }
  public set key(value) {
    this._key = value;
  }

  public get shape() {
    return this._shape;
  }
  public set shape(value) {
    this._shape = value;
  }

  public get source() {
    return this._source;
  }
  public set source(value) {
    this._source = value;
  }

  public get x() {
    return this._x;
  }
  public set x(value) {
    this._x = value;
  }

  public get y() {
    return this._y;
  }
  public set y(value) {
    this._y = value;
  }

  public get rotateIdx() {
    return this._rotateIdx;
  }
  public set rotateIdx(value) {
    this._rotateIdx = value;
  }

  constructor(
    key: string,
    shape: number[][],
    source: number[][],
    x: number,
    y: number,
    rotateIdx = 0
  ) {
    this._key = key;
    this._shape = shape;
    this._source = source;
    this._x = x;
    this._y = y;
    this._rotateIdx = rotateIdx;
  }

  public randomRenderBlock(): Block {
    const idx = Math.floor(Math.random() * BlockModelList.length);
    const { key, shape, source, x, y } = BlockModelList[idx];
    return new Block(key, shape, source, x, y);
  }

  public left(): Block {
    return new Block(
      this._key,
      this._shape,
      this._source,
      this._x,
      this._y - 1,
      this._rotateIdx
    );
  }

  public right(): Block {
    return new Block(
      this._key,
      this._shape,
      this._source,
      this._x,
      this._y + 1,
      this._rotateIdx
    );
  }

  public down(speed = 1): Block {
    return new Block(
      this._key,
      this._shape,
      this._source,
      this._x + speed,
      this._y,
      this._rotateIdx
    );
  }

  public rotate(): Block {
    const shape = this._shape;
    const newShape: number[][] = [];
    shape.forEach((row) =>
      row.forEach((val, colIdx) => {
        const idx = row.length - colIdx - 1;
        // 不满的就补齐
        if (newShape[idx] === undefined) {
          newShape[idx] = [];
        }

        newShape[idx].push(val);
        // 最后解构赋给行
        newShape[idx] = [...newShape[idx]];
      })
    );
    // 记录一下旋转的次数
    let newRotateIdx;
    // 如果旋转了一轮了, 就回到最初的状态
    if (this._rotateIdx + 1 >= this._source.length) {
      newRotateIdx = 0;
    } else {
      newRotateIdx = this._rotateIdx + 1;
    }
    const newX = this._x + this._source[this._rotateIdx][0];
    const newY = this._y + this._source[this._rotateIdx][1];

    return new Block(
      this._key,
      newShape,
      this._source,
      newX,
      newY,
      newRotateIdx
    );
  }
}

export default Block;
