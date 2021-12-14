import { Injectable } from '@nestjs/common';
import { Board } from './lib/types';

@Injectable()
export class AppService {
  largestRectangle = (board: Board) => {
    const A = board;
    const R = board.length;
    const C = board[0].length;

    let top = 0;
    let bottom = 0;

    // Calculate area for first row
    // and initialize it as result
    let { area, left, right } = this.maxHist(C, A[0]);

    // iterate over row to find
    // maximum rectangular area
    // considering each row as histogram
    for (let i = 1; i < R; i++) {
      for (let j = 0; j < C; j++) {
        // if A[i][j] is 1 then
        // add A[i -1][j]
        if (A[i][j] == 1) {
          A[i][j] += A[i - 1][j];
        }
      }

      // Update result if area with current
      // row (as last row of rectangle) is more
      const {
        area: tmp_area,
        left: tmp_left,
        right: tmp_right,
      } = this.maxHist(C, A[i]);
      if (tmp_area > area) {
        left = tmp_left;
        right = tmp_right;
        bottom = i;
        area = tmp_area;
        top = bottom - Math.floor(area / (right - left + 1)) + 1;
      }
    }

    top = Math.max(0, top);
    bottom = Math.max(0, bottom);
    left = Math.max(0, left);
    right = Math.max(0, right);

    area = (1 + bottom - top) * (1 + right - left);

    return { area, top, bottom, left, right };
  };

  maxHist = (C, row) => {
    // Create an empty stack. The stack
    // holds indexes of hist[] array.
    // The bars stored in stack are always
    // in increasing order of their heights.
    const hist = [];

    let top_val; // Top of stack
    let left;

    let max_area = 0; // Initialize max area in
    // current row (or histogram)
    let max_left = -1;
    let max_right = -1;

    let area = 0; // Initialize area with
    // current top

    // Run through all bars of
    // given histogram (or row)
    let i = 0;
    while (i < C) {
      // If this bar is higher than the
      // bar on top stack, push it to stack
      if (hist.length == 0 || row[hist[hist.length - 1]] <= row[i]) {
        hist.push(i++);
      } else {
        // If this bar is lower than top
        // of stack, then calculate area of
        // rectangle with stack top as
        // the smallest (or minimum height)
        // bar. 'i' is 'right index' for
        // the top and element before
        // top in stack is 'left index'
        left = hist[hist.length - 1]; // **check
        top_val = row[hist[hist.length - 1]];
        hist.pop();
        area = top_val * i;

        if (hist.length > 0) {
          left = hist[hist.length - 1] + 1; // check
          area = top_val * (i - hist[hist.length - 1]);
        }

        if (area > max_area) {
          max_area = area;
          max_left = left;
          max_right = i - 1;
        }
      }
    }

    // Now pop the remaining bars from
    // stack and calculate area with
    // every popped bar as the smallest bar
    while (hist.length > 0) {
      left = hist[hist.length - 1];
      top_val = row[hist[hist.length - 1]];
      hist.pop();
      area = top_val * i;
      if (hist.length > 0) {
        left = hist[hist.length - 1] + 1;
        area = top_val * (i - hist[hist.length - 1]);
      }

      if (area > max_area) {
        max_area = area;
        max_left = left;
        max_right = C - 1;
      }
    }
    return { area: max_area, left: max_left, right: max_right };
  };
}
