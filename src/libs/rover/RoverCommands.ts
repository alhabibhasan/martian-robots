import { MarsGrid } from "./MarsGrid";
import { MarsRobot } from "./MarsRobot";

export interface ICommand {
  execute(): void;
}

export class MoveForwardCommand implements ICommand {
  constructor(private robot: MarsRobot, private grid: MarsGrid) {}

  execute(): void {
    let { x, y, orientation } = this.robot;

    switch (orientation) {
      case "N":
        this.robot.lastKnownY = y;
        if (!this.grid.hasScent(x, y + 1) && !this.robot.isLost()) {
          this.robot.y += 1;
        }
        break;
      case "S":
        this.robot.lastKnownY = y;
        if (!this.grid.hasScent(x, y - 1) && !this.robot.isLost()) {
          this.robot.y -= 1;
        }
        break;
      case "E":
        this.robot.lastKnownX = x;
        if (!this.grid.hasScent(x + 1, y) && !this.robot.isLost()) {
          this.robot.x += 1;
        }
        break;
      case "W":
        this.robot.lastKnownX = x;
        if (!this.grid.hasScent(x - 1, y) && !this.robot.isLost()) {
          this.robot.x -= 1;
        }
        break;
    }
  }
}

export class TurnLeftCommand implements ICommand {
  constructor(private robot: MarsRobot) {}

  execute(): void {
    let { orientation } = this.robot;

    switch (orientation) {
      case "N":
        this.robot.orientation = "W";
        break;
      case "S":
        this.robot.orientation = "E";
        break;
      case "E":
        this.robot.orientation = "N";
        break;
      case "W":
        this.robot.orientation = "S";
        break;
    }
  }
}

export class TurnRightCommand implements ICommand {
  constructor(private robot: MarsRobot) {}

  execute(): void {
    let { orientation } = this.robot;

    switch (orientation) {
      case "N":
        this.robot.orientation = "E";
        break;
      case "S":
        this.robot.orientation = "W";
        break;
      case "E":
        this.robot.orientation = "S";
        break;
      case "W":
        this.robot.orientation = "N";
        break;
    }
  }
}
