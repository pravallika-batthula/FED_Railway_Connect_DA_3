import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { BookingService } from '../services/booking.service';
import { AuthService } from '../services/auth.service';
import { LanguageService } from '../services/language.service';
import { Booking } from '../models/models';
import { TranslatePipe, LocalizedCurrencyPipe, LocalizedDatePipe } from '../pipes/translate.pipe';

@Component({
  selector: 'app-bookings',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    TranslatePipe,
    LocalizedCurrencyPipe,
    LocalizedDatePipe
  ],
  templateUrl: './bookings.html',
  styleUrl: './bookings.css'
})
export class Bookings implements OnInit {
  private bookingService = inject(BookingService);
  private authService = inject(AuthService);
  private router = inject(Router);
  langService = inject(LanguageService);

  userBookings: Booking[] = [];
  selectedBookingForDetails: Booking | null = null;
  notificationMessage = '';

  ngOnInit(): void {
    const user = this.authService.getCurrentUser();
    if (!user) {
      this.router.navigate(['/login'], { queryParams: { returnUrl: '/bookings' } });
      return;
    }

    this.loadUserBookings();
  }

  loadUserBookings(): void {
    const user = this.authService.getCurrentUser();
    if (user) {
      this.userBookings = this.bookingService.getBookingsByUser(user.email);
    }
  }

  openDetails(booking: Booking): void {
    this.selectedBookingForDetails = booking;
  }

  closeDetails(): void {
    this.selectedBookingForDetails = null;
  }

  cancelBooking(booking: Booking): void {
    const confirmText = `${this.langService.t('CANCEL_PROMPT')} ${booking.pnr}?`;
    if (confirm(confirmText)) {
      const ok = this.bookingService.cancelBooking(booking.pnr);
      if (ok) {
        this.notificationMessage = this.langService.t('CANCEL_SUCCESS');
        this.loadUserBookings();
        if (this.selectedBookingForDetails && this.selectedBookingForDetails.pnr === booking.pnr) {
          this.selectedBookingForDetails.status = 'CANCELLED';
        }
        setTimeout(() => {
          this.notificationMessage = '';
        }, 4000);
      }
    }
  }

  printTicket(): void {
    window.print();
  }
}
