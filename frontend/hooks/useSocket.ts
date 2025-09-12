// hooks/useSocket.ts
import { useEffect, useRef } from "react";
import { Alert } from "react-native";
import io from "socket.io-client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
//import { navigate } from "@/navigationRef";

export const useSocket = () => {
  const socketRef = useRef<any>(null);

  useEffect(() => {
    const setupSocket = async () => {
      const user = await AsyncStorage.getItem("user");
      const userId = user ? JSON.parse(user)._id : await AsyncStorage.getItem("userId");

      if (!userId) {
        console.log("❌ No user found in AsyncStorage.");
        return;
      }

      socketRef.current = io("http://192.168.151.203:8000", {
        transports: ["websocket"],
        reconnection: true,
      });

      socketRef.current.on("connect", () => {
        console.log("✅ Socket connected:", socketRef.current.id);
        socketRef.current.emit("register", userId);
      });

      socketRef.current.on("notification", (data: { title: string; message: string }) => {
        console.log("📥 Notification received:", data);
        // Alert.alert(data.title, data.message);
         Toast.show({
            type: 'bloodAlert', // can be 'success', 'error', 'info'
            text1: data.title,
            text2: data.message,
            position: 'top',
            visibilityTime: 4000, // 4 seconds
            topOffset: 50,
  //           onPress: () => {
  //   console.log("👆 Toast tapped, navigating to Notifications");
  //   navigate('DonorNotification'); // <-- screen name from your navigator
  // } // distance from top
          });
      });

      socketRef.current.on("disconnect", () => {
        console.log("🛑 Socket disconnected");
      });

      socketRef.current.on("connect_error", (err: unknown) => {
        console.error("❌ Connection error:", err);
      });
    };

    setupSocket();

    return () => {
      if (socketRef.current) socketRef.current.disconnect();
    };
  }, []);
};
