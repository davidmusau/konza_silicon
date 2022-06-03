import { TestBed } from '@angular/core/testing';

import { PdfdocumentsService } from './pdfdocuments.service';

describe('PdfdocumentsService', () => {
  let service: PdfdocumentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PdfdocumentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
