import { MarsGrid } from "../MarsGrid";
import { MarsRobot } from "../MarsRobot";
import {
  ICommand,
  MoveForwardCommand,
  TurnLeftCommand,
  TurnRightCommand,
} from "../RoverCommands";

describe("MoveForwardCommand", () => {
  let robot: MarsRobot;
  let grid: MarsGrid;
  let command: ICommand;

  beforeEach(() => {
    grid = new MarsGrid(5, 5);
    robot = new MarsRobot(1, 2, "N", grid);
    command = new MoveForwardCommand(robot, grid);
  });

  it("should move the robot forward when facing North", () => {
    command.execute();
    expect(robot.x).toBe(1);
    expect(robot.y).toBe(3);
  });

  it("should move the robot forward when facing South", () => {
    robot.orientation = "S";
    command.execute();
    expect(robot.x).toBe(1);
    expect(robot.y).toBe(1);
  });

  it("should move the robot forward when facing East", () => {
    robot.orientation = "E";
    command.execute();
    expect(robot.x).toBe(2);
    expect(robot.y).toBe(2);
  });

  it("should move the robot forward when facing West", () => {
    robot.orientation = "W";
    command.execute();
    expect(robot.x).toBe(0);
    expect(robot.y).toBe(2);
  });

  it("should not move the robot if it is lost", () => {
    jest.spyOn(robot, "isLost").mockReturnValue(true);
    command.execute();
    expect(robot.x).toBe(1);
    expect(robot.y).toBe(2);
  });

  it("should not move the robot if there is a scent on the grid", () => {
    jest.spyOn(grid, "hasScent").mockReturnValue(true);
    command.execute();
    expect(robot.x).toBe(1);
    expect(robot.y).toBe(2);
  });
});

describe("TurnLeftCommand", () => {
  let robot: MarsRobot;
  let command: ICommand;

  beforeEach(() => {
    robot = new MarsRobot(1, 2, "N", new MarsGrid(5, 5));
    command = new TurnLeftCommand(robot);
  });

  it("should turn the robot left when facing North", () => {
    command.execute();
    expect(robot.orientation).toBe("W");
  });

  it("should turn the robot left when facing South", () => {
    robot.orientation = "S";
    command.execute();
    expect(robot.orientation).toBe("E");
  });

  it("should turn the robot left when facing East", () => {
    robot.orientation = "E";
    command.execute();
    expect(robot.orientation).toBe("N");
  });

  it("should turn the robot left when facing West", () => {
    robot.orientation = "W";
    command.execute();
    expect(robot.orientation).toBe("S");
  });
});

describe("TurnRightCommand", () => {
  let robot: MarsRobot;
  let command: ICommand;

  beforeEach(() => {
    robot = new MarsRobot(1, 2, "N", new MarsGrid(5, 5));
    command = new TurnRightCommand(robot);
  });

  it("should turn the robot right when facing North", () => {
    command.execute();
    expect(robot.orientation).toBe("E");
  });

  it("should turn the robot right when facing South", () => {
    robot.orientation = "S";
    command.execute();
    expect(robot.orientation).toBe("W");
  });

  it("should turn the robot right when facing East", () => {
    robot.orientation = "E";
    command.execute();
    expect(robot.orientation).toBe("S");
  });

  it("should turn the robot right when facing West", () => {
    robot.orientation = "W";
    command.execute();
    expect(robot.orientation).toBe("N");
  });
});
