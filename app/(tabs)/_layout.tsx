import React from "react";
import { StyleSheet, View, Dimensions, Platform } from 'react-native';
import { Tabs } from "expo-router";
import { FontAwesome5, FontAwesome6 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';


export default function Layout() {
  return (
    <Tabs 
      backBehavior="order"
      screenOptions={{ 
          tabBarActiveTintColor: "#38BDF8",
          tabBarInactiveTintColor: "#94A3B8",
          tabBarStyle: {
            backgroundColor: "#0B1121"
          }
      }}>

        <Tabs.Screen
            name="index"
            options={{href: null}}
        />

        <Tabs.Screen name="p-album_home" options={{
            title: '相册', 
            headerShown: false,
            tabBarIcon: ({ color }) => (
                <FontAwesome6 name="images" size={20} color={color} />
            )
        }}/>

        <Tabs.Screen name="p-group_manage" options={{
            title: '分组', 
            headerShown: false,
            tabBarIcon: ({ color }) => (
                <FontAwesome6 name="folder" size={20} color={color} />
            )
        }}/>

        <Tabs.Screen name="p-settings" options={{
            title: '设置', 
            headerShown: false,
            tabBarIcon: ({ color }) => (
                <FontAwesome5 name="cog" size={20} color={color} />
            )
        }}/>
    </Tabs>
  );
}