import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPositionFormComponent } from './new-position-form.component';

describe('NewPositionFormComponent', () => {
  let component: NewPositionFormComponent;
  let fixture: ComponentFixture<NewPositionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewPositionFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewPositionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
