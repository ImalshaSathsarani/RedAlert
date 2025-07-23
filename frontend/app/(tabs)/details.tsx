// import { Text, View, SafeAreaView, ScrollView, Image,TouchableOpacity} from "react-native";
// import { Link ,useRouter} from "expo-router";
// import { useLocalSearchParams } from "expo-router";
// import { useEffect, useState } from "react";
// import axios from "axios";
// ; // this is your requestId


// export default function Details() {

//   const router = useRouter();
//   const { id } = useLocalSearchParams();
//   const [requestDetails, setRequestDetails] = useState(null);

  
// useEffect(() => {
//   const fetchRequestDetails = async () => {
//     try {
//       const res = await axios.get(`http://192.168.1.100:5000/api/requests/${id}`);
//       setRequestDetails(res.data);
//     } catch (err) {
//       console.error("Error fetching request details:", err);
//     }
//   };

//   if (id) fetchRequestDetails();
// }, [id]);

//   return (
//     <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
//           <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
            
//             <View style={{ width: '100%', height: 120, backgroundColor: '#E72929' }}>
//               <View style={{ marginTop: 50, paddingHorizontal: 20 }}>
//                 <Text style={{ color: "white", fontSize: 24, fontWeight: "bold" }}>Details Information</Text>
//               </View>
//             </View>

//             <TouchableOpacity
//           style={{
//             position: 'absolute',
//             top: 130,
//             right: 20,
//             zIndex: 1,
//             backgroundColor: '#fff',
//             borderRadius: 20,
//             width: 30,
//             height: 30,
//             justifyContent: 'center',
//             alignItems: 'center',
//             shadowColor: '#000',
//             shadowOffset: { width: 0, height: 2 },
//             shadowOpacity: 0.25,
//             shadowRadius: 3.84,
//             elevation: 5,
//             margin:20,
//           }}
//           onPress={() => {router.push("/notification")}}>
//           <Text style={{ fontSize: 16, color: '#E72929',fontWeight:'bold' }}>✕</Text>
//         </TouchableOpacity>
//             <View>
//             <Image
//               source={require('../../assets/images/image1.png')}
//               style={{
//                 width: 80,
//                 height: 80,
//                 borderRadius: 50,
//                 alignSelf: 'center',
//                 marginTop: 60,
//                 marginBottom: 20,
//               }}
//             />   
//             </View> 

//             <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 10 }}>
//               <View style={{ width: '100%', maxWidth: 300 }}>
//                 <View style={{flexDirection: 'row',borderWidth: 1,borderColor: '#FFE2E2',borderRadius: 10, padding: 10,marginLeft:30,marginRight:30,backgroundColor: '#FFE2E2',height:40,marginTop:15}}>
//                   <Text style={{ fontWeight: 'bold', fontSize:16,marginLeft: 30 }}>Message : </Text>
//                   <Text style={{fontSize:16 }}>Eligible</Text>
//                 </View>
//                 <View style={{flexDirection: 'row',borderWidth: 1,borderColor: '#FFE2E2',borderRadius: 10, padding: 10,marginLeft:30,marginRight:30,backgroundColor: '#FFE2E2',height:40,marginTop:15}}>
//                   <Text style={{ fontWeight: 'bold', fontSize:16,marginLeft: 30 }}>Hospital Name : </Text>
//                   <Text style={{fontSize:16 }}> Abc</Text>
//                 </View>
//                 <View style={{flexDirection: 'row',borderWidth: 1,borderColor: '#FFE2E2',borderRadius: 10, padding: 10,marginLeft:30,marginRight:30,backgroundColor: '#FFE2E2',height:40,marginTop:15}}>
//                   <Text style={{ fontWeight: 'bold', fontSize:16 ,marginLeft: 30}}>Address : </Text>
//                   <Text style={{fontSize:16 }}>Xyz Road</Text>
//                 </View>
//                 <View style={{flexDirection: 'row',borderWidth: 1,borderColor: '#FFE2E2',borderRadius: 10, padding: 10,marginLeft:30,marginRight:30,backgroundColor: '#FFE2E2',height:40,marginTop:15}}>
//                   <Text style={{ fontWeight: 'bold', fontSize:16,marginLeft: 30 }}>Mobile No : </Text>
//                   <Text style={{fontSize:16 }}>0123456789</Text>
//                 </View>
//                  <View style={{flexDirection: 'row',borderWidth: 1,borderColor: '#FFE2E2',borderRadius: 10, padding: 10,marginLeft:30,marginRight:30,backgroundColor: '#FFE2E2',height:40,marginTop:15}}>
//                   <Text style={{ fontWeight: 'bold', fontSize:16,marginLeft: 30 }}>Patient Name : </Text>
//                   <Text style={{fontSize:16 }}> Abc</Text>
//                 </View>
//                  <View style={{flexDirection: 'row',borderWidth: 1,borderColor: '#FFE2E2',borderRadius: 10, padding: 10,marginLeft:30,marginRight:30,backgroundColor: '#FFE2E2',height:40,marginTop:15}}>
//                   <Text style={{ fontWeight: 'bold', fontSize:16,marginLeft: 30 }}>Blood Type : </Text>
//                   <Text style={{fontSize:16 }}> A+</Text>
//                 </View>
//               </View>
//             </View>

//           </ScrollView>
//     </SafeAreaView>
//   );
// }

// import { Text, View, SafeAreaView, ScrollView, Image, TouchableOpacity, ActivityIndicator } from "react-native";
// import { useRouter, useLocalSearchParams } from "expo-router";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { Feather } from "@expo/vector-icons";
// import type { ViewStyle, FlexAlignType } from "react-native";

// export default function Details() {
//   const router = useRouter();
//   const { id, message } = useLocalSearchParams();
//   const [requestDetails, setRequestDetails] = useState<any>(null);
//   const [loading, setLoading] = useState(true);

//   const typedMessage = typeof message === "string" ? message : "Donate your blood";

  
//   useEffect(() => {
//     const fetchRequestDetails = async () => {
//       try {
//         const res = await axios.get(`http://192.168.1.100:5000/api/requests/${id}`);
//         setRequestDetails(res.data);
//       } catch (err) {
//         console.error("Error fetching request details:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (id) fetchRequestDetails();
//   }, [id]);

  

//   const commonBoxStyle: ViewStyle = {
//     flexDirection: "row",
//     borderWidth: 1,
//     borderColor: "#FFE2E2",
//     borderRadius: 10,
//     padding: 10,
//     marginHorizontal: 30,
//     backgroundColor: "#FFE2E2",
//     height: 40,
//     marginTop: 15,
//     alignItems: "center" as FlexAlignType,
//   };

//   return (
//     <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
//       <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
//         {/* Header */}
//         <View style={{ width: "100%", height: 120, backgroundColor: "#E72929" }}>
//           <View style={{ marginTop: 50, paddingHorizontal: 20 }}>
//             <Text style={{ color: "white", fontSize: 24, fontWeight: "bold" }}>Details Information</Text>
//           </View>
//         </View>

//         {/* Close Button */}
//         <TouchableOpacity
//           style={{
//             position: "absolute",
//             top: 130,
//             right: 20,
//             zIndex: 1,
//             backgroundColor: "#fff",
//             borderRadius: 20,
//             width: 30,
//             height: 30,
//             justifyContent: "center",
//             alignItems: "center",
//             shadowColor: "#000",
//             shadowOffset: { width: 0, height: 2 },
//             shadowOpacity: 0.25,
//             shadowRadius: 3.84,
//             elevation: 5,
//             margin: 20,
//           }}
//           onPress={() => {
//             router.push("/notification");
//           }}
//         >
//           <Text style={{ fontSize: 16, color: "#E72929", fontWeight: "bold" }}>✕</Text>
//         </TouchableOpacity>

//         {/* Loading */}
//         {loading ? (
//           <ActivityIndicator size="large" color="#E72929" style={{ marginTop: 40 }} />
//         ) : (
//           <>
//             {/* Profile Picture */}
//             <View>
//               {requestDetails?.hospitalId?.profilePicture ? (
//                 <Image
//                   source={{ uri: `http://192.168.1.100:5000${requestDetails.hospitalId.profilePicture}` }}
//                   style={{
//                     width: 80,
//                     height: 80,
//                     borderRadius: 50,
//                     alignSelf: "center",
//                     marginTop: 60,
//                     marginBottom: 20,
//                   }}
//                 />
//               ) : (
//                 <View
//                   style={{
//                     width: 80,
//                     height: 80,
//                     borderRadius: 50,
//                     backgroundColor: "#ccc",
//                     alignSelf: "center",
//                     justifyContent: "center",
//                     alignItems: "center",
//                     marginTop: 60,
//                     marginBottom: 20,
//                   }}
//                 >
//                   <Feather name="user" size={32} color="#fff" />
//                 </View>
//               )}
//             </View>

//             {/* Details */}
//             <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 10 }}>
//               <View style={{ width: "100%", maxWidth: 300 }}>
//                 <View style={commonBoxStyle}>
//   <Text style={{ fontWeight: "bold", fontSize: 16, marginLeft: 10 }}>Message: </Text>
//   <Text style={{ fontSize: 16 }}>{typedMessage}</Text>
// </View>

//                 <View style={commonBoxStyle}>
//                   <Text style={{ fontWeight: "bold", fontSize: 16, marginLeft: 10 }}>Hospital Name: </Text>
//                   <Text style={{ fontSize: 16 }}>{requestDetails?.hospitalId?.hospitalName || "N/A"}</Text>
//                 </View>
//                 <View style={commonBoxStyle}>
//                   <Text style={{ fontWeight: "bold", fontSize: 16, marginLeft: 10 }}>Address: </Text>
//                   <Text style={{ fontSize: 16 }}>{requestDetails?.hospitalId?.address || "N/A"}</Text>
//                 </View>
//                 <View style={commonBoxStyle}>
//                   <Text style={{ fontWeight: "bold", fontSize: 16, marginLeft: 10 }}>Mobile No: </Text>
//                   <Text style={{ fontSize: 16 }}>{requestDetails?.emergencyPhone || "N/A"}</Text>
//                 </View>
//                 <View style={commonBoxStyle}>
//                   <Text style={{ fontWeight: "bold", fontSize: 16, marginLeft: 10 }}>Patient Name: </Text>
//                   <Text style={{ fontSize: 16 }}>{requestDetails?.patientName || "N/A"}</Text>
//                 </View>
//                 <View style={commonBoxStyle}>
//                   <Text style={{ fontWeight: "bold", fontSize: 16, marginLeft: 10 }}>Blood Type: </Text>
//                   <Text style={{ fontSize: 16 }}>{requestDetails?.bloodType || "N/A"}</Text>
//                 </View>
//                 <View style={commonBoxStyle}>
//                   <Text style={{ fontWeight: "bold", fontSize: 16, marginLeft: 10 }}>Request Date: </Text>
//                   <Text style={{ fontSize: 16 }}>{requestDetails?.requestDate.slice(0, 10) || "N/A"}</Text>
//                 </View>
//                 <View style={{flexDirection: "row",
//     borderWidth: 1,
//     borderColor: "#FFE2E2",
//     borderRadius: 10,
//     padding: 10,
//     marginHorizontal: 30,
//     backgroundColor: "#FFE2E2",
//     height: 40,
//     marginTop: 15,
//     alignItems: "center" as FlexAlignType,
//     marginBottom: 100}}>
//                   <Text style={{ fontWeight: "bold", fontSize: 16, marginLeft: 10 }}>Request Time: </Text>
//                   <Text style={{ fontSize: 16 }}>{requestDetails?.requestTime || "N/A"}</Text>
//                 </View>
//               </View>
//             </View>
//           </>
//         )}
//       </ScrollView>
//     </SafeAreaView>
//   );
// }


import { Text, View, SafeAreaView, ScrollView, Image, TouchableOpacity, ActivityIndicator } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import axios from "axios";
import { Feather } from "@expo/vector-icons";

export default function Details() {
  const router = useRouter();
  const { id, message } = useLocalSearchParams();
  const [requestDetails, setRequestDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const typedMessage = typeof message === "string" ? message : "Donate your blood";

  useEffect(() => {
    const fetchRequestDetails = async () => {
      try {
        const res = await axios.get(`http://192.168.238.203:5000/api/requests/${id}`);
        setRequestDetails(res.data);
      } catch (err) {
        console.error("Error fetching request details:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchRequestDetails();
  }, [id]);

  const InfoBox = ({ label, value }: { label: string; value: string }) => (
    <View
      style={{
        backgroundColor: "#FFE2E2",
        borderRadius: 12,
        padding: 12,
        marginVertical: 6,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 1,
      }}
    >
      <Text style={{ fontSize: 13, color: "#555", marginBottom: 4 }}>{label}</Text>
      <Text style={{ fontSize: 16, fontWeight: "600", color: "#222", flexWrap: "wrap" }}>
        {value || "N/A"}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 140, paddingHorizontal: 24,paddingTop:40 }}>
        {/* Header */}
        {/* <View style={{ width: "100%", height: 130, backgroundColor: "#E72929", justifyContent: "center", paddingLeft: 24 }}>
          <Text style={{ color: "white", fontSize: 24, fontWeight: "bold" }}>Blood Request Details</Text>
        </View> */}

        {/* Close Button */}
        <TouchableOpacity
          style={{
            position: "absolute",
            top: 40,
            right: 20,
            backgroundColor: "#fff",
            borderRadius: 20,
            width: 30,
            height: 30,
            justifyContent: "center",
            alignItems: "center",
            elevation: 5,
          }}
          onPress={() => router.push("/notification")}
        >
          <Text style={{ fontSize: 16, color: "#E72929", fontWeight: "bold" }}>✕</Text>
        </TouchableOpacity>

        {loading ? (
          <ActivityIndicator size="large" color="#E72929" style={{ marginTop: 50 }} />
        ) : (
          <>
            {/* Profile Picture */}
            <View style={{ alignItems: "center", marginTop: 30 }}>
              {requestDetails?.hospitalId?.profilePicture ? (
                <Image
                  source={{ uri: `http://192.168.1.100:5000${requestDetails.hospitalId.profilePicture}` }}
                  style={{ width: 90, height: 90, borderRadius: 45, marginBottom: 10 }}
                />
              ) : (
                <View
                  style={{
                    width: 90,
                    height: 90,
                    borderRadius: 45,
                    backgroundColor: "#ccc",
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: 10,
                  }}
                >
                  <Feather name="user" size={32} color="#fff" />
                </View>
              )}
              <Text style={{ fontSize: 18, fontWeight: "bold", color: "#333" }}>
                {requestDetails?.hospitalId?.hospitalName || "Hospital"}
              </Text>
            </View>

            {/* Information Cards */}
            <View style={{ marginTop: 20 }}>
              <InfoBox label="Message" value={typedMessage} />
              <InfoBox label="Hospital Name" value={requestDetails?.hospitalId?.hospitalName} />
              <InfoBox label="Address" value={requestDetails?.hospitalId?.address} />
              <InfoBox label="Mobile No." value={requestDetails?.emergencyPhone} />
              <InfoBox label="Patient Name" value={requestDetails?.patientName} />
              <InfoBox label="Blood Type" value={requestDetails?.bloodType} />
              <InfoBox label="Request Date" value={requestDetails?.requestDate?.slice(0, 10)} />
              <InfoBox label="Request Time" value={requestDetails?.requestTime} />
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

