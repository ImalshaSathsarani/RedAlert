// import { Slot, Stack } from "expo-router";
// import { useFonts } from "expo-font";
// import { Poppins_400Regular, Poppins_700Bold } from '@expo-google-fonts/poppins';
// import './globals.css';
// import { EligibilityProvider } from "../contexts/EligibilityContext";

// export default function RootLayout() {

//    const [fontsLoaded] = useFonts({
//     Poppins_400Regular,
//     Poppins_700Bold,
//   });

//   if (!fontsLoaded) {
//     return null; // or <AppLoading />
//   }


//   return (
//   <EligibilityProvider> 
//     <Stack>
//     <Stack.Screen name ="index" options={{title:"Welcome",headerShown:false}}/>
          
//      <Stack.Screen
//       name = "(tabs)"
//       options ={{
//         headerShown: false,
//       }} 
//       />

//        <Stack.Screen
//       name = "profile/editProfile"
//       options ={{
//         headerShown: false,
//       }} 
//       />

//        <Stack.Screen
//       name = "profile/changePassword"
//       options ={{
//         headerShown: false,
//       }} 
//       />

//        <Stack.Screen
//       name = "profile/getHelp"
//       options ={{
//         headerShown: false,
//       }} 
//       />

//        <Stack.Screen
//       name = "donorLogin"
//       options ={{
//         headerShown: false,
//       }} 
//       />

//        <Stack.Screen
//       name = "donorRegister"
//       options ={{
//         headerShown: false,
//       }} 
//       />

//        <Stack.Screen
//       name = "eligibilityForm/eligibilityOne"
//       options ={{
//         headerShown: false,
//       }} 
//       />

//       <Stack.Screen
//       name = "eligibilityForm/eligibilityTwo"
//       options ={{
//         headerShown: false,
//       }} 
//       />

//       <Stack.Screen
//       name = "eligibilityForm/eligibilityThree"
//       options ={{
//         headerShown: false,
//       }} 
//       />

//       <Stack.Screen
//       name = "eligibilityForm/eligibilityFour"
//       options ={{
//         headerShown: false,
//       }} 
//       />

//       <Stack.Screen
//       name = "eligibilityForm/eligibilityFive"
//       options ={{
//         headerShown: false,
//       }} 
//       />

//       <Stack.Screen
//       name = "eligibilityForm/eligibilitySix"
//       options ={{
//         headerShown: false,
//       }} 
//       />

//       <Stack.Screen
//       name = "eligibilityForm/eligibilitySeven"
//       options ={{
//         headerShown: false,
//       }} 
//       />

//       <Stack.Screen
//       name = "eligibilityForm/eligible"
//       options ={{
//         headerShown: false,
//       }} 
//       />

//       <Stack.Screen
//       name = "eligibilityForm/notEligible"
//       options ={{
//         headerShown: false,
//       }} 
//       />
      

//   </Stack>
//   </EligibilityProvider>
//   );
// }

import { Slot, Stack } from "expo-router";
import { useFonts } from "expo-font";
import { Poppins_400Regular, Poppins_700Bold } from '@expo-google-fonts/poppins';
import './globals.css';
import { EligibilityProvider } from "../contexts/EligibilityContext";

import { useEffect } from "react";
import { Alert } from "react-native";
import io from "socket.io-client";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSocket } from "@/hooks/useSocket";
import Toast from "react-native-toast-message";
import { toastConfig } from "@/toastConfig";
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform } from 'react-native';
import { registerForPushNotificationsAsync } from "@/utils/notification";
//import {navigationRef } from "../navigationRef";
import { NavigationContainer } from "@react-navigation/native";


Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});






export default function RootLayout() {

  useSocket();
  useEffect(() => {
  registerForPushNotificationsAsync().then(async token => {
    if (token) {
      const user = await AsyncStorage.getItem("user");
      const userId = user ? JSON.parse(user)._id : null;

      if (userId) {
        // Send token to backend
        fetch('http://192.168.154.203/api/notifications/save-push-token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId, expoPushToken: token }),
        });
      }
    }
  });
}, []);


  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
  });

//   useEffect(() => {
//     const getLoggedInUserId = async () => {
//          const user = await AsyncStorage.getItem("user");
//          return user ? JSON.parse(user)._id : null;
// };
//     const userId = getLoggedInUserId(); 

//     if (userId) {
//       socket.emit("register", userId);

//       socket.on("notification", (data) => {
//         Alert.alert(data.title, data.message); // Show real-time popup
//       });
//     }

//     return () => {
//       socket.disconnect();
//     };
//   }, []);
// useEffect(() => {
//   const setupSocket = async () => {
//     const user = await AsyncStorage.getItem("user");
//     const userId = user ? JSON.parse(user)._id : null;

//     if (userId) {
//        console.log("🔌 Connecting to Socket.IO...");
//       socket.emit("register", userId);
//       console.log("📨 Registered userId:", userId);

//       socket.on("notification", (data) => {
//         console.log("📥 Notification received:", data);
//         Alert.alert(data.title, data.message);
//       });

      
//     }
//   };

//   setupSocket();

//   return () => {
//     socket.disconnect();
//     console.log("🛑 Socket disconnected");
//   };
// }, []);
// const testUserId = "687cab0974c37b49a710ef44"; 
// useEffect(() => {
//   let socket: any;

//   const setupSocket = async () => {
//     const user = await AsyncStorage.getItem("user");
//     const userId = user ? JSON.parse(user)._id : null;

//      if (!userId) {
//         console.log("❌ No user found in AsyncStorage.");
//         return;
//       }
    
    
//     if (userId) {
//       socket = io("http://192.168.1.100:8000", {
//         transports: ['websocket'], // Enforce websocket for stability
//         reconnection: true
//       });

//       socket.on("connect", () => {
//         console.log("✅ Socket connected:", socket.id);
//         socket.emit("register", testUserId);
//       });

//       socket.on("notification", (data: { title: string; message: string }) => {
//         console.log("📥 Notification received:", data);
//         Alert.alert(data.title, data.message);
//       });

//       socket.on("disconnect", () => {
//         console.log("🛑 Socket disconnected");
//       });

//       socket.on("connect_error", (err: unknown) => {
//         console.error("❌ Connection error:", err);
//       });
//     }
//   };

//   setupSocket();

//   return () => {
//     if (socket) socket.disconnect();
//   };
// }, []);



  if (!fontsLoaded) {
    return null;
  }

  return (
  
    <EligibilityProvider>
      <Stack>
        <Stack.Screen name="index" options={{ title: "Welcome", headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="profile/editProfile" options={{ headerShown: false }} />
        <Stack.Screen name="profile/changePassword" options={{ headerShown: false }} />
        <Stack.Screen name="profile/getHelp" options={{ headerShown: false }} />
        <Stack.Screen name="donorLogin" options={{ headerShown: false }} />
        <Stack.Screen name="donorRegister" options={{ headerShown: false }} />
        <Stack.Screen name="eligibilityForm/eligibilityOne" options={{ headerShown: false }} />
        <Stack.Screen name="eligibilityForm/eligibilityTwo" options={{ headerShown: false }} />
        <Stack.Screen name="eligibilityForm/eligibilityThree" options={{ headerShown: false }} />
        <Stack.Screen name="eligibilityForm/eligibilityFour" options={{ headerShown: false }} />
        <Stack.Screen name="eligibilityForm/eligibilityFive" options={{ headerShown: false }} />
        <Stack.Screen name="eligibilityForm/eligibilitySix" options={{ headerShown: false }} />
        <Stack.Screen name="eligibilityForm/eligibilitySeven" options={{ headerShown: false }} />
        <Stack.Screen name="eligibilityForm/eligible" options={{ headerShown: false }} />
        <Stack.Screen name="eligibilityForm/notEligible" options={{ headerShown: false }} />
      </Stack>
      <Toast config={toastConfig}/>
    </EligibilityProvider>
   
  );
}
