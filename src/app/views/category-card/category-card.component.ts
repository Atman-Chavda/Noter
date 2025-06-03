import { Component } from '@angular/core';
import { NoteMiniCardComponent } from "../note-mini-card/note-mini-card.component";
import { AddNoteFormComponent } from "../add-note-form/add-note-form.component";

@Component({
  selector: 'app-category-card',
  imports: [NoteMiniCardComponent],
  templateUrl: './category-card.component.html',
  styleUrl: './category-card.component.css'
})
export class CategoryCardComponent {

}
