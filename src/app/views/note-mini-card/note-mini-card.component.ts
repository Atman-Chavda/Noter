import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NoteModalComponent } from "../note-modal/note-modal.component";
import { PriorityBadgeComponent } from "../priority-badge/priority-badge.component";
import { Note } from '../../models/interfaces';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-note-mini-card',
  imports: [NoteModalComponent, CommonModule],
  templateUrl: './note-mini-card.component.html',
  styleUrl: './note-mini-card.component.css'
})
export class NoteMiniCardComponent {
  showFullNote: boolean = false;
  @Input() note!: Note;
  @Output() noteDeleted = new EventEmitter<void>();

  showNote()
  {
    this.showFullNote = !this.showFullNote;
  }

  closeForm(status: boolean) {
    this.showFullNote = false;
  }

  handleNoteDeleted() {
  this.noteDeleted.emit(); // Bubble up to Category Card
}

}
