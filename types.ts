export interface MarketingCity {
  marketingFunction: string;
  city: string;
  description: string;
  category: 'Content & Media' | 'Demand & Growth' | 'Strategy & Insights' | 'Systems & Operations';
}

export interface UserProfile {
  role: string;
  industry: string;
  companySize: string;
  revenue: string;
  companyType: string;
  journeyPurpose: string;
}

export interface FlightSegment {
  city: string;
  marketingFunction: string;
  code: string; // e.g., NYC, TYO
  duration: string;
  marketingTask: string; // The strategic reason for this stop
  departureTime: string;
  arrivalTime: string;
}

export interface Itinerary {
  id: string;
  airline: string;
  price: number;
  totalDuration: string;
  segments: FlightSegment[];
  tags: string[]; // e.g. "Best Value", "Fastest Strategy"
  summary: string; // AI generated summary of the strategy
}