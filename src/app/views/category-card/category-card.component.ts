import { Component, HostListener, Input } from '@angular/core';
import { NoteMiniCardComponent } from "../note-mini-card/note-mini-card.component";
import { AddNoteFormComponent } from "../add-note-form/add-note-form.component";
import { CommonModule } from '@angular/common';
import { Category } from '../../models/interfaces';

@Component({
  selector: 'app-category-card',
  imports: [NoteMiniCardComponent, CommonModule, AddNoteFormComponent],
  templateUrl: './category-card.component.html',
  styleUrl: './category-card.component.css'
})
export class CategoryCardComponent {

  showForm: boolean = false;
  categoryId: number|null = null;
  categotyName: string|null = null;

  @Input() categories:Category[] = [];  

  addNote(id: number, name:string)
  {
    console.log("Adding note to category with id: " + id);
    this.categoryId = id;
    this.showForm = !this.showForm;
    this.categotyName = name;
  }

  closeForm(event: boolean) {
    console.log("Closing form");
    this.showForm = event;
    this.categoryId = null;
    this.categotyName = null;
  }
}
