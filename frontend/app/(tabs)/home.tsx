import {
  Text,
  TextInput,
  View,
  Image,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import bloodbanner from "../../assets/images/bloodbanner.png";
import image1 from "../../assets/images/image1.png";
import { donationPostApi } from "../../services/api";

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
  return `https://YOUR_BACKEND_URL${pic}`; // Replace with your backend URL
};

export default function Home() {
  const [search, setSearch] = useState("");
  const [posts, setPosts] = useState<DonationPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
    <ScrollView style={{ flex: 1, backgroundColor: "#fff" }}>
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
            left: 60,
            borderRadius: 30,
            width: 60,
            height: 60,
            alignSelf: "center",
            transform: [{ translateX: -0.5 * 60 }],
            overflow: "hidden",
          }}
        >
          <Image
            source={image1}
            style={{
              width: "100%",
              height: "100%",
              resizeMode: "cover",
            }}
          />
        </View>
        <Text
          style={{
            fontWeight: "600",
            position: "absolute",
            top: 54,
            left: 110,
            fontSize: 18,
            color: "white",
          }}
        >
          Hey Amie
        </Text>

        {/* Notification and Plus Icons */}
        <View
          style={{
            position: "absolute",
            backgroundColor: "white",
            top: 55,
            left: 280,
            borderRadius: 37 / 2,
            width: 37,
            height: 37,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Icon name="bell" size={20} color="#000000" />
        </View>
        <View
          style={{
            position: "absolute",
            backgroundColor: "white",
            top: 55,
            left: 340,
            borderRadius: 37 / 2,
            width: 37,
            height: 37,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Icon name="plus" size={20} color="#000000" />
        </View>

        {/* Banner */}
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            width: 330,
            backgroundColor: "white",
            top: 130,
            left: "50%",
            marginLeft: -165, // to center horizontally (half width negative)
            height: 135,
            zIndex: 10,
            borderRadius: 24,
            overflow: "hidden",
          }}
        >
          <Image
            source={bloodbanner}
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
            top: 280,
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
      <View style={{ marginTop: 30, paddingHorizontal: 20 }}>
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
                  <Image
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
                  />
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
