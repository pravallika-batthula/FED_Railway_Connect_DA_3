import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Login } from './login/login';
import { Register } from './register/register';
import { TrainSearch } from './train-search/train-search';
import { TrainAvailability } from './train-availability/train-availability';
import { TicketBooking } from './ticket-booking/ticket-booking';
import { Bookings } from './bookings/bookings';
import { PnrStatus } from './pnr-status/pnr-status';
import { authGuard } from './services/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: Home },
  { path: 'search', component: TrainSearch },
  { path: 'availability', component: TrainAvailability },
  { path: 'booking', component: TicketBooking, canActivate: [authGuard] },
  { path: 'bookings', component: Bookings, canActivate: [authGuard] },
  { path: 'pnr-status', component: PnrStatus },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: '**', redirectTo: 'home' }
];
