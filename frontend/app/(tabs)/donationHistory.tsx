import { Feather } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { Dimensions, Image, Modal, ScrollView, Switch, Text,  TouchableOpacity, View } from "react-native";

const { width,height } = Dimensions.get("window");
export default function DonationHistory() {

  
  const [modalVisible, setModalVisible] = useState(false);
  const router = useRouter();
  {/* Reusable Row Style */}



  
  return (
    <>
    <Modal
      visible={modalVisible}
      transparent
      animationType="slide"
      onRequestClose={()=>setModalVisible(false)}>
        <View className="flex-1 justify-center items-center bg-black/50">
        <View className="w-[300px] bg-white p-5 h-[550px] rounded-md items-start border border-primary">
            <View className="flex-row items-center justify-between  w-full mb-4">
               <TouchableOpacity onPress={()=>setModalVisible(false)}>
                <Feather name="chevron-left" size={24} color="#E72929"/>
            </TouchableOpacity>
             <Text className = "text-2xl font-bold text-primary">Details</Text>
            <View className = "w-6"/>
            </View>

          <Text className="text-xl text-black mt-5">
            <Text style={{fontWeight:"bold"}}>Recipient Name:</Text> Anne Jone</Text> 

           <View className = "w-[250px] mt-3  bg-secondary h-[1px]"/> 

            <Text className="text-xl text-black mt-3">
                
                <Text style={{fontWeight:"bold"}}>Blood Group:</Text> A+</Text> 

           <View className = "w-[250px] mt-3  bg-secondary h-[1px]"/> 

            <Text className="text-xl text-black mt-3">
                <Text style={{fontWeight:"bold"}}>Donated Date: </Text>01/01/2000</Text> 

           <View className = "w-[250px] mt-3  bg-secondary h-[1px]"/> 

            <Text className="text-xl text-black mt-3">Donated Time: 10:00</Text> 

           <View className = "w-[250px] mt-3  bg-secondary h-[1px]"/> 

            <Text className="text-xl text-black mt-3">Hospital  Name: XYZ Hospital</Text> 

           <View className = "w-[250px] mt-3  bg-secondary h-[1px]"/> 

            <Text className="text-xl text-black mt-3">Recipient Phone No:0123456789</Text> 

           <View className = "w-[250px] mt-3  bg-secondary h-[1px]"/> 

            <Text className="text-xl text-black mt-3">Recipient Address: Anne Jone ,ashuer, asehn</Text> 

           <View className = "w-[250px] mt-3  bg-secondary h-[1px]"/> 

            <Text className="text-xl text-black mt-3">Hospital Address:aasshruh, dsrueh, ijefn</Text> 

           <View className = "w-[250px] mt-3  bg-secondary h-[1px]"/> 
           
        </View>
        </View>

    </Modal>
    
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
          
          <Text className="text-2xl mb-2  text-white font-poppins ">Donation History</Text>
          
          {/* <View className= "w-12 h-12"></View> */}
          <Link href="/profile/editProfile" asChild>
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
         <ScrollView
      contentContainerStyle={{
        alignItems: 'center',
        paddingBottom: 30,
      }}
      showsVerticalScrollIndicator={false}
    >

       <Text className="text-2xl text-black font-poppins font-bold mt-12">John Doe</Text>
     <Text className="text-sm text-secondary font-poppins">johndoe@example.com</Text>
<TouchableOpacity onPress={()=>setModalVisible(true)}>
<View className="border border-secondary w-[300px] h-[100px] px-3 py-3 rounded-md mt-3">
    <View className='flex-row items-center'>
        <View className="border border-secondary h-[70px] w-[70px] px-3  rounded-md items-center">
            <Text className="text-4xl text-black mt-5">A+</Text>

        </View>
        <View className=" flex-column items-start ml-7">
            <Text className="text-md text-black ">Female, 21 Year</Text>
            <Text className="text-sm text-secondary ">Anne Jone</Text>
            <Text className="text-md text-secondary ">XYZ Hospital</Text>
        </View>
        

    </View>


</View>
</TouchableOpacity>

<TouchableOpacity>
<View className="border border-secondary w-[300px] h-[100px] px-3 py-3 rounded-md mt-3">
    <View className='flex-row items-center'>
        <View className="border border-secondary h-[70px] w-[70px] px-3  rounded-md items-center">
            <Text className="text-4xl text-black mt-5">A+</Text>

        </View>
        <View className=" flex-column items-start ml-7">
            <Text className="text-md text-black ">Female, 21 Year</Text>
            <Text className="text-sm text-secondary ">Anne Jone</Text>
            <Text className="text-md text-secondary ">XYZ Hospital</Text>
        </View>
        

    </View>


</View>
</TouchableOpacity>

<TouchableOpacity>
<View className="border border-secondary w-[300px] h-[100px] px-3 py-3 rounded-md mt-3">
    <View className='flex-row items-center'>
        <View className="border border-secondary h-[70px] w-[70px] px-3  rounded-md items-center">
            <Text className="text-4xl text-black mt-5">A+</Text>

        </View>
        <View className=" flex-column items-start ml-7">
            <Text className="text-md text-black ">Female, 21 Year</Text>
            <Text className="text-sm text-secondary ">Anne Jone</Text>
            <Text className="text-md text-secondary ">XYZ Hospital</Text>
        </View>
        

    </View>


</View>
</TouchableOpacity>
{/* <TouchableOpacity>
<View className="border border-secondary w-[300px] h-[100px] px-3 py-3 rounded-md mt-3">
    <View className='flex-row items-center'>
        <View className="border border-secondary h-[70px] w-[70px] px-3  rounded-md items-center">
            <Text className="text-4xl text-black mt-5">A+</Text>

        </View>
        <View className=" flex-column items-start ml-7">
            <Text className="text-md text-black ">Female, 21 Year</Text>
            <Text className="text-sm text-secondary ">Anne Jone</Text>
            <Text className="text-md text-secondary ">XYZ Hospital</Text>
        </View>
        

    </View>


</View>
</TouchableOpacity> */}

</ScrollView>
    </View>
      
    </View>
    </>
  );
}