import { Component, HostListener } from '@angular/core';
import { NoteMiniCardComponent } from "../note-mini-card/note-mini-card.component";
import { AddNoteFormComponent } from "../add-note-form/add-note-form.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category-card',
  imports: [NoteMiniCardComponent, AddNoteFormComponent, CommonModule],
  templateUrl: './category-card.component.html',
  styleUrl: './category-card.component.css'
})
export class CategoryCardComponent {
  openFormIdx: number | null = null;

  AddNote(idx: number) {
    this.openFormIdx = idx;
  }

  closeForm() {
    this.openFormIdx = null;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (target.closest('.add-note-form-container') === null && target.closest('.add-note-btn') === null) {
      this.closeForm();
    }
  }
}
