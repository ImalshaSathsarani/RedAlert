import { Text, View } from "react-native";
import { Link, useRouter } from "expo-router";

export default function Home() {
  return (
    <View
      className="flex-1 justify-center items-center bg-white"
    >
      <Text className="text-5xl  text-accent ">Home now</Text>
      <Link href="/notification" asChild>
            <Text>Notification</Text>
      </Link>
    </View>
  );
}
