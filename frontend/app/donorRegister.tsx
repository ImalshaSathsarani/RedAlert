import { Link } from "expo-router";
import {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Modal,
  FlatList,
} from "react-native";
import logo2 from "../assets/images/logo2.png";
import Icon from "react-native-vector-icons/FontAwesome";
import RNPickerSelect from "react-native-picker-select";
import { useState } from "react";

export default function Index() {
  const [selected, setSelected] = useState("");
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmpassword, setconfirmPassword] = useState("")
  const [mobileNo, setmobileNo] = useState("")

  const items = ["A+", "A-", "B+", "O+", "O-"];

  //const router = useRouter();
  return (
    <View>
      <View className="absolute items-center ">
        <Image source={logo2} style={{ width: 400, height: 400 }} />
      </View>

      <View className="absolute space-y-3">
        <View className="flex-row px-10 py-3 rounded-xl bg-[#e4c8c2] mt-[33vh] ml-[60px] ">
          <Icon className="ml-[-15px]" name="user" size={20} color="#00000" />
          <TextInput
            placeholder="Full Name"
            placeholderTextColor="#00000"
            className="ml-5 font-bold"
            value={name}
            onChangeText={setName}
          />
        </View>

        <View className="flex-row px-10 py-3 rounded-xl bg-[#e4c8c2] mt-[33vh] ml-[60px] ">
          <Icon className="ml-[-15px]" name="user" size={20} color="#00000" />
          <TextInput
            placeholder="E mail"
            placeholderTextColor="#00000"
            className="ml-5 font-bold"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View className="flex-row px-10 py-3 rounded-xl bg-[#e4c8c2] mt-[33vh] ml-[60px] ">
          <Icon className="ml-[-15px]" name="lock" size={20} color="#00000" />
          <TextInput
            placeholder="Password"
            placeholderTextColor="#00000"
            className="ml-5 font-bold"
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <View className="flex-row px-10 py-3 rounded-xl bg-[#e4c8c2] mt-[33vh] ml-[60px] ">
          <Icon className="ml-[-15px]" name="lock" size={20} color="#00000" />
          <TextInput
            placeholder="Confirm Password"
            placeholderTextColor="#00000"
            className="ml-5 font-bold"
            value={confirmpassword}
            onChangeText={setconfirmPassword}
          />
        </View>

        <View className="flex-row px-10 py-3 rounded-xl bg-[#e4c8c2] mt-[33vh] ml-[60px] ">
          <Icon className="ml-[-15px]" name="phone" size={20} color="#00000" />
          <TextInput
            placeholder="Mobile Number"
            placeholderTextColor="#00000"
            className="ml-5 font-bold"
            value={mobileNo}
            onChangeText={setmobileNo}
          />
        </View>

        {/* <View className="flex-row items-center px-6 py-3 rounded-xl bg-[#e4c8c2] mt-[33vh] ml-[60px] w-[260px]">
          <RNPickerSelect
            onValueChange={(value) => setSelected(value)}
            value={selected}
            placeholder={{ label: "Select Blood Group", value: null }}
            items={[
              { label: "A+", value: "A+" },
              { label: "A-", value: "A-" },
              { label: "B+", value: "B+" },
              { label: "O+", value: "O+" },
            ]}
            style={{
              viewContainer: {
                backgroundColor: "#e4c8c2", // Match parent view
                borderRadius: 12,
              },
              inputIOS: {
                backgroundColor: "#e4c8c2",
                color: "#000",
                fontSize: 16,
                paddingVertical: 10,
                paddingLeft: 8,
                paddingRight: 20,
                borderRadius: 12,
              },
              inputAndroid: {
                backgroundColor: "#e4c8c2",
                color: "#000",
                fontSize: 16,
                paddingVertical: 8,
                paddingLeft: 8,
                paddingRight: 20,
                borderRadius: 12,
              },
              iconContainer: {
                right: 10,
              },
            }}
            useNativeAndroidPickerStyle={false}
          />
        </View> */}

        <View className="ml-[60px] mt-10 ">
          {/* Dropdown Button */}
          <TouchableOpacity
            onPress={() => setVisible(true)}
            className="bg-[#e4c8c2] px-10 py-3 rounded-xl flex-row justify-between items-center"
            style={{ width: 300 }} // OR use Tailwind width classes like w-[260px]
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
