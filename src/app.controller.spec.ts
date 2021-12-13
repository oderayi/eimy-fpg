import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Board } from './lib/types';

describe('AppController', () => {
  let appController: AppController;
  const board: Board = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1],
    [0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1],
    [0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];
  const largestRectangle = [
    { x: 8, y: 7 },
    { x: 8, y: 6 },
    { x: 8, y: 5 },
    { x: 8, y: 4 },
    { x: 7, y: 7 },
    { x: 7, y: 6 },
    { x: 7, y: 5 },
    { x: 7, y: 4 },
    { x: 6, y: 7 },
    { x: 6, y: 6 },
    { x: 6, y: 5 },
    { x: 6, y: 4 },
    { x: 5, y: 7 },
    { x: 5, y: 6 },
    { x: 5, y: 5 },
    { x: 5, y: 4 },
  ];
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('/largest-rectangle', () => {
    // FIXME: Test passes but not accurate.
    it('should return coordinates of the largest rectangle', () => {
      expect(appController.largestRectangle(board)).toStrictEqual(
        largestRectangle,
      );
    });
    it('should return empty list with zero selected cells', () => {
      const emptyBoard = Array(15)
        .fill(null)
        .map(() => Array(15).fill(0));
      expect(appController.largestRectangle(emptyBoard)).toStrictEqual([]);
    });
    it('should return entire board on fully selected board', () => {
      const fullySelectedBoard = Array(15)
        .fill(null)
        .map(() => Array(15).fill(1));
      expect(appController.largestRectangle(fullySelectedBoard).length).toBe(
        15 * 15,
      );
    });
  });
});
