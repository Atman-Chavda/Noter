import {
  Component,
  ElementRef,
  HostListener,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CategoryCardComponent } from './views/category-card/category-card.component';
import { AddCategoryFormComponent } from './views/add-category-form/add-category-form.component';
import { NoterDbService } from './service/noter-db.service';
import { Category, Note } from './models/interfaces';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [
    CategoryCardComponent,
    AddCategoryFormComponent,
    CommonModule,
    FormsModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  @ViewChild('searchOnEsc') searchOnEsc!: ElementRef<HTMLInputElement>;
  @ViewChild('importFile') importFileRef!: ElementRef<HTMLInputElement>;

  showAddCategoryForm: boolean = false;
  viewCategories: Category[] = []; // Categories currently displayed in UI
  allCategories: Category[] = []; // All categories fetched from DB
  allNotes: Note[] = []; // All notes fetched from DB
  menuOpen: boolean = false;
  searchOpen: boolean = false;
  searchText: string = '';

  dbService = inject(NoterDbService);

  ngOnInit(): void {
    this.fetchCategoriesAndNotes();
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  async fetchCategoriesAndNotes() {
    this.allCategories = await this.dbService.getAllCategoties();
    this.allNotes = await this.dbService.getAllNotes();
    this.viewCategories = [...this.allCategories];
  }

  addCategory() {
    this.showAddCategoryForm = !this.showAddCategoryForm;
  }

  closeForm(_status: boolean) {
    this.showAddCategoryForm = false;
  }

  async handleCategoryAdded(categoryName: string) {
    const result = await this.dbService.addCategoty(categoryName);
    if (result) {
      await this.fetchCategoriesAndNotes();
    } else {
      alert('Failed to add category. Please try again.');
    }
  }

  async deleteAll() {
    const confirmation = prompt(
      'This action cannot be undone. To confirm type "DELETE-ALL" to confirm.'
    );
    this.menuOpen = false;
    if (confirmation === 'DELETE-ALL') {
      await this.dbService.deleteAll();
      await this.fetchCategoriesAndNotes();
    }
  }

  onSearchChange() {
    const query = this.searchText.trim().toLowerCase();
    if (!query) {
      this.viewCategories = [...this.allCategories];
      return;
    }

    this.viewCategories = this.allCategories.filter((category) => {
      const categoryMatches = category.name.toLowerCase().includes(query);

      const categoryNotes = this.allNotes.filter(
        (note) => note.categoryId === category.id
      );
      const notesMatch = categoryNotes.some(
        (note) =>
          note.title.toLowerCase().includes(query) ||
          note.content.toLowerCase().includes(query)
      );

      return categoryMatches || notesMatch;
    });
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      if (document.activeElement === this.searchOnEsc.nativeElement) {
        this.searchOpen = false;
        this.searchText = '';
        this.viewCategories = [...this.allCategories];
        this.searchOnEsc.nativeElement.blur();
      } else {
        this.searchOpen = true;
        this.searchOnEsc.nativeElement.focus();
      }
    }
    if (event.key === 'Enter') {
      this.searchOpen = false;
      // this.viewCategories = [...this.allCategories];
      this.searchOnEsc.nativeElement.blur();
    }
  }

  handleCategoryDeleted(deletedCategoryId: string) {
    // Remove from displayed categories if needed:
    this.viewCategories = this.viewCategories.filter(
      (c) => c.id !== deletedCategoryId
    );
    // Remove from search categories:
    this.allCategories = this.allCategories.filter(
      (c) => c.id !== deletedCategoryId
    );
  }

  exportData() {
    this.dbService.exportDatabase().then(blob => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'noter-backup.json'; // file name
      a.click();
      URL.revokeObjectURL(url); // cleanup
    }).catch(error => {
      console.error('Export failed:', error);
    });
  }

  triggerImportFile() {
    const check = confirm("This will overwrite your current database. Do you want to continue?");
    if (!check) {
      return;
    }
    this.importFileRef.nativeElement.click();
  }

  handleImportFile(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) {
      console.warn('No file selected');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const fileContent = reader.result as string;

      // Directly import JSON
      const blob = new Blob([fileContent], { type: 'application/json' });
      this.dbService.importDatabase(blob).then(() => {
        alert('Database imported successfully!');
        window.location.reload(); // reload app to see imported data
      }).catch(error => {
        console.error('Import failed:', error);
        alert('Failed to import data. See console for details.');
      });
    };
    reader.readAsText(file);
  }
}
