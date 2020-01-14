import { TestBed } from '@angular/core/testing';

import { DataserService } from './dataser.service';

describe('DataserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DataserService = TestBed.get(DataserService);
    expect(service).toBeTruthy();
  });
});
