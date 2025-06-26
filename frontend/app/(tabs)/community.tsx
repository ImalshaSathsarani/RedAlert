import { Text, View , SafeAreaView, TextInput, Image, ScrollView,Dimensions, TouchableOpacity} from "react-native";
import { Feather } from "@expo/vector-icons";
import { Link ,useRouter} from "expo-router";

const { width } = Dimensions.get("window");
const router = useRouter();


export default function Community() {
  return (

    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>

      <ScrollView>
          <View style={{width: '100%',height:275,backgroundColor: '#E72929', borderRadius: 20,paddingBottom: 30,}}>

        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 50,paddingHorizontal: 30, justifyContent: 'space-between' }}>
            <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold' }}>Community</Text>
            <View style={{backgroundColor: "white",width: 30,height: 30,borderRadius: 20,justifyContent: "center",alignItems: "center",}}>
                <Text style={{ color: "#000000", fontSize: 20, fontWeight: "bold" }}>+</Text>
            </View>   
        </View>

        <View style={{flexDirection: "row",alignItems: "center",backgroundColor: "white",borderRadius: 20,height: 40,margin: 30,paddingHorizontal: 15,}}>
          <Feather name="search" size={18} color="#000000" />
          <TextInput placeholder="Search for..." placeholderTextColor="#888"style={{flex: 1,paddingHorizontal: 10,fontSize: 14,}}/>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 30, marginBottom: 20 }}>
          <View style={{ marginRight: 10, alignItems: 'center' }}>
              <View style={{
                  backgroundColor: "white",
                  width: 42,
                  height: 42,
                  borderRadius: 21,
                  justifyContent: "center",
                  alignItems: "center",
                  marginRight: 12,
              }}>
              <Text style={{ color: "#000000", fontSize: 26, fontWeight: "bold" }}>+</Text>
          </View>
          <Text style={{ fontSize: 12, color: 'transparent', marginTop: 4 }}>
              {'\u00A0'}
          </Text>
          </View>
 
          {[
            { id: 1, name: 'Abc' },
            { id: 2, name: 'Abc' },
            { id: 3, name: 'Abc' },
            { id: 4, name: 'Abc' },
            { id: 5, name: 'Abc' },
          ].map((story) => (
            <View key={story.id} style={{ marginRight: 12, alignItems: 'center' }}>
              <Image
                source={require('../../assets/images/story1.png')}
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: 21,
                }}
              />
              <Text style={{ fontSize: 12, color: 'white', marginTop: 4}}>
                {story.name}
              </Text>
            </View>
          ))}
        </View>
      </View>

      <View style={{ marginLeft: 30,marginTop: 20,marginBottom: 25 ,marginRight:30}}>
          <Text style={{ color: "#000000", fontSize: 22, fontWeight: "bold" }}>Feed</Text>
          <View className = "w-full mt-5 bg-secondary h-[1px]" style={{ backgroundColor: "#ccc" }}/>
      </View>

      <View style={{borderWidth: 1,borderColor: '#ccc',borderRadius: 10, padding: 10,marginLeft:30,marginRight:30,backgroundColor: 'white',height:190,}}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>          
          <Image source={require('../../assets/images/image1.png')}
                style={{width: 42,height: 42,borderRadius: 21,margin:10,}}
          />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', flex: 1 }}>
            <View style={{ flex: 1 }}>
              <Text style={{ color: '#000', fontWeight: 'bold', fontSize: 14 }}>Kierra Franci</Text>
              <Text style={{ color: '#555', fontSize: 12, marginTop: 2 }}>50 minutes ago</Text>
            </View>
            <Feather name="more-horizontal" size={18} color="#000000" marginRight="12"/>
          </View>
        </View>         
        <Text style={{ color: '#000', fontSize:13, marginLeft:10, marginRight:10}}>We need A- blood for a patient undergoing surgery at Colombo General Hospital. Please share or help if you can.</Text>
          <View className = "w-full mt-5 bg-secondary h-[1px]" style={{ backgroundColor: "#ccc" }}/>
          <View style={{flexDirection: 'row',justifyContent: 'flex-start',margin: 10}}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 20 }}>
                <Feather name="heart" size={16} color="#000000" />
                <Text style={{ marginLeft: 5, color: '#000', fontSize: 12 }}>12</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Feather name="message-circle" size={16} color="#000000" />
                <Text style={{ marginLeft: 5, color: '#000', fontSize: 12 }}>4</Text>
            </View>
          </View>
      </View>
         
      <View style={{borderWidth: 1,borderColor: '#ccc',borderRadius: 10, padding: 10,marginLeft:30,marginRight:30,backgroundColor: 'white',height:190,marginTop:20}}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>          
          <Image source={require('../../assets/images/image1.png')}
                style={{width: 42,height: 42,borderRadius: 21,margin:10,}}
          />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', flex: 1 }}>
            <View style={{ flex: 1 }}>
              <Text style={{ color: '#000', fontWeight: 'bold', fontSize: 14 }}>Kierra Franci</Text>
              <Text style={{ color: '#555', fontSize: 12, marginTop: 2 }}>50 minutes ago</Text>
            </View>
            <Feather name="more-horizontal" size={18} color="#000000" marginRight="12"/>
          </View>
        </View>         
        <Text style={{ color: '#000', fontSize:13, marginLeft:10, marginRight:10}}>We need A- blood for a patient undergoing surgery at Colombo General Hospital. Please share or help if you can.</Text>
          <View className = "w-full mt-5 bg-secondary h-[1px]" style={{ backgroundColor: "#ccc" }}/>
          <View style={{flexDirection: 'row',justifyContent: 'flex-start',margin: 10}}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 20 }}>
                <Feather name="heart" size={16} color="#000000" />
                <Text style={{ marginLeft: 5, color: '#000', fontSize: 12 }}>12</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Feather name="message-circle" size={16} color="#000000" />
                <Text style={{ marginLeft: 5, color: '#000', fontSize: 12 }}>4</Text>
            </View>
          </View>
      </View>

      <View style={{ marginLeft: 30,marginTop: 10,marginBottom: 30 ,marginRight:30}}>
          <View className = "w-full mt-5 bg-secondary h-[1px]" style={{ backgroundColor: "#ccc" }}/>
      </View>
    
      </ScrollView>
      
    </SafeAreaView>
    
  );
}
