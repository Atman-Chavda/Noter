import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNoteFormComponent } from './add-note-form.component';

describe('AddNoteFormComponent', () => {
  let component: AddNoteFormComponent;
  let fixture: ComponentFixture<AddNoteFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddNoteFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNoteFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
