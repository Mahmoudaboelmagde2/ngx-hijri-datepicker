import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxHijriDatepickerComponent } from './ngx-hijri-datepicker.component';

describe('NgxHijriDatepickerComponent', () => {
  let component: NgxHijriDatepickerComponent;
  let fixture: ComponentFixture<NgxHijriDatepickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxHijriDatepickerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgxHijriDatepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
