import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-add-note-form',
  imports: [],
  templateUrl: './add-note-form.component.html',
  styleUrl: './add-note-form.component.css'
})
export class AddNoteFormComponent {

  @Input() categoryId: number|null = null;

}
