import { Component } from '@angular/core';
import { LayoutComponent } from "./views/layout/layout.component";
import { CategoryCardComponent } from "./views/category-card/category-card.component";

@Component({
  selector: 'app-root',
  imports: [ CategoryCardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Noter';
}
