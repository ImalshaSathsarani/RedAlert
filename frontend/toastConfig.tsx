// toastConfig.tsx
import React from 'react';
import { View, Text } from 'react-native';


export const toastConfig = {
  bloodAlert: ({ text1, text2 }: any) => {
    return (
      <View
        style={{
          height: 80,
          width: '90%',
          backgroundColor: '#B43929', // Blood red
          borderRadius: 12,
          padding: 16,
          justifyContent: 'center',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.3,
          shadowRadius: 4,
          elevation: 5,
        }}
      >
        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 ,fontFamily:'poppins'}}>
          {text1}
        </Text>
        <Text style={{ color: 'white', fontSize: 13, fontFamily:'poppins' }}>{text2}</Text>
      </View>
    );
  },
};
