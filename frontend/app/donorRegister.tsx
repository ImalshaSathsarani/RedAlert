import { Link } from "expo-router";
import { Text, View } from "react-native";


export default function Index() {
  //const router = useRouter();
  return (
    <View className = "flex-1 items-center justify-center bg-white">
      <Text className = "text-5xl font-bold text-blue-500">Register</Text>
    <Link href="/eligibilityForm/eligibilityOne" asChild>
    <Text>Eligibility One</Text>
    </Link>
     
    </View>
  );
}
