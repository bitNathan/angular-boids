import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoidSim } from './boid-sim';

describe('BoidSim', () => {
  let component: BoidSim;
  let fixture: ComponentFixture<BoidSim>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoidSim],
    }).compileComponents();

    fixture = TestBed.createComponent(BoidSim);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
