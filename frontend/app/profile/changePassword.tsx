import { Feather } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { Dimensions, Image, Switch, Text,  TextInput,  TouchableOpacity, View } from "react-native";

const { width,height } = Dimensions.get("window");
export default function ChangePassword() {

  const [isAvailable,setIsAvailable]= useState(false);
  const router = useRouter();
  {/* Reusable Row Style */}


  
  return (
    
    <View
      className="flex-1  pt-14 bg-primary"
    >
      <View className = "items-center relative">
        <View className = "flex-row justify-between w-full">
          <TouchableOpacity 
           onPress = {()=>router.back()}>
            <Feather name ="chevron-left" size={20} color = "#FFE2E2" style = {{
              marginLeft: 20,
              
            }}/>

          </TouchableOpacity>
          
          <Text className="text-2xl mb-2  text-white font-poppins ">Change Password</Text>
          
          {/* <View className= "w-12 h-12"></View> */}
          <Link href="./profile/editProfile" asChild>
             <TouchableOpacity>
            <Feather name ="edit" size={20} color = "#FFE2E2" 
            style = {{
              marginRight: 25,
            }}
            />
          </TouchableOpacity>
            </Link>
         
          </View>
          
      <Text className="text-sm  text-secondary font-poppins ">Eligible for Donate</Text>
      
          
          <View className="absolute z-10 top-[100]">
            <View style={{
        width:width*0.35,
        height:width*0.35,
        borderRadius:width*0.35/2,
        borderColor:"white",
        borderWidth:2,
        borderStyle:"dashed",
        position:"relative",
        marginTop: -width*0.05,
      }}
      >

      </View>
          <Image 
      source = {require('../../assets/images/ProfileImg.jpg')}
      style = {{
         width:width*0.3,
          height:width*0.3,
      }}
      className = "rounded-full -top-[115] -right-[10]"/>

      <Image source = {require('../../assets/images/check.png')}
       style={{
        width:width*0.07,
        height:width*0.07,
        position:"relative",
        bottom:150,
        left:100,
       }}
      />

     </View>
     
          

      </View>
     
     
      
    
    <View className="flex-1"/>

    
    <View className = " bg-white rounded-3xl h-[78%] w-full items-center ">
       <Text className="text-2xl text-black font-poppins font-bold mt-12">John Doe</Text>
     <Text className="text-sm text-secondary font-poppins">johndoe@example.com</Text>


      <View className="border border-secondary rounded-xl px-4 py-2 w-[300px] h-[75px] mt-6"> 
                 <Text className="text-sm font-poppins text-secondary">Current Password</Text>
                    <TextInput
                     placeholder="**********************"
                     className= "text-accent"
                     secureTextEntry={true}
                    />
             </View>

       <View className="border border-secondary rounded-xl px-4 py-2 w-[300px] h-[75px] mt-3"> 
            <Text className="text-sm font-poppins text-secondary">New Password</Text>
               <TextInput
                placeholder="**********************"
                className= "text-accent"
                secureTextEntry={true}
               />
        </View>

         <View className="border border-secondary rounded-xl px-4 py-2 w-[300px] h-[75px] mt-3"> 
            <Text className="text-sm font-poppins text-secondary">Confirm Password</Text>
               <TextInput
                placeholder="*********************"
                className= "text-accent"
                secureTextEntry={true}
               />
        </View>

<TouchableOpacity
        className = "mt-7 px-12 py-3  rounded-xl self-center mb-5"
        style={{ backgroundColor: '#E72929' }}>
             <Text className = "text-white text-xl font-semibold">Change</Text>

        </TouchableOpacity>
           
    
    </View>
      
    </View>
  );
}