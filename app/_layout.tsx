import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { LogBox } from "react-native";
import { Provider } from "react-redux";
import { store } from "../store";

LogBox.ignoreLogs([
  "TurboModuleRegistry.getEnforcing(...): 'RNMapsAirModule' could not be found",
  // 添加其它想暂时忽略的错误或警告信息
]);

export default function RootLayout() {
  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <StatusBar style="light"></StatusBar>
        <Stack
          screenOptions={{
            // 设置所有页面的切换动画为从右侧滑入，适用于iOS 和 Android
            animation: "slide_from_right",
            gestureEnabled: true,
            gestureDirection: "horizontal",
            // 隐藏自带的头部
            headerShown: false,
          }}
        >
          <Stack.Screen name="(tabs)" options={{ title: "底部导航栏" }} />
          <Stack.Screen
            name="p-photo_detail"
            options={{ title: "照片详情页" }}
          />
          <Stack.Screen name="p-ai_edit" options={{ title: "AI文案编辑页" }} />
          <Stack.Screen name="p-import" options={{ title: "照片导入页" }} />
        </Stack>
      </GestureHandlerRootView>
    </Provider>
  );
}
