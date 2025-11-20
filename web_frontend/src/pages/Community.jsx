// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   FiSearch,
//   FiMoreHorizontal,
//   FiHeart,
//   FiMessageCircle,
//   FiImage,
//   FiSmile,
//   FiPlus,
//   FiArrowRightCircle,
//   FiSend,
// } from "react-icons/fi";
// import story from "../assets/story1.png";
// import profile from "../assets/image1.png";
// import MainHeader from "./Headers/MainHeader";
// import { API_ROUTES } from "../config/config";

// const stories = [
//   { id: 1, name: "Abc", img: story },
//   { id: 2, name: "Abc", img: story },
//   { id: 3, name: "Abc", img: story },
//   { id: 4, name: "Abc", img: story },
//   { id: 5, name: "Abc", img: story },
//   { id: 6, name: "Abc", img: story },
//   { id: 7, name: "Abc", img: story },
//   { id: 8, name: "Abc", img: story },
// ];

// const Community = () => {
//   const [posts, setPosts] = useState([]);
//   const [newPostMessage, setNewPostMessage] = useState("");
//   const [loading, setLoading] = useState(false);

//   const fetchPosts = async () => {
//     try {
//       setLoading(true);
//       const res = await axios.get(API_ROUTES.GET_POSTS);
//       setPosts(res.data.data);
//       setLoading(false);
//     } catch (error) {
//       console.error("Error fetching posts", error);
//     }
//   };

//   const handleCreatePost = async () => {
//     if (!newPostMessage.trim()) return;

//     try {
//       const token = localStorage.getItem("token");

//       const res = await axios.post(
//         API_ROUTES.CREATE_POST,
//         { message: newPostMessage },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       setNewPostMessage("");
//       fetchPosts(); // Refresh posts
//     } catch (error) {
//       console.error(
//         "Error creating post",
//         error.response?.data || error.message
//       );
//     }
//   };

//   const handleDeletePost = async (postId) => {
//     try {
//       const token = localStorage.getItem("token");

//       await axios.delete(API_ROUTES.DELETE_POST(postId), {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       fetchPosts();
//     } catch (error) {
//       console.error(
//         "Error deleting post",
//         error.response?.data || error.message
//       );
//     }
//   };

//   useEffect(() => {
//     fetchPosts();
//   }, []);

//   return (
//     <>
//       <MainHeader />
//       <div
//         style={{
//           backgroundColor: "white",
//           minHeight: "100vh",
//           fontFamily: "Arial, sans-serif",
//         }}
//       >
//         {/* Header & Search */}
//         <div
//           style={{
//             backgroundColor: "#B43929",
//             paddingBottom: 30,
//             paddingTop: 50,
//             paddingLeft: 30,
//             paddingRight: 30,
//             color: "white",
//           }}
//         >
//           <div
//             style={{
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//             }}
//           ></div>

//           <div
//             style={{
//               marginTop: 10,
//               marginLeft: 100,
//               marginRight: 100,
//               display: "flex",
//               alignItems: "center",
//               backgroundColor: "white",
//               borderRadius: 20,
//               height: 40,
//               paddingLeft: 15,
//               paddingRight: 15,
//               color: "#000",
//             }}
//           >
//             <FiSearch size={18} />
//             <input
//               type="text"
//               placeholder="Search for..."
//               style={{
//                 flex: 1,
//                 border: "none",
//                 outline: "none",
//                 paddingLeft: 20,
//                 paddingTop:'50px',
//                 paddingBottom:'50px',
//                 fontSize: 14,
//                 color: "#000",
//                 backgroundColor: "transparent",
//               }}
//             />
//           </div>

//           {/* Stories */}
//           {/* <div
//             style={{
//               display: "flex",
//               alignItems: "center",
//               marginTop: 30,
//               marginLeft: 100,
//             }}
//           >
//             <div style={{ marginRight: 20, textAlign: "center" }}>
//               <div
//                 style={{
//                   backgroundColor: "white",
//                   width: 42,
//                   height: 42,
//                   borderRadius: "50%",
//                   display: "flex",
//                   justifyContent: "center",
//                   alignItems: "center",
//                   marginBottom: 4,
//                   cursor: "pointer",
//                 }}
//                 title="Add Story"
//               >
//                 <span style={{ fontSize: 30, color: "#000" }}>+</span>
//               </div>
           
//               <div style={{ fontSize: 12, color: "transparent" }}>&nbsp;</div>
//             </div>

//             {stories.map((story) => (
//               <div
//                 key={story.id}
//                 style={{
//                   marginRight: 20,
//                   textAlign: "center",
//                   cursor: "pointer",
//                 }}
//                 title={story.name}
//               >
//                 <img
//                   src={story.img}
//                   alt={story.name}
//                   style={{ width: 42, height: 42, borderRadius: "50%" }}
//                 />
//                 <div style={{ fontSize: 13, color: "white", marginTop: 4 }}>
//                   {story.name}
//                 </div>
//               </div>
//             ))}
//           </div> */}
//         </div>

//         {/* Feed Title */}
//         <div style={{ margin: 80 }}>
//           <h2 style={{ margin: 0 }}>Feed</h2>
//           <hr style={{ borderColor: "#ccc", marginTop: 15 }} />
//         </div>

//         <div
//           style={{
//             maxHeight: "calc(100vh - 300px)", // adjust to fit your layout
//             overflowY: "auto",
//             paddingBottom: 100, // so bottom post isn't hidden behind input bar
//           }}
//         >
//         {/* Posts */}
//         {posts.map((post) => (
//           <div
//             key={post._id}
//             style={{
//               border: "1px solid #eee",
//               borderRadius: 10,
//               padding: 10,
//               boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)",
//               marginLeft: 120,
//               marginRight: 120,
//               backgroundColor: "white",
//               height: 190,
//               marginBottom: 50,
//               display: "flex",
//               flexDirection: "column",
//               justifyContent: "space-between",
//             }}
//           >
//             <div
//               style={{
//                 display: "flex",
//                 alignItems: "center",
//                 marginBottom: 10,
//               }}
//             >
//               <img
//                 src={profile}
//                 alt="User"
//                 style={{
//                   width: 48,
//                   height: 48,
//                   borderRadius: "50%",
//                   margin: 20,
//                 }}
//               />
//               <div
//                 style={{
//                   flex: 1,
//                   display: "flex",
//                   justifyContent: "space-between",
//                   alignItems: "flex-start",
//                 }}
//               >
//                 <div>
//                   <div style={{ fontWeight: "bold", fontSize: 16 }}>
//                     {post.hospitalName}
//                   </div>
//                   <div style={{ fontSize: 14 }}>
//                     {new Date(post.createdAt).toLocaleString()}
//                   </div>
//                 </div>
//                 <FiMoreHorizontal
//                   size={18}
//                   style={{ cursor: "pointer", marginRight: 20 }}
//                   onClick={() => handleDeletePost(post._id)}
//                   title="Delete Post"
//                 />
//               </div>
//             </div>
//             <div style={{ fontSize: 14, margin: "0 20px" }}>{post.message}</div>
//             <p style={{ fontSize: 14, margin: "10px 20px" }}>
//               <strong>Email:</strong> {post.email || "N/A"}
//             </p>
//             <p style={{ fontSize: 14, margin: "0 20px" }}>
//               <strong>Contact:</strong> {post.emergencyPhone || "N/A"}
//             </p>
//             <hr style={{ borderColor: "#ccc", marginTop: 15 }} />
//             <div style={{ display: "flex", margin: 20 }}>
//               <div
//                 style={{
//                   display: "flex",
//                   alignItems: "center",
//                   marginRight: 20,
//                   cursor: "pointer",
//                 }}
//               >
//                 <FiHeart size={16} color="#000" />
//                 <span style={{ marginLeft: 5, fontSize: 12, color: "#000" }}>
//                   12
//                 </span>
//               </div>
//               <div
//                 style={{
//                   display: "flex",
//                   alignItems: "center",
//                   cursor: "pointer",
//                 }}
//               >
//                 <FiMessageCircle size={16} color="#000" />
//                 <span style={{ marginLeft: 5, fontSize: 12, color: "#000" }}>
//                   4
//                 </span>
//               </div>
//             </div>
//           </div>
//         ))}

//         </div>
//         {/* Fixed Input Bar */}
//         <div
//           style={{
//             backgroundColor: "#B43929",
//             padding: "20px 30px",
//             color: "white",
//             borderRadius: 10,
//             height: 50,
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "space-between",
//             position: "fixed",
//             bottom: 20,
//             left: 80,
//             right: 80,
//             zIndex: 10,
//           }}
//         >
//           <input
//             type="text"
//             value={newPostMessage}
//             onChange={(e) => setNewPostMessage(e.target.value)}
//             placeholder="Type here..."
//             className="customInput"
//             style={{
//               flex: 1,
//               marginRight: 20,
//               border: "none",
//               outline: "none",
//               fontSize: 16,
//               padding: 10,
//               borderRadius: 6,
//               backgroundColor: "transparent",
//               color:'white',
    
//             }}
//           />

//           <div
//             style={{
//               display: "flex",
//               alignItems: "center",
//               columnGap: 45,
//               marginRight: 10,
//             }}
//           >
//             {/* <FiImage size={22} style={{ cursor: "pointer" }} title="Add Image" />
//             <FiSmile size={22} style={{ cursor: "pointer" }} title="Add Sticker" /> */}
//             <FiSend
//               size={22}
//               style={{ cursor: "pointer" }}
//               title="Post"
//               onClick={handleCreatePost}
//             />
//           </div>
//         </div>

//       </div>

//       <style>{`.customInput::placeholder {
//   color: #cccccc; /* your desired placeholder color */
//   opacity: 1;     /* ensures full visibility */
// }`}</style>
//     </>
//   );
// };

// export default Community;
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FiSearch,
  FiMoreHorizontal,
  FiHeart,
  FiMessageCircle,
  FiSend,
} from "react-icons/fi";
import profile from "../assets/image1.png";
import MainHeader from "./Headers/MainHeader";
import { API_ROUTES } from "../config/config";

const Community = () => {
  const [posts, setPosts] = useState([]);
  const [newPostMessage, setNewPostMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_ROUTES.GET_POSTS);
      setPosts(res.data.data);
    } catch (error) {
      console.error("Error fetching posts", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePost = async () => {
    if (!newPostMessage.trim()) return;

    try {
      const token = localStorage.getItem("token");

      await axios.post(
        API_ROUTES.CREATE_POST,
        { message: newPostMessage },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setNewPostMessage("");
      fetchPosts();
    } catch (error) {
      console.error("Error creating post", error);
    }
  };

  const handleDeletePost = async (postId) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(API_ROUTES.DELETE_POST(postId), {
        headers: { Authorization: `Bearer ${token}` },
      });

      fetchPosts();
    } catch (error) {
      console.error("Error deleting post", error);
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
          backgroundColor: "#F9F9F9",
          minHeight: "100vh",
          fontFamily: "Inter, Arial, sans-serif",
        }}
      >
        {/* Sticky Top Search Section */}
        <div
          style={{
            backgroundColor: "#B43929",
            padding: "40px 80px",
            color: "white",
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
            position: "sticky",
            top: 0,
            zIndex: 20,
            boxShadow: "0 4px 10px rgba(0,0,0,0.25)",
          }}
        >
          <h2 style={{ marginBottom: 10, fontWeight: 600 }}>Community</h2>

          {/* Search */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "white",
              borderRadius: 30,
              height: 48,
              paddingLeft: 18,
              paddingRight: 18,
              color: "#000",
            }}
          >
            <FiSearch size={20} />
            <input
              type="text"
              placeholder="Search for..."
              style={{
                flex: 1,
                border: "none",
                outline: "none",
                paddingLeft: 15,
                fontSize: 15,
                background: "transparent",
              }}
            />
          </div>
        </div>

        {/* Feed Title */}
        <div style={{ padding: "40px 80px 10px" }}>
          <h2 style={{ margin: 0, fontWeight: 600, color: "#222" }}>Feed</h2>
          <hr style={{ marginTop: 12, borderColor: "#ddd" }} />
        </div>

        {/* Posts Container */}
        <div
          style={{
            padding: "10px 80px 120px",
          }}
        >
          {loading && (
            <p style={{ textAlign: "center", marginTop: 30 }}>Loading posts…</p>
          )}

          {posts.map((post) => (
            <div
              key={post._id}
              style={{
                backgroundColor: "white",
                borderRadius: 16,
                padding: 20,
                marginBottom: 30,
                boxShadow: "0px 8px 25px rgba(0, 0, 0, 0.08)",
                border: "1px solid #eee",
                transition: "transform 0.2s",
              }}
            >
              {/* Header */}
              <div style={{ display: "flex", alignItems: "center" }}>
                <img
                  src={profile}
                  alt="profile"
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: "50%",
                    marginRight: 15,
                  }}
                />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: 16 }}>
                    {post.hospitalName}
                  </div>
                  <div style={{ fontSize: 13, color: "#777" }}>
                    {new Date(post.createdAt).toLocaleString()}
                  </div>
                </div>

                <FiMoreHorizontal
                  size={20}
                  style={{ cursor: "pointer" }}
                  onClick={() => handleDeletePost(post._id)}
                  title="Delete Post"
                />
              </div>

              {/* Message */}
              <div
                style={{
                  marginTop: 15,
                  fontSize: 15,
                  lineHeight: 1.6,
                  color: "#222",
                }}
              >
                {post.message}
              </div>

              {/* Details */}
              <div
                style={{
                  marginTop: 15,
                  backgroundColor: "#fafafa",
                  padding: "12px 15px",
                  borderRadius: 10,
                  border: "1px solid #eee",
                }}
              >
                <p style={{ margin: 0, fontSize: 14 }}>
                  <strong>Email:</strong> {post.email || "N/A"}
                </p>
                <p style={{ margin: "4px 0 0", fontSize: 14 }}>
                  <strong>Contact:</strong> {post.emergencyPhone || "N/A"}
                </p>
              </div>

              {/* Footer */}
              <div
                style={{
                  marginTop: 15,
                  display: "flex",
                  alignItems: "center",
                  gap: 20,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                    color: "#B43929",
                  }}
                >
                  <FiHeart size={18} />
                  <span style={{ marginLeft: 6, fontSize: 13 }}>12</span>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                    color: "#B43929",
                  }}
                >
                  <FiMessageCircle size={18} />
                  <span style={{ marginLeft: 6, fontSize: 13 }}>4</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Floating Post Composer */}
        <div
          style={{
            backgroundColor: "#B43929",
            padding: "18px 30px",
            color: "white",
            borderRadius: 50,
            height: 60,
            display: "flex",
            alignItems: "center",
            gap: 20,
            position: "fixed",
            bottom: 25,
            left: "50%",
            transform: "translateX(-50%)",
            width: "60%",
            maxWidth: 900,
            zIndex: 50,
            boxShadow: "0 6px 20px rgba(0,0,0,0.25)",
          }}
        >
          <input
            type="text"
            value={newPostMessage}
            onChange={(e) => setNewPostMessage(e.target.value)}
            placeholder="Share something with the community..."
            style={{
              flex: 1,
              background: "transparent",
              border: "none",
              outline: "none",
              fontSize: 16,
              color: "white",
            }}
          />

          <FiSend
            size={24}
            style={{ cursor: "pointer" }}
            title="Post"
            onClick={handleCreatePost}
          />
        </div>
      </div>

      <style>{`
        ::placeholder {
          color: #f1c7c7;
          opacity: 1;
        }
      `}</style>
    </>
  );
};

export default Community;

