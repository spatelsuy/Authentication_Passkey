import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SunilProfile } from './sunil-profile';

describe('SunilProfile', () => {
  let component: SunilProfile;
  let fixture: ComponentFixture<SunilProfile>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SunilProfile]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SunilProfile);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
