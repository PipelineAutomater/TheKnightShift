import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlphaZero } from './alpha-zero';

describe('AlphaZero', () => {
  let component: AlphaZero;
  let fixture: ComponentFixture<AlphaZero>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlphaZero],
    }).compileComponents();

    fixture = TestBed.createComponent(AlphaZero);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
