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
} from "react-native";
import logo2 from "../assets/images/logo2.png";
import Icon from "react-native-vector-icons/FontAwesome";
import { useState } from "react";
import { donorAuthApi } from "../services/api";

export default function Index() {
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
      console.log("Sending registration data:", {
        name,
        email,
        mobileNo,
        bloodType,
        role: "donor",
      });

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
      console.log("Registration response:", response);

      // Store token
      localStorage.setItem("token", response.token);

      // Show success message with more details
      Alert.alert(
        "Success",
        `Registration successful!\n\nYour account has been created.\nEmail: ${email}\nRole: Donor\nBlood Type: ${bloodType}\n\nYou will be redirected to the home page...`,
        [
          {
            text: "OK",
            onPress: () => router.push("/home"),
            style: "default",
          },
        ]
      );
    } catch (err: any) {
      console.error("Registration error:", err);
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
    <View>
      <View className="absolute items-center ">
        <Image source={logo2} style={{ width: 400, height: 400 }} />
      </View>

      <View className="absolute space-y-3">
        <View className="flex-row px-10 py-3 rounded-xl bg-[#e4c8c2] mt-[33vh] ml-[60px]">
          <Icon className="ml-[-15px]" name="user" size={20} color="#000" />
          <TextInput
            placeholder="Full Name"
            placeholderTextColor="#000"
            className="ml-5 font-bold"
            style={{ flex: 1, fontWeight: "600" }}
            value={name}
            onChangeText={setName}
          />
        </View>

        <View className="flex-row px-10 py-3 rounded-xl bg-[#e4c8c2] mt-[33vh] ml-[60px]">
          <Icon className="ml-[-15px]" name="envelope" size={20} color="#000" />
          <TextInput
            placeholder="E mail"
            placeholderTextColor="#000"
            className="ml-5 font-bold"
            style={{ flex: 1, fontWeight: "600" }}
            value={email}
            onChangeText={setEmail}
          />
        </View>

        {/* Password input with eye icon */}
        <View className="flex-row px-10 py-3 rounded-xl bg-[#e4c8c2] mt-[33vh] ml-[60px] items-center">
          <Icon className="ml-[-15px]" name="lock" size={20} color="#000" />
          <TextInput
            placeholder="Password"
            placeholderTextColor="#000"
            className="ml-5 font-bold"
            style={{ flex: 1, fontWeight: "600" }}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword((prev) => !prev)}>
            <Icon
              name={showPassword ? "eye" : "eye-slash"}
              size={20}
              color="#000"
              style={{ marginLeft: 10 }}
            />
          </TouchableOpacity>
        </View>

        {/* Confirm Password input with eye icon */}
        <View className="flex-row px-10 py-3 rounded-xl bg-[#e4c8c2] mt-[33vh] ml-[60px] items-center">
          <Icon className="ml-[-15px]" name="lock" size={20} color="#000" />
          <TextInput
            placeholder="Confirm Password"
            placeholderTextColor="#000"
            className="ml-5 font-bold"
            style={{ flex: 1, fontWeight: "600" }}
            value={confirmpassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={!showConfirmPassword}
          />
          <TouchableOpacity onPress={() => setShowConfirmPassword((prev) => !prev)}>
            <Icon
              name={showConfirmPassword ? "eye" : "eye-slash"}
              size={20}
              color="#000"
              style={{ marginLeft: 10 }}
            />
          </TouchableOpacity>
        </View>

        <View className="flex-row px-10 py-3 rounded-xl bg-[#e4c8c2] mt-[33vh] ml-[60px]">
          <Icon className="ml-[-15px]" name="phone" size={20} color="#000" />
          <TextInput
            placeholder="Mobile Number"
            placeholderTextColor="#000"
            className="ml-5 font-bold"
            style={{ flex: 1, fontWeight: "600" }}
            value={mobileNo}
            onChangeText={setMobileNo}
          />
        </View>

        <View className="ml-[60px] mt-10 ">
          {/* Dropdown Button */}
          <TouchableOpacity
            onPress={() => setVisible(true)}
            className="bg-[#e4c8c2] px-10 py-3 rounded-xl flex-row justify-between items-center"
            style={{ width: 300 }}
          >
            <Text className="text-black font-bold">
              {selected ? selected : "Select Blood Group"}
            </Text>
            <Text className="text-black">▼</Text>
          </TouchableOpacity>

          {/* Dropdown Modal */}
          <Modal visible={visible} transparent animationType="fade">
            <TouchableOpacity
              className="flex-1 justify-center items-center bg-black/30"
              onPress={() => setVisible(false)}
            >
              <View className="bg-white w-[280px] rounded-lg overflow-hidden">
                <FlatList
                  data={items}
                  keyExtractor={(item) => item}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      className="p-3 border-b border-gray-300"
                      onPress={() => {
                        setSelected(item);
                        setBloodType(item);
                        setVisible(false);
                      }}
                    >
                      <Text className="text-black">{item}</Text>
                    </TouchableOpacity>
                  )}
                />
              </View>
            </TouchableOpacity>
          </Modal>
        </View>

        <View className="absolute top-[650px] w-full ml-[80px]">

          <Link href="/eligibilityForm/eligibilityOne" asChild>
            <TouchableOpacity className="bg-[#B43929] w-[250px] py-3 rounded-2xl">
              <Text className="text-white font-bold text-center">Register</Text>
            </TouchableOpacity>
          </Link>

          <TouchableOpacity
            className="bg-[#B43929] w-[250px] py-3 rounded-2xl"
            onPress={() => {
              console.log("Register button clicked");
              console.log("Form data:", {
                name,
                email,
                password,
                confirmpassword,
                mobileNo,
                bloodType: selected,
              });
              handleRegister();
            }}
            disabled={loading}
          >
            <Text className="text-white font-bold text-center">
              {loading ? "Registering..." : "Register"}
            </Text>
          </TouchableOpacity>

        </View>

        <Text className="absolute top-[720px] left-[180px] font-bold">
          - OR -
        </Text>

        <View className="flex-row absolute top-[760px] left-[175px]">
          <Icon name="google" size={22} />
          <Icon className="ml-[20px]" name="facebook" size={22} />
        </View>

        <View className="flex-row justify-center items-center absolute top-[810px] w-full ml-[20px]">
          <Text className="font-bold text-black">
            Already have an account?{" "}
          </Text>
          <Link href="/donorLogin" asChild>
            <Text className="font-bold text-[#B43929] ml-1">Sign In</Text>
          </Link>
        </View>
      </View>
    </View>
  );
}