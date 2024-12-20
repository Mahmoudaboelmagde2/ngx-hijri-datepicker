import { TestBed } from '@angular/core/testing';

import { NgxHijriDatepickerService } from './ngx-hijri-datepicker.service';

describe('NgxHijriDatepickerService', () => {
  let service: NgxHijriDatepickerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxHijriDatepickerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
