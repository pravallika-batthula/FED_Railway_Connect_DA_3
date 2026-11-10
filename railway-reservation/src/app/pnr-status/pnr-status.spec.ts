import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { PnrStatus } from './pnr-status';

describe('PnrStatus', () => {
  let component: PnrStatus;
  let fixture: ComponentFixture<PnrStatus>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PnrStatus],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(PnrStatus);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
