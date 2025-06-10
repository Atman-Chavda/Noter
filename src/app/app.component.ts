import { Component, inject } from '@angular/core';
import { CategoryCardComponent } from './views/category-card/category-card.component';
import { AddCategoryFormComponent } from './views/add-category-form/add-category-form.component';
import { NoterDbService } from './service/noter-db.service';

@Component({
  selector: 'app-root',
  imports: [CategoryCardComponent, AddCategoryFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Noter';
  showAddCategoryForm: boolean = false;
  dbService = inject(NoterDbService);

  addCategory() {
    this.showAddCategoryForm = !this.showAddCategoryForm;
  }

  closeForm(status: boolean) {
    console.log('Closing form');
    this.showAddCategoryForm = false;
  }

  async handleCategoryAdded(categoryName: string) {
    await this.dbService.addCategoty(categoryName);
    console.log('Category added:', categoryName);
  }

  showSuccessAlert(status: boolean) {
    if (status) {
      alert('Category added successfully!');
    }
  }
}
