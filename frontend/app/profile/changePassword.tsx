import { Feather } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { Dimensions, Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import api from '../../services/api';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get("window");

interface ChangePasswordState {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
  error: string | null;
  loading: boolean;
}

export default function ChangePassword() {
  const [state, setState] = useState<ChangePasswordState>({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    error: null,
    loading: false
  });

  const router = useRouter();

  const handleChange = (field: keyof Omit<ChangePasswordState, 'error' | 'loading'>) => 
    (text: string) => {
      setState(prev => ({ ...prev, [field]: text, error: null }));
    };

  const handleChangePassword = async () => {
    if (!state.currentPassword || !state.newPassword || !state.confirmPassword) {
      setState(prev => ({ ...prev, error: 'All fields are required' }));
      return;
    }

    if (state.newPassword !== state.confirmPassword) {
      setState(prev => ({ ...prev, error: 'New password and confirm password do not match' }));
      return;
    }

    setState(prev => ({ ...prev, loading: true }));

    try {
      // Get the token from AsyncStorage
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        setState(prev => ({ ...prev, error: 'Not authenticated', loading: false }));
        return;
      }

      console.log('Attempting to change password...');
      console.log('Current Password:', state.currentPassword);
      console.log('New Password:', state.newPassword);

      try {
        // Use the token in the Authorization header
        const response = await api.post('/api/auth/change-password', {
          currentPassword: state.currentPassword,
          newPassword: state.newPassword
        }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        console.log('API Response:', response.data);

        if (response.data.message === 'Password changed successfully') {
          // Clear the current password fields
          setState(prev => ({ 
            ...prev, 
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
            error: null,
            loading: false 
          }));
          
          // Show success message
          alert('Password changed successfully!');
          router.push('/profile');
        }
      } catch (err: any) {
        console.error('Error changing password:', err);
        setState(prev => ({ ...prev, error: err.response?.data?.message || 'Failed to change password', loading: false }));
      }
    } catch (err: any) {
      console.error('Error changing password:', err);
      setState(prev => ({ ...prev, error: 'Failed to change password', loading: false }));
    }
  };

  return (
    <View className="flex-1 bg-red-500">
      {/* Header */}
      <View className="flex-row justify-between items-center px-4 pt-12">
        <Link href="/profile" asChild>
          <TouchableOpacity>
            <Feather name="chevron-left" size={24} color="white" />
          </TouchableOpacity>
        </Link>

        <Text className="text-lg text-white font-semibold">Change Password</Text>

        <Link href="/profile/editProfile" asChild>
          <TouchableOpacity>
            <Feather name="edit" size={20} color="white" />
          </TouchableOpacity>
        </Link>
      </View>

      <Text className="text-center text-sm text-white mt-2">Eligible for Donate</Text>

      {/* Profile Image */}
      <View className="items-center mt-4">
        <View
          style={{
            width: width * 0.3,
            height: width * 0.3,
            borderRadius: width * 0.15,
            borderWidth: 2,
            borderColor: "white",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "white",
            overflow: "hidden",
            marginBottom: -40,
            zIndex: 10,
          }}
        >
          <Image
            source={require("../../assets/images/ProfileImg.jpg")}
            style={{
              width: width * 0.28,
              height: width * 0.28,
              borderRadius: width * 0.14,
            }}
          />
        </View>

        <Image
          source={require("../../assets/images/check.png")}
          style={{
            width: width * 0.07,
            height: width * 0.07,
            position: "absolute",
            top: 70,
            right: width / 2 - 20,
          }}
        />
      </View>

      {/* Bottom White Section */}
      <View className="bg-white rounded-t-3xl flex-1 mt-4 px-6 pt-16">
        <Text className="text-center text-lg font-bold">John Doe</Text>
        <Text className="text-center text-sm text-gray-400 mb-6">johndoe@example.com</Text>

        {/* Inputs */}
        <View className="mb-4">
          <TextInput
            secureTextEntry
            placeholder="Current Password"
            value={state.currentPassword}
            onChangeText={handleChange('currentPassword')}
            className="border border-gray-300 rounded-md p-3 mb-4"
            placeholderTextColor="#aaa"
          />

          <TextInput
            secureTextEntry
            placeholder="New Password"
            value={state.newPassword}
            onChangeText={handleChange('newPassword')}
            className="border border-gray-300 rounded-md p-3 mb-4"
            placeholderTextColor="#aaa"
          />

          <TextInput
            secureTextEntry
            placeholder="Confirm Password"
            value={state.confirmPassword}
            onChangeText={handleChange('confirmPassword')}
            className="border border-gray-300 rounded-md p-3 mb-4"
            placeholderTextColor="#aaa"
          />
        </View>

        {state.error && (
          <Text className="text-center text-red-500 text-sm mb-4">{state.error}</Text>
        )}

        <TouchableOpacity
          onPress={handleChangePassword}
          disabled={state.loading}
          style={{
            backgroundColor: '#E72929',
            borderRadius: 25,
            paddingVertical: 12,
            paddingHorizontal: 40,
            alignSelf: 'center',
            marginTop: 12,
          }}
        >
          <Text className="text-white text-lg">
            {state.loading ? 'Changing...' : 'Change'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
