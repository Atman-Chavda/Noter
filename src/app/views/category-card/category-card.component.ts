import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { NoteMiniCardComponent } from '../note-mini-card/note-mini-card.component';
import { AddNoteFormComponent } from '../add-note-form/add-note-form.component';
import { CommonModule } from '@angular/common';
import { Category, Note } from '../../models/interfaces';
import { NoterDbService } from '../../service/noter-db.service';
import { SearchHighlighterPipe } from '../../pipes/search-highlighter.pipe';

@Component({
  selector: 'app-category-card',
  standalone: true,
  imports: [
    NoteMiniCardComponent,
    CommonModule,
    AddNoteFormComponent,
    SearchHighlighterPipe,
  ],
  templateUrl: './category-card.component.html',
  styleUrl: './category-card.component.css',
})
export class CategoryCardComponent implements OnChanges {
  showForm: boolean = false;
  categoryId: string | null = null;
  categotyName: string | null = null;

  @Input() categories: Category[] = [];
  @Input() searchText: string = '';
  @Output() categoreyDeleted = new EventEmitter<string>();

  notesMap: { [categoryId: string]: Note[] } = {};

  dbService = inject(NoterDbService);

  ngOnChanges(changes: SimpleChanges) {
    if (changes['categories'] && this.categories.length) {
      this.fetchNotes();
    }
  }

  async fetchNotes() {
    for (const category of this.categories) {
      this.notesMap[category.id] = await this.dbService.getNotesByCategoryId(
        category.id
      );
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

  deleteCategory(categoryId: string) {
    var result = confirm(
      'Are you sure you want to delete this note? This will also delete all notes in this category.'
    );
    if (result) {
      this.dbService.deleteCategory(categoryId).then((success) => {
        if (success) {
          this.categories = this.categories.filter(
            (category) => category.id !== categoryId
          );
          this.categoreyDeleted.emit(categoryId);
        } else {
          alert('Error deleting category');
        }
      });
    }
  }
}
