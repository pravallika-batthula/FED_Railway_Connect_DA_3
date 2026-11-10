import { Injectable } from '@angular/core';
import { Booking, Passenger, TravelClass } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private static readonly STORAGE_KEY = 'railconnect_bookings';

  constructor() {
    this.seedDefaultBookings();
  }

  private seedDefaultBookings(): void {
    const existing = this.getAllBookings();
    if (existing.length === 0) {
      const demoBookings: Booking[] = [
        {
          pnr: '4821950346',
          userEmail: 'user@railconnect.com',
          trainNumber: '12703',
          trainName: 'Falaknuma Superfast Express',
          fromStation: 'Secunderabad Junction (SC)',
          toStation: 'Howrah Junction (HWH)',
          journeyDate: '2026-11-20',
          travelClass: '3A',
          passengers: [
            { name: 'Amit Kumar', age: 34, gender: 'Male', seatNumber: 'B2-21 (Lower)' },
            { name: 'Sneha Kumar', age: 31, gender: 'Female', seatNumber: 'B2-22 (Middle)' }
          ],
          totalFare: 3440,
          bookingDate: '2026-11-09',
          status: 'CONFIRMED'
        },
        {
          pnr: '6754210983',
          userEmail: 'user@railconnect.com',
          trainNumber: '20833',
          trainName: 'Vande Bharat Express',
          fromStation: 'Secunderabad Junction (SC)',
          toStation: 'Visakhapatnam Junction (VSKP)',
          journeyDate: '2026-11-25',
          travelClass: '2A',
          passengers: [
            { name: 'Praveen Reddy', age: 24, gender: 'Male', seatNumber: 'C1-14 (Window)' }
          ],
          totalFare: 2315,
          bookingDate: '2026-11-08',
          status: 'CONFIRMED'
        },
        {
          pnr: '1904738265',
          userEmail: 'rahul@example.com',
          trainNumber: '12952',
          trainName: 'Mumbai Tejas Rajdhani Express',
          fromStation: 'New Delhi (NDLS)',
          toStation: 'Mumbai Central (MMCT)',
          journeyDate: '2026-11-15',
          travelClass: 'SL',
          passengers: [
            { name: 'Rahul Sharma', age: 28, gender: 'Male', seatNumber: 'S4-45 (Side Lower)' }
          ],
          totalFare: 850,
          bookingDate: '2026-11-05',
          status: 'CANCELLED'
        }
      ];
      this.saveBookings(demoBookings);
    }
  }

  getAllBookings(): Booking[] {
    try {
      const data = localStorage.getItem(BookingService.STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  private saveBookings(bookings: Booking[]): void {
    try {
      localStorage.setItem(BookingService.STORAGE_KEY, JSON.stringify(bookings));
    } catch {
      // ignore
    }
  }

  generatePnr(): string {
    // Generate a unique 10-digit number
    let pnr = '';
    const bookings = this.getAllBookings();
    do {
      const firstDigit = Math.floor(Math.random() * 8) + 2; // 2 - 9
      const rest = Math.floor(Math.random() * 1000000000).toString().padStart(9, '0');
      pnr = `${firstDigit}${rest}`;
    } while (bookings.some(b => b.pnr === pnr));

    return pnr;
  }

  createBooking(data: {
    userEmail: string;
    trainNumber: string;
    trainName: string;
    fromStation: string;
    toStation: string;
    journeyDate: string;
    travelClass: TravelClass;
    passengers: Passenger[];
    totalFare: number;
  }): Booking {
    const bookings = this.getAllBookings();
    const pnr = this.generatePnr();

    // Assign realistic coach & seat numbers
    const coachPrefix = data.travelClass === 'SL' ? 'S' : (data.travelClass === '3A' ? 'B' : 'A');
    const coachNum = Math.floor(Math.random() * 4) + 1;
    const berths = ['Lower', 'Middle', 'Upper', 'Side Lower', 'Side Upper'];

    const passengersWithSeats: Passenger[] = data.passengers.map((p, idx) => {
      const seatNum = Math.floor(Math.random() * 64) + 1;
      const berth = berths[idx % berths.length];
      return {
        ...p,
        seatNumber: `${coachPrefix}${coachNum}-${seatNum} (${berth})`
      };
    });

    const todayStr = new Date().toISOString().split('T')[0];

    const newBooking: Booking = {
      pnr,
      userEmail: data.userEmail.trim().toLowerCase(),
      trainNumber: data.trainNumber,
      trainName: data.trainName,
      fromStation: data.fromStation,
      toStation: data.toStation,
      journeyDate: data.journeyDate,
      travelClass: data.travelClass,
      passengers: passengersWithSeats,
      totalFare: data.totalFare,
      bookingDate: todayStr,
      status: 'CONFIRMED'
    };

    bookings.unshift(newBooking);
    this.saveBookings(bookings);

    return newBooking;
  }

  getBookingsByUser(userEmail: string): Booking[] {
    const normalized = userEmail.trim().toLowerCase();
    return this.getAllBookings().filter(b => b.userEmail === normalized);
  }

  getBookingByPnr(pnr: string): Booking | undefined {
    const cleanPnr = pnr.trim();
    return this.getAllBookings().find(b => b.pnr === cleanPnr);
  }

  cancelBooking(pnr: string): boolean {
    const bookings = this.getAllBookings();
    const cleanPnr = pnr.trim();
    const index = bookings.findIndex(b => b.pnr === cleanPnr);

    if (index !== -1) {
      bookings[index].status = 'CANCELLED';
      this.saveBookings(bookings);
      return true;
    }
    return false;
  }
}
