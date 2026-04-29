import { TestBed } from '@angular/core/testing';

import { Boid } from './boid';

describe('Boid', () => {
  let service: Boid;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Boid);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
