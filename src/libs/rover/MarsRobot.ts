import { MarsGrid } from "./MarsGrid";
import { ICommand } from "./RoverCommands";

export interface IRobot {
  addCommand(command: ICommand):void,
  executeCommands(): void,
  isLost():boolean,
  reportPosition(): string
}

export class MarsRobot implements IRobot {
  private commands: ICommand[];

  constructor(
    public x: number,
    public y: number,
    public orientation: string,
    public grid: MarsGrid,
    public lastKnownX?: number,
    public lastKnownY?: number
  ) {
    this.commands = [];
  }

  public addCommand(command: ICommand) {
    this.commands.push(command);
  }

  public executeCommands() {
    for (const command of this.commands) {
      command.execute();

      if (
        this.grid.isOffGrid(this.x, this.y) &&
        !this.grid.hasScent(this.x, this.y)
      ) {
        this.grid.addScent(this.x, this.y);
      }

      if (this.isLost()) {
        break;
      }
    }
  }

  public isLost() {
    return (
      this.grid.isOffGrid(this.x, this.y) || this.grid.hasScent(this.x, this.y)
    );
  }

  public reportPosition() {
    if (this.isLost()) {
      return `${this.lastKnownX ? this.lastKnownX : this.x} ${
        this.lastKnownY ? this.lastKnownY : this.y
      } ${this.orientation} LOST`;
    }
    return `${this.x} ${this.y} ${this.orientation}`;
  }
}
