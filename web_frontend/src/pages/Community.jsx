import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FiSearch,
  FiMoreHorizontal,
  FiHeart,
  FiMessageCircle,
  FiImage,
  FiSmile,
  FiPlus,
} from "react-icons/fi";
import story from "../assets/story1.png";
import profile from "../assets/image1.png";
import MainHeader from "./Headers/MainHeader";

const stories = [
  { id: 1, name: "Abc", img: story },
  { id: 2, name: "Abc", img: story },
  { id: 3, name: "Abc", img: story },
  { id: 4, name: "Abc", img: story },
  { id: 5, name: "Abc", img: story },
  { id: 6, name: "Abc", img: story },
  { id: 7, name: "Abc", img: story },
  { id: 8, name: "Abc", img: story },
];

const Community = () => {
  const [posts, setPosts] = useState([]);
  const [newPostMessage, setNewPostMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:8000/api/community");
      setPosts(res.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching posts", error);
    }
  };

  const handleCreatePost = async () => {
    if (!newPostMessage.trim()) return;

    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        "http://localhost:8000/api/community/create",
        { message: newPostMessage },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setNewPostMessage("");
      fetchPosts(); // Refresh posts
    } catch (error) {
      console.error(
        "Error creating post",
        error.response?.data || error.message
      );
    }
  };

  const handleDeletePost = async (postId) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(`http://localhost:8000/api/community/${postId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      fetchPosts();
    } catch (error) {
      console.error(
        "Error deleting post",
        error.response?.data || error.message
      );
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <>
      <MainHeader />
      <div
        style={{
          backgroundColor: "white",
          minHeight: "100vh",
          fontFamily: "Arial, sans-serif",
        }}
      >
        {/* Header & Search */}
        <div
          style={{
            backgroundColor: "#B43929",
            paddingBottom: 30,
            paddingTop: 50,
            paddingLeft: 30,
            paddingRight: 30,
            color: "white",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          ></div>

          <div
            style={{
              marginTop: 10,
              marginLeft: 100,
              marginRight: 100,
              display: "flex",
              alignItems: "center",
              backgroundColor: "white",
              borderRadius: 20,
              height: 40,
              paddingLeft: 15,
              paddingRight: 15,
              color: "#000",
            }}
          >
            <FiSearch size={18} />
            <input
              type="text"
              placeholder="Search for..."
              style={{
                flex: 1,
                border: "none",
                outline: "none",
                paddingLeft: 20,
                fontSize: 14,
                color: "#000",
                backgroundColor: "transparent",
              }}
            />
          </div>

          {/* Stories */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: 30,
              marginLeft: 100,
            }}
          >
            <div style={{ marginRight: 20, textAlign: "center" }}>
              <div
                style={{
                  backgroundColor: "white",
                  width: 42,
                  height: 42,
                  borderRadius: "50%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: 4,
                  cursor: "pointer",
                }}
                title="Add Story"
              >
                <span style={{ fontSize: 30, color: "#000" }}>+</span>
              </div>
              {/* Empty spacer for alignment */}
              <div style={{ fontSize: 12, color: "transparent" }}>&nbsp;</div>
            </div>

            {stories.map((story) => (
              <div
                key={story.id}
                style={{
                  marginRight: 20,
                  textAlign: "center",
                  cursor: "pointer",
                }}
                title={story.name}
              >
                <img
                  src={story.img}
                  alt={story.name}
                  style={{ width: 42, height: 42, borderRadius: "50%" }}
                />
                <div style={{ fontSize: 13, color: "white", marginTop: 4 }}>
                  {story.name}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Feed Title */}
        <div style={{ margin: 80 }}>
          <h2 style={{ margin: 0 }}>Feed</h2>
          <hr style={{ borderColor: "#ccc", marginTop: 15 }} />
        </div>

        {/* Posts */}
        {posts.map((post) => (
          <div
            key={post._id}
            style={{
              border: "1px solid #eee",
              borderRadius: 10,
              padding: 10,
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)",
              marginLeft: 120,
              marginRight: 120,
              backgroundColor: "white",
              height: 190,
              marginBottom: 50,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: 10,
              }}
            >
              <img
                src={profile}
                alt="User"
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  margin: 20,
                }}
              />
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                }}
              >
                <div>
                  <div style={{ fontWeight: "bold", fontSize: 16 }}>
                    {post.hospitalName}
                  </div>
                  <div style={{ fontSize: 14 }}>
                    {new Date(post.createdAt).toLocaleString()}
                  </div>
                </div>
                <FiMoreHorizontal
                  size={18}
                  style={{ cursor: "pointer", marginRight: 20 }}
                  onClick={() => handleDeletePost(post._id)}
                  title="Delete Post"
                />
              </div>
            </div>
            <div style={{ fontSize: 14, margin: "0 20px" }}>{post.message}</div>
            <p style={{ fontSize: 14, margin: "10px 20px" }}>
              <strong>Email:</strong> {post.email || "N/A"}
            </p>
            <p style={{ fontSize: 14, margin: "0 20px" }}>
              <strong>Contact:</strong> {post.emergencyPhone || "N/A"}
            </p>
            <hr style={{ borderColor: "#ccc", marginTop: 15 }} />
            <div style={{ display: "flex", margin: 20 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginRight: 20,
                  cursor: "pointer",
                }}
              >
                <FiHeart size={16} color="#000" />
                <span style={{ marginLeft: 5, fontSize: 12, color: "#000" }}>
                  12
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                <FiMessageCircle size={16} color="#000" />
                <span style={{ marginLeft: 5, fontSize: 12, color: "#000" }}>
                  4
                </span>
              </div>
            </div>
          </div>
        ))}

        <div
          style={{
            backgroundColor: "#B43929",
            padding: "20px 30px",
            color: "white",
            marginLeft: 80,
            marginRight: 80,
            borderRadius: 10,
            height: 50,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Left: Text */}
          <input
            type="text"
            value={newPostMessage}
            onChange={(e) => setNewPostMessage(e.target.value)}
            placeholder="Type here..."
          />

          {/* Right: Icons */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              columnGap: 45,
              marginRight: 10,
            }}
          >
            <FiImage
              size={22}
              style={{ cursor: "pointer" }}
              title="Add Image"
            />
            <FiSmile
              size={22}
              style={{ cursor: "pointer" }}
              title="Add Sticker"
            />
            <FiPlus
              size={22}
              style={{ cursor: "pointer" }}
              title="Post"
              onClick={handleCreatePost}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Community;
