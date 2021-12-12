import { Injectable } from '@nestjs/common';
import { Board, Cell } from './lib/types';

@Injectable()
export class AppService {
  largestRectangle(board: Board): Cell[] {
    const clusters = [];
    let cell = null;
    let cellValue = 0;

    for (let x = 0; x < board.length; x++) {
      for (let y = 0; y < board[0].length; y++) {
        cellValue = board[x][y];

        if (cellValue == 0) continue;

        cell = { x, y };
        let clusterFound = false;

        for (let i = clusters.length - 1; i >= 0; i--) {
          const cluster = clusters[i];
          for (const point of cluster) {
            if (this.isNeighbour(point, cell)) {
              cluster.push(cell);
              clusterFound = true;
              break;
            }
          }
          if (clusterFound) break;
        }
        if (!clusterFound) clusters.push([cell]);
      }
    }

    const largest = clusters.reduce((prev, curr) => {
      return prev.length < curr.length ? curr : prev;
    }, []);

    return largest;
  }

  isNeighbour(pointA: Cell, pointB: Cell): boolean {
    const pointBTop = JSON.stringify({ ...pointB, x: pointB.x - 1 });
    const pointBRight = JSON.stringify({ ...pointB, y: pointB.y + 1 });
    const pointBBottom = JSON.stringify({ ...pointB, x: pointB.x + 1 });
    const pointBLeft = JSON.stringify({ ...pointB, y: pointB.y - 1 });

    return [pointBTop, pointBRight, pointBBottom, pointBLeft].includes(
      JSON.stringify(pointA),
    );
  }
}
