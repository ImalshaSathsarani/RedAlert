import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const logout = async () => {
  try {
    // Clear all stored user data (like token, userId, etc.)
    await AsyncStorage.clear();

    // Optional: Show a message or toast
    console.log("🔓 User logged out successfully");

    // Redirect to login screen
    router.replace('/donorLogin');  // Make sure this route exists
  } catch (error) {
    console.error("Logout failed:", error);
  }
};
