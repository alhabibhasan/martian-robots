
export interface IGrid {
  isOffGrid(x: number, y: number): boolean,
  hasScent(x: number, y: number): boolean,
  addScent(x: number, y: number): void
}

export class MarsGrid implements IGrid {
  private scents: boolean[][];

  constructor(public maxX: number, public maxY: number) {
    this.scents = Array(maxX + 1)
      .fill(false)
      .map(() => Array(maxY + 1).fill(false));
  }

  isOffGrid(x: number, y: number) {
    return x < 0 || y < 0 || x > this.maxX || y > this.maxY;
  }

  hasScent(x: number, y: number) {
    return this.scents[x][y];
  }

  addScent(x: number, y: number) {
    this.scents[x][y] = true;
  }
}
