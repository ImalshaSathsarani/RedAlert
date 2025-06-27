import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function donorLogin() {
  return (
    <View
      className="flex-1 justify-center items-center bg-white"
    >
      <Text className="text-5xl  text-accent ">Login page</Text>

      <Link href="/donorRegister" asChild>
            <Text>Register </Text>
            </Link>
    </View>
  );
}
