import { MarsRobot } from "../MarsRobot";
import { MarsGrid } from "../MarsGrid";
import { ICommand } from "../RoverCommands";

class MockCommand implements ICommand {
  execute(): void {
    // Mock command execution
  }
}

describe("MarsRobot", () => {
  let marsRobot: MarsRobot;
  let mockGrid: MarsGrid;

  beforeEach(() => {
    mockGrid = new MarsGrid(5, 5);
    marsRobot = new MarsRobot(1, 2, "N", mockGrid);
  });

  it("should add a command to the command list", () => {
    const mockCommand: ICommand = new MockCommand();
    marsRobot.addCommand(mockCommand);
    expect(marsRobot["commands"]).toContain(mockCommand);
  });

  it("should execute commands and update the robot position", () => {
    const mockCommand1: ICommand = new MockCommand();
    const mockCommand2: ICommand = new MockCommand();
    const mockCommand3: ICommand = new MockCommand();
    jest.spyOn(mockCommand1, "execute");
    jest.spyOn(mockCommand2, "execute");
    jest.spyOn(mockCommand3, "execute");

    marsRobot.addCommand(mockCommand1);
    marsRobot.addCommand(mockCommand2);
    marsRobot.addCommand(mockCommand3);
    marsRobot.executeCommands();

    expect(mockCommand1.execute).toHaveBeenCalled();
    expect(mockCommand2.execute).toHaveBeenCalled();
    expect(mockCommand3.execute).toHaveBeenCalled();
  });

  it("should add a scent to the grid if the robot is lost and off the grid", () => {
    const mockCommand: ICommand = new MockCommand();
    jest.spyOn(mockGrid, "isOffGrid").mockReturnValue(true);
    jest.spyOn(mockGrid, "hasScent").mockReturnValue(false);
    jest.spyOn(mockGrid, "addScent");

    marsRobot.addCommand(mockCommand);
    marsRobot.executeCommands();

    expect(mockGrid.addScent).toHaveBeenCalledWith(marsRobot.x, marsRobot.y);
  });

  it("should correctly determine if the robot is lost", () => {
    jest.spyOn(mockGrid, "isOffGrid").mockReturnValue(true);
    jest.spyOn(mockGrid, "hasScent").mockReturnValue(false);

    expect(marsRobot.isLost()).toBe(true);

    jest.spyOn(mockGrid, "isOffGrid").mockReturnValue(false);
    jest.spyOn(mockGrid, "hasScent").mockReturnValue(true);

    expect(marsRobot.isLost()).toBe(true);

    jest.spyOn(mockGrid, "isOffGrid").mockReturnValue(false);
    jest.spyOn(mockGrid, "hasScent").mockReturnValue(false);

    expect(marsRobot.isLost()).toBe(false);
  });

  it("should return the correct position report", () => {
    jest.spyOn(marsRobot, "isLost").mockReturnValue(true);
    jest.spyOn(mockGrid, "hasScent").mockReturnValue(false);
    expect(marsRobot.reportPosition()).toBe("1 2 N LOST");

    jest.spyOn(marsRobot, "isLost").mockReturnValue(true);
    jest.spyOn(mockGrid, "hasScent").mockReturnValue(true);
    expect(marsRobot.reportPosition()).toBe("1 2 N LOST");

    jest.spyOn(marsRobot, "isLost").mockReturnValue(false);
    jest.spyOn(mockGrid, "hasScent").mockReturnValue(false);
    expect(marsRobot.reportPosition()).toBe("1 2 N");

    jest.spyOn(marsRobot, "isLost").mockReturnValue(false);
    jest.spyOn(mockGrid, "hasScent").mockReturnValue(true);
    expect(marsRobot.reportPosition()).toBe("1 2 N");
  });
});
