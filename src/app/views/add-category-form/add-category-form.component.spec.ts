import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCategoryFormComponent } from './add-category-form.component';

describe('AddCategoryFormComponent', () => {
  let component: AddCategoryFormComponent;
  let fixture: ComponentFixture<AddCategoryFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddCategoryFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCategoryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
