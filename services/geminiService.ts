import { GoogleGenAI, Type } from "@google/genai";
import { MarketingCity, Itinerary, UserProfile } from '../types';
import { CITIES_DATA, AIRPORT_CODES, AIRLINES } from '../constants';

// Initialize Gemini
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateFlightItineraries = async (
  origin: MarketingCity,
  destination: MarketingCity,
  profile: UserProfile
): Promise<Itinerary[]> => {
  const modelId = "gemini-2.5-flash";

  const systemInstruction = `
    You are an expert Marketing Strategist acting as a Travel Agent for the app "MarketQuest Travels".
    In this world, Cities represent Marketing Functions.
    Users "book flights" to solve marketing problems.
    Moving from an Origin City (Current State/Problem) to a Destination City (Desired Goal) requires "Layovers" which are the intermediate strategic steps needed to bridge the gap.

    You will receive a user profile including Role, Industry, Company Size, Revenue, and Type.
    YOU MUST CUSTOMIZE THE STRATEGY BASED ON THIS PROFILE.

    For example:
    - A "Start-up / Under $5M" needs scrappy, growth-hacked strategies (shorter, cheaper).
    - An "Enterprise / $1B+" needs governance, operations, and scalable systems (longer, more expensive, more stops).
    - A "B2B" company needs different layovers (e.g., ABM, Sales Enablement) than a "B2C" company (e.g., Social Media, Influencer).
    
    Your task is to generate 3 distinct "Flight Itineraries" (Strategies) to get from the Origin to the Destination.
    
    1. Direct/Fastest: Minimal stops, high-level strategy (Good for Executives).
    2. Recommended: The ideal path for their specific Industry and Size.
    3. Detailed/Scenic: A deep-dive path involving rigorous steps (Good for Ops/Managers).

    For each stop (layover), you must select a valid City from the provided list that represents a necessary marketing step.
    Explain the "Marketing Task" for that stop - why are we stopping there?

    Use the provided list of Cities and Functions ONLY for the layovers.
    
    Available Cities/Functions:
    ${CITIES_DATA.map(c => `${c.city} (${c.marketingFunction})`).join(', ')}
  `;

  const prompt = `
    Create 3 flight itineraries from ${origin.city} (${origin.marketingFunction}) to ${destination.city} (${destination.marketingFunction}).
    
    User Profile (Traveler Details):
    - Role: ${profile.role}
    - Industry: ${profile.industry}
    - Company Type: ${profile.companyType}
    - Size: ${profile.companySize} employees
    - Revenue: ${profile.revenue}
    - Purpose of Journey: ${profile.journeyPurpose}

    Customize the "Marketing Task" descriptions and the choice of layover cities to fit this specific user profile.
    
    For each itinerary:
    - Assign a realistic price (in USD). Enterprise solutions should be "expensive", startup solutions "cheap".
    - Assign a total duration (e.g., "3 months" or "14h 30m" representing time to implement).
    - Create a list of segments. Start with the Origin. Then add Layovers. End with the Destination.
    - For each segment, provide a specific "marketingTask" description tailored to their Industry/Role.
    
    The response must be a JSON object with a property 'itineraries' containing an array.
  `;

  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            itineraries: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  tags: { type: Type.ARRAY, items: { type: Type.STRING } },
                  summary: { type: Type.STRING },
                  price: { type: Type.NUMBER },
                  totalDuration: { type: Type.STRING },
                  segments: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        city: { type: Type.STRING },
                        marketingFunction: { type: Type.STRING },
                        marketingTask: { type: Type.STRING },
                        duration: { type: Type.STRING }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    });

    const data = JSON.parse(response.text || "{ \"itineraries\": [] }");
    
    // Post-process to add static data like Airport Codes and times
    const processedItineraries: Itinerary[] = data.itineraries.map((itinerary: any, index: number) => ({
      ...itinerary,
      airline: AIRLINES[index % AIRLINES.length],
      segments: itinerary.segments.map((seg: any, i: number) => {
        // Calculate fake times
        const baseTime = new Date();
        baseTime.setHours(8 + i * 4, 0, 0); 
        const arrival = new Date(baseTime);
        arrival.setHours(baseTime.getHours() + 3);

        return {
          ...seg,
          code: AIRPORT_CODES[seg.city] || "UNK",
          departureTime: baseTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          arrivalTime: arrival.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
      })
    }));

    return processedItineraries;

  } catch (error) {
    console.error("Gemini API Error:", error);
    return [];
  }
};