import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { TrainAvailability } from './train-availability';

describe('TrainAvailability', () => {
  let component: TrainAvailability;
  let fixture: ComponentFixture<TrainAvailability>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainAvailability],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(TrainAvailability);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
