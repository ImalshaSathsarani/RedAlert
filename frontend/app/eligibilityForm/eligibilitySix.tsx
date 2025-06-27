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
 
  const [travel, setTravel] =useState("");
  const [tattos, setTatto] = useState("");
  const [positive, setPositive] = useState("")

 
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
  <TouchableOpacity onPress={()=>router.push('/eligibilityForm/eligibilityOne')} className="bg-[#FFBFBF] h-[2px]" style={{ width:width/10}}/>
  <TouchableOpacity onPress={()=>router.push('/eligibilityForm/eligibilityTwo')} className="bg-[#FFBFBF] h-[2px] ml-2" style={{ width:width/10}}/>
  <TouchableOpacity onPress={()=>router.push('/eligibilityForm/eligibilityThree')} className="bg-[#FFBFBF] h-[2px] ml-2" style={{ width:width/10}}/>
  <TouchableOpacity onPress={()=>router.push('/eligibilityForm/eligibilityFour')} className="bg-[#FFBFBF] h-[2px] ml-2" style={{ width:width/10}}/>
  <TouchableOpacity onPress={()=>router.push('/eligibilityForm/eligibilityFive')} className="bg-[#FFBFBF] h-[2px] ml-2" style={{ width:width/10}}/>
  <TouchableOpacity onPress={()=>router.push('/eligibilityForm/eligibilitySix')} className="bg-primary h-[2px] ml-2 " style={{ width:width/10}}/>
  <TouchableOpacity onPress={()=>router.push('/eligibilityForm/eligibilitySeven')} className="bg-[#FFBFBF] h-[2px] ml-2 " style={{ width:width/10}}/>
</View>

<View className="border border-secondary bg-white mt-6 ml-2 rounded-md items-center" style={{
  height:height/1.55,
  width:width/1.2
}} >
<Text className="text-2xl text-secondary text-center mt-5">Risk & Travel History</Text>



<View className="w-full px-5 mt-3">
    <Text className="text-lg text-secondary mb-2  ">Have you traveled internationally in the past 3 months?</Text>
<View className="flex-row  space-x-8 mt-5">
    <CheckBox label="Yes" value="yes" selected={travel} onSelect={setTravel} />
    <CheckBox label="No" value="no" selected={travel} onSelect={setTravel}/>
</View>

</View>


<View className="w-full px-5 mt-5">
    <Text className="text-lg text-secondary mb-2  ">Have you gotten any tattoos/piercings in the past 6 months?</Text>
<View className="flex-row  space-x-8 mt-5">
    <CheckBox label="Yes" value="yes" selected={tattos} onSelect={setTatto} />
    <CheckBox label="No" value="no" selected={tattos} onSelect={setTatto}/>
</View>

</View>


<View className="w-full px-5 mt-5">
    <Text className="text-lg text-secondary mb-2  ">Have you ever tested positive for HIV, Hepatitis B/C, or malaria?</Text>
<View className="flex-row  space-x-8 mt-5">
    <CheckBox label="Yes" value="yes" selected={positive} onSelect={setPositive} />
    <CheckBox label="No" value="no" selected={positive} onSelect={setPositive}/>
</View>

</View>
 


 
        
</View>

  <TouchableOpacity
        onPress={() => router.push('/eligibilityForm/eligibilitySeven')}
        className = "mt-4 px-12 py-3  rounded-2xl self-center mb-5"
        style={{ backgroundColor: '#E72929' }}>
             <Text className = "text-white text-xl font-semibold">Next</Text>

        </TouchableOpacity>


      </View>
   </GetStartedBackground>
  
  );
}

