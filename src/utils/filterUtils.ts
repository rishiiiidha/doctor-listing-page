
import { Doctor, ConsultationType, SortOption } from "@/types/doctor";

export function filterByName(doctors: Doctor[], searchQuery: string): Doctor[] {
  if (!searchQuery) return doctors;
  
  const query = searchQuery.toLowerCase();
  return doctors.filter((doctor) => 
    doctor.name.toLowerCase().includes(query)
  );
}

export function filterByConsultationType(doctors: Doctor[], consultationType: ConsultationType): Doctor[] {
  if (!consultationType) return doctors;
  
  return doctors.filter((doctor) => {
    if (consultationType === "Video Consult") return doctor.video_consult;
    if (consultationType === "In Clinic") return doctor.in_clinic;
    return true;
  });
}

export function filterBySpecialties(doctors: Doctor[], selectedSpecialties: string[]): Doctor[] {
  if (!selectedSpecialties.length) return doctors;
  
  return doctors.filter((doctor) =>
    doctor.specialities?.some((specialty) => selectedSpecialties.includes(specialty.name))
  );
}

export function sortDoctors(doctors: Doctor[], sortBy: SortOption): Doctor[] {
  if (!sortBy) return doctors;
  
  return [...doctors].sort((a, b) => {
    if (sortBy === "fees") {
      const aFee = parseInt(a.fees.replace(/[^0-9]/g, ""));
      const bFee = parseInt(b.fees.replace(/[^0-9]/g, ""));
      return aFee - bFee; // Ascending order for fees
    } else if (sortBy === "experience") {
      const aExp = parseInt(a.experience.replace(/[^0-9]/g, ""));
      const bExp = parseInt(b.experience.replace(/[^0-9]/g, ""));
      return bExp - aExp; // Descending order for experience
    }
    return 0;
  });
}

export function getUniqueSpecialties(doctors: Doctor[]): string[] {
  const specialties = new Set<string>();
  
  doctors.forEach((doctor) => {
    if (doctor.specialities) {
      doctor.specialities.forEach((specialty) => {
        if (specialty.name) {
          specialties.add(specialty.name);
        }
      });
    }
  });
  
  return Array.from(specialties).sort();
}

export function getSuggestions(doctors: Doctor[], query: string): Doctor[] {
  if (!query || !doctors) return [];
  
  const filteredDoctors = filterByName(doctors, query);
  return filteredDoctors.slice(0, 3); // Return top 3 matches
}
