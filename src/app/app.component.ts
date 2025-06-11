import { Component, inject, OnInit } from '@angular/core';
import { CategoryCardComponent } from './views/category-card/category-card.component';
import { AddCategoryFormComponent } from './views/add-category-form/add-category-form.component';
import { NoterDbService } from './service/noter-db.service';
import { Category } from './models/interfaces';

@Component({
  selector: 'app-root',
  imports: [CategoryCardComponent, AddCategoryFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  
  title = 'Noter';
  showAddCategoryForm: boolean = false;
  viewCategories: Category[] = [];

  dbService = inject(NoterDbService);
  
  ngOnInit(): void {
    this.fetchCategpries();
  }

  async fetchCategpries()
  {
    this.viewCategories = await this.dbService.getAllCategoties();
    console.log('Fetched categories:', this.viewCategories);
  }

  addCategory() {
    this.showAddCategoryForm = !this.showAddCategoryForm;
  }

  closeForm(status: boolean) {
    console.log('Closing form');
    this.showAddCategoryForm = false;
  }

  async handleCategoryAdded(categoryName: string) {
    var result = await this.dbService.addCategoty(categoryName);
    if(result)
    {
      this.fetchCategpries(); // Refresh categories after adding
    }
    else
    {
      alert('Failed to add category. Please try again.');
    }
  }

}
