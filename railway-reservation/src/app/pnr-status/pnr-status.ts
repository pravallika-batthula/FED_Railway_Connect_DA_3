import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BookingService } from '../services/booking.service';
import { LanguageService } from '../services/language.service';
import { Booking } from '../models/models';
import { TranslatePipe, LocalizedCurrencyPipe, LocalizedDatePipe } from '../pipes/translate.pipe';

@Component({
  selector: 'app-pnr-status',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslatePipe,
    LocalizedCurrencyPipe,
    LocalizedDatePipe
  ],
  templateUrl: './pnr-status.html',
  styleUrl: './pnr-status.css'
})
export class PnrStatus implements OnInit {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private bookingService = inject(BookingService);
  langService = inject(LanguageService);

  pnrForm!: FormGroup;
  searched = false;
  bookingResult: Booking | null = null;
  errorMessage = '';

  samplePnrs: string[] = ['4821950346', '6754210983', '1904738265'];

  ngOnInit(): void {
    this.pnrForm = this.fb.group({
      pnr: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]]
    });

    this.route.queryParams.subscribe(params => {
      if (params['pnr']) {
        this.pnrForm.patchValue({ pnr: params['pnr'] });
        this.onSearchPnr();
      }
    });
  }

  fillSamplePnr(pnr: string): void {
    this.pnrForm.patchValue({ pnr });
    this.errorMessage = '';
    this.onSearchPnr();
  }

  onSearchPnr(): void {
    this.errorMessage = '';
    this.bookingResult = null;
    this.searched = false;

    if (this.pnrForm.invalid) {
      this.pnrForm.markAllAsTouched();
      this.errorMessage = this.langService.t('ERR_INVALID_PNR');
      return;
    }

    const pnr = this.pnrForm.value.pnr.trim();
    const result = this.bookingService.getBookingByPnr(pnr);

    this.searched = true;
    if (result) {
      this.bookingResult = result;
    } else {
      this.errorMessage = this.langService.t('ERR_PNR_NOT_FOUND');
    }
  }

  printStatus(): void {
    window.print();
  }
}
