import React, { useState } from 'react';
import Hero from './components/Hero';
import FlightCard from './components/FlightCard';
import { MarketingCity, Itinerary, UserProfile } from './types';
import { generateFlightItineraries } from './services/geminiService';
import { AIRPORT_CODES } from './constants';
import { Sparkles, Map, Info, Briefcase } from 'lucide-react';

function App() {
  const [itineraries, setItineraries] = useState<Itinerary[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchParams, setSearchParams] = useState<{ origin: MarketingCity; destination: MarketingCity; profile: UserProfile } | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (origin: MarketingCity, destination: MarketingCity, profile: UserProfile) => {
    setIsSearching(true);
    setSearchParams({ origin, destination, profile });
    setHasSearched(true);
    setItineraries([]); // Clear previous

    const results = await generateFlightItineraries(origin, destination, profile);
    setItineraries(results);
    setIsSearching(false);
  };

  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-900 bg-slate-50">
      
      {/* Navigation */}
      <nav className="bg-slate-900 text-white border-b border-slate-800">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
             <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Map size={20} className="text-white" />
             </div>
             MarketQuest <span className="font-light text-slate-400">Travels</span>
          </div>
          <div className="flex gap-6 text-sm font-medium text-slate-300">
             <a href="#" className="hover:text-white transition-colors">My Trips</a>
             <a href="#" className="hover:text-white transition-colors">Deals</a>
             <a href="#" className="hover:text-white transition-colors">Support</a>
             <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs">US</div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <Hero onSearch={handleSearch} isSearching={isSearching} />

      {/* Main Content Area */}
      <main className="flex-1 container mx-auto px-4 -mt-20 relative z-20 pb-20">
        
        {/* Loading State or No Results */}
        {isSearching && (
           <div className="bg-white rounded-xl shadow-xl p-12 text-center max-w-4xl mx-auto border border-slate-100">
               <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-600 mx-auto mb-6"></div>
               <h3 className="text-2xl font-bold text-slate-800 mb-2">Analyzing Marketing Routes...</h3>
               <p className="text-slate-500">Our AI strategists are calculating the best intermediate steps for your journey.</p>
           </div>
        )}

        {!isSearching && hasSearched && itineraries.length === 0 && (
            <div className="bg-white rounded-xl shadow-xl p-12 text-center max-w-4xl mx-auto border border-slate-100">
                <Info size={48} className="mx-auto text-slate-300 mb-4" />
                <h3 className="text-xl font-bold text-slate-800">No flights found</h3>
                <p className="text-slate-500">We couldn't generate a strategy for this route. Please try different cities.</p>
            </div>
        )}

        {/* Results List */}
        {!isSearching && itineraries.length > 0 && searchParams && (
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Sidebar Filter (Visual only for now) */}
                <div className="hidden lg:block lg:col-span-1">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 sticky top-4">
                        <div className="mb-6 pb-6 border-b border-slate-100">
                            <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wide mb-2">Traveler Profile</h3>
                            <div className="text-xs text-slate-600 space-y-1">
                                <p><span className="font-semibold">Role:</span> {searchParams.profile.role}</p>
                                <p><span className="font-semibold">Industry:</span> {searchParams.profile.industry}</p>
                                <p><span className="font-semibold">Size:</span> {searchParams.profile.companySize}</p>
                                <p><span className="font-semibold">Type:</span> {searchParams.profile.companyType}</p>
                            </div>
                        </div>

                        <h3 className="font-bold text-slate-800 mb-4 pb-2 border-b">Stops</h3>
                        <div className="space-y-2 mb-6">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="checkbox" className="rounded text-blue-600" defaultChecked />
                                <span className="text-sm text-slate-600">Nonstop (Direct Strategy)</span>
                            </label>
                             <label className="flex items-center gap-2 cursor-pointer">
                                <input type="checkbox" className="rounded text-blue-600" defaultChecked />
                                <span className="text-sm text-slate-600">1 Stop (1 Intermediate Step)</span>
                            </label>
                             <label className="flex items-center gap-2 cursor-pointer">
                                <input type="checkbox" className="rounded text-blue-600" defaultChecked />
                                <span className="text-sm text-slate-600">2+ Stops (Complex Strategy)</span>
                            </label>
                        </div>
                        <h3 className="font-bold text-slate-800 mb-4 pb-2 border-b">Airlines</h3>
                        <div className="space-y-2">
                             <label className="flex items-center gap-2 cursor-pointer">
                                <input type="checkbox" className="rounded text-blue-600" defaultChecked />
                                <span className="text-sm text-slate-600">Strategic Airways</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="checkbox" className="rounded text-blue-600" defaultChecked />
                                <span className="text-sm text-slate-600">Growth Jet</span>
                            </label>
                        </div>
                        
                        <div className="mt-8 bg-blue-50 p-4 rounded-lg">
                            <div className="flex items-start gap-2 text-blue-800">
                                <Sparkles size={18} className="mt-1 flex-shrink-0" />
                                <p className="text-xs leading-relaxed">
                                    <strong>AI Tip:</strong> These itineraries are customized for a {searchParams.profile.companySize} {searchParams.profile.companyType} company in {searchParams.profile.industry}.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Itineraries */}
                <div className="lg:col-span-3">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-slate-800">
                            Select your departure to {searchParams.destination.city}
                        </h2>
                        <span className="text-sm text-slate-500 font-medium">
                            {itineraries.length} results sorted by Relevance
                        </span>
                    </div>

                    {itineraries.map((itinerary) => (
                        <FlightCard 
                            key={itinerary.id} 
                            itinerary={itinerary} 
                            originCode={AIRPORT_CODES[searchParams.origin.city] || 'ORG'}
                            destCode={AIRPORT_CODES[searchParams.destination.city] || 'DST'}
                        />
                    ))}
                </div>
            </div>
        )}

        {/* Initial Empty State / Features */}
        {!hasSearched && (
             <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                 <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 text-center hover:-translate-y-1 transition-transform duration-300">
                     <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6 text-orange-600">
                         <Map size={32} />
                     </div>
                     <h3 className="text-lg font-bold text-slate-900 mb-2">Visualize Strategy</h3>
                     <p className="text-slate-500 leading-relaxed">See your marketing roadmap as a physical journey. Understand the distance between your current state and your goals.</p>
                 </div>
                 <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 text-center hover:-translate-y-1 transition-transform duration-300">
                     <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 text-blue-600">
                         <Sparkles size={32} />
                     </div>
                     <h3 className="text-lg font-bold text-slate-900 mb-2">AI Powered Planning</h3>
                     <p className="text-slate-500 leading-relaxed">Our Gemini-powered engine determines the exact intermediate functions you need to implement for success.</p>
                 </div>
                 <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 text-center hover:-translate-y-1 transition-transform duration-300">
                     <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
                         <Briefcase size={32} />
                     </div>
                     <h3 className="text-lg font-bold text-slate-900 mb-2">Actionable Layovers</h3>
                     <p className="text-slate-500 leading-relaxed">Each stop isn't just a city; it's a specific marketing task required to complete your journey.</p>
                 </div>
             </div>
        )}

      </main>

       {/* Footer */}
       <footer className="bg-slate-900 text-slate-400 py-12 mt-auto">
          <div className="container mx-auto px-4 text-center">
              <p>&copy; 2024 MarketQuest Travels. Powered by Gemini API.</p>
              <p className="text-xs mt-2 text-slate-600">Not a real travel agency. For educational marketing assessment purposes only.</p>
          </div>
       </footer>

    </div>
  );
}

export default App;