import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StakeInfoComponent } from './stake-info.component';

describe('StakeInfoComponent', () => {
  let component: StakeInfoComponent;
  let fixture: ComponentFixture<StakeInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StakeInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StakeInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
