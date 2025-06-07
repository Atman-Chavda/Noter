import { Component, HostListener } from '@angular/core';
import { NoteMiniCardComponent } from "../note-mini-card/note-mini-card.component";
import { AddNoteFormComponent } from "../add-note-form/add-note-form.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category-card',
  imports: [NoteMiniCardComponent, CommonModule, AddNoteFormComponent],
  templateUrl: './category-card.component.html',
  styleUrl: './category-card.component.css'
})
export class CategoryCardComponent {

  showForm: boolean = false;
  categoryId: number|null = null;
  addNote(id: number)
  {
    console.log("Adding note to category with id: " + id);
    this.categoryId = id;
    this.showForm = !this.showForm;
  }
}
