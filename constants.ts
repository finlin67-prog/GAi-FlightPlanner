import { MarketingCity } from './types';

export const CITIES_DATA: MarketingCity[] = [
  // Content & Media
  { marketingFunction: "Content Marketing", city: "New York City, USA", description: "Creative capital, high-density storytelling, editorial hub", category: "Content & Media" },
  { marketingFunction: "Email Marketing", city: "Zurich, Switzerland", description: "Precision, reliability, consistency", category: "Content & Media" },
  { marketingFunction: "Omnichannel Marketing", city: "Dubai, UAE", description: "Seamless multi-experience megahubs", category: "Content & Media" },
  { marketingFunction: "Social Media Marketing", city: "Los Angeles, USA", description: "Influencer + creator culture", category: "Content & Media" },
  { marketingFunction: "Video Marketing", city: "Seoul, South Korea", description: "Top-tier video, entertainment, K-content ecosystem", category: "Content & Media" },

  // Demand & Growth
  { marketingFunction: "Demand Generation", city: "London, UK", description: "High-volume commerce + sophistication", category: "Demand & Growth" },
  { marketingFunction: "SEO", city: "Tokyo, Japan", description: "Complexity, structure, precision", category: "Demand & Growth" },
  { marketingFunction: "Growth Marketing", city: "Singapore", description: "Data-driven, efficient, scalable", category: "Demand & Growth" },
  { marketingFunction: "Paid Advertising (SEM)", city: "Shanghai, China", description: "Competitive, real-time bidding culture", category: "Demand & Growth" },
  { marketingFunction: "Event Marketing", city: "Las Vegas, USA", description: "Global event and convention capital", category: "Demand & Growth" },

  // Strategy & Insights
  { marketingFunction: "Account-Based Marketing (ABM)", city: "Toronto, Canada", description: "Relationship-driven culture", category: "Strategy & Insights" },
  { marketingFunction: "Customer Experience (CX)", city: "Copenhagen, Denmark", description: "World-leading service + design", category: "Strategy & Insights" },
  { marketingFunction: "Customer Marketing", city: "Melbourne, Australia", description: "High loyalty culture", category: "Strategy & Insights" },
  { marketingFunction: "Lifecycle Marketing", city: "Amsterdam, Netherlands", description: "Smooth journeys + seamless flow", category: "Strategy & Insights" },
  { marketingFunction: "Market Research", city: "Berlin, Germany", description: "Analytical, structured, methodical thinking", category: "Strategy & Insights" },

  // Systems & Operations
  { marketingFunction: "AI in Marketing", city: "San Francisco, USA", description: "Obvious AI hub", category: "Systems & Operations" },
  { marketingFunction: "Marketing Automation", city: "Tallinn, Estonia", description: "Most automated digital society", category: "Systems & Operations" },
  { marketingFunction: "Marketing Operations", city: "Stockholm, Sweden", description: "Systems thinking + scalable design", category: "Systems & Operations" },
  { marketingFunction: "MarTech Optimization", city: "Helsinki, Finland", description: "Clean, efficient technology stacks", category: "Systems & Operations" },
  { marketingFunction: "Sales Enablement", city: "Chicago, USA", description: "Central hub, connects sales routes, backbone city", category: "Systems & Operations" },
];

export const AIRPORT_CODES: Record<string, string> = {
  "New York City, USA": "JFK",
  "Zurich, Switzerland": "ZRH",
  "Dubai, UAE": "DXB",
  "Los Angeles, USA": "LAX",
  "Seoul, South Korea": "ICN",
  "London, UK": "LHR",
  "Tokyo, Japan": "HND",
  "Singapore": "SIN",
  "Shanghai, China": "PVG",
  "Las Vegas, USA": "LAS",
  "Toronto, Canada": "YYZ",
  "Copenhagen, Denmark": "CPH",
  "Melbourne, Australia": "MEL",
  "Amsterdam, Netherlands": "AMS",
  "Berlin, Germany": "BER",
  "San Francisco, USA": "SFO",
  "Tallinn, Estonia": "TLL",
  "Stockholm, Sweden": "ARN",
  "Helsinki, Finland": "HEL",
  "Chicago, USA": "ORD",
};

export const AIRLINES = [
  "Strategic Airways",
  "Growth Jet",
  "Funnel Fly",
  "Conversion Air",
  "Pipeline Express"
];
