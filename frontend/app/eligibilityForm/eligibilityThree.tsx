// import {  useRouter } from "expo-router";
// import {
//   Dimensions,
//   Platform,
 
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import GetStartedBackground from "../getStartedBackground";

// import { useState, useEffect } from "react";
// import { Entypo } from "@expo/vector-icons";
// import { useEligibility } from "../contexts/EligibilityContext";
// import DropDownPicker from "react-native-dropdown-picker";


// const { width, height } = Dimensions.get("window");

// export default function EligibilityThree() {
//   const router = useRouter();
//   const eligibilityContext = useEligibility();
//   const formData = eligibilityContext?.formData || {};
//   const updateFormData = eligibilityContext?.updateFormData || (() => {});
//   const Surgery6Months = formData.Surgery6Months || "";
//   const Allergies = formData.Allergies || "";
//   const ColdFever7Days = formData.ColdFever7Days || "";
//   const [allergyOpen, setAllergyOpen] = useState(false);
//   const [selectedAllergies, setSelectedAllergies] = useState<string[]>([]);

 

// useEffect(() => {
//   if (formData.AllergyDetails) {
//     setSelectedAllergies(formData.AllergyDetails);
//   }
// }, []);


//   const allergyItems = [
//   { label: "Pollen", value: "Pollen" },
//   { label: "Dust", value: "Dust" },
//   { label: "Food (Nuts, Shellfish, etc.)", value: "Food" },
//   { label: "Medication (e.g., Penicillin)", value: "Medication" },
//   { label: "Latex", value: "Latex" },
//   { label: "Bee/Wasps", value: "Bee/Wasps" },
//   { label: "None", value: "None" },
//   { label: "Other", value: "Other" },
// ];


  

 
//   type CheckBoxProps = {
//     label: string;
//     value: string;
//     selected: string;
//     onSelect: (value: string) => void;
//   };

//   const CheckBox = ({ label, value, selected, onSelect }: CheckBoxProps) => (
//     <TouchableOpacity
//       onPress={() => onSelect(value)}
//       className="flex-row items-center my-1"
//     >
//       <View className="w-5 h-5 border border-secondary rounded mr-2 justify-center items-center ml-5">
//         {selected === value && (
//           <Entypo name="check" size={16} color="#E72929" />
//         )}
//       </View>
//       <Text className="text-md font-poppins text-accent">{label}</Text>
//     </TouchableOpacity>
//   );

//   return (
//     <GetStartedBackground>
//       <View className="px-6 mt-20  w-full">
//         <Text className="text-3xl mb-4">Are you Eligible for Donate?</Text>
//         <Text className="text-lg  text-[#FFBFBF]">
//           This quick health check helps us determine if you
//                        are currently eligible to donate blood safely. This is a quick check and when donating blood you will again be checked.
//         </Text>
//         <View className="flex-row justify-between mt-6">
//           <TouchableOpacity
//             onPress={() =>
//               router.push("/eligibilityForm/eligibilityOne" as any)
//             }
//             className="bg-[#FFBFBF] h-[2px]"
//             style={{ width: width / 10 }}
//           />
//           <TouchableOpacity
//             onPress={() =>
//               router.push("/eligibilityForm/eligibilityTwo" as any)
//             }
//             className="bg-[#FFBFBF] h-[2px] ml-2"
//             style={{ width: width / 10 }}
//           />
//           <TouchableOpacity
//             onPress={() =>
//               router.push("/eligibilityForm/eligibilityThree" as any)
//             }
//             className="bg-primary h-[2px] ml-2"
//             style={{ width: width / 10 }}
//           />
//           <TouchableOpacity
//             onPress={() =>
//               router.push("/eligibilityForm/eligibilityFour" as any)
//             }
//             className="bg-[#FFBFBF] h-[2px] ml-2"
//             style={{ width: width / 10 }}
//           />
//           <TouchableOpacity
//             onPress={() =>
//               router.push("/eligibilityForm/eligibilityFive" as any)
//             }
//             className="bg-[#FFBFBF] h-[2px] ml-2"
//             style={{ width: width / 10 }}
//           />
//           <TouchableOpacity
//             onPress={() =>
//               router.push("/eligibilityForm/eligibilitySix" as any)
//             }
//             className="bg-[#FFBFBF] h-[2px] ml-2 "
//             style={{ width: width / 10 }}
//           />
//           <TouchableOpacity
//             onPress={() =>
//               router.push("/eligibilityForm/eligibilitySeven" as any)
//             }
//             className="bg-[#FFBFBF] h-[2px] ml-2 "
//             style={{ width: width / 10 }}
//           />
//         </View>{" "}
//         as any
//         <View
//           className="border border-secondary bg-white mt-6 ml-2 rounded-md items-center"
//           style={{
//             height: height / 1.5,
//             width: width / 1.2,
//           }}
//         >
//           <Text className="text-2xl text-secondary text-center mt-5">
//             Health Status
//           </Text>

//           <View className="w-full px-5 mt-3">
//             <Text className="text-lg text-secondary mb-2  ">
//               Have you had any cold, fever, or infection in the past 7 days?
//             </Text>
//             <View className="flex-row  space-x-8 mt-3">
//               <CheckBox
//                 label="Yes"
//                 value="Yes"
//                 selected={ColdFever7Days}
//                 onSelect={(val)=> updateFormData('ColdFever7Days',val)}
//               />
//               <CheckBox
//                 label="No"
//                 value="No"
//                 selected={ColdFever7Days}
//                 onSelect={(val)=> updateFormData('ColdFever7Days',val)}
//               />
//             </View>
//           </View>

//           <View className="w-full px-5 mt-5">
//             <Text className="text-lg text-secondary mb-2  ">
//               Have you undergone any surgery in the past 6 months?
//             </Text>
//             <View className="flex-row  space-x-8 mt-3">
//               <CheckBox
//                 label="Yes"
//                 value="Yes"
//                 selected={Surgery6Months}
//                 onSelect={(val)=> updateFormData('Surgery6Months', val)}
//               />
//               <CheckBox
//                 label="No"
//                 value="No"
//                 selected={Surgery6Months}
//                 onSelect={(val)=> updateFormData('Surgery6Months', val)}
//               />
//             </View>
//           </View>

//           <View className="w-full px-5 mt-5">
//             <Text className="text-lg text-secondary mb-2  ">
//               Do you have any known allergies?
//             </Text>
//             <View className="flex-row  space-x-8 mt-3">
//               <CheckBox
//                 label="Yes"
//                 value="Yes"
//                 selected={Allergies}
//                 onSelect={(val)=>updateFormData('Allergies', val)}
//               />
//               <CheckBox
//                 label="No"
//                 value="No"
//                 selected={Allergies}
//                 onSelect={(val)=>updateFormData('Allergies', val)}
//               />
//             </View>
//           </View>

//           {/* <View className="w-full px-5 mt-5 ">
//             <Text className="text-lg text-secondary mb-2 ">
//               If yes, Specify
//             </Text>
//             <TextInput className="text-accent border border-secondary rounded-xl px-4 py-2 w-[250px] h-[70px] mt-2" />
//           </View> */}
         
//   <View className="w-full px-5 mt-3 z-50">
//     <Text className="text-lg text-secondary mb-2">
//       If yes, specify (Allergies),If no,Select &quot;None&quot;
//     </Text>
//     <DropDownPicker
//       open={allergyOpen}
//       value={selectedAllergies}
//       items={allergyItems}
//       setOpen={setAllergyOpen}
//       setValue={setSelectedAllergies}
//       multiple={true}
//       min={0}
//       max={10}
//       listMode="SCROLLVIEW"
//       placeholder="Select Allergies"
//       onChangeValue={(values) => {
//         const val = (values ?? []) as string[];
//         setSelectedAllergies(val);
//         updateFormData("AllergyDetails", val);
//       }}
//       style={{ borderColor: "#ccc", zIndex: 3000 }}
//       dropDownContainerStyle={{ borderColor: "#ccc", zIndex: 3000 }}
//       zIndex={3000}
//       containerStyle={{ marginBottom: allergyOpen ? 250 : 20 }}
//     />
//   </View>



//           {/* 
// <View className="w-full px-5 mt-3">
//     <Text className="text-lg text-secondary mb-2  ">Have you received any vaccination in the last 4 weeks?</Text>
// <View className="flex-row  space-x-8">
//     <CheckBox label="Yes" value="yes" selected={vaccine} onSelect={setVaccine} />
//     <CheckBox label="No" value="no" selected={vaccine} onSelect={setVaccine}/>
// </View>

// </View>
 

// <View className="w-full px-5 mt-3">
//     <Text className="text-lg text-secondary mb-2 ">If yes, Specify</Text>
//  <TextInput
//     className= "text-accent border border-secondary rounded-xl px-4 py-2 w-[250px] h-[70px] mt-2"
//  />
// </View> */}

//           {/* <Text className="text-lg text-secondary mt-3  ">Have you had any cold, fever, or infection in the past 7 days?</Text>
// <View className="flex-row  justify-between">
//     <CheckBox label="Yes" value="yes" selected={cold} onSelect={setCold} />
//     <CheckBox label="No" value="no" selected={cold} onSelect={setCold}/>
// </View>
//  */}
//         </View>
//         <TouchableOpacity
//           onPress={() => router.push("/eligibilityForm/eligibilityFour" as any)}
//           className="mt-4 px-12 py-3  rounded-2xl self-center mb-5"
//           style={{ backgroundColor: "#E72929" }}
//         >
//           <Text className="text-white text-xl font-semibold">Next</Text>
//         </TouchableOpacity>
//       </View>
//     </GetStartedBackground>
//   );
// }
import { useRouter } from "expo-router";
import {
  Dimensions,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ScrollView,
} from "react-native";
import GetStartedBackground from "../getStartedBackground";
import { useState, useEffect } from "react";
import { Entypo } from "@expo/vector-icons";
import { useEligibility } from "../../contexts/EligibilityContext";
import MultiSelect from "react-native-multiple-select";

const { width, height } = Dimensions.get("window");

export default function EligibilityThree() {
  const router = useRouter();
  const eligibilityContext = useEligibility();
  const formData = eligibilityContext?.formData || {};
  const updateFormData = eligibilityContext?.updateFormData || (() => {});
  const Surgery6Months = formData.Surgery6Months || "";
  const Allergies = formData.Allergies || "";
  const ColdFever7Days = formData.ColdFever7Days || "";
  const [selectedAllergies, setSelectedAllergies] = useState<string[]>([]);

  const allergyItems = [
    { id: "Pollen", name: "Pollen" },
    { id: "Dust", name: "Dust" },
    { id: "Food", name: "Food (Nuts, Shellfish, etc.)" },
    { id: "Medication", name: "Medication (e.g., Penicillin)" },
    { id: "Latex", name: "Latex" },
    { id: "Bee/Wasps", name: "Bee/Wasps" },
   
    { id: "Other", name: "Other" },
  ];

  useEffect(() => {
    if (formData.AllergyDetails) {
      setSelectedAllergies(formData.AllergyDetails);
    }
  }, []);

  const onSelectedAllergyChange = (items: string[]) => {
    setSelectedAllergies(items);
    updateFormData("AllergyDetails", items);
  };

  const CheckBox = ({
    label,
    value,
    selected,
    onSelect,
  }: {
    label: string;
    value: string;
    selected: string;
    onSelect: (value: string) => void;
  }) => (
    <TouchableOpacity
      onPress={() => onSelect(value)}
      className="flex-row items-center my-1"
    >
      <View className="w-5 h-5 border border-tertiary rounded mr-2 justify-center items-center ml-5">
        {selected === value && <Entypo name="check" size={16} color="#E72929" />}
      </View>
      <Text className="text-md font-poppins text-accent">{label}</Text>
    </TouchableOpacity>
  );

  return (
    <GetStartedBackground>
      <ScrollView className="px-6 mt-20 w-full">
        <Text className="text-3xl mb-4">Are you Eligible for Donate?</Text>
        <Text className="text-lg text-tertiary">
          This quick health check helps us determine if you are currently eligible
          to donate blood safely. This is a quick check and when donating blood
          you will again be checked.
        </Text>

        <View className="flex-row justify-between mt-6">
          {Array.from({ length: 7 }).map((_, i) => (
            <TouchableOpacity
              key={i}
              onPress={() =>
                router.push(`/eligibilityForm/eligibility${i + 1}` as any)
              }
              className={`h-[2px] ml-2 ${
                i === 2 ? "bg-primary" : "bg-[#FFBFBF]"
              }`}
              style={{ width: width / 10 }}
            />
          ))}
        </View>

        <ScrollView
          // className="border border-secondary bg-white mt-6 ml-2 rounded-md items-center"
          // style={{ height: height / 1.5, width: width / 1.2 }}
          style={{ width: width / 1.2 }}
          contentContainerStyle={{
            borderWidth: 1,
            borderColor: "#B43929",
            backgroundColor: "#fff",
            marginTop: 24,
            marginLeft: 8,
            borderRadius: 12,
            alignItems: "center",
            paddingBottom: 40,
          }}
        >
          <Text className="text-2xl text-tertiary text-center mt-5">
            Health Status
          </Text>

          <View className="w-full px-5 mt-3">
            <Text className="text-lg text-tertiary mb-2">
              Have you had any cold, fever, or infection in the past 7 days?
            </Text>
            <View className="flex-row space-x-8 mt-3">
              <CheckBox
                label="Yes"
                value="Yes"
                selected={ColdFever7Days}
                onSelect={(val) => updateFormData("ColdFever7Days", val)}
              />
              <CheckBox
                label="No"
                value="No"
                selected={ColdFever7Days}
                onSelect={(val) => updateFormData("ColdFever7Days", val)}
              />
            </View>
          </View>

          <View className="w-full px-5 mt-5">
            <Text className="text-lg text-tertiary mb-2">
              Have you undergone any surgery in the past 6 months?
            </Text>
            <View className="flex-row space-x-8 mt-3">
              <CheckBox
                label="Yes"
                value="Yes"
                selected={Surgery6Months}
                onSelect={(val) => updateFormData("Surgery6Months", val)}
              />
              <CheckBox
                label="No"
                value="No"
                selected={Surgery6Months}
                onSelect={(val) => updateFormData("Surgery6Months", val)}
              />
            </View>
          </View>

          <View className="w-full px-5 mt-5">
            <Text className="text-lg text-tertiary mb-2">
              Do you have any known allergies?
            </Text>
            <View className="flex-row space-x-8 mt-3">
              <CheckBox
                label="Yes"
                value="Yes"
                selected={Allergies}
                onSelect={(val: string) => {
                   updateFormData("Allergies", val);
                   if (val === "No") {
                     updateFormData("AllergiesDetails", ["None"]);
                     setSelectedAllergies(["None"]);
                   } else {
                     updateFormData("AllergiesDetails", []); // Clear if user switches to Yes
                     setSelectedAllergies([]);
                   }
                 }}
              />
              <CheckBox
                label="No"
                value="No"
                selected={Allergies}
                onSelect={(val: string) => {
                   updateFormData("Allergies", val);
                   if (val === "No") {
                     updateFormData("AllergyDetails", ["None"]);
                     setSelectedAllergies(["None"]);
                   } else {
                     updateFormData("AllergyDetails", []); // Clear if user switches to Yes
                     setSelectedAllergies([]);
                   }
                 }}
              />
            </View>
          </View>

          {Allergies === "Yes" && (
            <View className="w-full px-5 mt-3 z-50">
              <Text className="text-lg text-tertiary mb-2">
                If yes, specify (Allergies) 
              </Text>
              <MultiSelect
                items={allergyItems}
                uniqueKey="id"
                onSelectedItemsChange={onSelectedAllergyChange}
                selectedItems={selectedAllergies}
                selectText="Select Allergies"
                searchInputPlaceholderText="Search..."
                tagRemoveIconColor="#E72929"
                tagBorderColor="#E72929"
                tagTextColor="#E72929"
                selectedItemTextColor="#E72929"
                selectedItemIconColor="#E72929"
                itemTextColor="#000"
                displayKey="name"
                submitButtonColor="#E72929"
                submitButtonText="Confirm"
                styleMainWrapper={{ marginBottom: 10 }}
              />
            </View>
          )}
        </ScrollView>

        {/* <TouchableOpacity
          onPress={() => router.push("/eligibilityForm/eligibilityFour" as any)}
          className="mt-4 px-12 py-3 rounded-2xl self-center mb-5"
          style={{ backgroundColor: "#E72929" }}
        >
          <Text className="text-white text-xl font-semibold">Next</Text>
        </TouchableOpacity> */}
        <View className="flex-row justify-between mt-6 mb-10 px-10">
  <TouchableOpacity
    onPress={() => router.push("/eligibilityForm/eligibilityTwo")}
    className="px-10 py-3 rounded-2xl"
    style={{ backgroundColor: '#BFBFBF' }}
  >
    <Text className="text-white text-xl font-semibold">Previous</Text>
  </TouchableOpacity>

  <TouchableOpacity
    onPress={() => router.push("/eligibilityForm/eligibilityFour")}
    className="px-10 py-3 rounded-2xl"
    style={{ backgroundColor: '#E72929' }}
  >
    <Text className="text-white text-xl font-semibold">Next</Text>
  </TouchableOpacity>
</View>

      </ScrollView>
    </GetStartedBackground>
  );
}
