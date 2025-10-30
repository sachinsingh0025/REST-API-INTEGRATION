
import React from 'react';
import { ICONS } from '../constants';

interface SearchBarProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange, placeholder = 'Search for a GitHub user...' }) => {
  return (
    <div className="relative w-full max-w-lg mx-auto">
      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
        {ICONS.search}
      </span>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-300"
      />
    </div>
  );
};

export default SearchBar;
