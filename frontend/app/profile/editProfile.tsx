import { Entypo, Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Dimensions, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from '@react-native-community/datetimepicker';
import { Platform } from 'react-native';

const { width,height } = Dimensions.get("window");

export default function EditProfile() {
    
    const router = useRouter();
    const [selectedIllness,setSelectedIllness] =useState("None");
    const [status, setStatus] =useState("Ongoing");
    const [smoking, setSmoking] =useState("")
    const [alcohol, setAlcohol] = useState("");
    const [vaccinationStatus, setVaccinationStatus] = useState("");
    const [doseCount, setDoseCount] = useState("");
    const [selectedVaccine, setSelectedVaccine] =useState("");
    const [date, setDate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);

    const onChange = (event: any, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || date;
      setShowPicker(Platform.OS === 'ios');
      setShowPicker(false); // for iOS keep showing picker
      setDate(currentDate);
    };

    const formattedDate = date.toLocaleDateString('en-GB');

    type CheckBoxProps = {
      label: string;
      value: string;
      selected: string;
      onSelect: (value: string) => void;
    };

    const CheckBox = ({ label, value, selected, onSelect }: CheckBoxProps) => (
  <TouchableOpacity
    onPress={() => onSelect(value)}
    className="flex-row items-center my-1"
  >
    <View className="w-5 h-5 border border-secondary rounded mr-2 justify-center items-center">
      {selected === value && <Entypo name="check" size={16} color="#E72929" />}
    </View>
    <Text className="text-sm font-poppins text-secondary">{label}</Text>
  </TouchableOpacity>
);



    const illnesses = [
    "Diabetes",
    "Hypertension (High Blood Pressure)",
    "Heart Disease",
    "Asthma",
    "Kidney Disease",
    "Cancer",
    "Hepatitis B/C",
    "HIV/AIDS",
    "None",
  ];

  const vaccines =[
    'Pfizer',
    'Moderna',
    'AstraZenica',
    'Sinopharm',
    'Other',
  ];

    
  return (
    <View
      className="flex-1  items-center bg-white pt-16"
    >
        <ScrollView  contentContainerStyle={{ alignItems: 'center', paddingBottom: 30 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-row items-center justify-between w-full px-6">
              <TouchableOpacity
           onPress = {()=>router.back()}>
            <Feather name ="chevron-left" size={20} color = "#E72929" />

          </TouchableOpacity>
           <Text className="text-2xl  text-primary font-poppins ml-10">Edit Profile</Text>
           <View className="w-12 "></View>

        </View>

        <Image 
        source={require("../../assets/images/ProfileImg.jpg")}
        style={{
          width:width*0.3,
          height:width*0.3,
          borderColor:'#E72929',
          borderWidth:1,
          }}
        className="rounded-full mt-6"/>

        <View className="flex-row items-center justify-between w-full px-6 mt-3">
            <View className ="  flex-1 h-[1px] bg-secondary mr-2"/>
            <Text className= "text-sm font-poppins text-secondary">Personal Info</Text>
             <View className ="  flex-1 h-[1px] bg-secondary ml-2"/>
        </View>

        <View className="border border-secondary rounded-xl px-4 py-2 w-[300px] h-[75px] mt-3"> 
            <Text className="text-sm font-poppins text-secondary">Full Name</Text>
               <TextInput
                placeholder="John Doe"
                className= "text-accent"
               />
        </View>

        <View className ="flex-row items-center justify-between">
            <View className="border border-secondary rounded-xl px-4 py-2 w-[145px] h-[75px] mt-3 mr-3"> 
            <Text className="text-sm font-poppins text-secondary">Gender</Text>
               <TextInput
                placeholder="Female"
                className= "text-accent"
               />
        </View>
        <View className="border border-secondary rounded-xl px-4 py-2 w-[145px] h-[75px] mt-3"> 
            <Text className="text-sm font-poppins text-secondary ">Birthday</Text>
               <TouchableOpacity onPress={() => setShowPicker(true)}>
                <View className ="flex-row items-center justify-between mt-2">
                    <Text className="text-accent">{formattedDate}</Text>
                    <Feather name="calendar" size={15} color ="#B43929"/>
                </View>
        
      </TouchableOpacity>
      {showPicker && (
        <DateTimePicker
         value={date}
         mode="date"
         display="default"
         onChange={onChange}
        />
       )} 
        </View>

        </View>

         <View className="border border-secondary rounded-xl px-4 py-2 w-[300px] h-[75px] mt-3"> 
            <Text className="text-sm font-poppins text-secondary">Email</Text>
               <TextInput
                placeholder="johndoe@email.com"
                className= "text-accent"
               />
        </View>

         <View className="border border-secondary rounded-xl px-4 py-2 w-[300px] h-[75px] mt-3"> 
            <Text className="text-sm font-poppins text-secondary">Address</Text>
               <TextInput
                placeholder="John Doe,abcders,ghkits"
                className= "text-accent"
               />
        </View>

        <View className="flex-row items-center justify-between w-full px-6 mt-5">
            <View className ="  flex-1 h-[1px] bg-secondary mr-2"/>
            <Text className= "text-sm font-poppins text-secondary">Health Info</Text>
             <View className ="  flex-1 h-[1px] bg-secondary ml-2"/>
        </View>

        <View className ="flex-row items-center justify-between">
            <View className="border border-secondary rounded-xl px-4 py-2 w-[145px] h-[75px] mt-3 mr-3"> 
            <Text className="text-sm font-poppins text-secondary">Weight</Text>
               <TextInput
                placeholder="50Kg"
                className= "text-accent"
               />
        </View>
        <View className="border border-secondary rounded-xl px-4 py-2 w-[145px] h-[75px] mt-3"> 
            <Text className="text-sm font-poppins text-secondary ">Last Donation Date</Text>
            <TouchableOpacity onPress={() => setShowPicker(true)}>
                <View className ="flex-row items-center justify-between mt-2">
                    <Text className="text-accent">{formattedDate}</Text>
                    <Feather name="calendar" size={15} color ="#B43929"/>
                </View>
        
      </TouchableOpacity>
      {showPicker && (
        <DateTimePicker
         value={date}
         mode="date"
         display="default"
         onChange={onChange}
        />
       )} 
        </View>

        </View>

        <View className="border border-secondary rounded-xl px-4 py-2 w-[300px] h-[75px] mt-3"> 
            <View className="flex-row  justify-between mb-2">
               <Text className="text-sm font-poppins text-secondary">Chronic Illness</Text>
               <Text className="text-sm font-poppins text-secondary mr-8">Ongoing or Resolved</Text>
              
            </View>

            <View className="flex-row justify-between">
                <View className="w-[130px] h-[35px] border border-tertiary rounded-md justify-center">
                    <Picker
                       selectedValue={selectedIllness}
                       onValueChange={(itemValue)=> setSelectedIllness(itemValue)} 
                       dropdownIconColor="#B43929"
                       style={{ fontSize: 12, height: 51 }} 
                       >
          
                        {illnesses.map((illness, index)=>(
                            <Picker.Item label={illness} value={illness} key={index}/>
                        ))}
                       </Picker>
                </View>

                 <View className="w-[130px] h-[35px] border border-tertiary rounded-md justify-center">
          <Picker
            selectedValue={status}
            onValueChange={(value) => setStatus(value)}
            dropdownIconColor="#B43929"
            style={{ fontSize: 12, height: 51 }}
          >
            <Picker.Item label="Ongoing" value="Ongoing" />
            <Picker.Item label="Resolved" value="Resolved" />
          </Picker>
        </View>
            </View>          
        </View>

           <View className="border border-secondary rounded-xl px-4 py-2 w-[300px] h-[75px] mt-3"> 
            <Text className="text-sm font-poppins text-secondary">Allergies(Comma seperated)</Text>
               <TextInput
                placeholder="John Doe,abcders,ghkits"
                className= "text-accent"
               />
        </View>

           <View className="border border-secondary rounded-xl px-4 py-2 w-[300px] h-[75px] mt-3"> 
            <Text className="text-sm font-poppins text-secondary">Medications(Comma seperated)</Text>
               <TextInput
                placeholder="John Doe,abcders,ghkits"
                className= "text-accent"
               />
        </View>

         <View className="flex-row items-center justify-between w-full px-6 mt-5">
            <View className ="  flex-1 h-[1px] bg-secondary mr-2"/>
            <Text className= "text-sm font-poppins text-secondary">Life Style Habits</Text>
             <View className ="  flex-1 h-[1px] bg-secondary ml-2"/>
        </View>
       
    <View className="w-[300px] mt-4">
  <Text className="text-xl font-poppins text-secondary mb-2">Do you smoke?</Text>
  <CheckBox label="Yes, Regularly" value="regular" selected={smoking} onSelect={setSmoking} />
  <CheckBox label="Occasionally" value="occasional" selected={smoking} onSelect={setSmoking} />
  <CheckBox label="No" value="no" selected={smoking} onSelect={setSmoking} />

  <Text className="text-xl font-poppins text-secondary mt-4 mb-2">Do you consume alcohol?</Text>
  <CheckBox label="Yes, Regularly" value="regular" selected={alcohol} onSelect={setAlcohol} />
  <CheckBox label="Occasionally" value="occasional" selected={alcohol} onSelect={setAlcohol} />
  <CheckBox label="No" value="no" selected={alcohol} onSelect={setAlcohol} />

  <View className="flex-row items-center justify-between w-full px-0 mt-5 mb-2">
    <View className="flex-1 h-[1px] bg-secondary mr-2"/>
    <Text className="text-sm font-poppins text-secondary">Vaccination Status</Text>
    <View className="flex-1 h-[1px] bg-secondary ml-2"/>
  </View>

  <Text className="text-xl font-poppins text-secondary mb-2">Vaccination status:</Text>
  <CheckBox label="Fully" value="fully" selected={vaccinationStatus} onSelect={setVaccinationStatus} />
  <CheckBox label="Partially" value="partial" selected={vaccinationStatus} onSelect={setVaccinationStatus} />
  <CheckBox label="Not Vaccinated" value="none" selected={vaccinationStatus} onSelect={setVaccinationStatus} />

  <Text className="text-xl font-poppins text-secondary mt-4 mb-2">Number of Doses:</Text>
  <CheckBox label="1" value="1" selected={doseCount} onSelect={setDoseCount} />
  <CheckBox label="2" value="2" selected={doseCount} onSelect={setDoseCount} />
  <CheckBox label="3" value="3" selected={doseCount} onSelect={setDoseCount} />
</View>
 <View className="border border-secondary rounded-xl px-4 py-2 w-[300px] h-[75px] mt-3"> 
            <Text className="text-sm font-poppins text-secondary">Last Vaccination Date</Text>
               <TouchableOpacity onPress={() => setShowPicker(true)}>
                <View className ="flex-row items-center justify-between mt-2">
                    <Text className="text-accent">{formattedDate}</Text>
                    <Feather name="calendar" size={15} color ="#B43929"/>
                </View>
        
      </TouchableOpacity>
      {showPicker && (
        <DateTimePicker
         value={date}
         mode="date"
         display="default"
         onChange={onChange}
        />
       )} 
        </View>


<View className="border border-secondary rounded-xl px-4 py-2 w-[300px] h-[75px] mt-3">
    <Text className="text-sm font-poppins text-secondary">Vaccination Type</Text>
 <View className="w-[130px] h-[35px] border border-tertiary rounded-md justify-center mt-2">
          <Picker
            selectedValue={selectedVaccine}
            onValueChange={(value) => setSelectedVaccine(value)}
            dropdownIconColor="#B43929"
            style={{ fontSize: 12, height: 51 }}
          >
            {vaccines.map((vaccine, index)=>(
                <Picker.Item label ={vaccine} value={vaccine} key={index}/>

            ))}
          </Picker>
        </View>
        </View>
        
    <TouchableOpacity
        className = "mt-4 px-12 py-3  rounded-xl self-center mb-5"
        style={{ backgroundColor: '#E72929' }}>
             <Text className = "text-white text-xl font-semibold">Save</Text>

        </TouchableOpacity>
           






</ScrollView>
     
    </View>
  );
}
