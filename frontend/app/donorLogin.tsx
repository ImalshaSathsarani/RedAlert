import { Link } from "expo-router";
import { Text, TextInput, View, Image, TouchableOpacity } from "react-native";
import GetStartedBackground from "./getStartedBackground";
import logo2 from "../assets/images/logo2.png";
import Icon from "react-native-vector-icons/FontAwesome";
import { useState } from "react";

export default function donorLogin() {

  const [email, setEmail] = useState("")
  const [Password, setPassword] = useState("")




  return (
    <View>
      <View className="absolute items-center">
        <Image source={logo2} style={{ width: 400, height: 400 }} />
      </View>

      <View className="flex-row justify-between  absolute px-8 py-3 rounded-2xl bg-[#e4c8c2]  top-[330px] left-[70px]  border-black">
        <Icon className="ml-[-10px]" name="user" size={20} color="#00000" />
        <TextInput
          placeholder="E-mail"
          placeholderTextColor="#00000"
          className="ml-5 font-bold"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <View className="flex-row justify-between  absolute px-8 py-3 rounded-2xl bg-[#e4c8c2]  top-[400px] left-[70px]  border-black">
        <Icon className="ml-[-10px]" name="lock" size={20} color="#000000" />
        <TextInput
          placeholder="Password"
          placeholderTextColor="#00000"
          className="ml-5 font-bold"
          value={Password}
          onChangeText={setPassword}
        />
      </View>

      <View className="absolute top-[470px] left-[220px]">
        <Text className="font-bold text-[#000]">Forgot Password</Text>
      </View>

      <View className="absolute top-[540px] w-full items-center ">
        <TouchableOpacity className="bg-[#B43929]  w-[250px] py-3 rounded-2xl">
          <Text className="text-white font-bold text-center">Login</Text>
        </TouchableOpacity>
      </View>

      <Text className="absolute top-[610px] left-[180px] font-bold">
        - OR -
      </Text>

      <View className="flex-row absolute top-[660px] left-[175px]">
        <Icon name="google" size={22} />
        <Icon className="ml-[20px]" name="facebook" size={22} />
      </View>

      <View className="flex-row justify-center items-center absolute top-[750px] w-full">
        <Text className="font-bold text-black">Haven't any account? </Text>
        <Link href="/donorRegister" asChild>
          <Text className="font-bold text-[#B43929] ml-1">Sign Up</Text>
        </Link>
      </View>
    </View>
  );
}
