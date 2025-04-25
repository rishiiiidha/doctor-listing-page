
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "@/components/ui/sonner";
import { useDoctors } from "@/hooks/useDoctors";
import { ConsultationType, Doctor, SortOption } from "@/types/doctor";
import {
  filterByConsultationType,
  filterByName,
  filterBySpecialties,
  sortDoctors,
} from "@/utils/filterUtils";

import SearchBar from "@/components/SearchBar";
import FilterPanel from "@/components/FilterPanel";
import DoctorList from "@/components/DoctorList";

const Index = () => {
  const { data: doctors = [], isLoading, error } = useDoctors();
  
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState<string>(searchParams.get("search") || "");
  const [consultationType, setConsultationType] = useState<ConsultationType>(
    (searchParams.get("consultationType") as ConsultationType) || ""
  );
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>(
    searchParams.get("specialties")?.split(",").filter(Boolean) || []
  );
  const [sortOption, setSortOption] = useState<SortOption>(
    (searchParams.get("sortBy") as SortOption) || ""
  );
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([]);

  useEffect(() => {
    // Update URL parameters when filters change
    const params = new URLSearchParams();
    
    if (searchQuery) params.set("search", searchQuery);
    if (consultationType) params.set("consultationType", consultationType);
    if (selectedSpecialties.length > 0) params.set("specialties", selectedSpecialties.join(","));
    if (sortOption) params.set("sortBy", sortOption);
    
    setSearchParams(params);
    
    // Apply filters
    if (doctors.length > 0) {
      let filtered = [...doctors];
      
      // Apply name filter
      filtered = filterByName(filtered, searchQuery);
      
      // Apply consultation type filter
      if (consultationType) {
        filtered = filterByConsultationType(filtered, consultationType);
      }
      
      // Apply specialties filter
      if (selectedSpecialties.length > 0) {
        filtered = filterBySpecialties(filtered, selectedSpecialties);
      }
      
      // Apply sorting
      if (sortOption) {
        filtered = sortDoctors(filtered, sortOption);
      }
      
      setFilteredDoctors(filtered);
    }
  }, [doctors, searchQuery, consultationType, selectedSpecialties, sortOption, setSearchParams]);

  useEffect(() => {
    if (error) {
      toast.error("Failed to fetch doctor data. Please try again later.");
    }
  }, [error]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleSuggestionClick = (doctorName: string) => {
    setSearchQuery(doctorName);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-medical-600 text-white py-6">
        <div className="container px-4 mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold">Doctor Listing Page</h1>
        </div>
      </header>
      
      <div className="container px-4 py-8 mx-auto">
        <SearchBar 
          doctors={doctors} 
          onSearch={handleSearch} 
          onSuggestionClick={handleSuggestionClick} 
        />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <FilterPanel
              doctors={doctors}
              consultationType={consultationType}
              setConsultationType={setConsultationType}
              selectedSpecialties={selectedSpecialties}
              setSelectedSpecialties={setSelectedSpecialties}
              sortOption={sortOption}
              setSortOption={setSortOption}
            />
          </div>
          
          <div className="md:col-span-2">
            <DoctorList 
              doctors={filteredDoctors} 
              loading={isLoading} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
