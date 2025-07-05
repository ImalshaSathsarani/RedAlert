import { Dimensions, View } from "react-native";
import React, { ReactNode } from "react";

const { height } = Dimensions.get("window");

interface GetStartedBackgroundProps {
  children: ReactNode;
}

export default function GetStartedBackground({
  children,
}: GetStartedBackgroundProps) {
  return (
    <View className="flex-1 items-center  bg-white">
      <View className="w-full absolute top-0 left-0">
        <View
          className="bg-secondary rounded-t-2xl"
          style={{
            height: height / 2,
            borderBottomLeftRadius: 80,
          }}
        ></View>

        <View
          className="bg-secondary w-full"
          style={{
            height: height / 5,
          }}
        >
          <View
            className="bg-white rounded-tr-2xl"
            style={{
              height: height / 2,
              borderTopRightRadius: 80,
            }}
          ></View>
        </View>
      </View>

      <View className="z-10 w-full h-full">{children}</View>
    </View>
  );
}
