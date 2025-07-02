import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { NoterDbService } from '../../service/noter-db.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-note-form',
  imports: [FormsModule],
  templateUrl: './add-note-form.component.html',
  styleUrl: './add-note-form.component.css',
})
export class AddNoteFormComponent {
  @Input() categoryId: string | null = null;
  @Input() categoryName: string | null = null;
  @Output() closeform = new EventEmitter<boolean>();
  title: string = '';
  content: string = '';

  dbService = inject(NoterDbService);

  closeForm(status: boolean = false) {
    this.closeform.emit(status);
  }

  async handleCategoryAdded() {
    if (!this.title || !this.content) {
      alert('Please fill in all fields before adding a note.');
      return;
    }
    var result = await this.dbService.addNote(
      this.categoryId!,
      this.title,
      this.content
    );
    if (result) {
      this.closeForm(true); // Close the form after adding
    } else {
      this.closeForm(false); // Close the form with failure status
    }
  }
}
