import { useEffect, useState } from "react";
import { ConsultationType, Doctor, SortOption } from "@/types/doctor";
import { getUniqueSpecialties } from "@/utils/filterUtils";

interface FilterPanelProps {
  doctors: Doctor[];
  consultationType: ConsultationType;
  setConsultationType: (type: ConsultationType) => void;
  selectedSpecialties: string[];
  setSelectedSpecialties: (specialties: string[]) => void;
  sortOption: SortOption;
  setSortOption: (option: SortOption) => void;
}

const FilterPanel = ({
  doctors,
  consultationType,
  setConsultationType,
  selectedSpecialties,
  setSelectedSpecialties,
  sortOption,
  setSortOption,
}: FilterPanelProps) => {
  const [specialties, setSpecialties] = useState<string[]>([]);

  useEffect(() => {
    if (doctors && doctors.length > 0) {
      const uniqueSpecialties = getUniqueSpecialties(doctors);
      setSpecialties(uniqueSpecialties);
    }
  }, [doctors]);

  const handleConsultationTypeChange = (type: ConsultationType) => {
    setConsultationType(type);
  };

  const handleSpecialtyChange = (specialty: string) => {
    setSelectedSpecialties(
      selectedSpecialties.includes(specialty)
        ? selectedSpecialties.filter((s) => s !== specialty)
        : [...selectedSpecialties, specialty]
    );
  };

  const handleSortChange = (option: SortOption) => {
    setSortOption(option);
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 mb-6">
      <div className="mb-6">
        <h3 
          data-testid="filter-header-moc" 
          className="text-lg font-semibold mb-3 text-gray-800"
        >
          Consultation Mode
        </h3>
        <div className="space-y-2">
          <div className="flex items-center">
            <input
              id="video-consult"
              data-testid="filter-video-consult"
              type="radio"
              name="consultation-type"
              checked={consultationType === "Video Consult"}
              onChange={() => handleConsultationTypeChange("Video Consult")}
              className="w-4 h-4 text-black bg-gray-100 border-black focus:ring-black"
            />
            <label
              htmlFor="video-consult"
              className="ml-2 text-sm font-medium text-gray-700"
            >
              Video Consult
            </label>
          </div>
          <div className="flex items-center">
            <input
              id="in-clinic"
              data-testid="filter-in-clinic"
              type="radio"
              name="consultation-type"
              checked={consultationType === "In Clinic"}
              onChange={() => handleConsultationTypeChange("In Clinic")}
              className="w-4 h-4 text-black bg-gray-100 border-black focus:ring-black"
            />
            <label
              htmlFor="in-clinic"
              className="ml-2 text-sm font-medium text-gray-700"
            >
              In Clinic
            </label>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h3 
          data-testid="filter-header-speciality" 
          className="text-lg font-semibold mb-3 text-gray-800"
        >
          Speciality
        </h3>
        <div className="space-y-2 max-h-60 overflow-y-auto">
          {specialties.map((specialty) => (
            <div key={specialty} className="flex items-center">
              <input
                id={`specialty-${specialty}`}
                data-testid={`filter-specialty-${specialty}`}
                type="checkbox"
                checked={selectedSpecialties.includes(specialty)}
                onChange={() => handleSpecialtyChange(specialty)}
                className="w-4 h-4 text-black bg-gray-100 border-black rounded focus:ring-black"
              />
              <label
                htmlFor={`specialty-${specialty}`}
                className="ml-2 text-sm font-medium text-gray-700"
              >
                {specialty}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 
          data-testid="filter-header-sort" 
          className="text-lg font-semibold mb-3 text-gray-800"
        >
          Sort By
        </h3>
        <div className="space-y-2">
          <div className="flex items-center">
            <input
              id="sort-fees"
              data-testid="sort-fees"
              type="radio"
              name="sort-option"
              checked={sortOption === "fees"}
              onChange={() => handleSortChange("fees")}
              className="w-4 h-4 text-black bg-gray-100 border-black focus:ring-black"
            />
            <label
              htmlFor="sort-fees"
              className="ml-2 text-sm font-medium text-gray-700"
            >
              Fees (Low to High)
            </label>
          </div>
          <div className="flex items-center">
            <input
              id="sort-experience"
              data-testid="sort-experience"
              type="radio"
              name="sort-option"
              checked={sortOption === "experience"}
              onChange={() => handleSortChange("experience")}
              className="w-4 h-4 text-black bg-gray-100 border-black focus:ring-black"
            />
            <label
              htmlFor="sort-experience"
              className="ml-2 text-sm font-medium text-gray-700"
            >
              Experience (High to Low)
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
