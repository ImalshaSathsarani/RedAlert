// import {  useRouter } from "expo-router";
// import { Dimensions,   Text, TextInput, TouchableOpacity, View } from "react-native";
// import GetStartedBackground from "../getStartedBackground";
// import { useEffect, useState } from "react";
// import { Entypo } from "@expo/vector-icons";
// import { useEligibility } from "../contexts/EligibilityContext";
// import DropDownPicker from 'react-native-dropdown-picker';
// import { ScrollView } from "react-native";



// const { width,height } = Dimensions.get("window");

// export default function EligibilityTwo() {
//   const router = useRouter();
//   const [date, setDate] = useState(new Date());
//   const [showPicker, setShowPicker] = useState(false);
//   const eligibilityContext = useEligibility();
//   const formData = eligibilityContext?.formData || {}
//   const updateFormData = eligibilityContext?.updateFormData || (() => {});
//   const ChronicIllness = formData.ChronicIllness || "";
//   const Medications = formData.Medications || "";
//   const [chronicIllnessOpen, setChronicIllnessOpen] = useState(false);
//   const [selectedChronicIllnesses, setSelectedChronicIllnesses] =   useState<string[]>([]);
//   const [medicationOpen, setMedicationOpen] = useState(false);
//   const [selectedMedications, setSelectedMedications] = useState<string[]>([]);

//   useEffect(() => {
//   // Load chronic illness details from context on mount
//   if (formData.ChronicIllnessDetails) {
//     setSelectedChronicIllnesses(formData.ChronicIllnessDetails);
//   }
//   if (formData.MedicationDetails) {
//     setSelectedMedications(formData.MedicationDetails);
//   }
// }, []);


//   const chronicIllnessItems = [
//   { label: "Diabetes (Insulin-dependent)", value: "Diabetes" },
//   { label: "Hypertension (Uncontrolled)", value: "Hypertension" },
//   { label: "Heart Disease", value: "Heart Disease" },
//   { label: "Kidney Disease", value: "Kidney Disease" },
//   { label: "Asthma", value: "Asthma" },
//   { label: "Epilepsy", value: "Epilepsy" },
//   { label: "Cancer (Current or Recent)", value: "Cancer" },
//   { label: "None", value: "None" },
//   { label: "Other", value: "Other" },
// ];

//   const medicationItems = [
//   { label: "Blood Thinners (e.g., Warfarin, Aspirin)", value: "Blood Thinners" },
//   { label: "Insulin", value: "Insulin" },
//   { label: "Steroids", value: "Steroids" },
//   { label: "Antibiotics (Currently Taking)", value: "Antibiotics" },
//   { label: "Antihypertensives", value: "Antihypertensives" },
//   { label: "Asthma Inhalers", value: "Asthma Inhalers" },
//   { label: "Antiepileptics", value: "Antiepileptics" },
//   { label: "Painkillers", value: "Painkillers" },
//   { label: "Antidepressants", value: "Antidepressants" },
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
//       onPress={()=>
//         { if (selected !== value){
//           onSelect(value);
//         }
//           }}
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
//  <TouchableOpacity onPress={()=>router.push('/eligibilityForm/eligibilityOne' as any)} className="bg-[#FFBFBF] h-[2px]" style={{ width:width/10}}/>
//   <TouchableOpacity onPress={()=>router.push('/eligibilityForm/eligibilityTwo' as any)} className="bg-primary h-[2px] ml-2" style={{ width:width/10}}/>
//   <TouchableOpacity onPress={()=>router.push('/eligibilityForm/eligibilityThree' as any)} className="bg-[#FFBFBF] h-[2px] ml-2" style={{ width:width/10}}/>
//   <TouchableOpacity onPress={()=>router.push('/eligibilityForm/eligibilityFour' as any)} className="bg-[#FFBFBF] h-[2px] ml-2" style={{ width:width/10}}/>
//   <TouchableOpacity onPress={()=>router.push('/eligibilityForm/eligibilityFive' as any)} className="bg-[#FFBFBF] h-[2px] ml-2" style={{ width:width/10}}/>
//   <TouchableOpacity onPress={()=>router.push('/eligibilityForm/eligibilitySix' as any)} className="bg-[#FFBFBF] h-[2px] ml-2 " style={{ width:width/10}}/>
//   <TouchableOpacity onPress={()=>router.push('/eligibilityForm/eligibilitySeven' as any)} className="bg-[#FFBFBF] h-[2px] ml-2 " style={{ width:width/10}}/>
// </View>

// {/* <View className="border border-secondary bg-white mt-6 ml-2 rounded-md items-center" style={{
//   height:height/1.55,
//   width:width/1.2
// }} > */}
// <ScrollView
//   style={{ width: width / 1.2 }}
//   contentContainerStyle={{
//     borderWidth: 1,
//     borderColor: "#B43929",
//     backgroundColor: "#fff",
//     marginTop: 24,
//     marginLeft: 8,
//     borderRadius: 12,
//     alignItems: "center",
//     paddingBottom: medicationOpen || chronicIllnessOpen ? 110 : 40,
//   }}
// >
// <Text className="text-2xl text-secondary text-center mt-5">Health Status</Text>

// <View className="w-full px-5 mt-3">
//     <Text className="text-lg text-secondary mb-2  ">Do you have any chronic illness?</Text>
// <View className="flex-row  space-x-8">
//     <CheckBox label="Yes" value="Yes" selected={ChronicIllness} onSelect={(val)=> updateFormData('ChronicIllness', val)} />
//     <CheckBox label="No" value="No" selected={ChronicIllness} onSelect={(val)=> updateFormData('ChronicIllness', val)}/>
// </View>
// </View>

// {/* 
// <View className="w-full px-5 mt-3">
//     <Text className="text-lg text-secondary mb-2 ">If yes, Specify</Text>
//  <TextInput
//     className= "text-accent border border-secondary rounded-xl px-4 py-2 w-[250px] h-[70px] mt-2"
//  />
// </View> */}

// <View className="w-full px-5 mt-3 z-50">
//   <Text className="text-lg text-secondary mb-2">If yes, specify (Chronic Illness)</Text>
//   <DropDownPicker
//     open={chronicIllnessOpen}
//     value={selectedChronicIllnesses}
//     items={chronicIllnessItems}
//     setOpen={setChronicIllnessOpen}
//     setValue={setSelectedChronicIllnesses}
//     multiple={true}
//     min={0}
//     max={10}
//     listMode="SCROLLVIEW"
//     placeholder="Select Chronic Illnesses"
//     onChangeValue={(values) =>{ 
//       setSelectedChronicIllnesses((values ?? []) as string[]);
//       updateFormData("ChronicIllnessDetails", values ?? []);} }
//     style={{ borderColor: "#ccc", zIndex: 3000 }}
//     dropDownContainerStyle={{ borderColor: "#ccc", zIndex: 3000 }}
//     zIndex={3000}
//     containerStyle={{ marginBottom: chronicIllnessOpen ? 250 : 10 }}
//   />
// </View>


// <View className="w-full px-5 mt-3">
//     <Text className="text-lg text-secondary mb-2  ">Are you currently taking any medications?</Text>
// <View className="flex-row  space-x-8">
//     <CheckBox label="Yes" value="Yes" selected={Medications} onSelect={(val)=> updateFormData('Medications', val)} />
//     <CheckBox label="No" value="No" selected={Medications} onSelect={(val)=> updateFormData('Medications', val)}/>
// </View>

// </View>

// <View className="w-full px-5 mt-5 z-40">
//   <Text className="text-lg text-secondary mb-2">If yes, specify (Medications)</Text>
//   <DropDownPicker
//     open={medicationOpen}
//     value={selectedMedications}
//     items={medicationItems}
//     setOpen={setMedicationOpen}
//     setValue={setSelectedMedications}
//     multiple={true}
//     min={0}
//     max={15}
//     listMode="SCROLLVIEW" 
//     placeholder="Select Medications"
//     onChangeValue={(values) => {
//       setSelectedMedications((values ?? []) as string[]);
//       updateFormData("MedicationDetails", values)}}
//     dropDownDirection="BOTTOM"
//     style={{ borderColor: "#ccc", zIndex: 2000 }}
//     dropDownContainerStyle={{ borderColor: "#ccc", zIndex: 2000 }}
//     zIndex={2000}
//     containerStyle={{height: 60, marginBottom: medicationOpen ? 270 : 30 }}
//   />
// </View>
 
// {/* 
// <View className="w-full px-5 mt-3">
//     <Text className="text-lg text-secondary mb-2 ">If yes, Specify</Text>
//  <TextInput
//     className= "text-accent border border-secondary rounded-xl px-4 py-2 w-[250px] h-[70px] mt-2"
//  />
// </View> */}

//  {/* <Text className="text-lg text-secondary mt-3  ">Have you had any cold, fever, or infection in the past 7 days?</Text>
// <View className="flex-row  justify-between">
//     <CheckBox label="Yes" value="yes" selected={cold} onSelect={setCold} />
//     <CheckBox label="No" value="no" selected={cold} onSelect={setCold}/>
// </View>
//  */}

        
// {/* </View> */}
// </ScrollView>

//   <TouchableOpacity
//         onPress={() => router.push('/eligibilityForm/eligibilityThree' as any)}
//         className = "mt-2 px-12 py-3  rounded-2xl self-center mb-10"
//         style={{ backgroundColor: '#E72929' }}>
//              <Text className = "text-white text-xl font-semibold">Next</Text>

//         </TouchableOpacity>


//       </View>
//    </GetStartedBackground>
  
//   );
// }


import { useRouter } from "expo-router";
import { Dimensions, Text, TouchableOpacity, View, ScrollView } from "react-native";
import GetStartedBackground from "../getStartedBackground";
import { useEffect, useState } from "react";
import { Entypo } from "@expo/vector-icons";
import { useEligibility } from "../../contexts/EligibilityContext";
import MultiSelect from "react-native-multiple-select";

const { width, height } = Dimensions.get("window");

export default function EligibilityTwo() {
  const router = useRouter();
  const eligibilityContext = useEligibility();
  const formData = eligibilityContext?.formData || {};
  const updateFormData = eligibilityContext?.updateFormData || (() => {});
  const ChronicIllness = formData.ChronicIllness || "";
  const Medications = formData.Medications || "";
  const [selectedChronic, setSelectedChronic] = useState<string[]>([]);
  const [selectedMeds, setSelectedMeds] = useState<string[]>([]);

  const chronicIllnessItems = [
    { id: "Diabetes", name: "Diabetes (Insulin-dependent)" },
    { id: "Hypertension", name: "Hypertension (Uncontrolled)" },
    { id: "Heart Disease", name: "Heart Disease" },
    { id: "Kidney Disease", name: "Kidney Disease" },
    { id: "Asthma", name: "Asthma" },
    { id: "Epilepsy", name: "Epilepsy" },
    { id: "Cancer", name: "Cancer (Current or Recent)" },
    
    { id: "Other", name: "Other" },
  ];

  const medicationItems = [
    { id: "Blood Thinners", name: "Blood Thinners (e.g., Warfarin, Aspirin)" },
    { id: "Insulin", name: "Insulin" },
    { id: "Steroids", name: "Steroids" },
    { id: "Antibiotics", name: "Antibiotics" },
    { id: "Antihypertensives", name: "Antihypertensives" },
    { id: "Asthma Inhalers", name: "Asthma Inhalers" },
    { id: "Antiepileptics", name: "Antiepileptics" },
    { id: "Painkillers", name: "Painkillers" },
    { id: "Antidepressants", name: "Antidepressants" },
   
    { id: "Other", name: "Other" },
  ];

  // useEffect(() => {
  //   if (formData.ChronicIllnessDetails) setSelectedChronic(formData.ChronicIllnessDetails);
  //   if (formData.MedicationDetails) setSelectedMeds(formData.MedicationDetails);
  // }, []);

  useEffect(() => {
  if (formData.ChronicIllnessDetails)
    setSelectedChronic(Array.isArray(formData.ChronicIllnessDetails) ? formData.ChronicIllnessDetails : [formData.ChronicIllnessDetails]);

  if (formData.MedicationDetails)
    setSelectedMeds(Array.isArray(formData.MedicationDetails) ? formData.MedicationDetails : [formData.MedicationDetails]);
}, []);

  const onSelectedChronicChange = (items: string[]) => {
    setSelectedChronic(items);
    updateFormData("ChronicIllnessDetails", items);
  };

  const onSelectedMedsChange = (items: string[]) => {
    setSelectedMeds(items);
    updateFormData("MedicationDetails", items);
  };

  const CheckBox = ({ label, value, selected, onSelect }: any) => (
    <TouchableOpacity
      onPress={() => selected !== value && onSelect(value)}
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
          This quick health check helps us determine if you are currently eligible to donate blood safely. This is a quick check and
          when donating blood you will again be checked.
        </Text>

        <View className="flex-row justify-between mt-6">
          {Array.from({ length: 7 }).map((_, i) => (
            <TouchableOpacity
              key={i}
              className={`h-[2px] ml-2 ${i === 1 ? "bg-primary" : "bg-[#FFBFBF]"}`}
              style={{ width: width / 10 }}
            />
          ))}
        </View>

        <ScrollView
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
          <Text className="text-2xl text-tertiary text-center mt-5">Health Status</Text>

          <View className="w-full px-5 mt-3">
            <Text className="text-lg text-tertiary mb-2">Do you have any chronic illness?</Text>
            <View className="flex-row space-x-8">
              <CheckBox
                label="Yes"
                value="Yes"
                selected={ChronicIllness}
               onSelect={(val: string) => {
                  updateFormData("ChronicIllness", val);
                  if (val === "No") {
                    updateFormData("ChronicIllnessDetails", ["None"]);
                    setSelectedChronic(["None"]);
                  } else {
                     updateFormData("ChronicIllnessDetails", []); // Clear if user switches to Yes
                     setSelectedChronic([]);
                   }
                }}

              />
              <CheckBox
                label="No"
                value="No"
                selected={ChronicIllness}
                onSelect={(val: string) => {
                      updateFormData("ChronicIllness", val);
                      if (val === "No") {
                        updateFormData("ChronicIllnessDetails", ["None"]);
                        setSelectedChronic(["None"]);
                      } else {
                        updateFormData("ChronicIllnessDetails", []); // Clear if user switches to Yes
                        setSelectedChronic([]);
                      }
                    }}

              />
            </View>
          </View>

          {ChronicIllness === "Yes" && (
            <View className="w-full px-5 mt-3 z-50">
              <Text className="text-lg text-tertiary mb-2">If yes, specify (Chronic Illness)</Text>
              <MultiSelect
                items={chronicIllnessItems}
                uniqueKey="id"
                onSelectedItemsChange={onSelectedChronicChange}
                selectedItems={selectedChronic}
                selectText="Select Chronic Illnesses"
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
                styleMainWrapper={{ marginBottom: 10, paddingRight: 10, }}
                  styleDropdownMenuSubsection={{
    paddingRight: 10,
  }}
  
              />
            </View>
          )}

          <View className="w-full px-5 mt-3">
            <Text className="text-lg text-tertiary mb-2">Are you currently taking any medications?</Text>
            <View className="flex-row space-x-8">
              <CheckBox
                label="Yes"
                value="Yes"
                selected={Medications}
                onSelect={(val: string) => {
                   updateFormData("Medications", val);
                   if (val === "No") {
                     updateFormData("MedicationDetails", ["None"]);
                     setSelectedMeds(["None"]);
                   } else {
                     updateFormData("MedicationDetails", []); // Clear if user switches to Yes
                     setSelectedMeds([]);
                   }
                 }}

              />
              <CheckBox
                label="No"
                value="No"
                selected={Medications}
                 onSelect={(val: string) => {
                   updateFormData("Medications", val);
                   if (val === "No") {
                     updateFormData("MedicationDetails", ["None"]);
                     setSelectedMeds(["None"]);
                   } else {
                     updateFormData("MedicationDetails", []); // Clear if user switches to Yes
                     setSelectedMeds([]);
                   }
                 }}
              />
            </View>
          </View>

          {Medications === "Yes" && (
            <View className="w-full px-5 mt-5 z-40">
              <Text className="text-lg text-tertiary mb-2">If yes, specify (Medications)</Text>
              <MultiSelect
                items={medicationItems}
                uniqueKey="id"
                onSelectedItemsChange={onSelectedMedsChange}
                selectedItems={selectedMeds}
                selectText="Select Medications"
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
          onPress={() => router.push("/eligibilityForm/eligibilityThree")}
          className="mt-2 px-12 py-3 rounded-2xl self-center mb-10"
          style={{ backgroundColor: '#E72929' }}
        >
          <Text className="text-white text-xl font-semibold">Next</Text>
        </TouchableOpacity> */}
        <View className="flex-row justify-between mt-6 mb-10 px-10">
  <TouchableOpacity
    onPress={() => router.push("/eligibilityForm/eligibilityOne")}
    className="px-10 py-3 rounded-2xl"
    style={{ backgroundColor: '#BFBFBF' }}
  >
    <Text className="text-white text-xl font-semibold">Previous</Text>
  </TouchableOpacity>

  <TouchableOpacity
    onPress={() => router.push("/eligibilityForm/eligibilityThree")}
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
