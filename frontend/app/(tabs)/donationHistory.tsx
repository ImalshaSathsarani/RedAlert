import { donorHistoryApi } from "@/services/api";
import { Feather } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Dimensions, Image, Modal, ScrollView, Switch, Text,  TouchableOpacity, View } from "react-native";

const { width,height } = Dimensions.get("window");
export default function DonationHistory() {

  
  const [modalVisible, setModalVisible] = useState(false);
  type Donation = {
    bloodType: string;
    patientName?: string;
    hospitalName?: string;
    emergencyPhone?: string;
    district?: string;
    createdAt: Date;
    // add other fields as needed
  };

  const [donorHistory, setDonorHistory] = useState<Donation[]>([]);
  const [selectedDonation, setSelectedDonation] = useState<Donation | null>(null);
  const router = useRouter();
  {/* Reusable Row Style */}

  useEffect(()=>{
    const fetchHistory = async() =>{
      try{
        const history = await donorHistoryApi.getDonorHistory();
        setDonorHistory(history);
        console.log("Donor history:", history);

      }catch(e){
        if (e instanceof Error) {
          console.error("Error fetch donor history:", e.message);
        } else {
          console.error("Error fetch donor history:", e);
        }
      }
    };
    fetchHistory();
  },[]);



  
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
       {selectedDonation && (
        <>
         <Text className="text-xl text-black mt-5">
            <Text style={{fontWeight:"bold"}}>Recipient Name:</Text> {selectedDonation.patientName || "N/A"}</Text> 

           <View className = "w-[250px] mt-3  bg-secondary h-[1px]"/> 

            <Text className="text-xl text-black mt-3">
                
                <Text style={{fontWeight:"bold"}}>Blood Group:</Text> {selectedDonation.bloodType}</Text> 

           <View className = "w-[250px] mt-3  bg-secondary h-[1px]"/> 

            <Text className="text-xl text-black mt-3">
                <Text style={{fontWeight:"bold"}}>Donated Date: </Text> {new Date(selectedDonation.createdAt).toLocaleDateString()}</Text> 

           <View className = "w-[250px] mt-3  bg-secondary h-[1px]"/> 

            <Text className="text-xl text-black mt-3">Donated Time: {new Date(selectedDonation.createdAt).toLocaleTimeString()}</Text> 

           <View className = "w-[250px] mt-3  bg-secondary h-[1px]"/> 

            <Text className="text-xl text-black mt-3">Hospital  Name: {selectedDonation.hospitalName || "N/A"}</Text> 

           <View className = "w-[250px] mt-3  bg-secondary h-[1px]"/> 

            <Text className="text-xl text-black mt-3">Hospital Phone No: {selectedDonation.emergencyPhone || "N/A"}</Text> 

           <View className = "w-[250px] mt-3  bg-secondary h-[1px]"/> 

            {/* <Text className="text-xl text-black mt-3">Recipient Address: {selectedDonation.patientAddress || "N/A"}</Text>  */}

           {/* <View className = "w-[250px] mt-3  bg-secondary h-[1px]"/>  */}

            <Text className="text-xl text-black mt-3">Hospital District: {selectedDonation.district || "N/A"}</Text> 
             <View className = "w-[250px] mt-3  bg-secondary h-[1px]"/> 
        </>
       )}
         

          
           
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

     {donorHistory.length > 0 ? (
      donorHistory.map((donation,index)=>(
        <TouchableOpacity 
        key = {index}
        onPress={()=>{
          setSelectedDonation(donation);
          setModalVisible(true);
        }}>
<View className="border border-secondary w-[300px] h-[100px] px-3 py-3 rounded-md mt-3">
    <View className='flex-row items-center'>
        <View className="border border-secondary h-[70px] w-[70px] px-3  rounded-md items-center">
            <Text className="text-4xl text-black mt-5">{donation.bloodType}</Text>

        </View>
        <View className=" flex-column items-start ml-7">
            <Text className="text-md text-black ">Female, 21 Year</Text>
            <Text className="text-sm text-secondary ">{donation.patientName || "Unknown"}</Text>
            <Text className="text-md text-secondary ">{donation.hospitalName || "Unknown"}</Text>
        </View>
        

    </View>


</View>
</TouchableOpacity>

      ))
     ) :(
      <Text className="text-lg text-gray-500 mt-10">No donation history available.</Text>
     )}



{/* 
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
</TouchableOpacity> */}
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