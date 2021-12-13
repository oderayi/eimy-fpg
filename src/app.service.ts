import { Injectable } from '@nestjs/common';
import { Board } from './lib/types';

@Injectable()
export class AppService {
  largestRectangle(board: Board): any {
    const R = board.length; // Row length
    const C = board[0].length; // Column length
    const M = board; // Matrix

    const S = Array(R)
      .fill(null)
      .map(() => Array(C).fill(0));

    // for (let y = 0; y < R; y++) {
    //   S[y] = [];
    //   for (let x = 0; x < C; x++) {
    //     S[y][x] = 0;
    //   }
    // }
    let maxOfS: number, maxI: number, maxJ: number;

    /* Copy first row of M to S*/
    S[0] = [...M[0]];

    /* Copy first column of M to S*/
    let i: number, j: number;
    for (i = 0; i < R; i++) S[i][0] = M[i][0];

    /* Construct other entries of S*/
    for (i = 1; i < R; i++) {
      for (j = 1; j < C; j++) {
        if (M[i][j] == 1)
          S[i][j] =
            Math.min(S[i][j - 1], Math.min(S[i - 1][j], S[i - 1][j - 1])) + 1;
        else S[i][j] = 0;
      }
    }

    /* Find the maximum entry, and indexes of maximum entry in S */
    maxOfS = S[0][0];
    maxI = 0;
    maxJ = 0;
    for (i = 0; i < R; i++) {
      for (j = 0; j < C; j++) {
        if (maxOfS < S[i][j]) {
          maxOfS = S[i][j];
          maxI = i;
          maxJ = j;
        }
      }
    }

    const subMatrix = [];

    for (let i = maxI; i > maxI - maxOfS; i--) {
      for (let j = maxJ; j > maxJ - maxOfS; j--) {
        subMatrix.push({
          x: i,
          y: j,
        });
      }
    }

    return subMatrix;
  }
}

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
new AppService().largestRectangle(board);
