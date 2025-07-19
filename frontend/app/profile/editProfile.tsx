import { Entypo, Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Dimensions, Image, ScrollView, Text, TextInput, TouchableOpacity, View, Alert, Platform } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, { AxiosError } from 'axios';
import api from '../../services/api';
import * as ImagePicker from 'expo-image-picker';

const { width,height } = Dimensions.get("window");

export default function EditProfile() {
  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
        base64: true
      });

      if (!result.canceled) {
        const base64Image = `data:image/jpeg;base64,${result.assets[0].base64}`;
        setImage(base64Image);
        
        // Save to AsyncStorage
        try {
          await AsyncStorage.setItem('userProfileImage', base64Image);
          console.log('Image saved locally');
        } catch (error) {
          console.error('Error saving image locally:', error);
        }

        // Upload to backend
        try {
          const token = await AsyncStorage.getItem('token');
          if (!token) {
            throw new Error('No token found');
          }

          // Convert base64 to blob
          const fetchResponse = await fetch(base64Image);
          const blob = await fetchResponse.blob();

          const formData = new FormData();
          formData.append('image', blob, 'profile.jpg');

          // Upload to backend
          try {
            const uploadResponse = await api.post('/donor/profile/upload-image', formData, {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            });

            if (uploadResponse.status === 200) {
              setImage(base64Image);
            } else {
              throw new Error('Image upload failed');
            }
          } catch (error) {
            console.error('Error uploading image:', error);
            Alert.alert('Error', 'Failed to upload image. Please try again.');
            throw error; // Re-throw to be caught by the outer catch block
          }
        } catch (error) {
          console.error('Error in image processing:', error);
          Alert.alert('Error', 'Failed to process image. Please try again.');
        }
      } else {
        Alert.alert('Error', 'No image selected');
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('Error', 'Failed to pick image. Please try again.');
    }
  }

  const uploadImage = async () => {
    if (!image) return;

    // Here you would typically upload the image to your backend
    // For now, we'll just log the image URI
    console.log('Selected image:', image);
  };

  const router = useRouter();
  // Form state
  const [selectedIllness, setSelectedIllness] = useState("None");
  const [status, setStatus] = useState("Ongoing");
  const [smoking, setSmoking] = useState("");
  const [alcohol, setAlcohol] = useState("");
  const [vaccinationStatus, setVaccinationStatus] = useState("");
  const [doseCount, setDoseCount] = useState("");
  const [selectedVaccine, setSelectedVaccine] = useState("");
  
  // Date picker state
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  
  // Loading state
  const [loading, setLoading] = useState(false);

  const isValidForm = () => {
        // Medical history fields are optional for profile update
        return true;
    };

    const handleUpdateProfile = async () => {
        try {
            setLoading(true);
            console.log('Starting profile update...');
            
            const token = await AsyncStorage.getItem('token');
            if (!token) {
                console.log('No token found');
                Alert.alert('Error', 'Please login to update profile');
                return;
            }

            // Validate form data
            if (!isValidForm()) {
                Alert.alert('Error', 'Please fill in all required fields');
                return;
            }

            const data = {
                medicalHistory: {
                    illness: selectedIllness,
                    illnessStatus: status,
                    smoking: smoking,
                    alcohol: alcohol,
                    vaccinationStatus: vaccinationStatus,
                    vaccineType: selectedVaccine,
                    doseCount: parseInt(doseCount) || 0,
                    lastVaccinationDate: date.toISOString()
                }
            };
            
            console.log('Sending data:', JSON.stringify(data, null, 2));
            
            // Get the correct API URL based on environment
            const getApiUrl = () => {
                if (Platform.OS === 'android') {
                    console.log('Using API URL from configuration');
                    return api.defaults.baseURL;
                } else if (Platform.OS === 'ios') {
                    return 'http://192.168.93.76:5000'; // iOS simulator
                }
                
                // For physical devices or other environments
                return 'http://192.168.93.76:5000'; // WiFi IP for mobile devices
            };

            const apiUrl = getApiUrl();
            console.log('Using API URL:', apiUrl);

            try {
                const response = await api.put(
                    '/donor/profile/me',
                    data,
                    {
                    }
                );

                console.log('Response received:', JSON.stringify(response.data, null, 2));
                Alert.alert('Success', 'Profile updated successfully');
                router.push('/(tabs)/profile');
            } catch (error: AxiosError | any) {
                let errorMessage = 'An unexpected error occurred';
                if (error.response?.data?.message) {
                    errorMessage = error.response.data.message;
                } else if (error.message) {
                    errorMessage = error.message;
                }
                
                console.error('Error details:', {
                    error: error,
                    message: error.message,
                    data: error.response?.data
                });
                
                Alert.alert('Error', errorMessage);
            }
        } finally {
            setLoading(false);
        }
    };

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

        <TouchableOpacity
          onPress={pickImage}
          className="rounded-full mt-6"
          style={{
            width: width * 0.3,
            height: width * 0.3,
            borderColor: '#E72929',
            borderWidth: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {image ? (
            <Image
              source={{ uri: image }}
              style={{ width: '100%', height: '100%' }}
              className="rounded-full"
            />
          ) : (
            <Image
              source={require("../../assets/images/ProfileImg.jpg")}
              style={{ width: '100%', height: '100%' }}
              className="rounded-full"
            />
          )}
        </TouchableOpacity>

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
        </View>

        <View className="flex-row items-center justify-between w-full px-6 mt-5">
          <View className="  flex-1 h-[1px] bg-secondary mr-2" />
          <Text className="text-sm font-poppins text-secondary">Health Info</Text>
          <View className="  flex-1 h-[1px] bg-secondary ml-2" />
        </View>

        <View className="flex-row items-center justify-between">
          <View className="border border-secondary rounded-xl px-4 py-2 w-[145px] h-[75px] mt-3 mr-3">
            <Text className="text-sm font-poppins text-secondary">Weight</Text>
            <TextInput
              placeholder="50Kg"
              className="text-accent"
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
        className="mt-4 px-12 py-3 rounded-xl self-center mb-5"
        style={{ backgroundColor: '#E72929' }}
        onPress={handleUpdateProfile}
        disabled={loading || !isValidForm()}
    >
        {loading ? (
            <Text className="text-white text-xl font-semibold">Loading...</Text>
        ) : (
            <Text className="text-white text-xl font-semibold">Save</Text>
        )}
    </TouchableOpacity>
           






</ScrollView>
     
    </View>
  );
}
