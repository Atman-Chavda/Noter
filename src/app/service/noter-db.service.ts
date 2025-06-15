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

  async addCategoty(name: string) {
    try {
      const newCategory: Category = {
        id: uuidv4(),
        name: name,
      };
      await this.categories.add(newCategory);
      return true;
    } catch (error) {
      console.error('Error adding category:', error);
      return false;
    }
  }

  async addNote(categoryId: string, title: string, content: string) {
    try {
      const newNote: Note = {
        id: uuidv4(),
        categoryId: categoryId,
        title: title,
        content: content,
        createdAt: new Date(),
      };
      await this.notes.add(newNote);
      return true;
    } catch (error) {
      console.error('Error adding note:', error);
      return false;
    }
  }

  async getAllCategoties(): Promise<Category[]> {
    return await this.categories.toArray();
  }

  async getNotesByCategoryId(categoryId:string): Promise<Note[]>
  {
    return await this.notes.where('categoryId').equals(categoryId).toArray();
  }

  async getAllNotes(): Promise<Note[]>
  {
    return await this.notes.toArray();
  }

  async deleteAll(): Promise<boolean>
  {
    try {
      await this.categories.clear();
      await this.notes.clear();
      return true;
    } catch (error) {
      console.error('Error deleting all categories and notes:', error);
      return false;
    }
  }

  async deleteNote(noteId: string): Promise<boolean> {
    try {
      await this.notes.delete(noteId);
      return true;
    } catch (error) {
      console.error('Error deleting note:', error);
      return false;
    }
  }

}
