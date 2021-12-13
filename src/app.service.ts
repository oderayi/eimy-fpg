import { Injectable } from '@nestjs/common';
import { Board } from './lib/types';

@Injectable()
export class AppService {
  largestRectangle(board: Board): any {
    const R = board.length;
    const C = board[0].length;
    const M = board;

    const S = Array(R)
      .fill(null)
      .map(() => Array(C).fill(0));

    let maxOfS: number, maxI: number, maxJ: number;

    S[0] = [...M[0]];

    let i: number, j: number;
    for (i = 0; i < R; i++) S[i][0] = M[i][0];

    for (i = 1; i < R; i++) {
      for (j = 1; j < C; j++) {
        if (M[i][j] >= 1) {
          const top = S[i - 1][j];
          const topLeft = S[i - 1][j - 1];
          const left = S[i][j - 1];
          // S[i][j] = Math.min(left, Math.min(top, topLeft)) + 1;
          S[i][j] = Math.min(left, top) + 1;
        } else S[i][j] = 0;
      }
    }

    maxOfS = S[0][0];
    maxI = 0;
    maxJ = 0;
    for (i = 0; i < R; i++) {
      for (j = 0; j < C; j++) {
        if (maxOfS <= S[i][j]) {
          maxOfS = S[i][j];
          maxI = i;
          maxJ = j;
        }
      }
    }

    let h = 0,
      w = 0;
    let k = maxI;
    while (k > 0) {
      if (!S[k][maxJ]) break;
      k--;
      h++;
    }

    k = maxJ;
    while (k > 0) {
      if (!S[maxI][k]) break;
      k--;
      w++;
    }

    const subMatrix = [];

    for (let i = maxI; i > maxI - h; i--) {
      for (let j = maxJ; j > maxJ - w; j--) {
        subMatrix.push({
          x: i,
          y: j,
        });
      }
    }

    return subMatrix;
  }
}
