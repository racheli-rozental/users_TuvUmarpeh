import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsActivityComponent } from './details-activity.component';

describe('DetailsActivityComponent', () => {
  let component: DetailsActivityComponent;
  let fixture: ComponentFixture<DetailsActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsActivityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
