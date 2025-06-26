import { Tabs } from "expo-router";
import {  Pressable, View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import clsx from "clsx";

export default function _Layout() {
  return (
    <Tabs 
     screenOptions={({ route })=> ({
         headerShown: false,
         tabBarShowLabel: false,
         tabBarStyle: {
            position:"absolute",
            bottom:0,
            left:0,
            right: 0,
            height: 105,
            backgroundColor: "#fff",
            borderRadius: 10,
            paddingTop: 10,
            paddingHorizontal: 20, 
            justifyContent: 'space-around',
            borderTopWidth:0,
            elevation:0,
            shadowOpacity:0, 
         },

      
        
            tabBarIcon: ({ focused}:{focused:boolean})=>{
                
             

               let iconName : keyof typeof Ionicons.glyphMap;
             

         switch( route.name){
                  case "home":
              iconName = focused ? "home" : "home-outline";
              //label= "Home";
              break;
            case "community":
              iconName = focused ? "globe" : "globe-outline";
              //label = "Community";
              break;
            case "chat":
              iconName = focused ? "chatbubble" : "chatbubble-outline";
              //label= "Chat";
              break;
            case "profile":
              iconName = focused ? "person" : "person-outline";
              //label = "Profile";
              break;
            default:
              iconName = "ellipse";
               // label = "Unknown";
               }

               if (route.name === "home"){
                return(
                   <View className="flex-row items-center bg-red-600 rounded-full h-14 pr-6 pl-2 min-w-[110px] justify-start">
      <View className="bg-white rounded-full w-10 h-10 items-center justify-center">
        <Ionicons name={iconName} size={24} color="#000" />
      </View>
      <Text className="text-black font-medium ml-3">Home</Text>
    </View>
                )
               }

               const extraMargin = route.name ==="chat"? "ml-12":
                                   route.name === "community" ? "ml-10":
                                   route.name === "profile"? "ml-8":"";
               return (
                  <View className={clsx(
      "bg-gray-100 p-3 rounded-full h-14 w-14 items-center justify-center",
      extraMargin
    )}>
      <Ionicons name={iconName} size={24} color={"#000"} />
    </View>
               )
            }
            


         
     })}>
        <Tabs.Screen
         name = "home"
          options ={{
            title: "Home",
            
         }}
        
        />
        <Tabs.Screen
         name = "chat"
          options ={{
            title: "Chat",
            
         }}
        
        />
        <Tabs.Screen
         name = "community"
         options={{
          title:"Community",
         }}
        
        />
        <Tabs.Screen
         name = "profile"
          options ={{
            title: "Profile",
            
         }}
        
        />


         <Tabs.Screen 
          name= "donationHistory"
        <Tabs.Screen 
          name= "notification"
          options={{
            href:null
          }} />

        <Tabs.Screen 
          name= "details"

          options={{
            href:null
          }} />
       
      </Tabs>
  );
}
