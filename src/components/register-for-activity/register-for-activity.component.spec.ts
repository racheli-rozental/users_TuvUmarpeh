import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterForActivityComponent } from './register-for-activity.component';

describe('RegisterForActivityComponent', () => {
  let component: RegisterForActivityComponent;
  let fixture: ComponentFixture<RegisterForActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterForActivityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterForActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
