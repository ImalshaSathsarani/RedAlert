// // utils/checkEligibility.ts
// import axios from "axios";

// const apiUrl = process.env.EXPO_PUBLIC_API_URL;


// export async function checkEligibility(formData: any) {
//   console.log("API URL:", apiUrl);
//   const response = await axios.post(`${apiUrl}/eligibilityPredict`, formData);
//   console.log("API Response:", response.data);
//   return response.data.result;
// }
import axios from "axios";

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

export async function checkEligibility(formData: any) {
  console.log("API URL:", apiUrl);

  const formattedPayload = {
    ...formData,
    ChronicIllnessDetails: Array.isArray(formData.ChronicIllnessDetails)
      ? formData.ChronicIllnessDetails[0]
      : formData.ChronicIllnessDetails || "None",
    MedicationDetails: Array.isArray(formData.MedicationDetails)
      ? formData.MedicationDetails[0]
      : formData.MedicationDetails || "None",
    AllergyDetails: Array.isArray(formData.AllergyDetails)
      ? formData.AllergyDetails[0]
      : formData.AllergyDetails || "None",
    VaccineDetails: Array.isArray(formData.VaccineDetails)
      ? formData.VaccineDetails[0]
      : formData.VaccineDetails || "None",
  };

  try {
    const response = await axios.post(`${apiUrl}/eligibilityPredict`, formattedPayload);
    console.log("API Response:", response.data);
    return response.data.result;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
}
