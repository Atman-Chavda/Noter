import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-add-note-form',
  imports: [],
  templateUrl: './add-note-form.component.html',
  styleUrl: './add-note-form.component.css'
})
export class AddNoteFormComponent {

  @Input() categoryId: number|null = null;
  @Input() categoryName: string|null = null;
  @Output() closeform = new EventEmitter<boolean>();

  closeForm() {
    this.closeform.emit(false);
  }
}
