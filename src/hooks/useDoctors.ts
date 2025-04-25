
import { useQuery } from "@tanstack/react-query";
import { Doctor } from "@/types/doctor";

const API_URL = "https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json";

async function fetchDoctors(): Promise<Doctor[]> {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error("Failed to fetch doctor data");
    }
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Error fetching doctors:", error);
    return [];
  }
}

export function useDoctors() {
  return useQuery({
    queryKey: ["doctors"],
    queryFn: fetchDoctors,
    retry: 2,
    refetchOnWindowFocus: false,
  });
}
