import { TestBed } from '@angular/core/testing';

import { Railway } from './railway';

describe('Railway', () => {
  let service: Railway;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Railway);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
