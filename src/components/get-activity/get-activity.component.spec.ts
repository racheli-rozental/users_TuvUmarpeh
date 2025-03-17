import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetActivityComponent } from './get-activity.component';

describe('GetActivityComponent', () => {
  let component: GetActivityComponent;
  let fixture: ComponentFixture<GetActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetActivityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
