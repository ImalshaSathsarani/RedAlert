import { Link, useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";


export default function Index() {
  const router = useRouter();
  return (
    <View className = "flex-1 items-center justify-center bg-white">
      <Text className = "text-5xl font-bold text-blue-500">Welcome!</Text>
      <Pressable onPress =  {() => router.replace('/home')}>
      <Text>Home </Text>
      </Pressable>
     
    </View>
  );
}
