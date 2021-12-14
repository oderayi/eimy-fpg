import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { Board } from './lib/types';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/largest-rectangle')
  largestRectangle(@Body() board: Board): {
    area: number;
    top: number;
    bottom: number;
    left: number;
    right: number;
  } {
    return this.appService.largestRectangle(board);
  }
}
