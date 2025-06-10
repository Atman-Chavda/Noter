import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-category-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-category-form.component.html',
  styleUrls: ['./add-category-form.component.css'],
})
export class AddCategoryFormComponent {
  categoryName: string = '';

  @Output() closeform = new EventEmitter<boolean>(); // true or false, optional use
  @Output() addCategory = new EventEmitter<string>();
  @Output() categoryAddedSuccess = new EventEmitter<boolean>(); // ✅ new output for success

  closeFormHandler(status: boolean = false) {
    this.closeform.emit(status);
  }

  addCategoryHandler() {
    const trimmed = this.categoryName.trim();

    if (!trimmed) {
      alert('Category name cannot be empty');
      this.closeFormHandler(false);
      return;
    }

    this.addCategory.emit(trimmed);
    this.categoryAddedSuccess.emit(true); // ✅ emit success
    this.categoryName = '';
    this.closeFormHandler(); // just closes form
  }
}
