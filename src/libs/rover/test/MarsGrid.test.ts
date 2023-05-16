import { MarsGrid } from "../MarsGrid";

describe("MarsGrid", () => {
  let marsGrid: MarsGrid;

  beforeEach(() => {
    marsGrid = new MarsGrid(5, 5);
  });

  it("should initialize a MarsGrid with the correct dimensions", () => {
    expect(marsGrid.maxX).toEqual(5);
    expect(marsGrid.maxY).toEqual(5);
  });

  it("should return true if coordinates are off the grid", () => {
    expect(marsGrid.isOffGrid(-1, 3)).toBe(true);
    expect(marsGrid.isOffGrid(3, -1)).toBe(true);
    expect(marsGrid.isOffGrid(6, 3)).toBe(true);
    expect(marsGrid.isOffGrid(3, 6)).toBe(true);
  });

  it("should return false if coordinates are within the grid", () => {
    expect(marsGrid.isOffGrid(0, 0)).toBe(false);
    expect(marsGrid.isOffGrid(5, 5)).toBe(false);
    expect(marsGrid.isOffGrid(2, 4)).toBe(false);
  });

  it("should return false for coordinates without a scent", () => {
    expect(marsGrid.hasScent(3, 3)).toBe(false);
    expect(marsGrid.hasScent(1, 4)).toBe(false);
  });

  it("should return true for coordinates with a scent", () => {
    marsGrid.addScent(3, 3);
    marsGrid.addScent(1, 4);
    expect(marsGrid.hasScent(3, 3)).toBe(true);
    expect(marsGrid.hasScent(1, 4)).toBe(true);
  });
});
