import { TestBed } from '@angular/core/testing';

import { AptNameServiceService } from './apt-name.service';

describe('AptNameServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AptNameServiceService = TestBed.get(AptNameServiceService);
    expect(service).toBeTruthy();
  });
});
