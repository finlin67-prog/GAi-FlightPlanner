import React, { useState } from 'react';
import { MarketingCity, UserProfile } from '../types';
import { CITIES_DATA } from '../constants';
import { MapPin, Users, Plane, Search, Briefcase, Building, DollarSign, Target, User } from 'lucide-react';

interface HeroProps {
  onSearch: (origin: MarketingCity, destination: MarketingCity, profile: UserProfile) => void;
  isSearching: boolean;
}

const Hero: React.FC<HeroProps> = ({ onSearch, isSearching }) => {
  const [originCity, setOriginCity] = useState<string>('');
  const [destCity, setDestCity] = useState<string>('');
  
  // New State Fields
  const [role, setRole] = useState<string>('CMO');
  const [industry, setIndustry] = useState<string>('Finance');
  const [companySize, setCompanySize] = useState<string>('100-500');
  const [revenue, setRevenue] = useState<string>('$50M - $100M');
  const [companyType, setCompanyType] = useState<string>('B2B');
  const [journeyPurpose, setJourneyPurpose] = useState<string>('Improve pipeline quality');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const origin = CITIES_DATA.find(c => c.city === originCity);
    const dest = CITIES_DATA.find(c => c.city === destCity);
    
    if (origin && dest) {
      const profile: UserProfile = {
        role,
        industry,
        companySize,
        revenue,
        companyType,
        journeyPurpose
      };
      onSearch(origin, dest, profile);
    } else {
      alert("Please select both origin and destination cities.");
    }
  };

  // Group cities by category for the dropdown
  const categories = Array.from(new Set(CITIES_DATA.map(c => c.category)));

  const CitySelectOptions = () => (
    <>
      <option value="" disabled>Select a Function/City</option>
      {categories.map(cat => (
        <optgroup key={cat} label={cat}>
          {CITIES_DATA.filter(c => c.category === cat).map(city => (
            <option key={city.city} value={city.city}>
              {city.marketingFunction} — {city.city}
            </option>
          ))}
        </optgroup>
      ))}
    </>
  );

  return (
    <div className="relative bg-slate-900 text-white pt-24 pb-32 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://picsum.photos/1600/900?grayscale" 
          alt="World Map Background" 
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 to-slate-900"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <h1 className="text-4xl md:text-6xl font-bold text-center mb-6 tracking-tight">
          Where will your <span className="text-blue-400">Strategy</span> take you?
        </h1>
        <p className="text-xl text-slate-300 text-center mb-12 max-w-2xl mx-auto">
          Map your marketing journey. Enter your traveler profile (Company Details) to get a customized flight path (Strategy).
        </p>

        {/* Search Box */}
        <div className="bg-white rounded-lg shadow-2xl p-6 max-w-6xl mx-auto text-slate-800">
            <div className="flex flex-col md:flex-row gap-4 mb-4 border-b pb-4">
                 <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-semibold w-fit">
                    <Plane size={16} /> Strategy Trip
                 </div>
                 <div className="text-sm text-slate-500 flex items-center">
                    <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs font-bold mr-2">NEW</span>
                    Personalized based on your Role & Company
                 </div>
            </div>

            <form onSubmit={handleSearch} className="space-y-4">
                
                {/* Row 1: The Journey */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
                    {/* From */}
                    <div className="md:col-span-4 relative">
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">From (Current Issue)</label>
                        <div className="flex items-center border rounded-md px-3 py-3 bg-slate-50 hover:bg-white focus-within:ring-2 ring-blue-500 transition-all">
                            <MapPin className="text-slate-400 mr-2 flex-shrink-0" size={20} />
                            <select 
                                className="w-full bg-transparent outline-none text-slate-900 font-semibold appearance-none cursor-pointer truncate"
                                value={originCity}
                                onChange={(e) => setOriginCity(e.target.value)}
                                required
                            >
                               <CitySelectOptions />
                            </select>
                        </div>
                    </div>

                    {/* Arrow */}
                    <div className="hidden md:flex md:col-span-1 justify-center items-center pb-3">
                       <ArrowRightIcon />
                    </div>

                    {/* To */}
                    <div className="md:col-span-4 relative">
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">To (Desired Goal)</label>
                         <div className="flex items-center border rounded-md px-3 py-3 bg-slate-50 hover:bg-white focus-within:ring-2 ring-blue-500 transition-all">
                            <MapPin className="text-slate-400 mr-2 flex-shrink-0" size={20} />
                            <select 
                                className="w-full bg-transparent outline-none text-slate-900 font-semibold appearance-none cursor-pointer truncate"
                                value={destCity}
                                onChange={(e) => setDestCity(e.target.value)}
                                required
                            >
                                <CitySelectOptions />
                            </select>
                        </div>
                    </div>

                    {/* Purpose */}
                     <div className="md:col-span-3 relative">
                         <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Purpose of Journey</label>
                         <div className="flex items-center border rounded-md px-3 py-3 bg-slate-50 hover:bg-white focus-within:ring-2 ring-blue-500 transition-all">
                            <Target className="text-slate-400 mr-2 flex-shrink-0" size={20} />
                            <select 
                                className="w-full bg-transparent outline-none text-slate-900 font-semibold appearance-none cursor-pointer"
                                value={journeyPurpose}
                                onChange={(e) => setJourneyPurpose(e.target.value)}
                            >
                                <option>Improve pipeline quality</option>
                                <option>Reduce CAC</option>
                                <option>Increase retention</option>
                                <option>Launch ABM</option>
                                <option>Optimize tech stack</option>
                                <option>Build content engine</option>
                                <option>Improve attribution</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-slate-100 my-2"></div>

                {/* Row 2: The Traveler Details (Demographics) */}
                <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                    
                    {/* Role */}
                    <div className="col-span-1 relative">
                        <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Your Role</label>
                        <div className="flex items-center border rounded-md px-2 py-2 bg-slate-50 hover:bg-white focus-within:ring-1 ring-blue-500">
                            <User className="text-slate-400 mr-2 hidden lg:block" size={16} />
                            <select className="w-full bg-transparent outline-none text-slate-900 text-sm font-medium appearance-none cursor-pointer" value={role} onChange={(e) => setRole(e.target.value)}>
                                <option>CMO</option>
                                <option>VP</option>
                                <option>Manager</option>
                                <option>Content</option>
                            </select>
                        </div>
                    </div>

                    {/* Industry */}
                    <div className="col-span-1 relative">
                        <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Industry</label>
                        <div className="flex items-center border rounded-md px-2 py-2 bg-slate-50 hover:bg-white focus-within:ring-1 ring-blue-500">
                            <Briefcase className="text-slate-400 mr-2 hidden lg:block" size={16} />
                            <select className="w-full bg-transparent outline-none text-slate-900 text-sm font-medium appearance-none cursor-pointer" value={industry} onChange={(e) => setIndustry(e.target.value)}>
                                <option>Finance</option>
                                <option>Healthcare</option>
                                <option>Manufacturing</option>
                                <option>Retail</option>
                            </select>
                        </div>
                    </div>

                     {/* Type */}
                    <div className="col-span-1 relative">
                        <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Company Type</label>
                        <div className="flex items-center border rounded-md px-2 py-2 bg-slate-50 hover:bg-white focus-within:ring-1 ring-blue-500">
                            <Building className="text-slate-400 mr-2 hidden lg:block" size={16} />
                            <select className="w-full bg-transparent outline-none text-slate-900 text-sm font-medium appearance-none cursor-pointer" value={companyType} onChange={(e) => setCompanyType(e.target.value)}>
                                <option>B2B</option>
                                <option>B2C</option>
                                <option>Other</option>
                            </select>
                        </div>
                    </div>

                     {/* Size */}
                    <div className="col-span-1 relative">
                        <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Size</label>
                        <div className="flex items-center border rounded-md px-2 py-2 bg-slate-50 hover:bg-white focus-within:ring-1 ring-blue-500">
                            <Users className="text-slate-400 mr-2 hidden lg:block" size={16} />
                            <select className="w-full bg-transparent outline-none text-slate-900 text-sm font-medium appearance-none cursor-pointer" value={companySize} onChange={(e) => setCompanySize(e.target.value)}>
                                <option>1-100</option>
                                <option>100-500</option>
                                <option>500-1000</option>
                                <option>1000-5000</option>
                                <option>5000+</option>
                            </select>
                        </div>
                    </div>

                     {/* Revenue */}
                     <div className="col-span-2 md:col-span-1 relative">
                        <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Revenue</label>
                        <div className="flex items-center border rounded-md px-2 py-2 bg-slate-50 hover:bg-white focus-within:ring-1 ring-blue-500">
                            <DollarSign className="text-slate-400 mr-2 hidden lg:block" size={16} />
                            <select className="w-full bg-transparent outline-none text-slate-900 text-sm font-medium appearance-none cursor-pointer" value={revenue} onChange={(e) => setRevenue(e.target.value)}>
                                <option>Under $5M</option>
                                <option>$5M - $50M</option>
                                <option>$50M - $100M</option>
                                <option>$100M - $500M</option>
                                <option>$500M - $1B</option>
                                <option>$1B+</option>
                            </select>
                        </div>
                    </div>

                    {/* Button */}
                    <div className="col-span-2 md:col-span-1">
                        <button 
                            type="submit" 
                            disabled={isSearching}
                            className={`w-full h-full min-h-[42px] flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-md shadow-lg transition-all transform active:scale-95 ${isSearching ? 'opacity-80 cursor-wait' : ''}`}
                        >
                            {isSearching ? (
                                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                            ) : (
                                <>
                                  <Search size={20} />
                                  <span className="md:hidden lg:inline">Search</span>
                                </>
                            )}
                        </button>
                    </div>

                </div>
            </form>
        </div>
      </div>
    </div>
  );
};

const ArrowRightIcon = () => (
    <div className="bg-slate-100 p-2 rounded-full text-slate-400">
        <Plane size={20} className="transform rotate-90" />
    </div>
);

export default Hero;