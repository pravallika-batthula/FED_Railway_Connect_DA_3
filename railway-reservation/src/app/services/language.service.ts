import { Injectable, signal } from '@angular/core';

export type SupportedLanguage = 'en' | 'te' | 'hi';

export interface LanguageOption {
  code: SupportedLanguage;
  label: string;
  nativeLabel: string;
}

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  public static readonly STORAGE_KEY = 'railconnect_language';

  readonly languages: LanguageOption[] = [
    { code: 'en', label: 'English', nativeLabel: 'English' },
    { code: 'te', label: 'Telugu', nativeLabel: 'తెలుగు' },
    { code: 'hi', label: 'Hindi', nativeLabel: 'हिन्दी' }
  ];

  private currentLangSignal = signal<SupportedLanguage>(this.getInitialLanguage());

  // Translations dictionary
  private readonly translations: Record<SupportedLanguage, Record<string, string>> = {
    en: {
      // Navbar & General
      APP_NAME: 'RailConnect',
      NAV_HOME: 'Home',
      NAV_SEARCH: 'Train Search',
      NAV_AVAILABILITY: 'Train Availability',
      NAV_BOOKINGS: 'My Bookings',
      NAV_PNR: 'PNR Status',
      NAV_LOGIN: 'Login',
      NAV_REGISTER: 'Register',
      NAV_LOGOUT: 'Logout',
      WELCOME_USER: 'Hello',
      FOOTER_TEXT: '© 2026 RailConnect - Railway Reservation System (DA-3). All Rights Reserved.',

      // Home Page
      HERO_TITLE: 'Welcome to RailConnect',
      HERO_SUBTITLE: 'Safe, Reliable & Fast Railway Reservations Across India',
      SEARCH_CARD_TITLE: 'Search Trains & Check Availability',
      FEATURE_FAST_BOOKING: 'Instant Ticket Booking',
      FEATURE_FAST_DESC: 'Reserve Sleeper, 3A, and 2A tickets in just a few clicks.',
      FEATURE_PNR: 'Real-time PNR Tracking',
      FEATURE_PNR_DESC: 'Check live confirmation status and passenger seat details anytime.',
      FEATURE_CANCEL: 'Hassle-free Cancellation',
      FEATURE_CANCEL_DESC: 'Cancel booked tickets instantly with status updates stored locally.',

      // Form Labels & Placeholders
      LABEL_FROM_STATION: 'From Station',
      LABEL_TO_STATION: 'To Station',
      LABEL_JOURNEY_DATE: 'Journey Date',
      PLACEHOLDER_FROM_STATION: 'Select Departure Station',
      PLACEHOLDER_TO_STATION: 'Select Destination Station',
      BTN_SEARCH_TRAINS: 'Search Trains',
      ERR_SAME_STATION: 'From Station and To Station cannot be the same!',
      ERR_REQUIRED_FIELDS: 'Please select From Station, To Station, and Journey Date.',
      ERR_PAST_DATE: 'Journey date cannot be in the past.',

      // Train Search & Availability
      RESULTS_TITLE: 'Available Trains',
      ROUTE_LABEL: 'Route',
      JOURNEY_DATE_LABEL: 'Journey Date',
      COL_TRAIN_DETAILS: 'Train Info',
      COL_SCHEDULE: 'Schedule',
      COL_CLASSES: 'Classes & Availability',
      COL_ACTION: 'Action',
      LABEL_TRAIN_NO: 'Train No.',
      LABEL_DEPARTURE: 'Departure',
      LABEL_ARRIVAL: 'Arrival',
      LABEL_DURATION: 'Duration',
      LABEL_SEATS_AVAIL: 'Seats',
      CLASS_SL: 'Sleeper (SL)',
      CLASS_3A: 'AC 3 Tier (3A)',
      CLASS_2A: 'AC 2 Tier (2A)',
      BTN_BOOK_NOW: 'Book Now',
      NO_TRAINS_FOUND: 'No trains available for the selected route. Try searching between major stations like New Delhi, Secunderabad, Howrah, Mumbai, or Chennai.',

      // Booking Page
      BOOKING_TITLE: 'Passenger Ticket Booking',
      TRAIN_DETAILS_HEADER: 'Train Summary',
      SELECTED_CLASS: 'Selected Travel Class',
      PASSENGER_DETAILS_HEADER: 'Passenger Details (Max 6 passengers)',
      LABEL_PASSENGER_NAME: 'Passenger Name',
      LABEL_PASSENGER_AGE: 'Age',
      LABEL_PASSENGER_GENDER: 'Gender',
      GENDER_MALE: 'Male',
      GENDER_FEMALE: 'Female',
      GENDER_OTHER: 'Transgender',
      BTN_ADD_PASSENGER: '+ Add Passenger',
      BTN_REMOVE: 'Remove',
      FARE_SUMMARY_HEADER: 'Fare Summary',
      BASE_FARE_PER_PASSENGER: 'Fare Per Passenger',
      TOTAL_PASSENGERS: 'Total Passengers',
      TOTAL_FARE: 'Total Fare',
      BTN_CONFIRM_BOOKING: 'Confirm & Book Ticket',
      CONFIRMATION_TITLE: '🎉 Ticket Booked Successfully!',
      CONFIRMATION_SUBTITLE: 'Your journey is confirmed. Save your PNR for future tracking.',
      LABEL_PNR: 'PNR Number',
      LABEL_BOOKING_DATE: 'Booking Date',
      LABEL_BOOKING_STATUS: 'Status',
      BTN_GO_TO_BOOKINGS: 'View in My Bookings',
      BTN_PRINT_TICKET: 'Print / Save Ticket',
      BTN_BOOK_ANOTHER: 'Book Another Ticket',

      // My Bookings
      MY_BOOKINGS_TITLE: 'My Bookings',
      MY_BOOKINGS_SUBTITLE: 'View all tickets reserved under your account and manage cancellations.',
      NO_BOOKINGS_MSG: 'You have not booked any tickets yet.',
      BTN_START_SEARCH: 'Search & Book Trains',
      STATUS_CONFIRMED: 'CONFIRMED',
      STATUS_CANCELLED: 'CANCELLED',
      BTN_VIEW_DETAILS: 'View Ticket',
      BTN_CANCEL_TICKET: 'Cancel Ticket',
      CANCEL_PROMPT: 'Are you sure you want to cancel ticket with PNR:',
      CANCEL_SUCCESS: 'Ticket cancelled successfully!',
      MODAL_TICKET_DETAILS: 'E-Ticket Confirmation Details',
      BTN_CLOSE: 'Close',

      // PNR Status
      PNR_SEARCH_TITLE: 'PNR Status Enquiry',
      PNR_SEARCH_SUBTITLE: 'Enter your 10-digit Passenger Name Record (PNR) to check current reservation status.',
      LABEL_ENTER_PNR: 'Enter 10-Digit PNR Number',
      PLACEHOLDER_PNR: 'e.g. 4821950346',
      BTN_CHECK_STATUS: 'Get PNR Status',
      ERR_INVALID_PNR: 'Please enter a valid 10-digit numeric PNR number.',
      ERR_PNR_NOT_FOUND: 'PNR not found! Please check the 10-digit number and try again.',
      PNR_DETAILS_HEADER: 'PNR Reservation Details',

      // Login & Register
      LOGIN_TITLE: 'Login to RailConnect',
      LOGIN_SUBTITLE: 'Access your saved bookings and enjoy fast ticket reservations.',
      LABEL_EMAIL: 'Email Address',
      PLACEHOLDER_EMAIL: 'e.g. user@railconnect.com',
      LABEL_PASSWORD: 'Password',
      PLACEHOLDER_PASSWORD: 'Enter your password',
      BTN_LOGIN: 'Login',
      NO_ACCOUNT_PROMPT: "Don't have an account?",
      REGISTER_LINK_TEXT: 'Register here',
      ERR_INVALID_CREDENTIALS: 'Invalid email or password. Please try again.',
      ERR_USER_NOT_FOUND: 'No account found with this email. Please register first.',
      LOGIN_REQUIRED_MSG: 'Please login to access ticket booking and your bookings.',

      REGISTER_TITLE: 'Create RailConnect Account',
      REGISTER_SUBTITLE: 'Register for free to book railway tickets online.',
      LABEL_NAME: 'Full Name',
      PLACEHOLDER_NAME: 'e.g. Rahul Sharma',
      LABEL_MOBILE: 'Mobile Number',
      PLACEHOLDER_MOBILE: '10-digit mobile number',
      LABEL_CONFIRM_PASSWORD: 'Confirm Password',
      PLACEHOLDER_CONFIRM_PASSWORD: 'Re-enter your password',
      BTN_REGISTER: 'Register Account',
      HAVE_ACCOUNT_PROMPT: 'Already have an account?',
      LOGIN_LINK_TEXT: 'Login here',
      ERR_PASSWORDS_MISMATCH: 'Password and Confirm Password do not match.',
      ERR_EMAIL_EXISTS: 'This email is already registered! Please login or use a different email.',
      SUCCESS_REGISTER: 'Registration successful! You can now log in.'
    },

    te: {
      // Navbar & General
      APP_NAME: 'రైల్‌కనెక్ట్',
      NAV_HOME: 'హోమ్',
      NAV_SEARCH: 'రైలు శోధన',
      NAV_AVAILABILITY: 'రైలు లభ్యత',
      NAV_BOOKINGS: 'నా బుకింగ్స్',
      NAV_PNR: 'పి.ఎన్.ఆర్ స్థితి',
      NAV_LOGIN: 'లాగిన్',
      NAV_REGISTER: 'రిజిస్టర్',
      NAV_LOGOUT: 'లాగ్ అవుట్',
      WELCOME_USER: 'నమస్కారం',
      FOOTER_TEXT: '© 2026 రైల్‌కనెక్ట్ - రైల్వే రిజర్వేషన్ వెబ్‌సైట్ (DA-3). సర్వహక్కులు ప్రత్యేకించబడ్డాయి.',

      // Home Page
      HERO_TITLE: 'రైల్‌కనెక్ట్‌కు స్వాగతం',
      HERO_SUBTITLE: 'భారతదేశం అంతటా సురక్షితమైన, విశ్వసనీయమైన రైల్వే రిజర్వేషన్లు',
      SEARCH_CARD_TITLE: 'రైళ్లను శోధించి సీట్ల లభ్యతను తనిఖీ చేయండి',
      FEATURE_FAST_BOOKING: 'తక్షణ టికెట్ బుకింగ్',
      FEATURE_FAST_DESC: 'కొద్ది నిమిషాల్లో స్లీపర్, 3A, 2A తరగతుల్లో టిక్కెట్లను రిజర్వ్ చేయండి.',
      FEATURE_PNR: 'నిజ-సమయ పి.ఎన్.ఆర్ ట్రాకింగ్',
      FEATURE_PNR_DESC: 'మీ సీటు స్థితి మరియు ప్రయాణ వివరాలను ఎప్పుడైనా తనిఖీ చేయండి.',
      FEATURE_CANCEL: 'సులభమైన రద్దు విధానం',
      FEATURE_CANCEL_DESC: 'బుక్ చేసిన టికెట్లను సులభంగా రద్దు చేయండి, వివరాలు భద్రపరచబడతాయి.',

      // Form Labels & Placeholders
      LABEL_FROM_STATION: 'ప్రయాణ ఆరంభ స్టేషన్',
      LABEL_TO_STATION: 'గమ్యస్థాన స్టేషన్',
      LABEL_JOURNEY_DATE: 'ప్రయాణ తేదీ',
      PLACEHOLDER_FROM_STATION: 'నిష్క్రమణ స్టేషన్‌ను ఎంచుకోండి',
      PLACEHOLDER_TO_STATION: 'గమ్యస్థాన స్టేషన్‌ను ఎంచుకోండి',
      BTN_SEARCH_TRAINS: 'రైళ్లను శోధించండి',
      ERR_SAME_STATION: 'ఆరంభ మరియు గమ్యస్థాన స్టేషన్లు ఒకేలా ఉండకూడదు!',
      ERR_REQUIRED_FIELDS: 'దయచేసి ఆరంభ స్టేషన్, గమ్యస్థాన స్టేషన్ మరియు ప్రయాణ తేదీని ఎంచుకోండి.',
      ERR_PAST_DATE: 'ప్రయాణ తేదీ గతంలో ఉండకూడదు.',

      // Train Search & Availability
      RESULTS_TITLE: 'అందుబాటులో ఉన్న రైళ్లు',
      ROUTE_LABEL: 'మార్గం',
      JOURNEY_DATE_LABEL: 'ప్రయాణ తేదీ',
      COL_TRAIN_DETAILS: 'రైలు సమాచారం',
      COL_SCHEDULE: 'సమయ పట్టిక',
      COL_CLASSES: 'తరగతులు & సీట్ల లభ్యత',
      COL_ACTION: 'చర్య',
      LABEL_TRAIN_NO: 'రైలు నం.',
      LABEL_DEPARTURE: 'బయలుదేరు సమయం',
      LABEL_ARRIVAL: 'చేరుకొను సమయం',
      LABEL_DURATION: 'వ్యవధి',
      LABEL_SEATS_AVAIL: 'సీట్లు',
      CLASS_SL: 'స్లీపర్ (SL)',
      CLASS_3A: 'ఏసీ 3 టైర్ (3A)',
      CLASS_2A: 'ఏసీ 2 టైర్ (2A)',
      BTN_BOOK_NOW: 'ఇప్పుడే బుక్ చేయండి',
      NO_TRAINS_FOUND: 'ఎంచుకున్న మార్గంలో రైళ్లు అందుబాటులో లేవు. న్యూఢిల్లీ, సికింద్రాబాద్, హౌరా, ముంబై, లేదా చెన్నై వంటి ప్రధాన స్టేషన్ల మధ్య వెతకండి.',

      // Booking Page
      BOOKING_TITLE: 'ప్రయాణీకుల టికెట్ బుకింగ్',
      TRAIN_DETAILS_HEADER: 'రైలు వివరాల సారాంశం',
      SELECTED_CLASS: 'ఎంచుకున్న ప్రయాణ తరగతి',
      PASSENGER_DETAILS_HEADER: 'ప్రయాణీకుల వివరాలు (గరిష్టంగా 6 మంది)',
      LABEL_PASSENGER_NAME: 'ప్రయాణీకుడి పేరు',
      LABEL_PASSENGER_AGE: 'వయస్సు',
      LABEL_PASSENGER_GENDER: 'లింగం',
      GENDER_MALE: 'పురుషుడు',
      GENDER_FEMALE: 'స్త్రీ',
      GENDER_OTHER: 'ట్రాన్స్‌జెండర్',
      BTN_ADD_PASSENGER: '+ ప్రయాణీకుడిని చేర్చండి',
      BTN_REMOVE: 'తొలగించు',
      FARE_SUMMARY_HEADER: 'ఛార్జీల సారాంశం',
      BASE_FARE_PER_PASSENGER: 'ఒక్కో ప్రయాణీకుడి ఛార్జీ',
      TOTAL_PASSENGERS: 'మొత్తం ప్రయాణీకులు',
      TOTAL_FARE: 'మొత్తం ఛార్జీ',
      BTN_CONFIRM_BOOKING: 'నిర్ధారించి టికెట్ బుక్ చేయండి',
      CONFIRMATION_TITLE: '🎉 టికెట్ విజయవంతంగా బుక్ చేయబడింది!',
      CONFIRMATION_SUBTITLE: 'మీ ప్రయాణం ఖరారైంది. స్థితిని తెలుసుకోవడానికి పి.ఎన్.ఆర్ భద్రపరుచుకోండి.',
      LABEL_PNR: 'పి.ఎన్.ఆర్ సంఖ్య',
      LABEL_BOOKING_DATE: 'బుకింగ్ తేదీ',
      LABEL_BOOKING_STATUS: 'స్థితి',
      BTN_GO_TO_BOOKINGS: 'నా బుకింగ్స్‌లో చూడండి',
      BTN_PRINT_TICKET: 'టికెట్ ముద్రించండి / భద్రపరచండి',
      BTN_BOOK_ANOTHER: 'మరో టికెట్ బుక్ చేయండి',

      // My Bookings
      MY_BOOKINGS_TITLE: 'నా బుకింగ్స్',
      MY_BOOKINGS_SUBTITLE: 'మీ ఖాతాలోని అన్ని టికెట్లను పరిశీలించండి మరియు రద్దు ప్రక్రియను నిర్వహించండి.',
      NO_BOOKINGS_MSG: 'మీరు ఇప్పటివరకు ఎటువంటి టిక్కెట్లు బుక్ చేసుకోలేదు.',
      BTN_START_SEARCH: 'రైళ్లను శోధించి బుక్ చేయండి',
      STATUS_CONFIRMED: 'ధృవీకరించబడింది',
      STATUS_CANCELLED: 'రద్దు చేయబడింది',
      BTN_VIEW_DETAILS: 'టికెట్ చూడండి',
      BTN_CANCEL_TICKET: 'టికెట్ రద్దు చేయండి',
      CANCEL_PROMPT: 'మీరు నిజంగా ఈ పి.ఎన్.ఆర్ టికెట్‌ను రద్దు చేయాలనుకుంటున్నారా:',
      CANCEL_SUCCESS: 'టికెట్ విజయవంతంగా రద్దు చేయబడింది!',
      MODAL_TICKET_DETAILS: 'ఈ-టికెట్ పూర్తి వివరాలు',
      BTN_CLOSE: 'మూసివేయి',

      // PNR Status
      PNR_SEARCH_TITLE: 'పి.ఎన్.ఆర్ స్థితి విచారణ',
      PNR_SEARCH_SUBTITLE: 'మీ 10 అంకెల పి.ఎన్.ఆర్ నంబర్‌ను నమోదు చేసి ప్రస్తుత స్థితిని తెలుసుకోండి.',
      LABEL_ENTER_PNR: '10 అంకెల పి.ఎన్.ఆర్ నంబర్ నమోదు చేయండి',
      PLACEHOLDER_PNR: 'ఉదాహరణ: 4821950346',
      BTN_CHECK_STATUS: 'పి.ఎన్.ఆర్ స్థితి చూడండి',
      ERR_INVALID_PNR: 'దయచేసి సరైన 10 అంకెల సంఖ్యా పి.ఎన్.ఆర్ నమోదు చేయండి.',
      ERR_PNR_NOT_FOUND: 'ఈ పి.ఎన్.ఆర్ నంబర్ కనుగొనబడలేదు. సంఖ్యను సరిచూసి మళ్లీ ప్రయత్నించండి.',
      PNR_DETAILS_HEADER: 'పి.ఎన్.ఆర్ రిజర్వేషన్ వివరాలు',

      // Login & Register
      LOGIN_TITLE: 'రైల్‌కనెక్ట్‌కు లాగిన్ అవ్వండి',
      LOGIN_SUBTITLE: 'మీ బుకింగ్‌లను చూసేందుకు మరియు త్వరిత బుకింగ్ కోసం లాగిన్ అవ్వండి.',
      LABEL_EMAIL: 'ఈమెయిల్ చిరునామా',
      PLACEHOLDER_EMAIL: 'ఉదాహరణ: user@railconnect.com',
      LABEL_PASSWORD: 'పాస్‌వర్డ్',
      PLACEHOLDER_PASSWORD: 'మీ పాస్‌వర్డ్ నమోదు చేయండి',
      BTN_LOGIN: 'లాగిన్',
      NO_ACCOUNT_PROMPT: 'ఖాతా లేదా?',
      REGISTER_LINK_TEXT: 'ఇక్కడ రిజిస్టర్ అవ్వండి',
      ERR_INVALID_CREDENTIALS: 'తప్పు ఈమెయిల్ లేదా పాస్‌వర్డ్. దయచేసి మళ్లీ ప్రయత్నించండి.',
      ERR_USER_NOT_FOUND: 'ఈ ఈమెయిల్‌తో ఏ ఖాతా కనుగొనబడలేదు. దయచేసి ముందుగా నమోదు చేసుకోండి.',
      LOGIN_REQUIRED_MSG: 'టికెట్ బుకింగ్ మరియు మీ బుకింగ్స్ కోసం దయచేసి లాగిన్ అవ్వండి.',

      REGISTER_TITLE: 'రైల్‌కనెక్ట్ ఖాతాను సృష్టించండి',
      REGISTER_SUBTITLE: 'రైలు టిక్కెట్లను సులభంగా ఆన్‌లైన్‌లో బుక్ చేసుకోవడానికి ఉచితంగా నమోదు చేసుకోండి.',
      LABEL_NAME: 'పూర్తి పేరు',
      PLACEHOLDER_NAME: 'ఉదాహరణ: రాహుల్ శర్మ',
      LABEL_MOBILE: 'మొబైల్ సంఖ్య',
      PLACEHOLDER_MOBILE: '10 అంకెల మొబైల్ సంఖ్య',
      LABEL_CONFIRM_PASSWORD: 'పాస్‌వర్డ్ నిర్ధారించండి',
      PLACEHOLDER_CONFIRM_PASSWORD: 'పాస్‌వర్డ్‌ను మళ్లీ నమోదు చేయండి',
      BTN_REGISTER: 'ఖాతాను నమోదు చేయండి',
      HAVE_ACCOUNT_PROMPT: 'ఇప్పటికే ఖాతా ఉందా?',
      LOGIN_LINK_TEXT: 'ఇక్కడ లాగిన్ అవ్వండి',
      ERR_PASSWORDS_MISMATCH: 'పాస్‌వర్డ్‌లు సరిపోలడం లేదు.',
      ERR_EMAIL_EXISTS: 'ఈ ఈమెయిల్ ఇప్పటికే నమోదు చేయబడింది! లాగిన్ అవ్వండి లేదా వేరే ఈమెయిల్ ఉపయోగించండి.',
      SUCCESS_REGISTER: 'నమోదు విజయవంతమైంది! మీరు ఇప్పుడు లాగిన్ కావచ్చు.'
    },

    hi: {
      // Navbar & General
      APP_NAME: 'रेल-कनेक्ट',
      NAV_HOME: 'होम',
      NAV_SEARCH: 'ट्रेन खोज',
      NAV_AVAILABILITY: 'ट्रेन उपलब्धता',
      NAV_BOOKINGS: 'मेरी बुकिंग',
      NAV_PNR: 'पीएनआर स्थिति',
      NAV_LOGIN: 'लॉगिन',
      NAV_REGISTER: 'पंजीकरण',
      NAV_LOGOUT: 'लॉगआउट',
      WELCOME_USER: 'नमस्ते',
      FOOTER_TEXT: '© 2026 रेल-कनेक्ट - रेलवे आरक्षण प्रणाली (DA-3)। सर्वाधिकार सुरक्षित।',

      // Home Page
      HERO_TITLE: 'रेल-कनेक्ट में आपका स्वागत है',
      HERO_SUBTITLE: 'पूरे भारत में सुरक्षित, विश्वसनीय और त्वरित रेलवे आरक्षण',
      SEARCH_CARD_TITLE: 'ट्रेनें खोजें और सीट उपलब्धता जांचें',
      FEATURE_FAST_BOOKING: 'त्वरित टिकट बुकिंग',
      FEATURE_FAST_DESC: 'कुछ ही क्लिक में स्लीपर, 3A और 2A श्रेणियों में टिकट बुक करें।',
      FEATURE_PNR: 'लाइव पीएनआर ट्रैकिंग',
      FEATURE_PNR_DESC: 'किसी भी समय अपनी सीट की स्थिति और यात्रा विवरण जांचें।',
      FEATURE_CANCEL: 'आसान टिकट रद्दीकरण',
      FEATURE_CANCEL_DESC: 'बुक किए गए टिकट आसानी से रद्द करें, विवरण सुरक्षित रहेगा।',

      // Form Labels & Placeholders
      LABEL_FROM_STATION: 'प्रस्थान स्टेशन',
      LABEL_TO_STATION: 'गंतव्य स्टेशन',
      LABEL_JOURNEY_DATE: 'यात्रा की तारीख',
      PLACEHOLDER_FROM_STATION: 'प्रस्थान स्टेशन चुनें',
      PLACEHOLDER_TO_STATION: 'गंतव्य स्टेशन चुनें',
      BTN_SEARCH_TRAINS: 'ट्रेनें खोजें',
      ERR_SAME_STATION: 'प्रस्थान और गंतव्य स्टेशन एक समान नहीं हो सकते!',
      ERR_REQUIRED_FIELDS: 'कृपया प्रस्थान स्टेशन, गंतव्य स्टेशन और यात्रा तिथि चुनें।',
      ERR_PAST_DATE: 'यात्रा की तारीख पिछली नहीं हो सकती।',

      // Train Search & Availability
      RESULTS_TITLE: 'उपलब्ध ट्रेनें',
      ROUTE_LABEL: 'मार्ग',
      JOURNEY_DATE_LABEL: 'यात्रा तिथि',
      COL_TRAIN_DETAILS: 'ट्रेन जानकारी',
      COL_SCHEDULE: 'समय सारणी',
      COL_CLASSES: 'श्रेणी व उपलब्धता',
      COL_ACTION: 'कार्यवाही',
      LABEL_TRAIN_NO: 'ट्रेन संख्या',
      LABEL_DEPARTURE: 'प्रस्थान समय',
      LABEL_ARRIVAL: 'आगमन समय',
      LABEL_DURATION: 'यात्रा अवधि',
      LABEL_SEATS_AVAIL: 'सीटें',
      CLASS_SL: 'स्लीपर (SL)',
      CLASS_3A: 'एसी 3 टियर (3A)',
      CLASS_2A: 'एसी 2 टियर (2A)',
      BTN_BOOK_NOW: 'अभी बुक करें',
      NO_TRAINS_FOUND: 'चुने गए मार्ग के लिए कोई ट्रेन उपलब्ध नहीं है। कृपया नई दिल्ली, सिकंदराबाद, हावड़ा, मुंबई या चेन्नई जैसे प्रमुख स्टेशनों के बीच खोजें।',

      // Booking Page
      BOOKING_TITLE: 'यात्री टिकट बुकिंग',
      TRAIN_DETAILS_HEADER: 'ट्रेन विवरण सारांश',
      SELECTED_CLASS: 'चयनित यात्रा श्रेणी',
      PASSENGER_DETAILS_HEADER: 'यात्री विवरण (अधिकतम 6 यात्री)',
      LABEL_PASSENGER_NAME: 'यात्री का नाम',
      LABEL_PASSENGER_AGE: 'आयु',
      LABEL_PASSENGER_GENDER: 'लिंग',
      GENDER_MALE: 'पुरुष',
      GENDER_FEMALE: 'महिला',
      GENDER_OTHER: 'अन्य / ट्रांसजेंडर',
      BTN_ADD_PASSENGER: '+ यात्री जोड़ें',
      BTN_REMOVE: 'हटाएं',
      FARE_SUMMARY_HEADER: 'किराया सारांश',
      BASE_FARE_PER_PASSENGER: 'प्रति यात्री किराया',
      TOTAL_PASSENGERS: 'कुल यात्री',
      TOTAL_FARE: 'कुल किराया',
      BTN_CONFIRM_BOOKING: 'पुष्टि करें और टिकट बुक करें',
      CONFIRMATION_TITLE: '🎉 टिकट सफलतापूर्वक बुक हो गया!',
      CONFIRMATION_SUBTITLE: 'आपकी यात्रा की पुष्टि हो गई है। स्थिति ट्रैक करने के लिए अपना पीएनआर सुरक्षित रखें।',
      LABEL_PNR: 'पीएनआर नंबर',
      LABEL_BOOKING_DATE: 'बुकिंग तिथि',
      LABEL_BOOKING_STATUS: 'स्थिति',
      BTN_GO_TO_BOOKINGS: 'मेरी बुकिंग में देखें',
      BTN_PRINT_TICKET: 'प्रिंट / टिकट सहेजें',
      BTN_BOOK_ANOTHER: 'एक और टिकट बुक करें',

      // My Bookings
      MY_BOOKINGS_TITLE: 'मेरी बुकिंग',
      MY_BOOKINGS_SUBTITLE: 'अपने खाते के तहत आरक्षित सभी टिकट देखें और रद्दीकरण प्रबंधित करें।',
      NO_BOOKINGS_MSG: 'आपने अभी तक कोई टिकट बुक नहीं किया है।',
      BTN_START_SEARCH: 'ट्रेन खोजें और बुक करें',
      STATUS_CONFIRMED: 'पुष्ट (CONFIRMED)',
      STATUS_CANCELLED: 'रद्द (CANCELLED)',
      BTN_VIEW_DETAILS: 'टिकट देखें',
      BTN_CANCEL_TICKET: 'टिकट रद्द करें',
      CANCEL_PROMPT: 'क्या आप वाकई इस पीएनआर का टिकट रद्द करना चाहते हैं:',
      CANCEL_SUCCESS: 'टिकट सफलतापूर्वक रद्द कर दिया गया!',
      MODAL_TICKET_DETAILS: 'ई-टिकट पूर्ण विवरण',
      BTN_CLOSE: 'बंद करें',

      // PNR Status
      PNR_SEARCH_TITLE: 'पीएनआर स्थिति पूछताछ',
      PNR_SEARCH_SUBTITLE: 'वर्तमान आरक्षण स्थिति की जांच के लिए अपना 10 अंकों का पीएनआर दर्ज करें।',
      LABEL_ENTER_PNR: '10 अंकों का पीएनआर नंबर दर्ज करें',
      PLACEHOLDER_PNR: 'उदा. 4821950346',
      BTN_CHECK_STATUS: 'पीएनआर स्थिति प्राप्त करें',
      ERR_INVALID_PNR: 'कृपया एक मान्य 10 अंकों का संख्यात्मक पीएनआर नंबर दर्ज करें।',
      ERR_PNR_NOT_FOUND: 'पीएनआर नहीं मिला! कृपया नंबर जांचें और पुनः प्रयास करें।',
      PNR_DETAILS_HEADER: 'पीएनआर आरक्षण विवरण',

      // Login & Register
      LOGIN_TITLE: 'रेल-कनेक्ट में लॉगिन करें',
      LOGIN_SUBTITLE: 'अपनी बुकिंग देखने और त्वरित टिकट बुकिंग के लिए लॉगिन करें।',
      LABEL_EMAIL: 'ईमेल पता',
      PLACEHOLDER_EMAIL: 'उदा. user@railconnect.com',
      LABEL_PASSWORD: 'पासवर्ड',
      PLACEHOLDER_PASSWORD: 'अपना पासवर्ड दर्ज करें',
      BTN_LOGIN: 'लॉगिन',
      NO_ACCOUNT_PROMPT: 'खाता नहीं है?',
      REGISTER_LINK_TEXT: 'यहाँ पंजीकरण करें',
      ERR_INVALID_CREDENTIALS: 'अमान्य ईमेल या पासवर्ड। कृपया पुनः प्रयास करें।',
      ERR_USER_NOT_FOUND: 'इस ईमेल से कोई खाता नहीं मिला। कृपया पहले पंजीकरण करें।',
      LOGIN_REQUIRED_MSG: 'टिकट बुकिंग और मेरी बुकिंग तक पहुँचने के लिए कृपया लॉगिन करें।',

      REGISTER_TITLE: 'रेल-कनेक्ट खाता बनाएं',
      REGISTER_SUBTITLE: 'ऑनलाइन रेलवे टिकट आसानी से बुक करने के लिए निःशुल्क पंजीकरण करें।',
      LABEL_NAME: 'पूरा नाम',
      PLACEHOLDER_NAME: 'उदा. राहुल शर्मा',
      LABEL_MOBILE: 'मोबाइल नंबर',
      PLACEHOLDER_MOBILE: '10 अंकों का मोबाइल नंबर',
      LABEL_CONFIRM_PASSWORD: 'पासवर्ड की पुष्टि करें',
      PLACEHOLDER_CONFIRM_PASSWORD: 'पासवर्ड पुनः दर्ज करें',
      BTN_REGISTER: 'खाता बनाएं',
      HAVE_ACCOUNT_PROMPT: 'पहले से खाता है?',
      LOGIN_LINK_TEXT: 'यहाँ लॉगिन करें',
      ERR_PASSWORDS_MISMATCH: 'पासवर्ड मेल नहीं खा रहे हैं।',
      ERR_EMAIL_EXISTS: 'यह ईमेल पहले से पंजीकृत है! कृपया लॉगिन करें या दूसरा ईमेल उपयोग करें।',
      SUCCESS_REGISTER: 'पंजीकरण सफल! अब आप लॉगिन कर सकते हैं।'
    }
  };

  private getInitialLanguage(): SupportedLanguage {
    try {
      const saved = localStorage.getItem(LanguageService.STORAGE_KEY) as SupportedLanguage;
      if (saved && (saved === 'en' || saved === 'te' || saved === 'hi')) {
        return saved;
      }
    } catch {
      // ignore
    }
    return 'en';
  }

  getCurrentLanguage(): SupportedLanguage {
    return this.currentLangSignal();
  }

  setLanguage(lang: SupportedLanguage): void {
    if (this.currentLangSignal() !== lang) {
      this.currentLangSignal.set(lang);
      try {
        localStorage.setItem(LanguageService.STORAGE_KEY, lang);
      } catch {
        // ignore
      }
    }
  }

  t(key: string): string {
    const lang = this.currentLangSignal();
    const table = this.translations[lang] || this.translations['en'];
    return table[key] || this.translations['en'][key] || key;
  }

  /**
   * Formats currency according to the selected language locale
   * English: ₹ 1,250
   * Telugu: రూ. 1,250
   * Hindi: ₹ 1,250
   */
  formatCurrency(amount: number): string {
    if (isNaN(amount)) return '₹0';
    const lang = this.currentLangSignal();
    const formatted = amount.toLocaleString('en-IN');
    if (lang === 'te') {
      return `రూ. ${formatted}`;
    }
    return `₹${formatted}`;
  }

  /**
   * Formats date string (YYYY-MM-DD) into regional localized date
   */
  formatDate(dateStr: string): string {
    if (!dateStr) return '';
    try {
      const parts = dateStr.split('-');
      if (parts.length === 3) {
        const year = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10) - 1;
        const day = parseInt(parts[2], 10);
        const dateObj = new Date(year, month, day);

        const lang = this.currentLangSignal();
        if (lang === 'te') {
          const teMonths = [
            'జనవరి', 'ఫిబ్రవరి', 'మార్చి', 'ఏప్రిల్', 'మే', 'జూన్',
            'జూలై', 'ఆగస్టు', 'సెప్టెంబర్', 'అక్టోబర్', 'నవంబర్', 'డిసెంబర్'
          ];
          return `${day} ${teMonths[month]} ${year}`;
        } else if (lang === 'hi') {
          const hiMonths = [
            'जनवरी', 'फरवरी', 'मार्च', 'अप्रैल', 'मई', 'जून',
            'जुलाई', 'अगस्त', 'सितंबर', 'अक्टूबर', 'नवंबर', 'दिसंबर'
          ];
          return `${day} ${hiMonths[month]} ${year}`;
        } else {
          const enMonths = [
            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
          ];
          return `${day} ${enMonths[month]} ${year}`;
        }
      }
      return dateStr;
    } catch {
      return dateStr;
    }
  }
}
