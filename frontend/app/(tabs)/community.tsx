import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  SafeAreaView,
  TextInput,
  Image,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Button,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { donationPostApi, hospitalApi } from "../../services/api"; // assuming you added hospitalApi here

type Hospital = {
  hospitalName?: string;
  name?: string;
  profilePicture?: string;
  phone?: string;
  email?: string;
  district?: string;
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

export default function Community() {
  const [posts, setPosts] = useState<DonationPost[]>([]);
  const [loadingPosts, setLoadingPosts] = useState(true);

  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [loadingHospitals, setLoadingHospitals] = useState(true);

  // New states for likes and comments:
  const [likedPosts, setLikedPosts] = useState<Record<number, boolean>>({});
  const [commentOpenPosts, setCommentOpenPosts] = useState<
    Record<number, boolean>
  >({});
  const [comments, setComments] = useState<Record<number, string>>({});

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const data = await hospitalApi.getAllHospitals();
        setHospitals(data);
      } catch (error) {
        console.error("Failed to load hospitals:", error);
      } finally {
        setLoadingHospitals(false);
      }
    };

    const fetchPosts = async () => {
      try {
        const data = await donationPostApi.getAllPosts();
        setPosts(data);
      } catch (error) {
        console.error("Failed to load posts:", error);
      } finally {
        setLoadingPosts(false);
      }
    };

    fetchHospitals();
    fetchPosts();
  }, []);

  // Helper to get full image URI (adjust YOUR_BACKEND_URL accordingly)
  const getFullProfilePicture = (pic?: string) => {
    if (!pic) return null;
    if (pic.startsWith("http")) return pic;
    return `https://YOUR_BACKEND_URL${pic}`; // <-- put your backend URL here
  };

  // Toggle like for post at index
  const toggleLike = (index: number) => {
    setLikedPosts((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  // Toggle comment box visibility for post at index
  const toggleCommentBox = (index: number) => {
    setCommentOpenPosts((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  // Handle comment text change
  const handleCommentChange = (index: number, text: string) => {
    setComments((prev) => ({
      ...prev,
      [index]: text,
    }));
  };

  // Handle submit comment (you can connect to backend here)
  const submitComment = (index: number) => {
    alert(`Comment submitted: ${comments[index] || ""}`);
    setComments((prev) => ({
      ...prev,
      [index]: "",
    }));
    setCommentOpenPosts((prev) => ({
      ...prev,
      [index]: false,
    }));
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{paddingBottom:100}}>
        {/* Header Section */}
        <View
          style={{
            width: "100%",
            height: 275,
            backgroundColor: "#E72929",
            borderRadius: 20,
            paddingBottom: 30,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 50,
              paddingHorizontal: 30,
              justifyContent: "space-between",
            }}
          >
            <Text style={{ color: "white", fontSize: 24, fontWeight: "bold" }}>
              Community
            </Text>
            <View
              style={{
                backgroundColor: "white",
                width: 30,
                height: 30,
                borderRadius: 20,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{ color: "#000000", fontSize: 20, fontWeight: "bold" }}
              >
                +
              </Text>
            </View>
          </View>

          {/* Search Input */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "white",
              borderRadius: 20,
              height: 40,
              margin: 30,
              paddingHorizontal: 15,
            }}
          >
            <Feather name="search" size={18} color="#000000" />
            <TextInput
              placeholder="Search for..."
              placeholderTextColor="#888"
              style={{ flex: 1, paddingHorizontal: 10, fontSize: 14 }}
            />
          </View>

          {/* Stories Section */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: 30,
              marginBottom: 20,
            }}
          >
            {loadingHospitals ? (
              <ActivityIndicator color="#fff" />
            ) : (
              hospitals.map((hospital, index) => (
                <View
                  key={index}
                  style={{ marginRight: 12, alignItems: "center" }}
                >
                  <Image
                    source={
                      hospital.profilePicture
                        ? {
                            uri: getFullProfilePicture(hospital.profilePicture),
                          }
                        : require("../../assets/images/story1.png")
                    }
                    style={{
                      width: 42,
                      height: 42,
                      borderRadius: 21,
                      borderWidth: 2,
                      borderColor: "#fff",
                    }}
                  />
                  <Text
                    style={{
                      fontSize: 12,
                      color: "white",
                      marginTop: 4,
                      maxWidth: 50,
                    }}
                    numberOfLines={1}
                  >
                    {hospital.hospitalName || hospital.name || "Unknown"}
                  </Text>
                </View>
              ))
            )}
          </View>
        </View>

        {/* Feed Title */}
        <View style={{ marginHorizontal: 30, marginTop: 20, marginBottom: 25 }}>
          <Text style={{ color: "#000", fontSize: 22, fontWeight: "bold" }}>
            Feed
          </Text>
          <View style={{ backgroundColor: "#ccc", height: 1, marginTop: 10 }} />
        </View>

        {/* Loading Indicator for posts */}
        {loadingPosts && (
          <ActivityIndicator
            size="large"
            color="#E72929"
            style={{ marginTop: 20 }}
          />
        )}

        {/* No Posts Message */}
        {!loadingPosts && posts.length === 0 && (
          <Text style={{ textAlign: "center", marginTop: 20 }}>
            No donation posts available.
          </Text>
        )}

        {/* Posts List */}
        {!loadingPosts &&
          posts.map((post, index) => {
            const hospital = post.createdBy.id;
            const liked = likedPosts[index] || false;
            const commentBoxOpen = commentOpenPosts[index] || false;

            return (
              <View
                key={index}
                style={{
                  borderWidth: 1,
                  borderColor: "#ccc",
                  borderRadius: 10,
                  padding: 10,
                  marginHorizontal: 30,
                  backgroundColor: "white",
                  marginBottom: 20,
                }}
              >
                {/* Post Header: Hospital Info */}
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
                        ? {
                            uri: getFullProfilePicture(hospital.profilePicture),
                          }
                        : require("../../assets/images/image1.png")
                    }
                    style={{
                      width: 42,
                      height: 42,
                      borderRadius: 21,
                      margin: 10,
                    }}
                  />
                  <View style={{ flex: 1 }}>
                    <Text
                      style={{
                        color: "#000",
                        fontWeight: "bold",
                        fontSize: 14,
                      }}
                    >
                      {hospital?.hospitalName ||
                        hospital?.name ||
                        "Unknown Hospital"}
                    </Text>
                    <Text style={{ color: "#555", fontSize: 12, marginTop: 2 }}>
                      {new Date(post.createdAt).toLocaleString()}
                    </Text>
                  </View>
                </View>

                {/* Post Message */}
                <Text
                  style={{
                    color: "#000",
                    fontSize: 14,
                    marginLeft: 10,
                    marginRight: 10,
                  }}
                >
                  {post.message}
                </Text>

                {/* Contact Details */}
                <Text
                  style={{
                    color: "#555",
                    fontSize: 12,
                    marginLeft: 10,
                    marginRight: 10,
                    marginTop: 5,
                  }}
                >
                  Contact: {post.contactInfo} {"\n"}
                  Contact Email: {hospital?.email || "N/A"}
                </Text>

                <View
                  style={{ backgroundColor: "#ccc", height: 1, marginTop: 10 }}
                />

                {/* Post Footer: Views and Contact Info */}
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    margin: 10,
                  }}
                >
                  {/* Like button */}
                  <TouchableOpacity
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginRight: 20,
                    }}
                    onPress={() => toggleLike(index)}
                    activeOpacity={0.7}
                  >
                    <Feather
                      name="heart"
                      size={16}
                      color={liked ? "red" : "#000"}
                    />
                    <Text
                      style={{ marginLeft: 5, color: "#000", fontSize: 12 }}
                    >
                      {post.views + (liked ? 1 : 0)}
                    </Text>
                  </TouchableOpacity>

                  {/* Comment button */}
                  <TouchableOpacity
                    style={{ flexDirection: "row", alignItems: "center" }}
                    onPress={() => toggleCommentBox(index)}
                    activeOpacity={0.7}
                  >
                    <Feather
                      name="message-circle"
                      size={16}
                      color={commentBoxOpen ? "#E72929" : "#000"}
                    />
                    <Text
                      style={{ marginLeft: 5, color: "#000", fontSize: 12 }}
                    >
                      Comment
                    </Text>
                  </TouchableOpacity>
                </View>

                {/* Comment input section */}
                {commentBoxOpen && (
                  <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={{ marginHorizontal: 10 }}
                  >
                    <TextInput
                      placeholder="Write a comment..."
                      value={comments[index] || ""}
                      onChangeText={(text) => handleCommentChange(index, text)}
                      style={{
                        borderWidth: 1,
                        borderColor: "#ccc",
                        borderRadius: 8,
                        padding: 8,
                        marginBottom: 10,
                      }}
                      multiline
                    />
                    <TouchableOpacity
                      onPress={() => submitComment(index)}
                      disabled={
                        !comments[index] || comments[index].trim() === ""
                      }
                      style={{
                        backgroundColor:
                          !comments[index] || comments[index].trim() === ""
                            ? "#ccc"
                            : "#E72929",
                        paddingVertical: 10,
                        paddingHorizontal: 20,
                        borderRadius: 25, // <-- rounded corners here
                        alignItems: "center",
                        opacity:
                          !comments[index] || comments[index].trim() === ""
                            ? 0.6
                            : 1,
                      }}
                    >
                      <Text
                        style={{
                          color: "white",
                          fontWeight: "bold",
                          fontSize: 16,
                        }}
                      >
                        Submit
                      </Text>
                    </TouchableOpacity>
                  </KeyboardAvoidingView>
                )}
              </View>
            );
          })}

        {/* Bottom Divider */}
        <View style={{ marginHorizontal: 30, marginBottom: 30 }}>
          <View style={{ backgroundColor: "#ccc", height: 1, marginTop: 10 }} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
