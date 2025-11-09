// import { Text, View, SafeAreaView, ScrollView, Dimensions,Image,TouchableOpacity} from "react-native";
// import { Feather } from '@expo/vector-icons';
// import { Link ,useRouter} from "expo-router";

// export default function Notification() {

//   const { width } = Dimensions.get("window");
//   const router = useRouter();
//   return (
//     <SafeAreaView style={{ flex: 1, backgroundColor: '#FFE2E2' }}>
//       <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        
//         <View style={{ width: '100%', height: 140, backgroundColor: '#E72929' }}>
//           <View style={{ marginTop: 50, marginLeft:10, paddingHorizontal: 20 }}>
//             <Text style={{ color: "white", fontSize: 24, fontWeight: "bold" }}>Notification</Text>
//             <Text style={{ color: "white", fontSize: 14, marginTop: 5 }}>
//               See received blood request
//             </Text>
//           </View>
//         </View>

//         <View 
//           style={{height: 135,marginTop: 30,marginHorizontal: 20,backgroundColor: 'white',borderRadius: 20,padding: 10,shadowColor: '#000'
//             ,shadowOffset: { width: 0, height: 1 },shadowOpacity: 0.1,shadowRadius: 2,elevation: 2,}}>
//             <View style={{ flexDirection: 'row', alignItems: 'center' }}>          
//                 <Image source={require('../../assets/images/image1.png')} style={{width: 42,height: 42,borderRadius: 21,margin:10,}}/>
//                 <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', flex: 1 }}>
//                   <View style={{ flex: 1 ,marginLeft:5}}>
//                     <Text style={{ color: '#000', fontWeight: 'bold', fontSize: 14 }}>Kierra Franci</Text>
//                     <Text style={{ color: '#555', fontSize: 12, marginTop: 2 }}>50 minutes ago</Text>
//                   </View>
//                   <TouchableOpacity onPress={() => {router.push("/details")}}>
//                     <View style={{marginTop: 20,backgroundColor: '#E72929',borderRadius: 20,paddingVertical: 4,paddingHorizontal: 8,}}>
//                       <Text style={{ color: 'white', fontSize: 12 }}>View Details</Text>
//                     </View>
//                   </TouchableOpacity>
//                   <Text style={{ color: '#000', fontWeight: 'bold', fontSize: 14 ,marginRight:15}}>O+</Text>
//                 </View>
//             </View>

//             <View className = "w-full mt-5 bg-secondary h-[1px]" style={{ backgroundColor: "#ccc" }}/>

//             <View style={{flexDirection: 'row',alignItems: 'center',justifyContent: 'space-around'}}>
//               <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//                 <Feather name="share-2" size={16} color="#000" />
//                 <Text style={{ marginLeft: 6, color: '#000', fontSize: 13 }}>Share</Text>
//               </View>
//               <View style={{width: 1,height: 40, backgroundColor: '#ccc',alignSelf: 'center'}} />
//               <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//                   <Feather name="check-circle" size={16} color="#000" />
//                   <Text style={{ marginLeft: 6, color: '#000', fontSize: 13 }}>Accept</Text>
//               </View>
//             </View>
//         </View>

//         <View 
//           style={{height: 135,marginTop: 15,marginHorizontal: 20,backgroundColor: 'white',borderRadius: 20,padding: 10,shadowColor: '#000'
//             ,shadowOffset: { width: 0, height: 1 },shadowOpacity: 0.1,shadowRadius: 2,elevation: 2,}}>
//             <View style={{ flexDirection: 'row', alignItems: 'center' }}>          
//                 <Image source={require('../../assets/images/image1.png')} style={{width: 42,height: 42,borderRadius: 21,margin:10,}}/>
//                 <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', flex: 1 }}>
//                   <View style={{ flex: 1 ,marginLeft:5}}>
//                     <Text style={{ color: '#000', fontWeight: 'bold', fontSize: 14 }}>Kierra Franci</Text>
//                     <Text style={{ color: '#555', fontSize: 12, marginTop: 2 }}>50 minutes ago</Text>
//                   </View>
//                   <TouchableOpacity onPress={() => {router.push("/details")}}>
//                     <View style={{marginTop: 20,backgroundColor: '#E72929',borderRadius: 20,paddingVertical: 4,paddingHorizontal: 8,}}>
//                       <Text style={{ color: 'white', fontSize: 12 }}>View Details</Text>
//                     </View>
//                   </TouchableOpacity>
//                   <Text style={{ color: '#000', fontWeight: 'bold', fontSize: 14 ,marginRight:15}}>O+</Text>
//                 </View>
//             </View>

//             <View className = "w-full mt-5 bg-secondary h-[1px]" style={{ backgroundColor: "#ccc" }}/>

//             <View style={{flexDirection: 'row',alignItems: 'center',justifyContent: 'space-around'}}>
//               <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//                 <Feather name="share-2" size={16} color="#000" />
//                 <Text style={{ marginLeft: 6, color: '#000', fontSize: 13 }}>Share</Text>
//               </View>
//               <View style={{width: 1,height: 40, backgroundColor: '#ccc',alignSelf: 'center'}} />
//               <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//                   <Feather name="check-circle" size={16} color="#000" />
//                   <Text style={{ marginLeft: 6, color: '#000', fontSize: 13 }}>Accept</Text>
//               </View>
//             </View>
//         </View>

//         <View 
//           style={{height: 135,marginTop: 15,marginHorizontal: 20,backgroundColor: 'white',borderRadius: 20,padding: 10,shadowColor: '#000'
//             ,shadowOffset: { width: 0, height: 1 },shadowOpacity: 0.1,shadowRadius: 2,elevation: 2,}}>
//             <View style={{ flexDirection: 'row', alignItems: 'center' }}>          
//                 <Image source={require('../../assets/images/image1.png')} style={{width: 42,height: 42,borderRadius: 21,margin:10,}}/>
//                 <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', flex: 1 }}>
//                   <View style={{ flex: 1 ,marginLeft:5}}>
//                     <Text style={{ color: '#000', fontWeight: 'bold', fontSize: 14 }}>Kierra Franci</Text>
//                     <Text style={{ color: '#555', fontSize: 12, marginTop: 2 }}>50 minutes ago</Text>
//                   </View>
//                   <TouchableOpacity onPress={() => {router.push("/details")}}>
//                     <View style={{marginTop: 20,backgroundColor: '#E72929',borderRadius: 20,paddingVertical: 4,paddingHorizontal: 8,}}>
//                       <Text style={{ color: 'white', fontSize: 12 }}>View Details</Text>
//                     </View>
//                   </TouchableOpacity>
//                   <Text style={{ color: '#000', fontWeight: 'bold', fontSize: 14 ,marginRight:15}}>O+</Text>
//                 </View>
//             </View>

//             <View className = "w-full mt-5 bg-secondary h-[1px]" style={{ backgroundColor: "#ccc" }}/>

//             <View style={{flexDirection: 'row',alignItems: 'center',justifyContent: 'space-around'}}>
//               <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//                 <Feather name="share-2" size={16} color="#000" />
//                 <Text style={{ marginLeft: 6, color: '#000', fontSize: 13 }}>Share</Text>
//               </View>
//               <View style={{width: 1,height: 40, backgroundColor: '#ccc',alignSelf: 'center'}} />
//               <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//                   <Feather name="check-circle" size={16} color="#000" />
//                   <Text style={{ marginLeft: 6, color: '#000', fontSize: 13 }}>Accept</Text>
//               </View>
//             </View>
//         </View>

//         <View 
//           style={{height: 135,marginTop: 15,marginHorizontal: 20,backgroundColor: 'white',borderRadius: 20,padding: 10,shadowColor: '#000'
//             ,shadowOffset: { width: 0, height: 1 },shadowOpacity: 0.1,shadowRadius: 2,elevation: 2,}}>
//             <View style={{ flexDirection: 'row', alignItems: 'center' }}>          
//                 <Image source={require('../../assets/images/image1.png')} style={{width: 42,height: 42,borderRadius: 21,margin:10,}}/>
//                 <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', flex: 1 }}>
//                   <View style={{ flex: 1 ,marginLeft:5}}>
//                     <Text style={{ color: '#000', fontWeight: 'bold', fontSize: 14 }}>Kierra Franci</Text>
//                     <Text style={{ color: '#555', fontSize: 12, marginTop: 2 }}>50 minutes ago</Text>
//                   </View>
//                   <TouchableOpacity onPress={() => {router.push("/details")}}>
//                     <View style={{marginTop: 20,backgroundColor: '#E72929',borderRadius: 20,paddingVertical: 4,paddingHorizontal: 8,}}>
//                       <Text style={{ color: 'white', fontSize: 12 }}>View Details</Text>
//                     </View>
//                   </TouchableOpacity>
//                   <Text style={{ color: '#000', fontWeight: 'bold', fontSize: 14 ,marginRight:15}}>O+</Text>
//                 </View>
//             </View>

//             <View className = "w-full mt-5 bg-secondary h-[1px]" style={{ backgroundColor: "#ccc" }}/>

//             <View style={{flexDirection: 'row',alignItems: 'center',justifyContent: 'space-around'}}>
//               <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//                 <Feather name="share-2" size={16} color="#000" />
//                 <Text style={{ marginLeft: 6, color: '#000', fontSize: 13 }}>Share</Text>
//               </View>
//               <View style={{width: 1,height: 40, backgroundColor: '#ccc',alignSelf: 'center'}} />
//               <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//                   <Feather name="check-circle" size={16} color="#000" />
//                   <Text style={{ marginLeft: 6, color: '#000', fontSize: 13 }}>Accept</Text>
//               </View>
//             </View>
//         </View>

//       </ScrollView>
//     </SafeAreaView>
//   );
// }
import { Text, View, SafeAreaView, ScrollView, Dimensions, Image, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import { Feather } from '@expo/vector-icons';
import { Link, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

type NotificationItem = {
  _id: string;
  title: string;
  timestamp?: string;
  requestId?: {
    _id?: string;
    hospitalId?: {
      profilePicture?: string;
      hospitalName?: string;
    };
  };
  bloodType?: string;
  status?: 'accepted' | 'declined' | 'pending'; // Added status property
  // Add other fields as needed
};

export default function Notification() {
  const { width } = Dimensions.get("window");
  const router = useRouter();
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [loading, setLoading] = useState(true);


const fetchNotifications = async () => {
    try {
      const storedUserId = await AsyncStorage.getItem("userId");
        console.log(" Loaded userId from storage:", storedUserId);
      if (!storedUserId) {
        console.error("No user ID found in storage.");
        return;
      }

      const res = await axios.get(`http://192.168.151.203:5000/api/notifications/user/${storedUserId}`);
      setNotifications(res.data);
      console.log("Incoming Notifications:",res.data)
    } catch (err) {
      console.error("Failed to fetch notifications:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
  fetchNotifications();
}, []);

const handleResponse = async (notificationId: string, status: 'accepted' | 'declined') => {
  try {
    const userId = await AsyncStorage.getItem("userId");
    await axios.post(`http://192.168.151.203:5000/api/notifications/respond/${notificationId}`, {
      status,
      donorId: userId,
    });
    Alert.alert(
      "Response Submitted",
      `You have ${status} the request.`,
      [
        {
          text:"OK",
          onPress:()=>{
            fetchNotifications();
          }
        }
      ]
    
    );
    // Refresh the notification list if needed
  } catch (err) {
    console.error(`Error while ${status} the request`, err);
    Alert.alert("Error", "Something went wrong. Try again.");
  }
};



  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 150 }}>
        <View style={{ width: '100%', height: 140, backgroundColor: '#E72929' }}>
          <View style={{ marginTop: 50, marginLeft: 10, paddingHorizontal: 20 }}>
            <Text style={{ color: "white", fontSize: 24, fontWeight: "bold" }}>Notifications</Text>
            <Text style={{ color: "white", fontSize: 14, marginTop: 5 }}>
              See received blood requests
            </Text>
          </View>
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#E72929" style={{ marginTop: 40 }} />
        ) : notifications.length === 0 ? (
          <Text style={{ textAlign: 'center', marginTop: 40, color: '#333' }}>No notifications yet.</Text>
        ) : (
          notifications.map((item, index) => (
            
            <View
              key={item._id}
              style={{
                height: 135,
                marginTop: 30,
                marginHorizontal: 20,
                backgroundColor: 'white',
                borderRadius: 20,
                padding: 10,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.1,
                shadowRadius: 2,
                elevation: 2,
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {item?.requestId?.hospitalId?.profilePicture ? (
  <Image
    source={{ uri: `http://192.168.151.203:5000${item.requestId.hospitalId.profilePicture}` }}
    style={{ width: 42, height: 42, borderRadius: 21, margin: 10 }}
  />
) : (
  <View
    style={{
      width: 42,
      height: 42,
      borderRadius: 21,
      margin: 10,
      backgroundColor: "#e0e0e0", // light gray background
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <Feather name="user" size={22} color="#555" />
  </View>
)}

                {/* <Image source={require('../../assets/images/image1.png')} style={{ width: 42, height: 42, borderRadius: 21, margin: 10 }} /> */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', flex: 1 }}>
                  <View style={{ flex: 1, marginLeft: 5 }}>
                    <Text style={{ color: '#000', fontWeight: 'bold', fontSize: 14 }}>{item.title}</Text>
                    <Text style={{ color: '#555', fontSize: 12, marginTop: 2 }}>{item.timestamp || "Just now"}</Text>
                  </View>
                  <TouchableOpacity onPress={() => { router.push({
                   pathname: "/details",
                     params: {
                     id: item.requestId?._id,
                     message: item.title,
                       }, 
                  } ) 
                
                }}>
                    <View style={{ marginTop: 20, backgroundColor: '#E72929', borderRadius: 20, paddingVertical: 4, paddingHorizontal: 8 }}>
                      <Text style={{ color: 'white', fontSize: 12 }}>View Details</Text>
                    </View>
                  </TouchableOpacity>
                  <Text style={{ color: '#000', fontWeight: 'bold', fontSize: 14, marginRight: 15 }}>{item.bloodType}</Text>
                </View>
              </View>

              <View style={{ backgroundColor: "#ccc", height: 1, marginTop: 10 }} />

              {/* <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', marginTop: 10 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Feather name="x-circle" size={16} color="#000" />
                  <Text style={{ marginLeft: 6, color: '#000', fontSize: 13 }}>Decline</Text>
                </View>
                <View style={{ width: 1, height: 40, backgroundColor: '#ccc', alignSelf: 'center' }} />
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Feather name="check-circle" size={16} color="#000" />
                  <Text style={{ marginLeft: 6, color: '#000', fontSize: 13 }}>Accept</Text>
                </View>
              </View> */}

              {/* <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 10 }}>
  <TouchableOpacity onPress={() => handleResponse(item._id, 'declined')}>
    <Feather name="x-circle" size={16} color="#E72929" />
    <Text style={{ marginLeft: 6, color: '#E72929', fontSize: 13 }}>Decline</Text>
  </TouchableOpacity>

  <TouchableOpacity onPress={() => handleResponse(item._id, 'accepted')}>
    <Feather name="check-circle" size={16} color="green" />
    <Text style={{ marginLeft: 6, color: 'green', fontSize: 13 }}>Accept</Text>
  </TouchableOpacity>
</View> */}
<View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 10 }}>
  <TouchableOpacity
    disabled={item.status === 'accepted' || item.status === 'declined'}
    onPress={() => handleResponse(item._id, 'declined')}
  >
    <Feather name="x-circle" size={16} color={item.status === 'declined' ? "#999" : "#E72929"} />
    <Text style={{
      marginLeft: 6,
      color: item.status === 'declined' ? "#999" : "#E72929",
      fontSize: 13
    }}>
      {item.status === 'declined' ? "Declined" : "Decline"}
    </Text>
  </TouchableOpacity>

  <TouchableOpacity
    disabled={item.status === 'accepted' || item.status === 'declined'}
    onPress={() => handleResponse(item._id, 'accepted')}
  >
    <Feather name="check-circle" size={16} color={item.status === 'accepted' ? "#999" : "green"} />
    <Text style={{
      marginLeft: 6,
      color: item.status === 'accepted' ? "#999" : "green",
      fontSize: 13
    }}>
      {item.status === 'accepted' ? "Accepted" : "Accept"}
    </Text>
  </TouchableOpacity>
</View>



            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
