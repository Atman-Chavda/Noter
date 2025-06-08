import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-add-category-form',
  imports: [],
  templateUrl: './add-category-form.component.html',
  styleUrl: './add-category-form.component.css'
})
export class AddCategoryFormComponent {

  @Output() closeform = new EventEmitter<boolean>();

  closeForm() {
    this.closeform.emit(false);
  }
}
