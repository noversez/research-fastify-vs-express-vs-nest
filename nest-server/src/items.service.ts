import { Injectable } from '@nestjs/common';
import { Item } from './item.interface';

@Injectable()
export class ItemsService {
  private items: Item[] = [];
  private nextId = 1;

  findAll(): { items: Item[] } {
    return { items: this.items };
  }

  create(name: string, description?: string): Item {
    const item: Item = { id: this.nextId++, name, description };
    this.items.push(item);
    return item;
  }

  update(id: number, name: string, description?: string): Item | null {
    const index = this.items.findIndex((item) => item.id === id);
    if (index === -1) {
      return null;
    }
    this.items[index] = { id, name, description };
    return this.items[index];
  }

  remove(id: number): boolean {
    const index = this.items.findIndex((item) => item.id === id);
    if (index === -1) {
      return false;
    }
    this.items.splice(index, 1);
    return true;
  }
}
