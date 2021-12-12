import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { Board, Cell } from './lib/types';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/largest-rectangle')
  largestRectangle(@Body() board: Board): Cell[] {
    return this.appService.largestRectangle(board);
  }
}
