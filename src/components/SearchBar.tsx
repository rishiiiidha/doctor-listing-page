
import { useState, useEffect, useRef } from "react";
import { Search } from "lucide-react";
import { Doctor } from "@/types/doctor";

interface SearchBarProps {
  doctors: Doctor[];
  onSearch: (query: string) => void;
  onSuggestionClick: (doctorName: string) => void;
}

const SearchBar = ({ doctors, onSearch, onSuggestionClick }: SearchBarProps) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Doctor[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!query) {
      setSuggestions([]);
      return;
    }

    const filteredDoctors = doctors.filter(doctor =>
      doctor.name.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 3); // Only show top 3 suggestions
    
    setSuggestions(filteredDoctors);
  }, [query, doctors]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node) &&
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setShowSuggestions(true);
  };

  const handleSuggestionClick = (doctorName: string) => {
    setQuery(doctorName);
    setShowSuggestions(false);
    onSuggestionClick(doctorName);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      onSearch(query);
      setShowSuggestions(false);
    }
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto mb-6">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="w-5 h-5 text-gray-400" />
        </div>
        <input
          data-testid="autocomplete-input"
          type="search"
          ref={inputRef}
          className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-medical-500 focus:border-medical-500"
          placeholder="Search for doctors..."
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setShowSuggestions(true)}
        />
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <div
          ref={suggestionsRef}
          className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg mt-1 shadow-lg"
        >
          {suggestions.map((doctor) => (
            <div
              key={doctor.name}
              data-testid="suggestion-item"
              className="p-3 hover:bg-gray-100 cursor-pointer border-b last:border-b-0"
              onClick={() => handleSuggestionClick(doctor.name)}
            >
              {doctor.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
