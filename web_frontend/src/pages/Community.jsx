import React from "react";
import { FiSearch, FiMoreHorizontal, FiHeart, FiMessageCircle,FiImage, FiSmile, FiPlus  } from "react-icons/fi";
import story from "../assets/story1.png";
import profile from "../assets/image1.png";


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
  return (
    <div style={{ backgroundColor: "white", minHeight: "100vh", fontFamily: "Arial, sans-serif" }}>
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
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          
        </div>

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
        <div style={{ display: "flex", alignItems: "center", marginTop: 30, marginLeft: 100 }}>
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
              style={{ marginRight: 20, textAlign: "center", cursor: "pointer" }}
              title={story.name}
            >
              <img
                src={story.img}
                alt={story.name}
                style={{ width: 42, height: 42, borderRadius: "50%" }}
              />
              <div style={{ fontSize: 13, color: "white", marginTop: 4 }}>{story.name}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Feed Title */}
      <div style={{ margin: 80}}>
        <h2 style={{ margin: 0 }}>Feed</h2>
        <hr style={{ borderColor: "#ccc", marginTop: 15 }} />
      </div>

      {/* Posts */}
      {[1, 2].map((post) => (
        <div
          key={post}
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
          <div style={{ display: "flex", alignItems: "center", marginBottom: 10 }}>
            <img
              src={profile}
              alt="User"
              style={{ width: 48, height: 48, borderRadius: "50%", margin: 20 }}
            />
            <div style={{ flex: 1, display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <div style={{ fontWeight: "bold", fontSize: 16, color: "#000" }}>Kierra Franci</div>
                <div style={{ fontSize: 14, color: "#555", marginTop: 2 }}>50 minutes ago</div>
              </div>
              <FiMoreHorizontal size={18} color="#000" style={{ cursor: "pointer", marginRight:20 }} />
            </div>
          </div>

          <div style={{ fontSize: 14, color: "#000", marginLeft: 20, marginRight: 20, flexGrow: 1 }}>
            We need A- blood for a patient undergoing surgery at Colombo General Hospital. Please share or help if you can.
          </div>

          <hr style={{ borderColor: "#ccc", marginTop: 15 }} />

          <div style={{ display: "flex", margin: 20 }}>
            <div style={{ display: "flex", alignItems: "center", marginRight: 20, cursor: "pointer" }}>
              <FiHeart size={16} color="#000" />
              <span style={{ marginLeft: 5, fontSize: 12, color: "#000" }}>12</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
              <FiMessageCircle size={16} color="#000" />
              <span style={{ marginLeft: 5, fontSize: 12, color: "#000" }}>4</span>
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
      <div style={{ fontSize: 16, marginLeft: 10 }}>Type Here..</div>

      {/* Right: Icons */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          columnGap: 45, 
          marginRight: 10,
        }}
      >
        <FiImage size={22} style={{ cursor: "pointer" }} title="Add Image" />
        <FiSmile size={22} style={{ cursor: "pointer" }} title="Add Sticker" />
        <FiPlus size={22} style={{ cursor: "pointer" }} title="Add More" />
      </div>
    </div>
    </div>
  );
};

export default Community;
