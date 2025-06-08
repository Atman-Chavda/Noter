import { Component } from '@angular/core';
import { CategoryCardComponent } from "./views/category-card/category-card.component";
import { AddCategoryFormComponent } from './views/add-category-form/add-category-form.component';

@Component({
  selector: 'app-root',
  imports: [ CategoryCardComponent, AddCategoryFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Noter';
  showAddCategoryForm:boolean = false;
  addCategory()
  {
    this.showAddCategoryForm = !this.showAddCategoryForm;
  }
    closeForm(event: boolean) {
    console.log("Closing form");
    this.showAddCategoryForm = event;
  }
}
