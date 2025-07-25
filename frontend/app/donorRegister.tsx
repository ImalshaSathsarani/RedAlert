// import { Link, useRouter } from "expo-router";
// import {
//   Text,
//   View,
//   Image,
//   TextInput,
//   TouchableOpacity,
//   Modal,
//   FlatList,
//   Alert,
//   ScrollView,
// } from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage"; // ✅
// import logo2 from "../assets/images/logo2.png";
// import Icon from "react-native-vector-icons/FontAwesome";
// import { useState } from "react";
// import { donorAuthApi } from "../services/api";

// export default function DonorRegister() {
//   const router = useRouter();
//   const [selected, setSelected] = useState("");
//   const [visible, setVisible] = useState(false);
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmpassword, setConfirmPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [mobileNo, setMobileNo] = useState("");
//   const [bloodType, setBloodType] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const items = ["A+", "A-", "B+", "O+", "O-"];

//   const handleRegister = async () => {
//     if (!name || !email || !password || !confirmpassword || !mobileNo || !bloodType) {
//       setError("Please fill in all required fields");
//       return;
//     }

//     if (password !== confirmpassword) {
//       setError("Passwords do not match");
//       return;
//     }

//     setLoading(true);
//     setError("");

//     try {
//       console.log("Sending registration data:", {
//         name,
//         email,
//         mobileNo,
//         bloodType,
//         role: "donor",
//       });

//       const userData = {
//         name,
//         email,
//         password,
//         confirmPassword: confirmpassword,
//         mobileNo,
//         bloodType,
//         role: "donor",
//       };

//       const response = await donorAuthApi.register(userData);
//       console.log("Registration response:", response);

//       // Store token
//       localStorage.setItem("token", response.token);

//       // Show success message with more details
//       Alert.alert(
//         "Success",
//         `Registration successful!\n\nYour account has been created.\nEmail: ${email}\nRole: Donor\nBlood Type: ${bloodType}\n\nYou will be redirected to the home page...`,
//         [
//           {
//             text: "OK",
//             onPress: () => router.push("/home"),
//             style: "default",
//           },
//         ]
//       );
//     } catch (err: any) {
//       console.error("Registration error:", err);
//       let errorMessage = err.response?.data?.message || "Registration failed";

//       if (errorMessage.includes("User already exists")) {
//         Alert.alert(
//           "Error",
//           "This email is already registered. Please try another email or login."
//         );
//       } else if (errorMessage.includes("Passwords do not match")) {
//         Alert.alert("Error", "The passwords you entered do not match. Please try again.");
//       } else if (errorMessage.includes("All fields are required")) {
//         Alert.alert("Error", "Please fill in all required fields before proceeding.");
//       } else {
//         Alert.alert("Error", errorMessage);
//       }

//       setError(errorMessage);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <ScrollView>
//       <View>
//         <View className="absolute items-center">
//           <Image source={logo2} style={{ width: 400, height: 400 }} />
//         </View>

//         <View className="absolute space-y-3">
//         <View className="flex-row px-10 py-3 rounded-xl bg-[#e4c8c2] mt-[33vh] ml-[60px]">
//           <Icon className="ml-[-15px]" name="user" size={20} color="#000" />
//           <TextInput
//             placeholder="Full Name"
//             placeholderTextColor="#000"
//             className="ml-5 font-bold"
//             style={{ flex: 1, fontWeight: "600" }}
//             value={name}
//             onChangeText={setName}
//           />
//         </View>

//         <View className="flex-row px-10 py-3 rounded-xl bg-[#e4c8c2] mt-[33vh] ml-[60px]">
//           <Icon className="ml-[-15px]" name="envelope" size={20} color="#000" />
//           <TextInput
//             placeholder="E mail"
//             placeholderTextColor="#000"
//             className="ml-5 font-bold"
//             style={{ flex: 1, fontWeight: "600" }}
//             value={email}
//             onChangeText={setEmail}
//           />
//         </View>

//         {/* Password input with eye icon */}
//         <View className="flex-row px-10 py-3 rounded-xl bg-[#e4c8c2] mt-[33vh] ml-[60px] items-center">
//           <Icon className="ml-[-15px]" name="lock" size={20} color="#000" />
//           <TextInput
//             placeholder="Password"
//             placeholderTextColor="#000"
//             className="ml-5 font-bold"
//             style={{ flex: 1, fontWeight: "600" }}
//             value={password}
//             onChangeText={setPassword}
//             secureTextEntry={!showPassword}
//           />
//           <TouchableOpacity onPress={() => setShowPassword((prev) => !prev)}>
//             <Icon
//               name={showPassword ? "eye" : "eye-slash"}
//               size={20}
//               color="#000"
//               style={{ marginLeft: 10 }}
//             />
//           </TouchableOpacity>
//         </View>

//         {/* Confirm Password input with eye icon */}
//         <View className="flex-row px-10 py-3 rounded-xl bg-[#e4c8c2] mt-[33vh] ml-[60px] items-center">
//           <Icon className="ml-[-15px]" name="lock" size={20} color="#000" />
//           <TextInput
//             placeholder="Confirm Password"
//             placeholderTextColor="#000"
//             className="ml-5 font-bold"
//             style={{ flex: 1, fontWeight: "600" }}
//             value={confirmpassword}
//             onChangeText={setConfirmPassword}
//             secureTextEntry={!showConfirmPassword}
//           />
//           <TouchableOpacity onPress={() => setShowConfirmPassword((prev) => !prev)}>
//             <Icon
//               name={showConfirmPassword ? "eye" : "eye-slash"}
//               size={20}
//               color="#000"
//               style={{ marginLeft: 10 }}
//             />
//           </TouchableOpacity>
//         </View>

//         <View className="flex-row px-10 py-3 rounded-xl bg-[#e4c8c2] mt-[33vh] ml-[60px]">
//           <Icon className="ml-[-15px]" name="phone" size={20} color="#000" />
//           <TextInput
//             placeholder="Mobile Number"
//             placeholderTextColor="#000"
//             className="ml-5 font-bold"
//             style={{ flex: 1, fontWeight: "600" }}
//             value={mobileNo}
//             onChangeText={setMobileNo}
//           />
//         </View>

//         <View className="ml-[60px] mt-10 ">
//           {/* Dropdown Button */}
//           <TouchableOpacity
//             onPress={() => setVisible(true)}
//             className="bg-[#e4c8c2] px-10 py-3 rounded-xl flex-row justify-between items-center"
//             style={{ width: 300 }}
//           >
//             <Text className="text-black font-bold">
//               {selected ? selected : "Select Blood Group"}
//             </Text>
//             <Text className="text-black">▼</Text>
//           </TouchableOpacity>

//           {/* Dropdown Modal */}
//           <Modal visible={visible} transparent animationType="fade">
//             <TouchableOpacity
//               className="flex-1 justify-center items-center bg-black/30"
//               onPress={() => setVisible(false)}
//             >
//               <View className="bg-white w-[280px] rounded-lg overflow-hidden">
//                 <FlatList
//                   data={items}
//                   keyExtractor={(item) => item}
//                   renderItem={({ item }) => (
//                     <TouchableOpacity
//                       className="p-3 border-b border-gray-300"
//                       onPress={() => {
//                         setSelected(item);
//                         setBloodType(item);
//                         setVisible(false);
//                       }}
//                     >
//                       <Text className="text-black">{item}</Text>
//                     </TouchableOpacity>
//                   )}
//                 />
//               </View>
//             </TouchableOpacity>
//           </Modal>
//         </View>

//         <View className="absolute top-[650px] w-full ml-[80px]">

//           <Link href="/eligibilityForm/eligibilityOne" asChild>
//             <TouchableOpacity className="bg-[#B43929] w-[250px] py-3 rounded-2xl">
//               <Text className="text-white font-bold text-center">Register</Text>
//             </TouchableOpacity>
//           </Link>

//           <TouchableOpacity
//             className="bg-[#B43929] w-[250px] py-3 rounded-2xl"
//             onPress={() => {
//               console.log("Register button clicked");
//               console.log("Form data:", {
//                 name,
//                 email,
//                 password,
//                 confirmpassword,
//                 mobileNo,
//                 bloodType: selected,
//               });
//               handleRegister();
//             }}
//             disabled={loading}
//           >
//             <Text className="text-white font-bold text-center">
//               {loading ? "Registering..." : "Register"}
//             </Text>
//           </TouchableOpacity>

//         </View>

//         <Text style={{ textAlign: 'center', marginVertical: 20, fontWeight: 'bold' }}>- OR -</Text>

//         <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 20 }}>
//           <Icon name="google" size={22} style={{ marginRight: 20 }} />
//           <Icon name="facebook" size={22} />
//         </View>

//         <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10, marginBottom: 20 }}>
//           <Text style={{ fontWeight: 'bold', color: '#000' }}>Already have an account? </Text>
//           <Link href="/donorLogin" asChild>
//             <Text style={{ fontWeight: 'bold', color: '#B43929' }}>Sign In</Text>
//           </Link>
//         </View>
//         </View>
//       </View>
//     </ScrollView>
//   );
// }

import { Link, useRouter } from "expo-router";
import {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Modal,
  FlatList,
  Alert,
  ScrollView,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import logo2 from "../assets/images/logo2.png";
import Icon from "react-native-vector-icons/FontAwesome";
import { useState } from "react";
import { donorAuthApi } from "../services/api";

export default function DonorRegister() {
  const router = useRouter();
  const [selected, setSelected] = useState("");
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [mobileNo, setMobileNo] = useState("");
  const [bloodType, setBloodType] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const items = ["A+", "A-", "B+", "O+", "O-"];

  const handleRegister = async () => {
    if (!name || !email || !password || !confirmpassword || !mobileNo || !bloodType) {
      setError("Please fill in all required fields");
      return;
    }

    if (password !== confirmpassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const userData = {
        name,
        email,
        password,
        confirmPassword: confirmpassword,
        mobileNo,
        bloodType,
        role: "donor",
      };

      const response = await donorAuthApi.register(userData);

      // Store token
      await AsyncStorage.setItem("userId", response._id); 
      await AsyncStorage.setItem("token", response.token); 


      Alert.alert(
        "Success",
        `Registration successful!\n\nEmail: ${email}\nRole: Donor\nBlood Type: ${bloodType}`,
        [
          {
            text: "OK",
            onPress: () => router.push("/eligibilityForm/eligibilityOne"),
          },
        ]
      );
    } catch (err: any) {
      let errorMessage = err.response?.data?.message || "Registration failed";

      if (errorMessage.includes("User already exists")) {
        Alert.alert(
          "Error",
          "This email is already registered. Please try another email or login."
        );
      } else if (errorMessage.includes("Passwords do not match")) {
        Alert.alert("Error", "The passwords you entered do not match. Please try again.");
      } else if (errorMessage.includes("All fields are required")) {
        Alert.alert("Error", "Please fill in all required fields before proceeding.");
      } else {
        Alert.alert("Error", errorMessage);
      }

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
     <KeyboardAvoidingView
    behavior={Platform.OS === "ios" ? "padding" : "height"}
    style={{ flex: 1 }}
    keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0} // tweak if header overlaps
  >
    <ScrollView contentContainerStyle={{ padding: 20, backgroundColor: "#fff" }}   keyboardShouldPersistTaps="handled">
      <View style={{ alignItems: "center" }}>
        <Image source={logo2} style={{ width: 200, height: 200, resizeMode: "contain" }} />
      </View>

      {/* Input Fields */}
      {[
        {
          icon: "user",
          placeholder: "Full Name",
          value: name,
          onChangeText: setName,
        },
        {
          icon: "envelope",
          placeholder: "E mail",
          value: email,
          onChangeText: setEmail,
        },
        {
          icon: "phone",
          placeholder: "Mobile Number",
          value: mobileNo,
          onChangeText: setMobileNo,
        },
      ].map((item, index) => (
        <View
          key={index}
          style={{
            flexDirection: "row",
            backgroundColor: "#e4c8c2",
            padding: 12,
            borderRadius: 10,
            marginBottom: 15,
            alignItems: "center",
          }}
        >
          <Icon name={item.icon} size={20} color="#000" />
          <TextInput
            placeholder={item.placeholder}
            placeholderTextColor="#000"
            style={{ marginLeft: 15, flex: 1, fontWeight: "600" }}
            value={item.value}
            onChangeText={item.onChangeText}
          />
        </View>
      ))}

      {/* Password */}
      <View
        style={{
          flexDirection: "row",
          backgroundColor: "#e4c8c2",
          padding: 12,
          borderRadius: 10,
          marginBottom: 15,
          alignItems: "center",
        }}
      >
        <Icon name="lock" size={20} color="#000" />
        <TextInput
          placeholder="Password"
          placeholderTextColor="#000"
          style={{ marginLeft: 15, flex: 1, fontWeight: "600" }}
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Icon
            name={showPassword ? "eye" : "eye-slash"}
            size={20}
            color="#000"
            style={{ marginLeft: 10 }}
          />
        </TouchableOpacity>
      </View>

      {/* Confirm Password */}
      <View
        style={{
          flexDirection: "row",
          backgroundColor: "#e4c8c2",
          padding: 12,
          borderRadius: 10,
          marginBottom: 15,
          alignItems: "center",
        }}
      >
        <Icon name="lock" size={20} color="#000" />
        <TextInput
          placeholder="Confirm Password"
          placeholderTextColor="#000"
          style={{ marginLeft: 15, flex: 1, fontWeight: "600" }}
          secureTextEntry={!showConfirmPassword}
          value={confirmpassword}
          onChangeText={setConfirmPassword}
        />
        <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
          <Icon
            name={showConfirmPassword ? "eye" : "eye-slash"}
            size={20}
            color="#000"
            style={{ marginLeft: 10 }}
          />
        </TouchableOpacity>
      </View>

      {/* Blood Type Dropdown */}
      <TouchableOpacity
        onPress={() => setVisible(true)}
        style={{
          backgroundColor: "#e4c8c2",
          padding: 12,
          borderRadius: 10,
          marginBottom: 20,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ color: "#000", fontWeight: "bold" }}>
          {selected ? selected : "Select Blood Group"}
        </Text>
        <Text style={{ color: "#000" }}>▼</Text>
      </TouchableOpacity>

      {/* Modal */}
      <Modal visible={visible} transparent animationType="fade">
        <TouchableOpacity
          onPress={() => setVisible(false)}
          style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#000000aa" }}
        >
          <View style={{ backgroundColor: "white", width: 280, borderRadius: 10 }}>
            <FlatList
              data={items}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={{ padding: 12, borderBottomWidth: 1, borderBottomColor: "#ccc" }}
                  onPress={() => {
                    setSelected(item);
                    setBloodType(item);
                    setVisible(false);
                  }}
                >
                  <Text>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Register Button */}
      <TouchableOpacity
        onPress={handleRegister}
        style={{
          backgroundColor: "#B43929",
          padding: 15,
          borderRadius: 20,
          alignItems: "center",
          marginBottom: 20,
        }}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={{ color: "#fff", fontWeight: "bold" }}>Register</Text>
        )}
      </TouchableOpacity>

      {/* OR Separator */}
      <Text style={{ textAlign: "center", fontWeight: "bold", marginBottom: 10 }}>- OR -</Text>

      {/* Social Icons */}
      <View style={{ flexDirection: "row", justifyContent: "center", marginBottom: 20 }}>
        <Icon name="google" size={22} style={{ marginRight: 20 }} />
        <Icon name="facebook" size={22} />
      </View>

      {/* Link to Login */}
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <Text style={{ fontWeight: "bold", color: "#000" }}>Already have an account? </Text>
        <Link href="/donorLogin" asChild>
          <Text style={{ fontWeight: "bold", color: "#B43929" }}>Sign In</Text>
        </Link>
      </View>
    </ScrollView>
    </KeyboardAvoidingView>
  );
}
