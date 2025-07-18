import { Link, useRouter } from "expo-router";
import { Dimensions, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import GetStartedBackground from "../getStartedBackground";
import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from "react";
import { Feather } from "@expo/vector-icons";
import { useEligibility } from "../../contexts/EligibilityContext";


const { width,height } = Dimensions.get("window");

export default function EligibilityOne() {
  const router = useRouter();
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const eligibilityContext = useEligibility();
  const formData = eligibilityContext?.formData || {};
  const updateFormData = eligibilityContext?.updateFormData || (() => {});
  const gender = formData.Gender?.toLowerCase?.() || "";


  const onChange = (event: any, selectedDate: Date | undefined) => {
      const currentDate = selectedDate || date;
        setShowPicker(Platform.OS === 'ios');
        setShowPicker(false); // for iOS keep showing picker
        setDate(currentDate);
        updateFormData("LastDonationDate", currentDate.toISOString())
      };

       const formattedDate = new Date(formData.LastDonationDate || date).toLocaleDateString('en-GB');
  return (
   <GetStartedBackground>
     <ScrollView className="px-6 mt-20  w-full">
        <Text className="text-3xl mb-4">Are you Eligible for Donate?</Text>
        <Text className="text-lg  text-[#FFBFBF]">This quick health check helps us determine if you
                       are currently eligible to donate blood safely. This is a quick check and when donating blood you will again be checked.</Text>


<View className="flex-row justify-between mt-6">
  <TouchableOpacity onPress={()=>router.push('/eligibilityForm/eligibilityOne' as any)} className="bg-primary h-[2px]" style={{ width:width/10}}/>
  <TouchableOpacity onPress={()=>router.push('/eligibilityForm/eligibilityTwo' as any)} className="bg-[#FFBFBF] h-[2px] ml-2" style={{ width:width/10}}/>
  <TouchableOpacity onPress={()=>router.push('/eligibilityForm/eligibilityThree' as any)} className="bg-[#FFBFBF] h-[2px] ml-2" style={{ width:width/10}}/>
  <TouchableOpacity onPress={()=>router.push('/eligibilityForm/eligibilityFour' as any)} className="bg-[#FFBFBF] h-[2px] ml-2" style={{ width:width/10}}/>
  <TouchableOpacity onPress={()=>router.push('/eligibilityForm/eligibilityFive' as any)} className="bg-[#FFBFBF] h-[2px] ml-2" style={{ width:width/10}}/>
  <TouchableOpacity onPress={()=>router.push('/eligibilityForm/eligibilitySix' as any)} className="bg-[#FFBFBF] h-[2px] ml-2 " style={{ width:width/10}}/>

  <TouchableOpacity onPress={()=>router.push('/eligibilityForm/eligibilitySeven' as any)} className="bg-[#FFBFBF] h-[2px] ml-2 " style={{ width:width/10}}/>
</View>

<View className="border border-secondary bg-white mt-8 ml-2 rounded-md items-center" style={{
  height:height/1.55,
  width:width/1.2
}} >
<Text className="text-2xl text-secondary text-center mt-5">Personal Info</Text>

 <View className="border border-secondary rounded-xl px-4 py-2 w-[250px] h-[75px] mt-7"> 
            <Text className="text-sm font-poppins text-secondary">Weight</Text>
               <TextInput
                placeholder="50Kg"
                className= "text-accent"
                onChangeText={(text)=> updateFormData("Weight", text.trim())}
                value={formData.Weight || ""}
               />
        </View>

  <View className="border border-secondary rounded-xl px-4 py-2 w-[250px] h-[75px] mt-3"> 
            <Text className="text-sm font-poppins text-secondary">Age</Text>
               <TextInput
                placeholder="22 Years"
                className= "text-accent"
                keyboardType="numeric"
                onChangeText={(text)=> updateFormData("Age", text.trim())}
                value = {formData.Age || ""}
                
               />
        </View>

  <View className="border border-secondary rounded-xl px-4 py-2 w-[250px] h-[75px] mt-3"> 
            <Text className="text-sm font-poppins text-secondary">Gender</Text>
               <TextInput
                placeholder="Female"
                className= "text-accent"
                onChangeText={(text) => updateFormData("Gender", text.trim())}
                value={formData.Gender || ""}
               />
        </View>

        <View className="border border-secondary rounded-xl px-4 py-2 w-[250px] h-[75px] mt-3"> 
            <Text className="text-sm font-poppins text-secondary ">Last Donation Date</Text>
            <TouchableOpacity onPress={() => setShowPicker(true)}>
                <View className ="flex-row items-center justify-between mt-2">
                    <Text className="text-accent">{formattedDate}</Text>
                    <Feather name="calendar" size={15} color ="#B43929"/>
                </View>
        
      </TouchableOpacity>
      {showPicker && (
        <DateTimePicker
         value={date}
         mode="date"
         display="default"
         onChange={onChange}
        />
       )} 
        </View>

</View>

  <TouchableOpacity
        onPress={() => router.push('/eligibilityForm/eligibilityTwo' as any)}
        className = "mt-4 px-12 py-3  rounded-2xl self-center mb-5"
        style={{ backgroundColor: '#E72929' }}>
             <Text className = "text-white text-xl font-semibold">Next</Text>

        </TouchableOpacity>


      </ScrollView>
   </GetStartedBackground>
  );
}

