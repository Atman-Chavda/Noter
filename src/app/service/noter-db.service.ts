import { Injectable } from '@angular/core';
import Dexie, { Table } from 'dexie';
import { Category, Note } from '../models/interfaces';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class NoterDbService extends Dexie {
  categories!: Table<Category, string>;
  notes!: Table<Note, string>;

  constructor() {
    super('NoterDatabase');
    this.version(1).stores({
      categories: 'id, name',
      notes: 'id, categoryId, title, content, createdAt',
    });

    this.categories = this.table('categories');    
    this.notes = this.table('notes');
  }

  async addCategoty(name:string)
  {
    const newCategory: Category = {
      id: uuidv4(),
      name: name,
    }
    await this.categories.add(newCategory);
  }

  async addNote(categoryId: string, title: string, content: string) {
    const newNote: Note = {
      id: uuidv4(),
      categoryId: categoryId,
      title: title,
      content: content,
      createdAt: new Date(),
    };
    await this.notes.add(newNote);
  }

}
