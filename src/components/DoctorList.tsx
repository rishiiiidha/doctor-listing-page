
import { Doctor } from "@/types/doctor";
import DoctorCard from "./DoctorCard";

interface DoctorListProps {
  doctors: Doctor[];
  loading: boolean;
}

const DoctorList = ({ doctors, loading }: DoctorListProps) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-medical-500"></div>
      </div>
    );
  }

  if (doctors.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-6 text-center">
        <h3 className="text-xl font-medium text-gray-700">No doctors found</h3>
        <p className="text-gray-500 mt-2">Try adjusting your search or filters</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {doctors.map((doctor) => (
        <DoctorCard key={doctor.name} doctor={doctor} />
      ))}
    </div>
  );
};

export default DoctorList;
