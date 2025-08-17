import {  useRouter } from "expo-router";
import { Dimensions, ScrollView, Text,  TouchableOpacity, View } from "react-native";
import GetStartedBackground from "../getStartedBackground";
import { Entypo } from "@expo/vector-icons";
import { useEligibility } from "../../contexts/EligibilityContext";
import { checkEligibility } from "../../utils/checkEligibility";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";


const { width,height } = Dimensions.get("window");

export default function EligibilitySix() {
  const router = useRouter();
  const eligibilityContext = useEligibility();
  const formData = eligibilityContext?.formData || {};
  const updateFormData = eligibilityContext?.updateFormData || (() => {});

  const InternationalTravel3Months = formData.InternationalTravel3Months || "";
  const TattoosPiercings6Months = formData.TattoosPiercings6Months || "";
  const TestedPositiveInfectious = formData.TestedPositiveInfectious || "";
  const gender = formData.Gender || "male";
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);


  const handlePress = async () =>{
    setLoading(true);
    setError(null);
    try{
       const userId = await AsyncStorage.getItem("userId");
       if(gender.toLowerCase() === "male"){
        const maleData = {
          ...formData,
          PregnantBreastfeedingMenstruating:"No",
          ChronicIllnessDetails: Array.isArray(formData.ChronicIllnessDetails)
    ? formData.ChronicIllnessDetails.join(', ')
    : formData.ChronicIllnessDetails,
  MedicationDetails: Array.isArray(formData.MedicationDetails)
    ? formData.MedicationDetails.join(', ')
    : formData.MedicationDetails,
  AllergyDetails: Array.isArray(formData.AllergyDetails)
    ? formData.AllergyDetails.join(', ')
    : formData.AllergyDetails,
  VaccineDetails: Array.isArray(formData.VaccineDetails)
    ? formData.VaccineDetails.join(', ')
    : formData.VaccineDetails,
        };
      const isEligible = await checkEligibility(maleData);
     
      const eligibilityData ={
        userId,
        weight: parseFloat(formData.Weight),
        age: parseInt(formData.Age),
        gender: formData.Gender.toLowerCase(),
        lastDonationDate: formData.LastDonationDate,
        chronicIllness:formData.ChronicIllness,
        chronicIllnessDetails:maleData.ChronicIllnessDetails,
        medications:formData.Medications,
        medicationDetails:maleData.MedicationDetails,
        coldFever7Days:formData.ColdFever7Days,
        surgery6Months:formData.Surgery6Months,
        allergies:formData.Allergies,
        allergyDetails:maleData.AllergyDetails,
        vaccinated4Weeks:formData.Vaccinated4Weeks,
        vaccineDetails: maleData.VaccineDetails,
        smokingHabits:formData.SmokingHabits,
        alcoholDrinking:formData.AlcoholDrinking,
        internationalTravel3Months:formData.InternationalTravel3Months,
        tattoosPiercing6Months:formData.TattoosPiercings6Months ||"No",
        testedPositiveInfectious:formData.TestedPositiveInfectious,
        pregnantBreastfeedingMenstruating:"No",
        isEligible
      }

     const res =  await fetch("https://compassionate-perception.up.railway.app/api/eligibility/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(eligibilityData)
    });

     if (!res.ok) {
  const errorData = await res.json();
  console.error("Eligibility API error:", errorData);
  throw new Error(errorData.message || "Failed to submit eligibility");
}

      router.push(isEligible ? "/eligibilityForm/eligible":"/eligibilityForm/notEligible")
    } else {
      router.push("/eligibilityForm/eligibilitySeven");
    }

    }catch(err){
      console.error("Error checking eligibility:", err);
      setError("An error occurred while checking eligibility. Please try again.");
    } finally{
      setLoading(false);
    }
   
  }
 
 console.log("Form Data in Eligibility Six:", formData);

 
  type CheckBoxProps = {
      label: string;
      value: string;
      selected: string;
      onSelect: (value: string) => void;
    };

  const CheckBox = ({label, value, selected, onSelect}: CheckBoxProps)=>(
    <TouchableOpacity
      onPress={()=>onSelect(value)}
      className="flex-row items-center my-1">
        <View className="w-5 h-5 border border-tertiary rounded mr-2 justify-center items-center ml-5">
            {selected === value && <Entypo name="check" size={16}  color="#E72929"/>}
        </View>
        <Text className="text-md font-poppins text-accent">{label}</Text>

    </TouchableOpacity>
  )

  return (
     
   <GetStartedBackground>
     <ScrollView className="px-6 mt-20  w-full">
        <Text className="text-3xl mb-4">Are you Eligible for Donate?</Text>
        <Text className="text-lg  text-tertiary">This quick health check helps us determine if you
                       are currently eligible to donate blood safely. This is a quick check and when donating blood you will again be checked.</Text>


<View className="flex-row justify-between mt-6">
  <TouchableOpacity onPress={()=>router.push('/eligibilityForm/eligibilityOne' as any)} className="bg-[#FFBFBF] h-[2px]" style={{ width:width/10}}/>
  <TouchableOpacity onPress={()=>router.push('/eligibilityForm/eligibilityTwo' as any)} className="bg-[#FFBFBF] h-[2px] ml-2" style={{ width:width/10}}/>
  <TouchableOpacity onPress={()=>router.push('/eligibilityForm/eligibilityThree' as any)} className="bg-[#FFBFBF] h-[2px] ml-2" style={{ width:width/10}}/>
  <TouchableOpacity onPress={()=>router.push('/eligibilityForm/eligibilityFour' as any)} className="bg-[#FFBFBF] h-[2px] ml-2" style={{ width:width/10}}/>
  <TouchableOpacity onPress={()=>router.push('/eligibilityForm/eligibilityFive' as any)} className="bg-[#FFBFBF] h-[2px] ml-2" style={{ width:width/10}}/>
  <TouchableOpacity onPress={()=>router.push('/eligibilityForm/eligibilitySix' as any)} className="bg-primary h-[2px] ml-2 " style={{ width:width/10}}/>
  <TouchableOpacity onPress={()=>router.push('/eligibilityForm/eligibilitySeven' as any)} className="bg-[#FFBFBF] h-[2px] ml-2 " style={{ width:width/10}}/>
</View>

<View className="border border-tertiary bg-white mt-6 ml-2 rounded-md items-center" style={{
  height:height/1.55,
  width:width/1.2
}} >
<Text className="text-2xl text-tertiary text-center mt-5">Risk & Travel History</Text>



<View className="w-full px-5 mt-3">
    <Text className="text-lg text-tertiary mb-2  ">Have you traveled internationally in the past 3 months?</Text>
<View className="flex-row  space-x-8 mt-5">
    <CheckBox label="Yes" value="Yes" selected={InternationalTravel3Months} onSelect={(val)=>updateFormData('InternationalTravel3Months',val)} />
    <CheckBox label="No" value="No" selected={InternationalTravel3Months} onSelect={(val)=>updateFormData('InternationalTravel3Months',val)}/>
</View>

</View>


<View className="w-full px-5 mt-5">
    <Text className="text-lg text-tertiary mb-2  ">Have you gotten any tattoos/piercings in the past 6 months?</Text>
<View className="flex-row  space-x-8 mt-5">
    <CheckBox label="Yes" value="Yes" selected={TattoosPiercings6Months} onSelect={(val)=>updateFormData('TattoosPiercings6Months',val)} />
    <CheckBox label="No" value="No" selected={TattoosPiercings6Months} onSelect={(val)=>updateFormData('TattoosPiercings6Months',val)}/>
</View>

</View>


<View className="w-full px-5 mt-5">
    <Text className="text-lg text-tertiary mb-2  ">Have you ever tested positive for HIV, Hepatitis B/C, or malaria?</Text>
<View className="flex-row  space-x-8 mt-5">
    <CheckBox label="Yes" value="Yes" selected={TestedPositiveInfectious} onSelect={(val)=>updateFormData('TestedPositiveInfectious',val)} />
    <CheckBox label="No" value="No" selected={TestedPositiveInfectious} onSelect={(val)=>updateFormData('TestedPositiveInfectious',val)}/>
</View>

</View>
 


 
        
</View>

  {/* <TouchableOpacity
        onPress={handlePress}
        className = "mt-4 px-12 py-3  rounded-2xl self-center mb-5"
        style={{ backgroundColor:loading? '#aaa': '#E72929' }}>
             <Text className = "text-white text-xl font-semibold">
              {loading ? "Checking..." : (gender.toLowerCase() === "male" ? "Check" : "Next")}</Text>

        </TouchableOpacity>
{loading && (
  <Text className="text-center text-lg text-secondary mt-3">Checking eligibility...</Text>
)}

{error && (
  <Text className="text-center text-red-500 mt-2">{error}</Text>
)} */}
{gender.toLowerCase() === "female" ? (
  // For female: Show Previous and Next buttons
  <View className="flex-row justify-between mt-6 mb-10 px-10">
    <TouchableOpacity
      onPress={() => router.push("/eligibilityForm/eligibilityFive")}
      className="px-10 py-3 rounded-2xl"
      style={{ backgroundColor: "#BFBFBF" }}
    >
      <Text className="text-white text-xl font-semibold">Previous</Text>
    </TouchableOpacity>

    <TouchableOpacity
      onPress={() => router.push("/eligibilityForm/eligibilitySeven")}
      className="px-10 py-3 rounded-2xl"
      style={{ backgroundColor: "#E72929" }}
    >
      <Text className="text-white text-xl font-semibold">Next</Text>
    </TouchableOpacity>
  </View>
) : (
  // For male: Show only Check button
  <>
    <TouchableOpacity
      onPress={handlePress}
      className="mt-4 px-12 py-3 rounded-2xl self-center mb-5"
      style={{ backgroundColor: loading ? "#aaa" : "#E72929" }}
    >
      <Text className="text-white text-xl font-semibold">
        {loading ? "Checking..." : "Check"}
      </Text>
    </TouchableOpacity>

    {loading && (
      <Text className="text-center text-lg text-secondary mt-3">
        Checking eligibility...
      </Text>
    )}
    {error && (
      <Text className="text-center text-red-500 mt-2">{error}</Text>
    )}
  </>
)}


      </ScrollView>
   </GetStartedBackground>
  
  );
}

