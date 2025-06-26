import { Text, View, SafeAreaView, ScrollView, Dimensions,Image,TouchableOpacity} from "react-native";
import { Feather } from '@expo/vector-icons';
import { Link ,useRouter} from "expo-router";

export default function Notification() {

  const { width } = Dimensions.get("window");
  const router = useRouter();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFE2E2' }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        
        <View style={{ width: '100%', height: 140, backgroundColor: '#E72929' }}>
          <View style={{ marginTop: 50, marginLeft:10, paddingHorizontal: 20 }}>
            <Text style={{ color: "white", fontSize: 24, fontWeight: "bold" }}>Notification</Text>
            <Text style={{ color: "white", fontSize: 14, marginTop: 5 }}>
              See received blood request
            </Text>
          </View>
        </View>

        <View 
          style={{height: 135,marginTop: 30,marginHorizontal: 20,backgroundColor: 'white',borderRadius: 20,padding: 10,shadowColor: '#000'
            ,shadowOffset: { width: 0, height: 1 },shadowOpacity: 0.1,shadowRadius: 2,elevation: 2,}}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>          
                <Image source={require('../../assets/images/image1.png')} style={{width: 42,height: 42,borderRadius: 21,margin:10,}}/>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', flex: 1 }}>
                  <View style={{ flex: 1 ,marginLeft:5}}>
                    <Text style={{ color: '#000', fontWeight: 'bold', fontSize: 14 }}>Kierra Franci</Text>
                    <Text style={{ color: '#555', fontSize: 12, marginTop: 2 }}>50 minutes ago</Text>
                  </View>
                  <TouchableOpacity onPress={() => {router.push("/details")}}>
                    <View style={{marginTop: 20,backgroundColor: '#E72929',borderRadius: 20,paddingVertical: 4,paddingHorizontal: 8,}}>
                      <Text style={{ color: 'white', fontSize: 12 }}>View Details</Text>
                    </View>
                  </TouchableOpacity>
                  <Text style={{ color: '#000', fontWeight: 'bold', fontSize: 14 ,marginRight:15}}>O+</Text>
                </View>
            </View>

            <View className = "w-full mt-5 bg-secondary h-[1px]" style={{ backgroundColor: "#ccc" }}/>

            <View style={{flexDirection: 'row',alignItems: 'center',justifyContent: 'space-around'}}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Feather name="share-2" size={16} color="#000" />
                <Text style={{ marginLeft: 6, color: '#000', fontSize: 13 }}>Share</Text>
              </View>
              <View style={{width: 1,height: 40, backgroundColor: '#ccc',alignSelf: 'center'}} />
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Feather name="check-circle" size={16} color="#000" />
                  <Text style={{ marginLeft: 6, color: '#000', fontSize: 13 }}>Accept</Text>
              </View>
            </View>
        </View>

        <View 
          style={{height: 135,marginTop: 15,marginHorizontal: 20,backgroundColor: 'white',borderRadius: 20,padding: 10,shadowColor: '#000'
            ,shadowOffset: { width: 0, height: 1 },shadowOpacity: 0.1,shadowRadius: 2,elevation: 2,}}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>          
                <Image source={require('../../assets/images/image1.png')} style={{width: 42,height: 42,borderRadius: 21,margin:10,}}/>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', flex: 1 }}>
                  <View style={{ flex: 1 ,marginLeft:5}}>
                    <Text style={{ color: '#000', fontWeight: 'bold', fontSize: 14 }}>Kierra Franci</Text>
                    <Text style={{ color: '#555', fontSize: 12, marginTop: 2 }}>50 minutes ago</Text>
                  </View>
                  <TouchableOpacity onPress={() => {router.push("/details")}}>
                    <View style={{marginTop: 20,backgroundColor: '#E72929',borderRadius: 20,paddingVertical: 4,paddingHorizontal: 8,}}>
                      <Text style={{ color: 'white', fontSize: 12 }}>View Details</Text>
                    </View>
                  </TouchableOpacity>
                  <Text style={{ color: '#000', fontWeight: 'bold', fontSize: 14 ,marginRight:15}}>O+</Text>
                </View>
            </View>

            <View className = "w-full mt-5 bg-secondary h-[1px]" style={{ backgroundColor: "#ccc" }}/>

            <View style={{flexDirection: 'row',alignItems: 'center',justifyContent: 'space-around'}}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Feather name="share-2" size={16} color="#000" />
                <Text style={{ marginLeft: 6, color: '#000', fontSize: 13 }}>Share</Text>
              </View>
              <View style={{width: 1,height: 40, backgroundColor: '#ccc',alignSelf: 'center'}} />
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Feather name="check-circle" size={16} color="#000" />
                  <Text style={{ marginLeft: 6, color: '#000', fontSize: 13 }}>Accept</Text>
              </View>
            </View>
        </View>

        <View 
          style={{height: 135,marginTop: 15,marginHorizontal: 20,backgroundColor: 'white',borderRadius: 20,padding: 10,shadowColor: '#000'
            ,shadowOffset: { width: 0, height: 1 },shadowOpacity: 0.1,shadowRadius: 2,elevation: 2,}}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>          
                <Image source={require('../../assets/images/image1.png')} style={{width: 42,height: 42,borderRadius: 21,margin:10,}}/>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', flex: 1 }}>
                  <View style={{ flex: 1 ,marginLeft:5}}>
                    <Text style={{ color: '#000', fontWeight: 'bold', fontSize: 14 }}>Kierra Franci</Text>
                    <Text style={{ color: '#555', fontSize: 12, marginTop: 2 }}>50 minutes ago</Text>
                  </View>
                  <TouchableOpacity onPress={() => {router.push("/details")}}>
                    <View style={{marginTop: 20,backgroundColor: '#E72929',borderRadius: 20,paddingVertical: 4,paddingHorizontal: 8,}}>
                      <Text style={{ color: 'white', fontSize: 12 }}>View Details</Text>
                    </View>
                  </TouchableOpacity>
                  <Text style={{ color: '#000', fontWeight: 'bold', fontSize: 14 ,marginRight:15}}>O+</Text>
                </View>
            </View>

            <View className = "w-full mt-5 bg-secondary h-[1px]" style={{ backgroundColor: "#ccc" }}/>

            <View style={{flexDirection: 'row',alignItems: 'center',justifyContent: 'space-around'}}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Feather name="share-2" size={16} color="#000" />
                <Text style={{ marginLeft: 6, color: '#000', fontSize: 13 }}>Share</Text>
              </View>
              <View style={{width: 1,height: 40, backgroundColor: '#ccc',alignSelf: 'center'}} />
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Feather name="check-circle" size={16} color="#000" />
                  <Text style={{ marginLeft: 6, color: '#000', fontSize: 13 }}>Accept</Text>
              </View>
            </View>
        </View>

        <View 
          style={{height: 135,marginTop: 15,marginHorizontal: 20,backgroundColor: 'white',borderRadius: 20,padding: 10,shadowColor: '#000'
            ,shadowOffset: { width: 0, height: 1 },shadowOpacity: 0.1,shadowRadius: 2,elevation: 2,}}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>          
                <Image source={require('../../assets/images/image1.png')} style={{width: 42,height: 42,borderRadius: 21,margin:10,}}/>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', flex: 1 }}>
                  <View style={{ flex: 1 ,marginLeft:5}}>
                    <Text style={{ color: '#000', fontWeight: 'bold', fontSize: 14 }}>Kierra Franci</Text>
                    <Text style={{ color: '#555', fontSize: 12, marginTop: 2 }}>50 minutes ago</Text>
                  </View>
                  <TouchableOpacity onPress={() => {router.push("/details")}}>
                    <View style={{marginTop: 20,backgroundColor: '#E72929',borderRadius: 20,paddingVertical: 4,paddingHorizontal: 8,}}>
                      <Text style={{ color: 'white', fontSize: 12 }}>View Details</Text>
                    </View>
                  </TouchableOpacity>
                  <Text style={{ color: '#000', fontWeight: 'bold', fontSize: 14 ,marginRight:15}}>O+</Text>
                </View>
            </View>

            <View className = "w-full mt-5 bg-secondary h-[1px]" style={{ backgroundColor: "#ccc" }}/>

            <View style={{flexDirection: 'row',alignItems: 'center',justifyContent: 'space-around'}}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Feather name="share-2" size={16} color="#000" />
                <Text style={{ marginLeft: 6, color: '#000', fontSize: 13 }}>Share</Text>
              </View>
              <View style={{width: 1,height: 40, backgroundColor: '#ccc',alignSelf: 'center'}} />
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Feather name="check-circle" size={16} color="#000" />
                  <Text style={{ marginLeft: 6, color: '#000', fontSize: 13 }}>Accept</Text>
              </View>
            </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}
