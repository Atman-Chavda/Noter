import { Component, inject, OnInit } from '@angular/core';
import { CategoryCardComponent } from './views/category-card/category-card.component';
import { AddCategoryFormComponent } from './views/add-category-form/add-category-form.component';
import { NoterDbService } from './service/noter-db.service';
import { Category } from './models/interfaces';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [CategoryCardComponent, AddCategoryFormComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  
  title = 'Noter';
  showAddCategoryForm: boolean = false;
  viewCategories: Category[] = [];
  menuOpen: boolean = false;

  
  dbService = inject(NoterDbService);
  
  ngOnInit(): void {
    this.fetchCategpries();
  }
  
  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  async fetchCategpries()
  {
    this.viewCategories = await this.dbService.getAllCategoties();
    // console.log('Fetched categories:', this.viewCategories[0].id);
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

  deleteAll()
  {
    var confirmation = prompt('This action cannot be undone. To confirm type "DELETE-ALL" to confirm.');
    this.menuOpen = false;
    if(confirmation === 'DELETE-ALL')
    {
      this.dbService.deleteAll()
    }
    this.fetchCategpries();
  }

}
