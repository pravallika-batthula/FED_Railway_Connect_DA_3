import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TrainService } from '../services/train.service';
import { LanguageService } from '../services/language.service';
import { Station } from '../models/models';
import { TranslatePipe } from '../pipes/translate.pipe';

@Component({
  selector: 'app-train-search',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslatePipe],
  templateUrl: './train-search.html',
  styleUrl: './train-search.css'
})
export class TrainSearch implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  trainService = inject(TrainService);
  langService = inject(LanguageService);

  searchForm!: FormGroup;
  stations: Station[] = [];
  todayDateStr: string = '';
  errorMessage: string = '';

  popularRoutes = [
    { from: 'Secunderabad Junction (SC)', to: 'Howrah Junction (HWH)' },
    { from: 'New Delhi (NDLS)', to: 'Mumbai Central (MMCT)' },
    { from: 'Secunderabad Junction (SC)', to: 'Visakhapatnam Junction (VSKP)' },
    { from: 'New Delhi (NDLS)', to: 'Chennai Central (MAS)' },
    { from: 'Vijayawada Junction (BZA)', to: 'KSR Bengaluru (SBC)' }
  ];

  ngOnInit(): void {
    this.stations = this.trainService.getAllStations();
    const today = new Date();
    this.todayDateStr = today.toISOString().split('T')[0];

    // Default to tomorrow
    const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000)
      .toISOString().split('T')[0];

    this.searchForm = this.fb.group({
      from: ['', Validators.required],
      to: ['', Validators.required],
      date: [tomorrow, Validators.required]
    });
  }

  setPopularRoute(from: string, to: string): void {
    this.searchForm.patchValue({ from, to });
    this.errorMessage = '';
  }

  swapStations(): void {
    const currentFrom = this.searchForm.get('from')?.value;
    const currentTo = this.searchForm.get('to')?.value;
    this.searchForm.patchValue({
      from: currentTo,
      to: currentFrom
    });
  }

  onSearch(): void {
    this.errorMessage = '';

    if (this.searchForm.invalid) {
      this.errorMessage = this.langService.t('ERR_REQUIRED_FIELDS');
      return;
    }

    const { from, to, date } = this.searchForm.value;

    if (from.trim().toLowerCase() === to.trim().toLowerCase()) {
      this.errorMessage = this.langService.t('ERR_SAME_STATION');
      return;
    }

    if (date < this.todayDateStr) {
      this.errorMessage = this.langService.t('ERR_PAST_DATE');
      return;
    }

    // Navigate to Availability component with query parameters
    this.router.navigate(['/availability'], {
      queryParams: { from, to, date }
    });
  }
}
