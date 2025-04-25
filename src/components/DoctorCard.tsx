
import { Doctor } from "@/types/doctor";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface DoctorCardProps {
  doctor: Doctor;
}

const DoctorCard = ({ doctor }: DoctorCardProps) => {
  const {
    name,
    photo,
    specialities,
    fees,
    experience,
    languages,
    clinic,
    video_consult,
    in_clinic,
    doctor_introduction
  } = doctor;

  // Get consultation modes
  const consultationModes = [];
  if (video_consult) consultationModes.push("Video Consult");
  if (in_clinic) consultationModes.push("In Clinic");
  
  const consultationModesText = consultationModes.join(", ");
  
  // Get specialties text
  const specialityText = specialities?.map(s => s.name).join(", ") || "General";

  return (
    <Card 
      data-testid="doctor-card"
      className="hover:shadow-lg transition-shadow"
    >
      <CardHeader className="flex flex-row items-start gap-4 space-y-0">
        <img
          src={photo || "/placeholder.svg"}
          alt={name}
          className="rounded-full w-16 h-16 object-cover"
        />
        <div className="flex-1">
          <h2 
            data-testid="doctor-name"
            className="text-xl font-bold text-gray-800"
          >
            {name}
          </h2>
          <p 
            data-testid="doctor-specialty"
            className="text-medical-600 font-medium"
          >
            {specialityText}
          </p>
        </div>
        <button className="bg-medical-500 text-white px-4 py-2 rounded-md hover:bg-medical-600 transition-colors">
          Book Now
        </button>
      </CardHeader>
      
      <CardContent className="grid gap-4">
        <p className="text-sm text-gray-600">{doctor_introduction}</p>
        
        <div className="flex flex-col gap-2">
          <div 
            data-testid="doctor-experience" 
            className="flex items-center"
          >
            <span className="text-sm font-medium text-gray-700">
              {experience}
            </span>
          </div>
          
          <div className="flex flex-col gap-1">
            <span className="text-sm font-medium text-gray-700">
              {consultationModesText}
            </span>
            {clinic && (
              <span className="text-sm text-gray-600">
                {clinic.name} - {clinic.address.locality}, {clinic.address.city}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <span 
              data-testid="doctor-fee" 
              className="text-sm font-semibold text-gray-800"
            >
              {fees} Consultation Fee
            </span>
            <span className="text-xs text-gray-500">
              • Speaks {languages.join(", ")}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DoctorCard;
