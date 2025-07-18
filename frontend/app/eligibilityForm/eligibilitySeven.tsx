import { useRouter } from "expo-router";
import { Dimensions, ScrollView, Text, TouchableOpacity, View } from "react-native";
import GetStartedBackground from "../getStartedBackground";
import { Entypo } from "@expo/vector-icons";
import { useEligibility } from "../../contexts/EligibilityContext";
import { checkEligibility } from "../../utils/checkEligibility";
import { useState } from "react";



const { width,height } = Dimensions.get("window");

export default function EligibilitySeven() {
  const router = useRouter();
  const eligibilityContext = useEligibility();
  const formData = eligibilityContext?.formData || {};
  const updateFormData = eligibilityContext?.updateFormData || (() => {});
  const PregnantBreastfeedingMenstruating = formData.PregnantBreastfeedingMenstruating || "";
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCheck = async () =>{
    setLoading(true);
    setError(null);
    try{
      const payLoad = {
        ...formData,
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
      }

      const isEligible = await checkEligibility(payLoad);

      setTimeout(() => {
      router.push(isEligible ? "/eligibilityForm/eligible" : "/eligibilityForm/notEligible");
    }, 300); // 300ms is enough for UI to show
    }catch(err){
      console.error("Error checking eligibility:", err);
      setError("An error occurred while checking eligibility. Please try again.");
    } finally{
      setLoading(false);
    }
    
  }

 console.log("Form Data in Eligibility Seven:", formData);
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
        <View className="w-5 h-5 border border-secondary rounded mr-2 justify-center items-center ml-5">
            {selected === value && <Entypo name="check" size={16}  color="#E72929"/>}
        </View>
        <Text className="text-md font-poppins text-accent">{label}</Text>

    </TouchableOpacity>
  )

  return (
     
   <GetStartedBackground>
     <ScrollView className="px-6 mt-20  w-full">
        <Text className="text-3xl mb-4">Are you Eligible for Donate?</Text>
        <Text className="text-lg  text-[#FFBFBF]">This quick health check helps us determine if you
                       are currently eligible to donate blood safely. This is a quick check and when donating blood you will again be checked.</Text>


<View className="flex-row justify-between mt-6">
  <TouchableOpacity onPress={()=>router.push('/eligibilityForm/eligibilityOne' as any)} className="bg-[#FFBFBF] h-[2px]" style={{ width:width/10}}/>
  <TouchableOpacity onPress={()=>router.push('/eligibilityForm/eligibilityTwo' as any)} className="bg-[#FFBFBF] h-[2px] ml-2" style={{ width:width/10}}/>
  <TouchableOpacity onPress={()=>router.push('/eligibilityForm/eligibilityThree' as any)} className="bg-[#FFBFBF] h-[2px] ml-2" style={{ width:width/10}}/>
  <TouchableOpacity onPress={()=>router.push('/eligibilityForm/eligibilityFour' as any)} className="bg-[#FFBFBF] h-[2px] ml-2" style={{ width:width/10}}/>
  <TouchableOpacity onPress={()=>router.push('/eligibilityForm/eligibilityFive' as any)} className="bg-[#FFBFBF] h-[2px] ml-2" style={{ width:width/10}}/>
  <TouchableOpacity onPress={()=>router.push('/eligibilityForm/eligibilitySix' as any)} className="bg-[#FFBFBF] h-[2px] ml-2 " style={{ width:width/10}}/>
  <TouchableOpacity onPress={()=>router.push('/eligibilityForm/eligibilitySeven' as any)} className="bg-primary h-[2px] ml-2 " style={{ width:width/10}}/>
</View>

<View className="border border-secondary bg-white mt-6 ml-2 rounded-md items-center" style={{
  height:height/1.55,
  width:width/1.2
}} >
<Text className="text-2xl text-secondary text-center mt-5">Female-Specific</Text>





<View className="w-full px-5 mt-3">
    <Text className="text-lg text-secondary mb-2  ">Are you currently pregnant, breastfeeding, or menstruating?</Text>
<View className="flex-row  space-x-8 mt-5">
    <CheckBox label="Yes" value="Yes" selected={PregnantBreastfeedingMenstruating} onSelect={(val)=>updateFormData('PregnantBreastfeedingMenstruating',val)} />
    <CheckBox label="No" value="No" selected={PregnantBreastfeedingMenstruating} onSelect={(val)=>updateFormData('PregnantBreastfeedingMenstruating',val)}/>
</View>

</View>
 


 
        
</View>

  <TouchableOpacity
        onPress={handleCheck}
        disabled={loading}
        className = "mt-4 px-12 py-3  rounded-2xl self-center mb-5"
        style={{ backgroundColor:loading? '#aaa' : '#E72929' }}>
             <Text className = "text-white text-xl font-semibold">{loading ? "Checking..." : "Check"}</Text>

        </TouchableOpacity>

{loading && (
  <Text className="text-center text-lg text-secondary mt-3">Checking eligibility...</Text>
)}

{error && (
  <Text className="text-center text-red-500 mt-2">{error}</Text>
)}

      </ScrollView>
   </GetStartedBackground>
  
  );
}

