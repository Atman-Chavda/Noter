import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteMiniCardComponent } from './note-mini-card.component';

describe('NoteMiniCardComponent', () => {
  let component: NoteMiniCardComponent;
  let fixture: ComponentFixture<NoteMiniCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoteMiniCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoteMiniCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
