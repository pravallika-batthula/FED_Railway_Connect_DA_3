import { Injectable } from '@angular/core';
import { Station, Train, TravelClass } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class TrainService {
  readonly stations: Station[] = [
    { code: 'NDLS', name: 'New Delhi', city: 'Delhi' },
    { code: 'MMCT', name: 'Mumbai Central', city: 'Mumbai' },
    { code: 'HWH', name: 'Howrah Junction', city: 'Kolkata' },
    { code: 'MAS', name: 'Chennai Central', city: 'Chennai' },
    { code: 'SC', name: 'Secunderabad Junction', city: 'Hyderabad' },
    { code: 'BZA', name: 'Vijayawada Junction', city: 'Vijayawada' },
    { code: 'VSKP', name: 'Visakhapatnam Junction', city: 'Visakhapatnam' },
    { code: 'SBC', name: 'KSR Bengaluru', city: 'Bengaluru' },
    { code: 'ADI', name: 'Ahmedabad Junction', city: 'Ahmedabad' },
    { code: 'PUNE', name: 'Pune Junction', city: 'Pune' }
  ];

  private readonly trains: Train[] = [
    {
      id: 'trn_12703',
      number: '12703',
      name: 'Falaknuma Superfast Express',
      from: 'Secunderabad Junction (SC)',
      to: 'Howrah Junction (HWH)',
      departureTime: '03:55 PM',
      arrivalTime: '05:45 PM',
      duration: '25h 50m',
      classes: {
        SL: { fare: 645, availableSeats: 58, status: 'AVAILABLE - 58' },
        '3A': { fare: 1720, availableSeats: 24, status: 'AVAILABLE - 24' },
        '2A': { fare: 2490, availableSeats: 12, status: 'AVAILABLE - 12' }
      }
    },
    {
      id: 'trn_12704',
      number: '12704',
      name: 'Falaknuma Superfast Express',
      from: 'Howrah Junction (HWH)',
      to: 'Secunderabad Junction (SC)',
      departureTime: '05:25 AM',
      arrivalTime: '07:30 AM',
      duration: '26h 05m',
      classes: {
        SL: { fare: 645, availableSeats: 32, status: 'AVAILABLE - 32' },
        '3A': { fare: 1720, availableSeats: 18, status: 'AVAILABLE - 18' },
        '2A': { fare: 2490, availableSeats: 8, status: 'AVAILABLE - 08' }
      }
    },
    {
      id: 'trn_20833',
      number: '20833',
      name: 'Vande Bharat Express',
      from: 'Secunderabad Junction (SC)',
      to: 'Visakhapatnam Junction (VSKP)',
      departureTime: '05:45 AM',
      arrivalTime: '02:20 PM',
      duration: '8h 35m',
      classes: {
        SL: { fare: 750, availableSeats: 72, status: 'AVAILABLE - 72' },
        '3A': { fare: 1665, availableSeats: 45, status: 'AVAILABLE - 45' },
        '2A': { fare: 2315, availableSeats: 22, status: 'AVAILABLE - 22' }
      }
    },
    {
      id: 'trn_20834',
      number: '20834',
      name: 'Vande Bharat Express',
      from: 'Visakhapatnam Junction (VSKP)',
      to: 'Secunderabad Junction (SC)',
      departureTime: '02:35 PM',
      arrivalTime: '11:15 PM',
      duration: '8h 40m',
      classes: {
        SL: { fare: 750, availableSeats: 40, status: 'AVAILABLE - 40' },
        '3A': { fare: 1665, availableSeats: 30, status: 'AVAILABLE - 30' },
        '2A': { fare: 2315, availableSeats: 16, status: 'AVAILABLE - 16' }
      }
    },
    {
      id: 'trn_12727',
      number: '12727',
      name: 'Godavari Superfast Express',
      from: 'Visakhapatnam Junction (VSKP)',
      to: 'Secunderabad Junction (SC)',
      departureTime: '05:20 PM',
      arrivalTime: '06:15 AM',
      duration: '12h 55m',
      classes: {
        SL: { fare: 410, availableSeats: 28, status: 'AVAILABLE - 28' },
        '3A': { fare: 1105, availableSeats: 14, status: 'AVAILABLE - 14' },
        '2A': { fare: 1585, availableSeats: 6, status: 'AVAILABLE - 06' }
      }
    },
    {
      id: 'trn_12709',
      number: '12709',
      name: 'Simhapuri Superfast Express',
      from: 'Vijayawada Junction (BZA)',
      to: 'Secunderabad Junction (SC)',
      departureTime: '10:50 PM',
      arrivalTime: '05:40 AM',
      duration: '6h 50m',
      classes: {
        SL: { fare: 260, availableSeats: 64, status: 'AVAILABLE - 64' },
        '3A': { fare: 695, availableSeats: 36, status: 'AVAILABLE - 36' },
        '2A': { fare: 990, availableSeats: 15, status: 'AVAILABLE - 15' }
      }
    },
    {
      id: 'trn_12710',
      number: '12710',
      name: 'Simhapuri Superfast Express',
      from: 'Secunderabad Junction (SC)',
      to: 'Vijayawada Junction (BZA)',
      departureTime: '11:05 PM',
      arrivalTime: '05:55 AM',
      duration: '6h 50m',
      classes: {
        SL: { fare: 260, availableSeats: 52, status: 'AVAILABLE - 52' },
        '3A': { fare: 695, availableSeats: 29, status: 'AVAILABLE - 29' },
        '2A': { fare: 990, availableSeats: 10, status: 'AVAILABLE - 10' }
      }
    },
    {
      id: 'trn_17225',
      number: '17225',
      name: 'Amaravati Express',
      from: 'Vijayawada Junction (BZA)',
      to: 'KSR Bengaluru (SBC)',
      departureTime: '07:45 PM',
      arrivalTime: '09:20 AM',
      duration: '13h 35m',
      classes: {
        SL: { fare: 395, availableSeats: 44, status: 'AVAILABLE - 44' },
        '3A': { fare: 1080, availableSeats: 19, status: 'AVAILABLE - 19' },
        '2A': { fare: 1540, availableSeats: 9, status: 'AVAILABLE - 09' }
      }
    },
    {
      id: 'trn_12434',
      number: '12434',
      name: 'Chennai Rajdhani Express',
      from: 'New Delhi (NDLS)',
      to: 'Chennai Central (MAS)',
      departureTime: '03:35 PM',
      arrivalTime: '08:40 PM',
      duration: '29h 05m',
      classes: {
        SL: { fare: 1150, availableSeats: 38, status: 'AVAILABLE - 38' },
        '3A': { fare: 2880, availableSeats: 16, status: 'AVAILABLE - 16' },
        '2A': { fare: 4120, availableSeats: 8, status: 'AVAILABLE - 08' }
      }
    },
    {
      id: 'trn_12433',
      number: '12433',
      name: 'Chennai Rajdhani Express',
      from: 'Chennai Central (MAS)',
      to: 'New Delhi (NDLS)',
      departureTime: '06:10 AM',
      arrivalTime: '10:30 AM',
      duration: '28h 20m',
      classes: {
        SL: { fare: 1150, availableSeats: 45, status: 'AVAILABLE - 45' },
        '3A': { fare: 2880, availableSeats: 20, status: 'AVAILABLE - 20' },
        '2A': { fare: 4120, availableSeats: 11, status: 'AVAILABLE - 11' }
      }
    },
    {
      id: 'trn_12952',
      number: '12952',
      name: 'Mumbai Tejas Rajdhani Express',
      from: 'New Delhi (NDLS)',
      to: 'Mumbai Central (MMCT)',
      departureTime: '04:55 PM',
      arrivalTime: '08:35 AM',
      duration: '15h 40m',
      classes: {
        SL: { fare: 850, availableSeats: 60, status: 'AVAILABLE - 60' },
        '3A': { fare: 2240, availableSeats: 34, status: 'AVAILABLE - 34' },
        '2A': { fare: 3180, availableSeats: 18, status: 'AVAILABLE - 18' }
      }
    },
    {
      id: 'trn_12951',
      number: '12951',
      name: 'Mumbai Tejas Rajdhani Express',
      from: 'Mumbai Central (MMCT)',
      to: 'New Delhi (NDLS)',
      departureTime: '05:00 PM',
      arrivalTime: '08:32 AM',
      duration: '15h 32m',
      classes: {
        SL: { fare: 850, availableSeats: 50, status: 'AVAILABLE - 50' },
        '3A': { fare: 2240, availableSeats: 28, status: 'AVAILABLE - 28' },
        '2A': { fare: 3180, availableSeats: 14, status: 'AVAILABLE - 14' }
      }
    },
    {
      id: 'trn_12842',
      number: '12842',
      name: 'Coromandel Superfast Express',
      from: 'Chennai Central (MAS)',
      to: 'Howrah Junction (HWH)',
      departureTime: '07:00 AM',
      arrivalTime: '10:45 AM',
      duration: '27h 45m',
      classes: {
        SL: { fare: 690, availableSeats: 35, status: 'AVAILABLE - 35' },
        '3A': { fare: 1840, availableSeats: 15, status: 'AVAILABLE - 15' },
        '2A': { fare: 2650, availableSeats: 7, status: 'AVAILABLE - 07' }
      }
    },
    {
      id: 'trn_12640',
      number: '12640',
      name: 'Brindavan Superfast Express',
      from: 'KSR Bengaluru (SBC)',
      to: 'Chennai Central (MAS)',
      departureTime: '03:10 PM',
      arrivalTime: '09:05 PM',
      duration: '5h 55m',
      classes: {
        SL: { fare: 220, availableSeats: 85, status: 'AVAILABLE - 85' },
        '3A': { fare: 590, availableSeats: 42, status: 'AVAILABLE - 42' },
        '2A': { fare: 840, availableSeats: 25, status: 'AVAILABLE - 25' }
      }
    }
  ];

  getAllStations(): Station[] {
    return this.stations;
  }

  getStationName(codeOrName: string): string {
    const st = this.stations.find(
      s => s.code.toLowerCase() === codeOrName.toLowerCase() ||
           s.name.toLowerCase() === codeOrName.toLowerCase()
    );
    return st ? `${st.name} (${st.code})` : codeOrName;
  }

  searchTrains(fromStation: string, toStation: string, date: string): Train[] {
    const cleanFrom = fromStation.trim().toLowerCase();
    const cleanTo = toStation.trim().toLowerCase();

    // Find direct matching trains from catalog
    const matches = this.trains.filter(t => {
      const fromMatch = t.from.toLowerCase().includes(cleanFrom) || cleanFrom.includes(t.from.toLowerCase());
      const toMatch = t.to.toLowerCase().includes(cleanTo) || cleanTo.includes(t.to.toLowerCase());
      return fromMatch && toMatch;
    });

    if (matches.length > 0) {
      return matches;
    }

    // Dynamic realistic fallback for any station pair so testing is seamless
    const fromName = this.getStationName(fromStation);
    const toName = this.getStationName(toStation);

    return [
      {
        id: `trn_gen_1_${cleanFrom}_${cleanTo}`,
        number: '12885',
        name: 'RailConnect Superfast Express',
        from: fromName,
        to: toName,
        departureTime: '06:15 AM',
        arrivalTime: '02:45 PM',
        duration: '8h 30m',
        classes: {
          SL: { fare: 480, availableSeats: 54, status: 'AVAILABLE - 54' },
          '3A': { fare: 1280, availableSeats: 22, status: 'AVAILABLE - 22' },
          '2A': { fare: 1850, availableSeats: 10, status: 'AVAILABLE - 10' }
        }
      },
      {
        id: `trn_gen_2_${cleanFrom}_${cleanTo}`,
        number: '17604',
        name: 'Intercity Fast Express',
        from: fromName,
        to: toName,
        departureTime: '03:30 PM',
        arrivalTime: '11:55 PM',
        duration: '8h 25m',
        classes: {
          SL: { fare: 450, availableSeats: 30, status: 'AVAILABLE - 30' },
          '3A': { fare: 1200, availableSeats: 15, status: 'AVAILABLE - 15' },
          '2A': { fare: 1750, availableSeats: 6, status: 'AVAILABLE - 06' }
        }
      },
      {
        id: `trn_gen_3_${cleanFrom}_${cleanTo}`,
        number: '20912',
        name: 'RailConnect Special Fare SF',
        from: fromName,
        to: toName,
        departureTime: '09:00 PM',
        arrivalTime: '06:30 AM',
        duration: '9h 30m',
        classes: {
          SL: { fare: 520, availableSeats: 18, status: 'AVAILABLE - 18' },
          '3A': { fare: 1390, availableSeats: 8, status: 'AVAILABLE - 08' },
          '2A': { fare: 1980, availableSeats: 4, status: 'AVAILABLE - 04' }
        }
      }
    ];
  }

  getTrainById(id: string): Train | undefined {
    const direct = this.trains.find(t => t.id === id);
    if (direct) return direct;

    // Handle generated id
    if (id.startsWith('trn_gen_')) {
      const parts = id.split('_');
      const num = parts[1] === '1' ? '12885' : (parts[1] === '2' ? '17604' : '20912');
      const name = parts[1] === '1' ? 'RailConnect Superfast Express' : (parts[1] === '2' ? 'Intercity Fast Express' : 'RailConnect Special Fare SF');
      return {
        id,
        number: num,
        name,
        from: 'Departure Station',
        to: 'Destination Station',
        departureTime: '06:15 AM',
        arrivalTime: '02:45 PM',
        duration: '8h 30m',
        classes: {
          SL: { fare: 480, availableSeats: 54, status: 'AVAILABLE - 54' },
          '3A': { fare: 1280, availableSeats: 22, status: 'AVAILABLE - 22' },
          '2A': { fare: 1850, availableSeats: 10, status: 'AVAILABLE - 10' }
        }
      };
    }
    return undefined;
  }
}
