import { Link, useRouter } from "expo-router";
import { Dimensions, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import GetStartedBackground from "../getStartedBackground";
import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from "react";
import { Entypo, Feather } from "@expo/vector-icons";


const { width,height } = Dimensions.get("window");

export default function EligibilityOne() {
  const router = useRouter();
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [chronicIllness,setChronicIllness] = useState("");
  const [medications,setMedications] = useState("");
  const [cold,setCold] = useState("");

  const onChange = (event: any, selectedDate: Date | undefined) => {
      const currentDate = selectedDate || date;
        setShowPicker(Platform.OS === 'ios');
        setShowPicker(false); // for iOS keep showing picker
        setDate(currentDate);
      };
  
      const formattedDate = date.toLocaleDateString('en-GB');

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
     <View className="px-6 mt-20  w-full">
        <Text className="text-3xl mb-4">Are you Eligible for Donate?</Text>
        <Text className="text-lg  text-[#FFBFBF]">This quick health check helps us determine if you
                       are currently eligible to donate blood safely.</Text>


<View className="flex-row justify-between mt-6">
 <TouchableOpacity onPress={()=>router.push('/eligibilityForm/eligibilityOne' as any)} className="bg-[#FFBFBF] h-[2px]" style={{ width:width/10}}/>
  <TouchableOpacity onPress={()=>router.push('/eligibilityForm/eligibilityTwo' as any)} className="bg-primary h-[2px] ml-2" style={{ width:width/10}}/>
  <TouchableOpacity onPress={()=>router.push('/eligibilityForm/eligibilityThree' as any)} className="bg-[#FFBFBF] h-[2px] ml-2" style={{ width:width/10}}/>
  <TouchableOpacity onPress={()=>router.push('/eligibilityForm/eligibilityFour' as any)} className="bg-[#FFBFBF] h-[2px] ml-2" style={{ width:width/10}}/>
  <TouchableOpacity onPress={()=>router.push('/eligibilityForm/eligibilityFive' as any)} className="bg-[#FFBFBF] h-[2px] ml-2" style={{ width:width/10}}/>
  <TouchableOpacity onPress={()=>router.push('/eligibilityForm/eligibilitySix' as any)} className="bg-[#FFBFBF] h-[2px] ml-2 " style={{ width:width/10}}/>
  <TouchableOpacity onPress={()=>router.push('/eligibilityForm/eligibilitySeven' as any)} className="bg-[#FFBFBF] h-[2px] ml-2 " style={{ width:width/10}}/>
</View>

<View className="border border-secondary bg-white mt-6 ml-2 rounded-md items-center" style={{
  height:height/1.55,
  width:width/1.2
}} >
<Text className="text-2xl text-secondary text-center mt-5">Health Status</Text>

<View className="w-full px-5 mt-3">
    <Text className="text-lg text-secondary mb-2  ">Do you have any chronic illness?</Text>
<View className="flex-row  space-x-8">
    <CheckBox label="Yes" value="yes" selected={chronicIllness} onSelect={setChronicIllness} />
    <CheckBox label="No" value="no" selected={chronicIllness} onSelect={setChronicIllness}/>
</View>
</View>


<View className="w-full px-5 mt-3">
    <Text className="text-lg text-secondary mb-2 ">If yes, Specify</Text>
 <TextInput
    className= "text-accent border border-secondary rounded-xl px-4 py-2 w-[250px] h-[70px] mt-2"
 />
</View>


<View className="w-full px-5 mt-3">
    <Text className="text-lg text-secondary mb-2  ">Are you currently taking any medications?</Text>
<View className="flex-row  space-x-8">
    <CheckBox label="Yes" value="yes" selected={medications} onSelect={setMedications} />
    <CheckBox label="No" value="no" selected={medications} onSelect={setMedications}/>
</View>

</View>
 

<View className="w-full px-5 mt-3">
    <Text className="text-lg text-secondary mb-2 ">If yes, Specify</Text>
 <TextInput
    className= "text-accent border border-secondary rounded-xl px-4 py-2 w-[250px] h-[70px] mt-2"
 />
</View>

 {/* <Text className="text-lg text-secondary mt-3  ">Have you had any cold, fever, or infection in the past 7 days?</Text>
<View className="flex-row  justify-between">
    <CheckBox label="Yes" value="yes" selected={cold} onSelect={setCold} />
    <CheckBox label="No" value="no" selected={cold} onSelect={setCold}/>
</View>
 */}

        
</View>

  <TouchableOpacity
        onPress={() => router.push('/eligibilityForm/eligibilityThree' as any)}
        className = "mt-4 px-12 py-3  rounded-2xl self-center mb-5"
        style={{ backgroundColor: '#E72929' }}>
             <Text className = "text-white text-xl font-semibold">Next</Text>

        </TouchableOpacity>


      </View>
   </GetStartedBackground>
  
  );
}

