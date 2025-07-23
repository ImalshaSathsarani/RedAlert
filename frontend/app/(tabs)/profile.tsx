import { Feather } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import { useState, useEffect } from "react";
import { Dimensions, Image, Modal, Switch, Text,  TouchableOpacity, View } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const { width,height } = Dimensions.get("window");
export default function Profile() {

  const [isAvailable,setIsAvailable]= useState(false);
  const [logoutModalVisible,setLogoutModalVisible] = useState(false);
  const [shareModalVisible, setShareModalVisible] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const loadProfileImage = async () => {
      try {
        const savedImage = await AsyncStorage.getItem('userProfileImage');
        if (savedImage) {
          setProfileImage(savedImage);
        }
      } catch (error) {
        console.error('Error loading profile image:', error);
      }
    };
    loadProfileImage();
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
          router.replace('/donorLogin');
          return;
        }

        const apiUrl = getApiUrl();
        const response = await axios.get(
          `${apiUrl}/api/donor/profile/me`,
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
        );
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const getApiUrl = () => {
    if (__DEV__) {
      return 'http://192.168.8.198:5000';
    }
    return 'http://192.168.8.198:5000'; // Replace with your production URL
  };

  if (!user) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>Loading...</Text>
      </View>
    );
  }

  {/* Reusable Row Style */}
type SettingRowProps = {
  icon: React.ComponentProps<typeof Feather>["name"];
  label: string;
  rightElement?: React.ReactNode;
};

const SettingRow = ({ icon, label, rightElement, onPress }: SettingRowProps  & { onPress?: () => void }) => (
  <TouchableOpacity onPress={onPress}>
  <View className="h-[50px] w-[275px] bg-secondary rounded-2xl justify-center mt-2 px-4">
    <View className="flex-row items-center justify-between">
      <View className="flex-row items-center">
        <Feather name={icon} size={20} color="#000" />
        <Text className="text-md text-black font-poppins ml-4">{label}</Text>
      </View>
      {rightElement}
    </View>
  </View>
  </TouchableOpacity>
);

  
  return (
    <>
    <Modal 
     visible={logoutModalVisible}
     transparent
     animationType="slide"
     onRequestClose={()=>setLogoutModalVisible(false)}
     >

      <View className="flex-1 justify-center items-center bg-black/50">
       <View className="w-[250px] h-[120px] bg-primary rounded-md  ">
        <Text className="text-xl text-white text-center mt-5">Are You Sure?</Text>
        <View className="flex-row items-center justify-between w-full ml-10 mt-6">
           <TouchableOpacity 
          className="bg-white rounded-full px-6 py-2">
          <Text className="text-md text-primary">Yes</Text>
        </TouchableOpacity>

         <TouchableOpacity 
          onPress ={()=>setLogoutModalVisible(false)}
          className="bg-white rounded-full px-6 py-2">
          <Text className="text-md text-primary">No</Text>
        </TouchableOpacity>
        <View className = "w-6"></View>
        </View>
       
       </View>

      </View>

    </Modal>

    <Modal 
     visible={shareModalVisible}
     transparent
     animationType="slide"
     onRequestClose={()=>setShareModalVisible(false)}
     >
      <TouchableOpacity 
        activeOpacity={1}
        className="flex-1 justify-end bg-black/50"
        onPressOut={()=>setShareModalVisible(false)}>

 
        <View className ="bg-white border border-primary rounded-t-3xl px-6 pt-4 pb-20 w-full">
          <Text className="text-xl font-bold text-black text-center mt-3 mb-2">Share RedAlert With Your Friends</Text>

          <View className="flex-row justify-center space-x-6 mt-4">
            <TouchableOpacity>
              <Image source={require('../../assets/images/whatsapp.png')} style={{ width: 50, height: 50 }}/>
            </TouchableOpacity>
              <TouchableOpacity>
              <Image source={require('../../assets/images/facebook.png')} style={{ width: 50, height: 50, marginLeft:20 }}/>
            </TouchableOpacity>
              <TouchableOpacity>
              <Image source={require('../../assets/images/messenger.png')} style={{ width: 50, height: 50, marginLeft:20 }}/>
            </TouchableOpacity>
              <TouchableOpacity>
              <Image source={require('../../assets/images/instagram.png')} style={{ width: 50, height: 50, marginLeft:20 }}/>
            </TouchableOpacity>
          </View>
        </View>

     
        </TouchableOpacity>
     

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
          
          <Text className="text-2xl mb-2  text-white font-poppins ">Profile</Text>
          
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

      {profileImage ? (
        <Image 
          source={{ uri: profileImage }}
          style={{
            width: width * 0.07,
            height: width * 0.07,
            position: "relative",
            bottom: 150,
            left: 100,
            borderRadius: 100, // Make it circular
          }}
        />
      ) : (
        <Image source = {require('../../assets/images/check.png')}
          style={{
            width: width * 0.07,
            height: width * 0.07,
            position: "relative",
            bottom: 150,
            left: 100,
          }}
        />
      )}

     </View>
     
          

      </View>
     
     
      
    
    <View className="flex-1"/>

    
    <View className = " bg-white rounded-3xl h-[78%] w-full items-center ">
       <Text className="text-2xl text-black font-poppins font-bold mt-12">{user?.name || 'John Doe'}</Text>
     <Text className="text-sm text-secondary font-poppins">{user?.email || 'johndoe@example.com'}</Text>

<View className= "flex-row items-center mt-2 mb-4" >
  <View className="w-[60px] h-[60px] bg-secondary rounded-xl justify-center items-center px-2 py-2">
    <Text className="text-xl text-black font-poppins">{user?.bloodType || 'A+'}</Text>
    <Text className="text-xs text-gray-500 font-poppins">Blood Type</Text>
    </View>
    <Link href= "/donationHistory" asChild><TouchableOpacity className= "w-[60px] h-[60px] bg-secondary rounded-xl justify-center items-center px-2 py-2 ml-20">
       <Text className="text-xl text-black font-poppins">4</Text>
       <Text className="text-xs text-gray-500 font-poppins">Donated</Text>   
    </TouchableOpacity></Link>
</View>
 {/* <View className = "h-[50px] w-[275px] bg-secondary rounded-2xl justify-center items-center mt-4">
  <View className ="flex-row items-center justify-between">
    <Image 
       source={require('../../assets/images/blood-pressure.png')}
       style={{
        width:width*0.065,
        height:width*0.065,
       }}
       />

       <Text className = "text-md text-black font-poppins ml-8">Are you Available?</Text>
       <Switch
         value={isAvailable}
         onValueChange={setIsAvailable}
         trackColor={{ false: "#B43929", true: "green" }} 
         thumbColor={isAvailable ? "#fff" : "#fff"} 
         className="ml-8"  /> 
  </View>
  
  </View> */}
  {/* <View className = "h-[50px] w-[275px] bg-secondary rounded-2xl justify-center items-center mt-2">
    <View className="flex-row justify-between items-center">
      <Feather name="lock" size={20} color="#000"/>
      <Text className = "text-md text-black font-poppins ml-9">Change Password</Text>
     <View className="w-12 h-12 ml-8"/>
    </View>
  </View>

  <View className = "h-[50px] w-[275px] bg-secondary rounded-2xl justify-center items-center mt-2">
    <View className="flex-row justify-between items-center">
      <Feather name="share-2" size={20} color="#000"/>
      <Text className = "text-md text-black font-poppins ml-10">Share with Friends</Text>
     <View className="w-12 h-12 ml-12"/>
    </View>
  
  </View>
  <View className = "h-[50px] w-[275px] bg-secondary rounded-2xl justify-center items-center mt-2">
    <View className="flex-row justify-between items-center">
      <Feather name="log-out" size={20} color="#000"/>
      <Text className = "text-md text-black font-poppins ml-10">Logout</Text>
     <View className="w-12 h-12 ml-15"/>
    </View>
  
  </View>
  <View className = "h-[50px] w-[275px] bg-secondary rounded-2xl justify-center items-center mt-2">
      <View className="flex-row justify-between items-center">
      <Feather name="help-circle" size={20} color="#000"/>
      <Text className = "text-md text-black font-poppins ml-14">Get Help</Text>
     <View className="w-12 h-12 ml-10"/>
    </View>
  
  
  </View> */}
   <SettingRow
  icon="heart"
  label="Are you Available?"
  rightElement={
    <Switch
      value={isAvailable}
      onValueChange={setIsAvailable}
      trackColor={{ false: "#B43929", true: "green" }}
      thumbColor="#fff"
    />
  }
/>

<SettingRow icon="lock" label="Change Password" rightElement={<View className="w-6" />} onPress={()=> router.push("/profile/changePassword")} />
<SettingRow icon="share-2" label="Share with Friends" rightElement={<View className="w-6" />} onPress={()=>setShareModalVisible(true)} />
<SettingRow icon="log-out" label="Logout" rightElement={<View className="w-6" />} onPress={()=>setLogoutModalVisible(true)} />
<SettingRow icon="help-circle" label="Get Help" rightElement={<View className="w-6" />} onPress={()=>router.push('/profile/getHelp')} />

    
    </View>
      
    </View>
    </>
  );
}