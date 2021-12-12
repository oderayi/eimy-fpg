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
    {
      x: 5,
      y: 4,
    },
    {
      x: 5,
      y: 5,
    },
    {
      x: 5,
      y: 6,
    },
    {
      x: 5,
      y: 7,
    },
    {
      x: 5,
      y: 8,
    },
    {
      x: 6,
      y: 4,
    },
    {
      x: 6,
      y: 5,
    },
    {
      x: 6,
      y: 6,
    },
    {
      x: 6,
      y: 7,
    },
    {
      x: 6,
      y: 8,
    },
    {
      x: 7,
      y: 4,
    },
    {
      x: 7,
      y: 5,
    },
    {
      x: 7,
      y: 6,
    },
    {
      x: 7,
      y: 7,
    },
    {
      x: 7,
      y: 8,
    },
    {
      x: 7,
      y: 9,
    },
    {
      x: 8,
      y: 4,
    },
    {
      x: 8,
      y: 5,
    },
    {
      x: 8,
      y: 6,
    },
    {
      x: 8,
      y: 7,
    },
    {
      x: 8,
      y: 8,
    },
    {
      x: 8,
      y: 9,
    },
    {
      x: 9,
      y: 7,
    },
  ];

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('/largest-rectangle', () => {
    it('should return coordinates of the largest rectangle', () => {
      expect(appController.largestRectangle(board)).toStrictEqual(
        largestRectangle,
      );
    });
  });
});
