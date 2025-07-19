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
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage"; // ✅
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

  const items = ["A+", "A-", "B+", "O+", "O-"];

  const handleRegister = async () => {
    if (!name || !email || !password || !confirmpassword || !mobileNo || !bloodType) {
      Alert.alert("Error", "Please fill in all required fields");
      return;
    }

    if (password !== confirmpassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const userData = {
        name,
        email,
        password,
        confirmPassword: confirmpassword,
        mobileNo,
        bloodType,
      };

      const response = await donorAuthApi.register(userData);

      // ✅ Store token in AsyncStorage for mobile
      await AsyncStorage.setItem("token", response.token);

      Alert.alert("Success", "Registration successful!", [
        {
          text: "OK",
          onPress: () => router.push("/home"),
        },
      ]);
    } catch (err: any) {
      console.error("Registration error:", err);
      let errorMessage = err.response?.data?.message || "Registration failed";
      Alert.alert("Error", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={{ alignItems: "center", padding: 20 }}>
      <Image source={logo2} style={{ width: 200, height: 200, marginTop: 20 }} />

      {/* Full Name */}
      <View style={{ flexDirection: "row", padding: 10, borderRadius: 10, backgroundColor: "#e4c8c2", marginTop: 10, width: 300 }}>
        <Icon name="user" size={20} color="#000" />
        <TextInput
          placeholder="Full Name"
          placeholderTextColor="#000"
          style={{ marginLeft: 10, flex: 1 }}
          value={name}
          onChangeText={setName}
        />
      </View>

      {/* Email */}
      <View style={{ flexDirection: "row", padding: 10, borderRadius: 10, backgroundColor: "#e4c8c2", marginTop: 10, width: 300 }}>
        <Icon name="envelope" size={20} color="#000" />
        <TextInput
          placeholder="Email"
          placeholderTextColor="#000"
          style={{ marginLeft: 10, flex: 1 }}
          value={email}
          onChangeText={setEmail}
        />
      </View>

      {/* Password */}
      <View style={{ flexDirection: "row", padding: 10, borderRadius: 10, backgroundColor: "#e4c8c2", marginTop: 10, width: 300, alignItems: "center" }}>
        <Icon name="lock" size={20} color="#000" />
        <TextInput
          placeholder="Password"
          placeholderTextColor="#000"
          style={{ marginLeft: 10, flex: 1 }}
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Icon name={showPassword ? "eye" : "eye-slash"} size={20} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Confirm Password */}
      <View style={{ flexDirection: "row", padding: 10, borderRadius: 10, backgroundColor: "#e4c8c2", marginTop: 10, width: 300, alignItems: "center" }}>
        <Icon name="lock" size={20} color="#000" />
        <TextInput
          placeholder="Confirm Password"
          placeholderTextColor="#000"
          style={{ marginLeft: 10, flex: 1 }}
          secureTextEntry={!showConfirmPassword}
          value={confirmpassword}
          onChangeText={setConfirmPassword}
        />
        <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
          <Icon name={showConfirmPassword ? "eye" : "eye-slash"} size={20} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Mobile Number */}
      <View style={{ flexDirection: "row", padding: 10, borderRadius: 10, backgroundColor: "#e4c8c2", marginTop: 10, width: 300 }}>
        <Icon name="phone" size={20} color="#000" />
        <TextInput
          placeholder="Mobile Number"
          placeholderTextColor="#000"
          style={{ marginLeft: 10, flex: 1 }}
          value={mobileNo}
          onChangeText={setMobileNo}
        />
      </View>

      {/* Blood Group Dropdown */}
      <TouchableOpacity
        onPress={() => setVisible(true)}
        style={{ backgroundColor: "#e4c8c2", padding: 10, borderRadius: 10, flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 10, width: 300 }}
      >
        <Text style={{ color: "#000", fontWeight: "bold" }}>
          {selected ? selected : "Select Blood Group"}
        </Text>
        <Text style={{ color: "#000" }}>▼</Text>
      </TouchableOpacity>

      <Modal visible={visible} transparent animationType="fade">
        <TouchableOpacity
          style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.3)" }}
          onPress={() => setVisible(false)}
        >
          <View style={{ backgroundColor: "white", width: 280, borderRadius: 10, overflow: "hidden" }}>
            <FlatList
              data={items}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={{ padding: 10, borderBottomWidth: 1, borderColor: "#ccc" }}
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
        style={{ backgroundColor: "#B43929", padding: 10, borderRadius: 20, marginTop: 20, width: 250 }}
        onPress={handleRegister}
        disabled={loading}
      >
        <Text style={{ color: "#fff", fontWeight: "bold", textAlign: "center" }}>
          {loading ? "Registering..." : "Register"}
        </Text>
      </TouchableOpacity>

      <Text style={{ marginTop: 20, fontWeight: "bold" }}>- OR -</Text>

      <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 10 }}>
        <Icon name="google" size={22} style={{ marginRight: 20 }} />
        <Icon name="facebook" size={22} />
      </View>

      <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 20 }}>
        <Text style={{ fontWeight: "bold", color: "#000" }}>Already have an account? </Text>
        <Link href="/donorLogin" asChild>
          <Text style={{ fontWeight: "bold", color: "#B43929" }}>Sign In</Text>
        </Link>
      </View>
    </ScrollView>
  );
}
