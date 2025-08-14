import {
  Text,
  TextInput,
  View,
  
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from "react-native";
import { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import bloodbanner from "../../assets/images/bloodbanner.png";
import image1 from "../../assets/images/image1.png";
import homeBanner from "../../assets/images/HomeBanner.png" 
import api, { donationPostApi } from "../../services/api";

import { Link } from "expo-router";
import { logout } from "@/utils/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Feather } from "@expo/vector-icons";



type Hospital = {
  hospitalName?: string;
  name?: string;
  profilePicture?: string;
  email?: string;
};

type DonationPost = {
  createdAt: string;
  message: string;
  views: number;
  contactInfo: string;
  createdBy: {
    id: Hospital;
    model: string;
  };
};

const getFullProfilePicture = (pic?: string) => {
  if (!pic) return null;
  if (pic.startsWith("http")) return pic;
  return `http://192.168.8.198:5000${pic}`;
};

export default function Home() {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [posts, setPosts] = useState<DonationPost[]>([]);
  const [loading, setLoading] = useState(true);

  const [unreadCount, setUnreadCount] = useState(0);

  const [userName, setUserName] = useState("");


  
  useEffect(() => {
  const fetchUnreadNotifications = async () => {
    try {
      // const userData = await AsyncStorage.getItem("user");
      const userId = await AsyncStorage.getItem("userId");

      if (!userId) return;

      const res = await fetch(`http://192.168.154.203:8000/api/notifications/unread-count/${userId}`);
      const text = await res.text();  // fetch as text first
console.log("RAW RESPONSE:", text);

      const data = await res.json();
      setUnreadCount(data.unreadCount);
    } catch (err) {
      console.error("Failed to fetch unread count:", err);
    }
  };

  fetchUnreadNotifications();
}, []);
  
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        // First try to get the profile image from AsyncStorage
        const savedImage = await AsyncStorage.getItem('userProfileImage');
        if (savedImage) {
          setProfileImage(getFullProfilePicture(savedImage));
        }
        
        // Then fetch the latest profile data from the server
        const response = await api.get('/api/donor/profile/me');
        if (response.data) {
          setUserName(response.data.name || "User");
          
          // If we have a profile picture from the server, use it
          if (response.data.profilePicture) {
            const serverImage = getFullProfilePicture(response.data.profilePicture);
            setProfileImage(serverImage);
            // Update the local storage with the latest image
            await AsyncStorage.setItem('userProfileImage', response.data.profilePicture);
          }
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
        // If there's an error, we'll just use the locally saved image if available
      }
    };

    fetchUserProfile();
    
    const fetchPosts = async () => {
      try {
        const data = await donationPostApi.getAllPosts();
        setPosts(data);
      } catch (error) {
        console.error("Failed to load posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Filter posts based on search input (case insensitive)
  const filteredPosts = posts.filter((post) =>
    post.message.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#fff", paddingBottom:200 }}>
      {/* Top Red Section */}
      <View
        style={{
          width: "100%",
          height: 350,
          backgroundColor: "#E72929",
          borderBottomLeftRadius: 50,
          borderBottomRightRadius: 50,
        }}
      >
        {/* Profile Image */}
        <View
          style={{
            position: "absolute",
            backgroundColor: "#FDE047",
            top: 40,
            left: 45,
            borderRadius: 30,
            width: 60,
            height: 60,
            alignSelf: "center",
            transform: [{ translateX: -0.5 * 60 }],
            overflow: "hidden",
          }}
        >
          <TouchableOpacity>
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
              <View style={{
                width: "100%",
                height: "100%",
                backgroundColor: "#FDE047",
                justifyContent: "center",
                alignItems: "center"
              }}>
                <Text style={{ fontSize: 24, color: "#E72929", fontWeight: 'bold' }}>
                  {userName ? userName.charAt(0).toUpperCase() : 'U'}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
        
        <Text
          style={{
            fontWeight: "600",
            position: "absolute",
            top: 54,
            left: 90,
            fontSize: 18,
            color: "white",
          }}
        >
          Hey {userName || "User"}
        </Text>

        {/* Notification and Plus Icons */}
        <View
          style={{
            position: "absolute",
            backgroundColor: "white",
            top: 55,
            left: 260,
            borderRadius: 37 / 2,
            width: 37,
            height: 37,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
         <Link href = "/notification" asChild><Icon name="bell" size={20} color="#000000" /></Link> 
        </View>
        {/* <View
  style={{
    position: "absolute",
    top: 55,
    left: 260,
    width: 37,
    height: 37,
    justifyContent: "center",
    alignItems: "center",
  }}
>
  <Link href="/notification" asChild>
    <View style={{ position: "relative" }}>
      <Icon name="bell" size={20} color="#000000" />
      {unreadCount > 0 && (
        <View
          style={{
            position: "absolute",
            top: -5,
            right: -5,
            backgroundColor: "white",
            width: 10,
            height: 10,
            borderRadius: 5,
            borderWidth: 1,
            borderColor: "white",
          }}
        />
      )}
    </View>
  </Link>
</View> */}

        <TouchableOpacity onPress={logout}>
        <View
          style={{
            position: "absolute",
            backgroundColor: "white",
            top: 55,
            left: 310,
            borderRadius: 37 / 2,
            width: 37,
            height: 37,
            justifyContent: "center",
            alignItems: "center",
            
          }}
        >
          <Feather name="log-out" size={20} color="#000000" />
        </View>
        </TouchableOpacity>

        {/* Banner */}
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            width: 330,
            backgroundColor: "white",
            top: 115,
            left: "50%",
            marginLeft: -165, // to center horizontally (half width negative)
            height: 135,
            zIndex: 10,
            borderRadius: 24,
            overflow: "hidden",
          }}
        >
          <Image
            source={homeBanner}
            style={{ width: "100%", height: "100%" }}
            resizeMode="cover"
          />
        </View>

        {/* Search Bar */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            position: "absolute",
            width: 330,
            backgroundColor: "white",
            top: 270,
            left: "50%",
            marginLeft: -165,
            height: 45,
            zIndex: 10,
            borderRadius: 24,
            paddingHorizontal: 15,
          }}
        >
          <TextInput
            placeholder="Find donor..."
            style={{ flex: 1, fontWeight: "600", fontSize: 16 }}
            value={search}
            onChangeText={setSearch}
            />
          <Icon name="search" size={20} color="#000000" />
        </View>
      </View>

      {/* Emergency Blood Section */}
      <View style={{ marginTop: 20, paddingHorizontal: 20, paddingBottom:120 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 15,
          }}
        >
          <Text
            style={{
              fontWeight: "700",
              fontSize: 22,
              color: "#222",
            }}
          >
            Emergency Blood
          </Text>
          <Text
            style={{
              fontWeight: "700",
              fontSize: 16,
              color: "#E72929",
            }}
          >
            View All
          </Text>
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#E72929" />
        ) : filteredPosts.length === 0 ? (
          <Text style={{ textAlign: "center", color: "#999", fontSize: 16 }}>
            No donation posts found.
          </Text>
        ) : (
          filteredPosts.map((post, index) => {
            const hospital = post.createdBy.id;
            return (
              <View
                key={index}
                style={{
                  backgroundColor: "#fff",
                  borderRadius: 15,
                  padding: 15,
                  marginBottom: 15,
                  shadowColor: "#000",
                  shadowOpacity: 0.1,
                  shadowOffset: { width: 0, height: 4 },
                  shadowRadius: 8,
                  elevation: 5,
                  borderWidth: 1,
                  borderColor: "#eee",
                }}
              >
                {/* Header row: profile pic + hospital name + date */}
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 10,
                  }}
                >
                  {/* <Image
                    source={
                      hospital?.profilePicture
                        ? { uri: getFullProfilePicture(hospital.profilePicture) }
                        : image1
                    }
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 24,
                      marginRight: 12,
                      borderWidth: 1,
                      borderColor: "#E72929",
                    }}
                  /> */}

                  {hospital?.profilePicture ? (
  <Image
    source={{ uri: getFullProfilePicture(hospital.profilePicture) as string }}
    style={{
      width: 48,
      height: 48,
      borderRadius: 24,
      marginRight: 12,
      borderWidth: 1,
      borderColor: "#E72929",
    }}
  />
) : (
  <View
    style={{
      width: 48,
      height: 48,
      borderRadius: 24,
      marginRight: 12,
      borderWidth: 1,
      borderColor: "#E72929",
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff',
    }}
  >
    <Feather name="user" size={24} color="#E72929" />
  </View>
)}

                  <View style={{ flex: 1 }}>
                    <Text
                      style={{ fontWeight: "700", fontSize: 16, color: "#222" }}
                    >
                      {hospital?.hospitalName || hospital?.name || "Unknown Hospital"}
                    </Text>
                    <Text style={{ fontSize: 12, color: "#666", marginTop: 2 }}>
                      {new Date(post.createdAt).toLocaleString()}
                    </Text>
                  </View>
                </View>

                {/* Post message */}
                <Text
                  style={{
                    fontSize: 15,
                    color: "#444",
                    lineHeight: 22,
                    marginBottom: 12,
                  }}
                >
                  {post.message}
                </Text>

                {/* Contact info row */}
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    borderTopWidth: 1,
                    borderTopColor: "#eee",
                    paddingTop: 10,
                  }}
                >
                  <Text style={{ fontSize: 14, color: "#555" }}>
                    📞 {post.contactInfo}
                  </Text>
                  <Text style={{ fontSize: 14, color: "#555" }}>
                    📧 {hospital?.email || "N/A"}
                  </Text>
                </View>
              </View>
            );
          })
        )}
      </View>
    </ScrollView>
  );
}
