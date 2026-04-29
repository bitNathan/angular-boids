import { TestBed } from '@angular/core/testing';

import { PixiBoid } from './pixi-boid';

describe('PixiBoid', () => {
  let service: PixiBoid;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PixiBoid);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
