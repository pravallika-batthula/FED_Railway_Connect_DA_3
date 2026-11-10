import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TrainService } from '../services/train.service';
import { BookingService } from '../services/booking.service';
import { AuthService } from '../services/auth.service';
import { LanguageService } from '../services/language.service';
import { Booking, Passenger, Train, TravelClass } from '../models/models';
import { TranslatePipe, LocalizedCurrencyPipe, LocalizedDatePipe } from '../pipes/translate.pipe';

@Component({
  selector: 'app-ticket-booking',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    TranslatePipe,
    LocalizedCurrencyPipe,
    LocalizedDatePipe
  ],
  templateUrl: './ticket-booking.html',
  styleUrl: './ticket-booking.css'
})
export class TicketBooking implements OnInit {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private trainService = inject(TrainService);
  private bookingService = inject(BookingService);
  authService = inject(AuthService);
  langService = inject(LanguageService);

  bookingForm!: FormGroup;
  train: Train | null = null;
  fromStation = '';
  toStation = '';
  journeyDate = '';
  travelClass: TravelClass = 'SL';
  farePerPassenger = 0;

  bookingConfirmed = false;
  confirmedBooking: Booking | null = null;
  errorMessage = '';

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const trainId = params['trainId'];
      this.fromStation = params['from'] || 'Secunderabad Junction (SC)';
      this.toStation = params['to'] || 'Howrah Junction (HWH)';
      this.journeyDate = params['date'] || new Date().toISOString().split('T')[0];
      this.travelClass = (params['travelClass'] as TravelClass) || 'SL';

      if (trainId) {
        this.train = this.trainService.getTrainById(trainId) || null;
      }

      if (!this.train) {
        // Fallback default train
        const trains = this.trainService.searchTrains(this.fromStation, this.toStation, this.journeyDate);
        this.train = trains[0] || null;
      }

      this.updateFare();
    });

    this.initForm();
  }

  private initForm(): void {
    this.bookingForm = this.fb.group({
      passengers: this.fb.array([this.createPassengerGroup()])
    });
  }

  get passengersArray(): FormArray {
    return this.bookingForm.get('passengers') as FormArray;
  }

  createPassengerGroup(): FormGroup {
    return this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      age: ['', [Validators.required, Validators.min(1), Validators.max(120)]],
      gender: ['Male', Validators.required]
    });
  }

  addPassenger(): void {
    if (this.passengersArray.length < 6) {
      this.passengersArray.push(this.createPassengerGroup());
    }
  }

  removePassenger(index: number): void {
    if (this.passengersArray.length > 1) {
      this.passengersArray.removeAt(index);
    }
  }

  changeClass(newClass: TravelClass): void {
    this.travelClass = newClass;
    this.updateFare();
  }

  updateFare(): void {
    if (this.train && this.train.classes[this.travelClass]) {
      this.farePerPassenger = this.train.classes[this.travelClass].fare;
    } else {
      this.farePerPassenger = 500;
    }
  }

  get totalFare(): number {
    return this.passengersArray.length * this.farePerPassenger;
  }

  onSubmitBooking(): void {
    this.errorMessage = '';

    if (this.bookingForm.invalid) {
      this.bookingForm.markAllAsTouched();
      this.errorMessage = 'Please fill out all passenger details correctly.';
      return;
    }

    const currentUser = this.authService.getCurrentUser();
    if (!currentUser) {
      this.router.navigate(['/login'], {
        queryParams: { returnUrl: this.router.url }
      });
      return;
    }

    const passengersData: Passenger[] = this.bookingForm.value.passengers.map((p: any) => ({
      name: p.name.trim(),
      age: Number(p.age),
      gender: p.gender
    }));

    const bookingResult = this.bookingService.createBooking({
      userEmail: currentUser.email,
      trainNumber: this.train ? this.train.number : '12703',
      trainName: this.train ? this.train.name : 'RailConnect Express',
      fromStation: this.fromStation,
      toStation: this.toStation,
      journeyDate: this.journeyDate,
      travelClass: this.travelClass,
      passengers: passengersData,
      totalFare: this.totalFare
    });

    this.confirmedBooking = bookingResult;
    this.bookingConfirmed = true;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  printTicket(): void {
    window.print();
  }
}
