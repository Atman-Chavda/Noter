import { TestBed } from '@angular/core/testing';

import { NoterDbService } from './noter-db.service';

describe('NoterDbService', () => {
  let service: NoterDbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NoterDbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
