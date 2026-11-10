export interface User {
  id?: string;
  name: string;
  email: string;
  mobile: string;
  password?: string;
}

export type TravelClass = 'SL' | '3A' | '2A';

export interface ClassAvailability {
  fare: number;
  availableSeats: number;
  status: string; // e.g. "AVAILABLE - 42", "RAC - 4", "WL - 12"
}

export interface Train {
  id: string;
  number: string;
  name: string;
  from: string;
  to: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  classes: Record<TravelClass, ClassAvailability>;
}

export interface Passenger {
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Transgender' | string;
  seatNumber?: string;
}

export interface Booking {
  pnr: string;
  userEmail: string;
  trainNumber: string;
  trainName: string;
  fromStation: string;
  toStation: string;
  journeyDate: string;
  travelClass: TravelClass;
  passengers: Passenger[];
  totalFare: number;
  bookingDate: string;
  status: 'CONFIRMED' | 'CANCELLED';
}

export interface Station {
  code: string;
  name: string;
  city: string;
}
