import { MarsGrid } from "./MarsGrid";
import { MarsRobot } from "./MarsRobot";
import {
  MoveForwardCommand,
  TurnLeftCommand,
  TurnRightCommand,
} from "./RoverCommands";

export interface IRunner {
  solve(input: string): string
}

export class RoverRunner implements IRunner {
  public parseInput(input: string): {
    robots: MarsRobot[];
  } {
    const lines = input
      .trim()
      .split("\n")
      .filter((input) => input.length > 0);
    const [maxX, maxY] = lines[0].split(" ").map(Number);
    const robots: MarsRobot[] = [];
  
    const grid = new MarsGrid(maxX, maxY);
  
    for (let i = 1; i < lines.length; i += 2) {
      const [x, y, orientation] = lines[i].split(" ");
      const instructions = lines[i + 1];
  
      const robot = new MarsRobot(Number(x), Number(y), orientation, grid);
  
      for (let j = 0; j < instructions.length; j++) {
        const command = instructions[j];
        switch (command) {
          case "L":
            robot.addCommand(new TurnLeftCommand(robot));
            break;
          case "R":
            robot.addCommand(new TurnRightCommand(robot));
            break;
          case "F":
            robot.addCommand(new MoveForwardCommand(robot, robot.grid));
            break;
        }
      }
  
      robots.push(robot);
    }
  
    return { robots };
  }
  
  public solve(input: string) {
    const { robots } = this.parseInput(input);
    const results: string[] = [];
  
    for (const robot of robots) {
      robot.executeCommands();
  
      results.push(`${robot.reportPosition()}`);
    }
  
    return results.join("\n");
  }
}

