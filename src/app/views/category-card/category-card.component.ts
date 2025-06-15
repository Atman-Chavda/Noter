import { Component, inject, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NoteMiniCardComponent } from '../note-mini-card/note-mini-card.component';
import { AddNoteFormComponent } from '../add-note-form/add-note-form.component';
import { CommonModule } from '@angular/common';
import { Category, Note } from '../../models/interfaces';
import { NoterDbService } from '../../service/noter-db.service';

@Component({
  selector: 'app-category-card',
  standalone: true,
  imports: [NoteMiniCardComponent, CommonModule, AddNoteFormComponent],
  templateUrl: './category-card.component.html',
  styleUrl: './category-card.component.css'
})
export class CategoryCardComponent implements OnChanges {

  showForm: boolean = false;
  categoryId: string | null = null;
  categotyName: string | null = null;

  @Input() categories: Category[] = [];

  notesMap: { [categoryId: string]: Note[] } = {};

  dbService = inject(NoterDbService);

  ngOnChanges(changes: SimpleChanges) {
    if (changes['categories'] && this.categories.length) {
      this.fetchNotes();
    }
  }


  async fetchNotes() {
    for (const category of this.categories) {
    this.notesMap[category.id] = await this.dbService.getNotesByCategoryId(category.id);
  }
  }

  addNote(id: string, name: string) {
    this.categoryId = id;
    this.categotyName = name;
    this.showForm = true;
  }

  closeForm(event: boolean) {
    this.showForm = false;
    this.categoryId = null;
    this.categotyName = null;
    // Refresh notes after closing the form
    this.fetchNotes();
  }
}
