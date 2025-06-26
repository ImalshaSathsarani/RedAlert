import { Link, useRouter } from "expo-router";
import { Dimensions, Image, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import GetStartedBackground from "../getStartedBackground";
import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from "react";
import { Entypo, Feather } from "@expo/vector-icons";


const { width,height } = Dimensions.get("window");

export default function EligibilityOne() {
  const router = useRouter();
  
  return (
     
   <GetStartedBackground>
     <View className="px-6 mt-20 w-full">
       
        <Text className="text-xl mt-10 text-accent">Great news! You’re eligible to donate blood.You can now register as a donor on RedAlert and help save lives.Let’s get you signed up and ready to make a difference!</Text>



<View className="border border-secondary bg-white mt-12 ml-2 rounded-md items-center" style={{
  height:height/2.1,
  width:width/1.2
}} >

<Text className="text-4xl text-accent mt-10 text-center">Yes,</Text>
<Image source={require('../../assets/images/check.png')}
  style={{
    width:height*0.15,
    height:height*0.15,
    marginTop:20
  }}
/>

<Text className="text-4xl text-accent mt-10 text-center">You are Eligible</Text>





<Link href="/eligibilityForm/notEligible" asChild>
<Text>Not</Text></Link>
 
        
</View>

  <TouchableOpacity
        onPress={() => router.push('/home')}
        className = "mt-8 px-12 py-3  rounded-2xl self-center mb-5"
        style={{ backgroundColor: '#E72929' }}>
             <Text className = "text-white text-xl font-semibold">Home</Text>

        </TouchableOpacity>


      </View>
   </GetStartedBackground>
  
  );
}

