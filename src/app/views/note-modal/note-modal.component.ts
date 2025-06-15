import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Note } from '../../models/interfaces';

@Component({
  selector: 'app-note-modal',
  imports: [],
  templateUrl: './note-modal.component.html',
  styleUrl: './note-modal.component.css'
})
export class NoteModalComponent {

  @Input() note:Note | null = null;
  @Output() closeform = new EventEmitter<boolean>();

  closeFormHandler(status: boolean = false) {
    this.closeform.emit(status);
  }
}
