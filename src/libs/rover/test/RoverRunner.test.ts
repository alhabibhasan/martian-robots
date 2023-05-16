import { MarsGrid } from '../MarsGrid';
import {
  MoveForwardCommand,
  TurnLeftCommand,
  TurnRightCommand,
} from '../RoverCommands';
import { RoverRunner } from '../RoverRunner';

describe('parseInput', () => {
  it('should parse input correctly and return grid and robot information', () => {
    const roverRunner = new RoverRunner()
    const input = '5 5\n1 2 N\nLRF\n3 4 E\nRRFF';
    const result = roverRunner.parseInput(input);

    expect(result.robots.length).toBe(2);

    const robot1 = result.robots[0];
    expect(robot1.x).toBe(1);
    expect(robot1.y).toBe(2);
    expect(robot1.orientation).toBe('N');
    expect(robot1.grid instanceof MarsGrid).toBe(true);

    expect(robot1['commands'].length).toBe(3);
    expect(robot1['commands'][0] instanceof TurnLeftCommand).toBe(true);
    expect(robot1['commands'][1] instanceof TurnRightCommand).toBe(true);
    expect(robot1['commands'][2] instanceof MoveForwardCommand).toBe(true);

    const robot2 = result.robots[1];
    expect(robot2.x).toBe(3);
    expect(robot2.y).toBe(4);
    expect(robot2.orientation).toBe('E');
    expect(robot2.grid instanceof MarsGrid).toBe(true);

    expect(robot2['commands'].length).toBe(4);
    expect(robot2['commands'][0] instanceof TurnRightCommand).toBe(true);
    expect(robot2['commands'][1] instanceof TurnRightCommand).toBe(true);
    expect(robot2['commands'][2] instanceof MoveForwardCommand).toBe(true);
    expect(robot2['commands'][3] instanceof MoveForwardCommand).toBe(true);
  });
});

describe('solve', () => {
  it('should solve the input and return the correct result', () => {
    const roverRunner = new RoverRunner()
    const input = '5 5\n1 2 N\nLRF\n3 4 E\nRRFF';
    const result = roverRunner.solve(input);

    const expectedOutput = '1 3 N\n1 4 W';

    expect(result).toBe(expectedOutput);
  });
});
