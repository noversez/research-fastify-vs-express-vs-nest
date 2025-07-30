import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { ItemsService } from './items.service';

@Controller()
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Get('items')
  getItems() {
    return this.itemsService.findAll();
  }

  @Post('items')
  createItem(@Body() body: { name: string; description?: string }) {
    const { name, description } = body;
    return this.itemsService.create(name, description);
  }

  @Put('items/:id')
  updateItem(
    @Param('id') id: string,
    @Body() body: { name: string; description?: string }
  ) {
    const itemId = parseInt(id);
    const { name, description } = body;
    const updatedItem = this.itemsService.update(itemId, name, description);

    if (!updatedItem) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    return updatedItem;
  }

  @Delete('items/:id')
  deleteItem(@Param('id') id: string) {
    const itemId = parseInt(id);
    const deleted = this.itemsService.remove(itemId);

    if (!deleted) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    return;
  }

  @Get('health')
  getHealth() {
    return {
      status: 'ok',
      framework: 'nestjs',
      timestamp: new Date().toISOString(),
    };
  }
}
