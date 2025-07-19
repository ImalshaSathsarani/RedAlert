import { Text, TextInput, View, Image, TouchableOpacity } from "react-native";
import { Link, useRouter } from "expo-router";
import Icon from "react-native-vector-icons/FontAwesome";
import bloodbanner from "../../assets/images/bloodbanner.png";
import image1 from "../../assets/images/image1.png";
import { Feather } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useState, useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const [userName, setUserName] = useState('');
  const [profileImage, setProfileImage] = useState<string | null>(null);

  useEffect(() => {
    const loadProfileImage = async () => {
      try {
        // Try to load image URL from backend first
        const imageUrl = await AsyncStorage.getItem('userProfileImageUrl');
        if (imageUrl) {
          setProfileImage(imageUrl);
          return;
        }

        // Fallback to local image if no backend URL
        const localImage = await AsyncStorage.getItem('userProfileImage');
        if (localImage) {
          setProfileImage(localImage);
        }
      } catch (error) {
        console.error('Error loading profile image:', error);
      }
    };
    loadProfileImage();
  }, []);

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) return;

        const response = await axios.get(
          `http://192.168.93.76:5000/api/donor/profile/me`,
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
        );
        setUserName(response.data.name || 'Donor');
      } catch (error) {
        console.error('Error fetching user name:', error);
      }
    };

    fetchUserName();
  }, []);

  const [search, setSearch] = useState("")


  return (
    <View>
      <View
        style={{
          width: "100%",
          height: 350,
          backgroundColor: "#E72929",
          borderBottomLeftRadius: 50,
          borderBottomRightRadius: 50,
        }}
      >
        <View
          style={{
            position: "absolute",
            backgroundColor: "#FDE047",
            top: 40,
            left: 60,
            borderRadius: 30,
            width: 60,
            height: 60,
            alignSelf: "center",
            transform: [{ translateX: -0.5 * 60 }],
            overflow: "hidden", // Ensures the image fits the circular shape
          }}
        >
          <TouchableOpacity
            onPress={() => router.push('/profile')}
            style={{
              width: "100%",
              height: "100%",
            }}
          >
            {profileImage ? (
              <Image
                source={{ uri: profileImage }}
                style={{
                  width: "100%",
                  height: "100%",
                }}
                resizeMode="cover"
              />
            ) : (
              <Image
                source={{ uri: 'https://example.com/default-profile-image.jpg' }} 
                style={{
                  width: "100%",
                  height: "100%",
                }}
                resizeMode="cover"
              />
            )}
          </TouchableOpacity>
        </View>
        <Text className="font-semibold top-[54px] left-[110px] text-lg">
          Hey {userName}
        </Text>

        <View className="absolute bg-white top-[55px] left-[280px] rounded-full w-[37px] h-[37px] justify-center items-center">
          <Icon name="bell" size={20} color="#000000" />
        </View>
        <View className="absolute bg-white top-[55px] left-[340px] rounded-full w-[37px] h-[37px] justify-center items-center">
          <Icon name="plus" size={20} color="#000000" />
        </View>
        <View className="items-center justify-center absolute w-[330px] bg-white top-[130px] left-1/2 -translate-x-1/2 h-[135px] z-10 rounded-3xl">
          <Image
            source={bloodbanner}
            style={{ width: "100%", height: "100%", borderRadius: 20 }}
            resizeMode="cover"
          />
        </View>
        <View className="flex-row items-center justify-between absolute w-[330px] bg-white top-[280px] left-1/2 -translate-x-1/2 h-[45px] z-10 rounded-3xl px-4">
          <TextInput
            className="flex-1 font-semibold text-md"
            placeholder="Find donor..."
            style={{ paddingRight: 36 }}
            value={search}
            onChangeText={setSearch}
          />
          <Icon name="search" size={20} color="#000000" />
        </View>
      </View>

      <View>
        <View className="flex-row items-center justify-between mt-6 px-6">
          <Text className="font-bold text-xl">Emergency Blood</Text>
          <Text className="font-bold text-md">View All</Text>
        </View>
        <View className="items-center justify-center absolute w-[360px] bg-white top-[70px] left-1/2 -translate-x-1/2 h-[135px] z-10 rounded-3xl">
          {/* Add content here to make it visible */}
        </View>
      </View>
    </View>
  );
}
