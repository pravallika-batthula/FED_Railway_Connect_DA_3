import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { TrainService } from '../services/train.service';
import { LanguageService } from '../services/language.service';
import { Station, Train, TravelClass } from '../models/models';
import { TranslatePipe, LocalizedCurrencyPipe, LocalizedDatePipe } from '../pipes/translate.pipe';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    TranslatePipe,
    LocalizedCurrencyPipe,
    LocalizedDatePipe
  ],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  trainService = inject(TrainService);
  langService = inject(LanguageService);

  searchForm!: FormGroup;
  stations: Station[] = [];
  todayDateStr: string = '';
  searched = false;
  results: Train[] = [];
  selectedClassMap: Record<string, TravelClass> = {};
  errorMessage: string = '';

  ngOnInit(): void {
    this.stations = this.trainService.getAllStations();
    const today = new Date();
    this.todayDateStr = today.toISOString().split('T')[0];

    // Default to a 2-day future date for journey
    const defaultJourney = new Date(today.getTime() + 2 * 24 * 60 * 60 * 1000)
      .toISOString().split('T')[0];

    this.searchForm = this.fb.group({
      from: ['Secunderabad Junction (SC)', Validators.required],
      to: ['Howrah Junction (HWH)', Validators.required],
      date: [defaultJourney, Validators.required]
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

    this.results = this.trainService.searchTrains(from, to, date);
    // Initialize default selected class for each train
    this.results.forEach(t => {
      if (!this.selectedClassMap[t.id]) {
        this.selectedClassMap[t.id] = 'SL';
      }
    });
    this.searched = true;
  }

  selectClass(trainId: string, travelClass: TravelClass): void {
    this.selectedClassMap[trainId] = travelClass;
  }

  bookTrain(train: Train): void {
    const travelClass = this.selectedClassMap[train.id] || 'SL';
    const { from, to, date } = this.searchForm.value;

    this.router.navigate(['/booking'], {
      queryParams: {
        trainId: train.id,
        from: train.from || from,
        to: train.to || to,
        date: date,
        travelClass: travelClass
      }
    });
  }
}
