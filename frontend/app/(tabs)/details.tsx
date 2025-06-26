import { Text, View, SafeAreaView, ScrollView, Image,TouchableOpacity} from "react-native";
import { Link ,useRouter} from "expo-router";

export default function Details() {

  const router = useRouter();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
          <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
            
            <View style={{ width: '100%', height: 120, backgroundColor: '#E72929' }}>
              <View style={{ marginTop: 50, paddingHorizontal: 20 }}>
                <Text style={{ color: "white", fontSize: 24, fontWeight: "bold" }}>Details Information</Text>
              </View>
            </View>

            <TouchableOpacity
          style={{
            position: 'absolute',
            top: 130,
            right: 20,
            zIndex: 1,
            backgroundColor: '#fff',
            borderRadius: 20,
            width: 30,
            height: 30,
            justifyContent: 'center',
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
            margin:20,
          }}
          onPress={() => {router.push("/notification")}}>
          <Text style={{ fontSize: 16, color: '#E72929',fontWeight:'bold' }}>✕</Text>
        </TouchableOpacity>
            <View>
            <Image
              source={require('../../assets/images/image1.png')}
              style={{
                width: 80,
                height: 80,
                borderRadius: 50,
                alignSelf: 'center',
                marginTop: 60,
                marginBottom: 20,
              }}
            />   
            </View> 

            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 10 }}>
              <View style={{ width: '100%', maxWidth: 300 }}>
                <View style={{flexDirection: 'row',borderWidth: 1,borderColor: '#FFE2E2',borderRadius: 10, padding: 10,marginLeft:30,marginRight:30,backgroundColor: '#FFE2E2',height:40,marginTop:15}}>
                  <Text style={{ fontWeight: 'bold', fontSize:16,marginLeft: 30 }}>Name : </Text>
                  <Text style={{fontSize:16 }}> Abc</Text>
                </View>
                <View style={{flexDirection: 'row',borderWidth: 1,borderColor: '#FFE2E2',borderRadius: 10, padding: 10,marginLeft:30,marginRight:30,backgroundColor: '#FFE2E2',height:40,marginTop:15}}>
                  <Text style={{ fontWeight: 'bold', fontSize:16 ,marginLeft: 30}}>Address : </Text>
                  <Text style={{fontSize:16 }}>Xyz Road</Text>
                </View>
                <View style={{flexDirection: 'row',borderWidth: 1,borderColor: '#FFE2E2',borderRadius: 10, padding: 10,marginLeft:30,marginRight:30,backgroundColor: '#FFE2E2',height:40,marginTop:15}}>
                  <Text style={{ fontWeight: 'bold', fontSize:16,marginLeft: 30 }}>Mobile No : </Text>
                  <Text style={{fontSize:16 }}>0123456789</Text>
                </View>
                <View style={{flexDirection: 'row',borderWidth: 1,borderColor: '#FFE2E2',borderRadius: 10, padding: 10,marginLeft:30,marginRight:30,backgroundColor: '#FFE2E2',height:40,marginTop:15}}>
                  <Text style={{ fontWeight: 'bold', fontSize:16,marginLeft: 30 }}>Current Status : </Text>
                  <Text style={{fontSize:16 }}>Eligible</Text>
                </View>
              </View>
            </View>

          </ScrollView>
    </SafeAreaView>
  );
}