import React, { useState } from 'react';
import { Itinerary } from '../types';
import { Plane, Clock, ChevronDown, ChevronUp, ArrowRight, Briefcase, MapPin } from 'lucide-react';
import { AIRPORT_CODES } from '../constants';

interface FlightCardProps {
  itinerary: Itinerary;
  originCode: string;
  destCode: string;
}

const FlightCard: React.FC<FlightCardProps> = ({ itinerary, originCode, destCode }) => {
  const [expanded, setExpanded] = useState(false);

  // Extract stops (excluding origin and final destination for the summary view)
  const stops = itinerary.segments.slice(1, -1);
  const stopCount = stops.length;
  const stopLabel = stopCount === 0 ? "Direct" : `${stopCount} Stop${stopCount > 1 ? 's' : ''}`;
  
  // Format price
  const priceFormatted = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(itinerary.price);

  return (
    <div className="bg-white rounded-xl shadow-md border border-slate-200 hover:shadow-lg transition-shadow duration-300 overflow-hidden mb-6">
      {/* Summary Header */}
      <div className="p-6 cursor-pointer" onClick={() => setExpanded(!expanded)}>
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          
          {/* Airline & Times */}
          <div className="flex-1 flex items-center gap-6 w-full">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-700">
               <Plane size={24} className="transform -rotate-45" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-slate-900">{itinerary.segments[0].departureTime} — {itinerary.segments[itinerary.segments.length - 1].arrivalTime}</h3>
              <p className="text-sm text-slate-500 font-medium">{itinerary.airline}</p>
            </div>
          </div>

          {/* Route & Duration */}
          <div className="flex-1 w-full flex flex-col items-center">
            <div className="flex items-center gap-3 text-slate-600 text-sm mb-1">
              <span className="font-semibold">{itinerary.totalDuration}</span>
              <span className="w-1 h-1 bg-slate-400 rounded-full"></span>
              <span className="text-orange-600 font-medium">{originCode}-{destCode}</span>
            </div>
            <div className="w-full flex items-center gap-2">
                 <div className="h-[2px] bg-slate-200 flex-1 relative">
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-slate-300 rounded-full"></div>
                 </div>
                 <span className="text-xs text-slate-500 px-2 border rounded-full bg-slate-50">
                    {stopLabel}
                 </span>
                 <div className="h-[2px] bg-slate-200 flex-1 relative">
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-slate-300 rounded-full"></div>
                 </div>
            </div>
            {stops.length > 0 && (
                <p className="text-xs text-slate-400 mt-1">
                    Via {stops.map(s => AIRPORT_CODES[s.city] || s.code).join(', ')}
                </p>
            )}
          </div>

          {/* Price & Action */}
          <div className="flex-1 w-full flex justify-between md:justify-end items-center gap-6">
            <div className="text-right">
                <p className="text-2xl font-bold text-slate-900">{priceFormatted}</p>
                <p className="text-xs text-slate-500">Total per traveler</p>
            </div>
            <button className={`p-2 rounded-full transition-colors ${expanded ? 'bg-slate-100 text-slate-700' : 'bg-blue-50 text-blue-600 hover:bg-blue-100'}`}>
                {expanded ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
            </button>
          </div>
        </div>
        
        {/* Tags */}
        <div className="flex gap-2 mt-4">
            {itinerary.tags.map(tag => (
                <span key={tag} className="px-2 py-1 bg-green-50 text-green-700 text-xs font-semibold rounded-md uppercase tracking-wider">
                    {tag}
                </span>
            ))}
             <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs font-semibold rounded-md uppercase tracking-wider truncate max-w-[300px]">
                Strategy: {itinerary.summary}
            </span>
        </div>
      </div>

      {/* Expanded Details */}
      {expanded && (
        <div className="border-t border-slate-100 bg-slate-50 p-6 animate-fadeIn">
            <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">Itinerary Details & Marketing Strategy</h4>
            <div className="space-y-6 relative">
                
                {/* Connecting Line */}
                <div className="absolute left-[19px] top-4 bottom-4 w-[2px] bg-slate-300 z-0"></div>

                {itinerary.segments.map((segment, index) => {
                     const isLast = index === itinerary.segments.length - 1;
                     const isFirst = index === 0;

                     return (
                        <div key={index} className="relative z-10 flex gap-4 group">
                             <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm border-2 ${isFirst || isLast ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white border-orange-400 text-orange-600'}`}>
                                {isFirst || isLast ? <MapPin size={18} /> : <Briefcase size={18} />}
                             </div>
                             <div className="flex-1 bg-white p-4 rounded-lg shadow-sm border border-slate-200">
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <h5 className="font-bold text-slate-900 text-lg">
                                            {segment.city} <span className="text-slate-400 font-normal mx-2">|</span> {segment.marketingFunction}
                                        </h5>
                                        <div className="text-xs font-mono text-slate-500 bg-slate-100 px-2 py-1 rounded inline-block mt-1">
                                            {AIRPORT_CODES[segment.city] || segment.code}
                                        </div>
                                    </div>
                                    <div className="text-right">
                                         {isFirst ? (
                                             <span className="text-sm text-slate-600 font-medium">Depart: {segment.departureTime}</span>
                                         ) : isLast ? (
                                             <span className="text-sm text-slate-600 font-medium">Arrive: {segment.arrivalTime}</span>
                                         ) : (
                                            <span className="text-sm text-slate-600 font-medium">Stopover: {segment.duration}</span>
                                         )}
                                    </div>
                                </div>
                                <p className="text-slate-600 text-sm leading-relaxed border-t border-dashed pt-2 mt-2">
                                    <span className="font-semibold text-blue-600">Strategic Goal: </span>
                                    {segment.marketingTask}
                                </p>
                             </div>
                        </div>
                     );
                })}
            </div>
        </div>
      )}
    </div>
  );
};

export default FlightCard;