// import { Link } from "expo-router";
// import { Text, View, Image, TouchableOpacity } from "react-native";
// import GetStartedBackground from "./getStartedBackground";
// import Logo from "../assets/images/logo.png";
// import { Button } from "@react-navigation/elements";

// export default function Index() {
//   console.log("Index screen loaded");

//   return (
//     <GetStartedBackground>
//       <View style={{ alignItems: "center", marginTop: 50 }}>
//         <Image source={Logo} style={{ width: 370, height: 370 }} />
//       </View>
    
//       <View className="absolute bottom-[320px]  left-[80px]">
//         <Text className="text-5xl font-bold">Your Blood,</Text>
//         <Text className="mt-1 text-5xl font-bold">Their Hope</Text>
//       </View>

//       <View className="absolute bottom-[200px] left-[60px] items-center">
//         <Text className="text-center text-lg max-w-[290px]">
//           A simple way to connect donors with those who need lifesaving blood.
//         </Text>
//       </View>

//       <View className="absolute bottom-[100px] w-full items-center">
//         <Link href="/donorLogin" asChild>
//           <TouchableOpacity className="bg-[#B43929] px-10 py-3 rounded-full">
//             <Text className="text-white text-lg font-semibold">
//               Get Started
//             </Text>
//           </TouchableOpacity>
//         </Link>
//       </View>
//     </GetStartedBackground>
//   );
// }

import { Link } from "expo-router";
import { Text, View, Image, TouchableOpacity, Dimensions } from "react-native";
import GetStartedBackground from "./getStartedBackground";
import Logo from "../assets/images/logo.png";

export default function Index() {
  return (
    <GetStartedBackground>
      <View style={{ flex: 1, justifyContent: "space-between", paddingVertical: 40 }}>
        {/* Logo Section */}
        <View style={{ alignItems: "center" }}>
          <Image source={Logo} style={{ width: 295, height: 295, resizeMode: "contain" }} />
        </View>

        {/* Title Section */}
        <View style={{ alignItems: "center" }}>
          <Text style={{ fontSize: 36, fontWeight: "bold", color: "#000" }}>Your Blood,</Text>
          <Text style={{ fontSize: 36, fontWeight: "bold", color: "#000" }}>Their Hope</Text>
        </View>

        {/* Description Section */}
        <View style={{ alignItems: "center", paddingHorizontal: 30 }}>
          <Text style={{ textAlign: "center", fontSize: 16, color: "#444" }}>
            A simple way to connect donors with those who need lifesaving blood.
          </Text>
        </View>

        {/* Button Section */}
        <View style={{ alignItems: "center" }}>
          <Link href="/donorLogin" asChild>
            <TouchableOpacity style={{ backgroundColor: "#B43929", paddingHorizontal: 40, paddingVertical: 14, borderRadius: 30 ,marginBottom:20}}>
              <Text style={{ color: "#fff", fontSize: 18, fontWeight: "bold" }}>Get Started</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </GetStartedBackground>
  );
}
