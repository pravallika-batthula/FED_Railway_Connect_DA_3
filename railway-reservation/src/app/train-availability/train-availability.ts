import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TrainService } from '../services/train.service';
import { LanguageService } from '../services/language.service';
import { Train, TravelClass } from '../models/models';
import { TranslatePipe, LocalizedCurrencyPipe, LocalizedDatePipe } from '../pipes/translate.pipe';

@Component({
  selector: 'app-train-availability',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    TranslatePipe,
    LocalizedCurrencyPipe,
    LocalizedDatePipe
  ],
  templateUrl: './train-availability.html',
  styleUrl: './train-availability.css'
})
export class TrainAvailability implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  trainService = inject(TrainService);
  langService = inject(LanguageService);

  fromStation = '';
  toStation = '';
  journeyDate = '';
  trains: Train[] = [];
  selectedClassMap: Record<string, TravelClass> = {};
  selectedFilterClass: 'ALL' | TravelClass = 'ALL';

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.fromStation = params['from'] || 'Secunderabad Junction (SC)';
      this.toStation = params['to'] || 'Howrah Junction (HWH)';

      const today = new Date();
      const defaultDate = new Date(today.getTime() + 2 * 24 * 60 * 60 * 1000)
        .toISOString().split('T')[0];
      this.journeyDate = params['date'] || defaultDate;

      this.loadTrains();
    });
  }

  loadTrains(): void {
    this.trains = this.trainService.searchTrains(
      this.fromStation,
      this.toStation,
      this.journeyDate
    );

    this.trains.forEach(t => {
      if (!this.selectedClassMap[t.id]) {
        this.selectedClassMap[t.id] = 'SL';
      }
    });
  }

  selectClass(trainId: string, travelClass: TravelClass): void {
    this.selectedClassMap[trainId] = travelClass;
  }

  bookTrain(train: Train): void {
    const travelClass = this.selectedClassMap[train.id] || 'SL';
    this.router.navigate(['/booking'], {
      queryParams: {
        trainId: train.id,
        from: this.fromStation,
        to: this.toStation,
        date: this.journeyDate,
        travelClass: travelClass
      }
    });
  }

  filterByClass(filter: 'ALL' | TravelClass): void {
    this.selectedFilterClass = filter;
  }
}
