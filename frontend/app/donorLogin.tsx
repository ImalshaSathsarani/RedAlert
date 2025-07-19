import { Link, useRouter } from "expo-router";
import {
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import logo2 from "../assets/images/logo2.png";
import Icon from "react-native-vector-icons/FontAwesome";
import { donorAuthApi } from "../services/api";

export default function DonorLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in both email and password");
      return;
    }

    setLoading(true);

    try {
      const response = await donorAuthApi.login({ email, password });
      
      if (response.token) {
        // Save token in AsyncStorage
        await AsyncStorage.setItem("token", response.token);
        
        // Save user data if it exists
        if (response.user) {
          await AsyncStorage.setItem("user", JSON.stringify(response.user));
        }
        
        Alert.alert("Success", "Login successful!", [
          {
            text: "OK",
            onPress: () => router.push("/home"),
          },
        ]);
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (err: any) {
      console.error("Login error:", err);
      const message =
        err.response?.data?.message || err.message || "Login failed";
      Alert.alert("Error", message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, padding: 20, alignItems: "center" }}>
      <Image
        source={logo2}
        style={{ width: 200, height: 200, marginTop: 20 }}
      />

      {/* Email */}
      <View
        style={{
          flexDirection: "row",
          padding: 12,
          borderRadius: 12,
          backgroundColor: "#e4c8c2",
          marginTop: 30,
          width: "90%",
          maxWidth: 300,
          alignItems: "center",
        }}
      >
        <Icon name="envelope" size={20} color="#000" />
        <TextInput
          placeholder="E-mail"
          placeholderTextColor="#000"
          style={{ marginLeft: 10, flex: 1 }}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
        />
      </View>

      {/* Password */}
      <View
        style={{
          flexDirection: "row",
          padding: 12,
          borderRadius: 12,
          backgroundColor: "#e4c8c2",
          marginTop: 20,
          width: "90%",
          maxWidth: 300,
          alignItems: "center",
        }}
      >
        <Icon name="lock" size={20} color="#000" />
        <TextInput
          placeholder="Password"
          placeholderTextColor="#000"
          style={{ marginLeft: 10, flex: 1 }}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>

      <TouchableOpacity style={{ marginTop: 10, alignSelf: "flex-end" }}>
        <Text style={{ fontWeight: "bold", color: "#000" }}>
          Forgot Password?
        </Text>
      </TouchableOpacity>

      {/* Login Button */}
      <TouchableOpacity
        style={{
          backgroundColor: "#B43929",
          width: 250,
          padding: 12,
          borderRadius: 20,
          marginTop: 30,
        }}
        onPress={handleLogin}
        disabled={loading}
      >
        <Text style={{ color: "#fff", fontWeight: "bold", textAlign: "center" }}>
          {loading ? "Logging in..." : "Login"}
        </Text>
      </TouchableOpacity>

      <Text style={{ marginTop: 20, fontWeight: "bold" }}>- OR -</Text>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginTop: 20,
        }}
      >
        <Icon name="google" size={22} style={{ marginRight: 30 }} />
        <Icon name="facebook" size={22} />
      </View>

      <View style={{ flexDirection: "row", marginTop: 30 }}>
        <Text style={{ fontWeight: "bold", color: "#000" }}>
          Haven't any account?{" "}
        </Text>
        <Link href="/donorRegister" asChild>
          <Text style={{ fontWeight: "bold", color: "#B43929" }}>Sign Up</Text>
        </Link>
      </View>
    </View>
  );
}
