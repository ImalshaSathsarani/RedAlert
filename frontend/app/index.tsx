import { Link } from "expo-router";
import { Text, View } from "react-native";


export default function Index() {
  //const router = useRouter();
  return (
    <View className = "flex-1 items-center justify-center bg-white">
      <Text className = "text-5xl font-bold text-blue-500">Welcome!</Text>
      <Link href="/donorLogin" asChild>
      <Text>Get Started </Text>
      </Link>
     
     
    </View>
  );
}
