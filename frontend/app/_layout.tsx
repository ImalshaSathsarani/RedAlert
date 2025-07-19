import { Slot, Stack } from "expo-router";
import { useFonts } from "expo-font";
import { Poppins_400Regular, Poppins_700Bold } from '@expo-google-fonts/poppins';
import './globals.css';
import { EligibilityProvider } from "../contexts/EligibilityContext";

export default function RootLayout() {

   const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return null; // or <AppLoading />
  }


  return (
  <EligibilityProvider> 
    <Stack>
    <Stack.Screen name ="index" options={{title:"Welcome",headerShown:false}}/>
          
     <Stack.Screen
      name = "(tabs)"
      options ={{
        headerShown: false,
      }} 
      />

       <Stack.Screen
      name = "profile/editProfile"
      options ={{
        headerShown: false,
      }} 
      />

       <Stack.Screen
      name = "profile/changePassword"
      options ={{
        headerShown: false,
      }} 
      />

       <Stack.Screen
      name = "profile/getHelp"
      options ={{
        headerShown: false,
      }} 
      />

       <Stack.Screen
      name = "donorLogin"
      options ={{
        headerShown: false,
      }} 
      />

       <Stack.Screen
      name = "donorRegister"
      options ={{
        headerShown: false,
      }} 
      />

       <Stack.Screen
      name = "eligibilityForm/eligibilityOne"
      options ={{
        headerShown: false,
      }} 
      />

      <Stack.Screen
      name = "eligibilityForm/eligibilityTwo"
      options ={{
        headerShown: false,
      }} 
      />

      <Stack.Screen
      name = "eligibilityForm/eligibilityThree"
      options ={{
        headerShown: false,
      }} 
      />

      <Stack.Screen
      name = "eligibilityForm/eligibilityFour"
      options ={{
        headerShown: false,
      }} 
      />

      <Stack.Screen
      name = "eligibilityForm/eligibilityFive"
      options ={{
        headerShown: false,
      }} 
      />

      <Stack.Screen
      name = "eligibilityForm/eligibilitySix"
      options ={{
        headerShown: false,
      }} 
      />

      <Stack.Screen
      name = "eligibilityForm/eligibilitySeven"
      options ={{
        headerShown: false,
      }} 
      />

      <Stack.Screen
      name = "eligibilityForm/eligible"
      options ={{
        headerShown: false,
      }} 
      />

      <Stack.Screen
      name = "eligibilityForm/notEligible"
      options ={{
        headerShown: false,
      }} 
      />
      

  </Stack>
  </EligibilityProvider>
  );
}
