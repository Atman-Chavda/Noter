import { Injectable } from '@angular/core';
import Dexie, { Table } from 'dexie';
import { Category, Note } from '../models/interfaces';
import { v4 as uuidv4 } from 'uuid';
import 'dexie-export-import';

@Injectable({
  providedIn: 'root',
})
export class NoterDbService extends Dexie {
  categories!: Table<Category, string>;
  notes!: Table<Note, string>;

  constructor() {
    super('NoterDatabase');
    this.version(2).stores({
      categories: 'id, name, createdAt',
      notes: 'id, categoryId, title, content, createdAt',
    });

    this.categories = this.table('categories');
    this.notes = this.table('notes');

    this.on('populate', async () => {
      const tutorialCategoryId = uuidv4();
      await this.categories.add({
        id: tutorialCategoryId,
        name: 'Tutorial',
        createdAt: new Date(),
      });

      await this.notes.add({
        id: uuidv4(),
        categoryId: tutorialCategoryId,
        title: 'Welcome to Noter',
        content:
          'You can start by adding a new category by pressing the "Add Category" button. and then you can add notes to you category. Its that simple!',
        createdAt: new Date(),
      });
    });
  }

  async addCategoty(name: string) {
    try {
      const newCategory: Category = {
        id: uuidv4(),
        name: name,
        createdAt: new Date(),
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
    return await this.categories.orderBy('createdAt').toArray();
  }

  async getNotesByCategoryId(categoryId: string): Promise<Note[]> {
    return await this.notes.where('categoryId').equals(categoryId).toArray();
  }

  async getAllNotes(): Promise<Note[]> {
    return await this.notes.toArray();
  }

async deleteAll(): Promise<boolean> {
  try {
    await this.categories.clear();
    await this.notes.clear();
    await Dexie.delete('NoterDatabase');

    // Recreate the database schema
    this.close(); // safely close current Dexie connection

    this.version(2).stores({
      categories: 'id, name, createdAt',
      notes: 'id, categoryId, title, content, createdAt',
    });

    this.categories = this.table('categories');
    this.notes = this.table('notes');

    // Reopen to trigger .on('populate') callback
    await this.open();

    return true;
  } catch (error) {
    console.error('Error deleting and recreating database:', error);
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

  async deleteCategory(catergoryId: string): Promise<boolean> {
    try {
      await this.notes.where('categoryId').equals(catergoryId).delete();
      await this.categories.delete(catergoryId);
      return true;
    } catch (error) {
      console.error('Error deleting category:', error);
      return false;
    }
  }

  async exportDatabase(): Promise<Blob> {
    try {
      const blob = await this.export({ prettyJson: true }); // prettier JSON for readability
      return blob;
    } catch (error) {
      console.error('Failed to export database:', error);
      throw error;
    }
  }

  async importDatabase(blob: Blob): Promise<void> {
    try {
      this.notes.clear();
      this.categories.clear();
      await this.import(blob, {
        progressCallback: (progress) => {
          console.log('Import progress:', progress);
          return true
        },
      });
      console.log('Database imported successfully!');
    } catch (error) {
      console.error('Failed to import database:', error);
      throw error;
    }
  }
}
