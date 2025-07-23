// import { useRouter } from "expo-router";
// import { Dimensions,  Text, TextInput, TouchableOpacity, View } from "react-native";
// import GetStartedBackground from "../getStartedBackground";
// import { useEffect, useState } from "react";
// import { Entypo } from "@expo/vector-icons";
// import { useEligibility } from "../contexts/EligibilityContext";
// import DropDownPicker from "react-native-dropdown-picker";


// const { width,height } = Dimensions.get("window");

// export default function EligibilityFour() {
//   const router = useRouter();
//   const eligibilityContext = useEligibility();
//   const formData = eligibilityContext?.formData || {};
//   const updateFormData = eligibilityContext?.updateFormData || (() => {});
//   const Vaccinated4Weeks = formData.Vaccinated4Weeks || "";
//   const [vaccineDropdownOpen, setVaccineDropdownOpen] = useState(false);
//   const [selectedVaccines, setSelectedVaccines] = useState<string[]>([]);

//   useEffect(() => {
//   if (formData.VaccineDetails) {
//     setSelectedVaccines(formData.VaccineDetails);
//   }
//   }, []);

//   const vaccineItems = [
//   { label: "COVID-19 Vaccine", value: "COVID-19 Vaccine" },
//   { label: "Hepatitis B", value: "Hepatitis B" },
//   { label: "Influenza (Flu Shot)", value: "Influenza" },
//   { label: "Yellow Fever", value: "Yellow Fever" },
//   { label: "Typhoid", value: "Typhoid" },
//   { label: "Tetanus", value: "Tetanus" },
//   { label: "Rabies", value: "Rabies" },
//   { label: "Measles/Mumps/Rubella (MMR)", value: "MMR" },
//   { label: "None", value: "None" },
//   { label: "Other", value: "Other" },
// ];




 
//   type CheckBoxProps = {
//       label: string;
//       value: string;
//       selected: string;
//       onSelect: (value: string) => void;
//     };

//   const CheckBox = ({label, value, selected, onSelect}: CheckBoxProps)=>(
//     <TouchableOpacity
//       onPress={()=>onSelect(value)}
//       className="flex-row items-center my-1">
//         <View className="w-5 h-5 border border-secondary rounded mr-2 justify-center items-center ml-5">
//             {selected === value && <Entypo name="check" size={16}  color="#E72929"/>}
//         </View>
//         <Text className="text-md font-poppins text-accent">{label}</Text>

//     </TouchableOpacity>
//   )

//   return (
     
//    <GetStartedBackground>
//      <View className="px-6 mt-20  w-full">
//         <Text className="text-3xl mb-4">Are you Eligible for Donate?</Text>
//         <Text className="text-lg  text-[#FFBFBF]">This quick health check helps us determine if you
//                        are currently eligible to donate blood safely. This is a quick check and when donating blood you will again be checked.</Text>


// <View className="flex-row justify-between mt-6">
//   <TouchableOpacity onPress={()=>router.push('/eligibilityForm/eligibilityOne' as any)} className="bg-[#FFBFBF] h-[2px]" style={{ width:width/10}}/>
//   <TouchableOpacity onPress={()=>router.push('/eligibilityForm/eligibilityTwo' as any)} className="bg-[#FFBFBF] h-[2px] ml-2" style={{ width:width/10}}/>
//   <TouchableOpacity onPress={()=>router.push('/eligibilityForm/eligibilityThree' as any)} className="bg-[#FFBFBF] h-[2px] ml-2" style={{ width:width/10}}/>
//   <TouchableOpacity onPress={()=>router.push('/eligibilityForm/eligibilityFour' as any )} className="bg-primary h-[2px] ml-2" style={{ width:width/10}}/>
//   <TouchableOpacity onPress={()=>router.push('/eligibilityForm/eligibilityFive' as any)} className="bg-[#FFBFBF] h-[2px] ml-2" style={{ width:width/10}}/>
//   <TouchableOpacity onPress={()=>router.push('/eligibilityForm/eligibilitySix' as any)} className="bg-[#FFBFBF] h-[2px] ml-2 " style={{ width:width/10}}/>
//   <TouchableOpacity onPress={()=>router.push('/eligibilityForm/eligibilitySeven' as any)} className="bg-[#FFBFBF] h-[2px] ml-2 " style={{ width:width/10}}/>
// </View>

// <View className="border border-secondary bg-white mt-6 ml-2 rounded-md items-center" style={{
//   height:height/1.55,
//   width:width/1.2
// }} >
// <Text className="text-2xl text-secondary text-center mt-5">Health Status</Text>





// <View className="w-full px-5 mt-3">
//     <Text className="text-lg text-secondary mb-2  ">Have you received any vaccination in the last 4 weeks?</Text>
// <View className="flex-row  space-x-8">
//     <CheckBox label="Yes" value="Yes" selected={Vaccinated4Weeks} onSelect={(val) => updateFormData("Vaccinated4Weeks", val)} />
//     <CheckBox label="No" value="No" selected={Vaccinated4Weeks} onSelect={(val) => updateFormData("Vaccinated4Weeks", val)}/>
// </View>

// </View>
 

// {/* <View className="w-full px-5 mt-8">
//     <Text className="text-lg text-secondary mb-2 ">If yes, Specify</Text>
//  <TextInput
//     className= "text-accent border border-secondary rounded-xl px-4 py-2 w-[250px] h-[70px] mt-2"
//  />
// </View>  */}

//   <View className="w-full px-5 mt-6 z-40">
//     <Text className="text-lg text-secondary mb-2">If yes, select vaccine(s),If no, Select &quot;None&quot;</Text>
//     <DropDownPicker
//       open={vaccineDropdownOpen}
//       value={selectedVaccines}
//       items={vaccineItems}
//       setOpen={setVaccineDropdownOpen}
//       setValue={setSelectedVaccines}
//       multiple={true}
//       min={0}
//       max={10}
//       listMode="SCROLLVIEW"
//       placeholder="Select Vaccines"
//       onChangeValue={(values) => {
//          const val = (values ?? []).map(String);
//          setSelectedVaccines(val);
//          updateFormData("VaccineDetails", val);
//          }}

//       style={{ borderColor: "#ccc", zIndex: 2000 }}
//       dropDownContainerStyle={{ borderColor: "#ccc", zIndex: 2000 }}
//       zIndex={2000}
//       containerStyle={{ marginBottom: vaccineDropdownOpen ? 250 : 30 }}
//     />
//   </View>



 
        
// </View>

//   <TouchableOpacity
//         onPress={() => router.push('/eligibilityForm/eligibilityFive' as any)}
//         className = "mt-4 px-12 py-3  rounded-2xl self-center mb-5"
//         style={{ backgroundColor: '#E72929' }}>
//              <Text className = "text-white text-xl font-semibold">Next</Text>

//         </TouchableOpacity>


//       </View>
//    </GetStartedBackground>
  
//   );
// }

import { useRouter } from "expo-router";
import { Dimensions, ScrollView, Text, TouchableOpacity, View } from "react-native";
import GetStartedBackground from "../getStartedBackground";
import { useEffect, useState } from "react";
import { Entypo } from "@expo/vector-icons";
import { useEligibility } from "../../contexts/EligibilityContext";
import MultiSelect from "react-native-multiple-select";

const { width, height } = Dimensions.get("window");

export default function EligibilityFour() {
  const router = useRouter();
  const eligibilityContext = useEligibility();
  const formData = eligibilityContext?.formData || {};
  const updateFormData = eligibilityContext?.updateFormData || (() => {});
  const Vaccinated4Weeks = formData.Vaccinated4Weeks || "";
  const [selectedVaccines, setSelectedVaccines] = useState<string[]>([]);

  const vaccineItems = [
    { id: "COVID-19 Vaccine", name: "COVID-19 Vaccine" },
    { id: "Hepatitis B", name: "Hepatitis B" },
    { id: "Influenza", name: "Influenza (Flu Shot)" },
    { id: "Yellow Fever", name: "Yellow Fever" },
    { id: "Typhoid", name: "Typhoid" },
    { id: "Tetanus", name: "Tetanus" },
    { id: "Rabies", name: "Rabies" },
    { id: "MMR", name: "Measles/Mumps/Rubella (MMR)" },
   
    { id: "Other", name: "Other" },
  ];

  useEffect(() => {
    if (formData.VaccineDetails) {
      setSelectedVaccines(formData.VaccineDetails);
    }
  }, []);

  const onSelectedVaccinesChange = (items: string[]) => {
    setSelectedVaccines(items);
    updateFormData("VaccineDetails", items);
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
                i === 3 ? "bg-primary" : "bg-[#FFBFBF]"
              }`}
              style={{ width: width / 10 }}
            />
          ))}
        </View>

        <View
          className="border border-tertiary bg-white mt-6 ml-2 rounded-md items-center"
          style={{ height: height / 1.55, width: width / 1.2 }}
        >
          <Text className="text-2xl text-tertiary text-center mt-5">
            Health Status
          </Text>

          <View className="w-full px-5 mt-3">
            <Text className="text-lg text-tertiary mb-2">
              Have you received any vaccination in the last 4 weeks?
            </Text>
            <View className="flex-row space-x-8">
              <CheckBox
                label="Yes"
                value="Yes"
                selected={Vaccinated4Weeks}
                onSelect={(val: string) => {
                   updateFormData("Vaccinated4Weeks", val);
                   if (val === "No") {
                     updateFormData("VaccineDetails", ["None"]);
                     setSelectedVaccines(["None"]);
                   } else {
                     updateFormData("VaccineDetails", []); // Clear if user switches to Yes
                     setSelectedVaccines([]);
                   }
                 }}
              />
              <CheckBox
                label="No"
                value="No"
                selected={Vaccinated4Weeks}
                onSelect={(val: string) => {
                   updateFormData("Vaccinated4Weeks", val);
                   if (val === "No") {
                     updateFormData("VaccineDetails", ["None"]);
                     setSelectedVaccines(["None"]);
                   } else {
                     updateFormData("VaccineDetails", []); // Clear if user switches to Yes
                     setSelectedVaccines([]);
                   }
                 }}
              />
            </View>
          </View>

          {Vaccinated4Weeks === "Yes" && (
            <View className="w-full px-5 mt-6 z-40">
              <Text className="text-lg text-tertiary mb-2">
                If yes, select vaccine(s) 
              </Text>
              <MultiSelect
                items={vaccineItems}
                uniqueKey="id"
                onSelectedItemsChange={onSelectedVaccinesChange}
                selectedItems={selectedVaccines}
                selectText="Select Vaccines"
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
                styleMainWrapper={{ marginBottom: 20 }}
              />
            </View>
          )}
        </View>

        {/* <TouchableOpacity
          onPress={() => router.push("/eligibilityForm/eligibilityFive" as any)}
          className="mt-4 px-12 py-3 rounded-2xl self-center mb-5"
          style={{ backgroundColor: "#E72929" }}
        >
          <Text className="text-white text-xl font-semibold">Next</Text>
        </TouchableOpacity> */}
        <View className="flex-row justify-between mt-6 mb-10 px-10">
  <TouchableOpacity
    onPress={() => router.push("/eligibilityForm/eligibilityThree")}
    className="px-10 py-3 rounded-2xl"
    style={{ backgroundColor: '#BFBFBF' }}
  >
    <Text className="text-white text-xl font-semibold">Previous</Text>
  </TouchableOpacity>

  <TouchableOpacity
    onPress={() => router.push("/eligibilityForm/eligibilityFive")}
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
