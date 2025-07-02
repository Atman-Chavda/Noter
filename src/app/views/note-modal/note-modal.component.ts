import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Note } from '../../models/interfaces';
import { NoterDbService } from '../../service/noter-db.service';

@Component({
  selector: 'app-note-modal',
  imports: [],
  templateUrl: './note-modal.component.html',
  styleUrl: './note-modal.component.css',
})
export class NoteModalComponent {
  @Input() note: Note | null = null;
  @Output() closeform = new EventEmitter<boolean>();
  @Output() noteDeleted = new EventEmitter<void>();

  dbService = inject(NoterDbService);

  closeFormHandler(status: boolean = false) {
    this.closeform.emit(status);
  }

  deleteNote(noteId: string) {
    var result = confirm('Are you sure you want to delete this note?');
    if (result) {
      this.dbService.deleteNote(noteId).then((success) => {
        if (success) {
          // alert('Note deleted successfully.');
          this.noteDeleted.emit();
          this.closeFormHandler();
        } else {
          // alert('Failed to delete note. Please try again.');
        }
      });
    }
  }
}
