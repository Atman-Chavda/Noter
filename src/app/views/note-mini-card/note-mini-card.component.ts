import { Component } from '@angular/core';
import { NoteModalComponent } from "../note-modal/note-modal.component";
import { PriorityBadgeComponent } from "../priority-badge/priority-badge.component";

@Component({
  selector: 'app-note-mini-card',
  imports: [NoteModalComponent, PriorityBadgeComponent],
  templateUrl: './note-mini-card.component.html',
  styleUrl: './note-mini-card.component.css'
})
export class NoteMiniCardComponent {
  showFullNote: boolean = false;

  showNote()
  {
    this.showFullNote = !this.showFullNote;
  }
}
