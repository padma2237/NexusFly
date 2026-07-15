import React from "react";
import {
  createDrawerNavigator
} from "@react-navigation/drawer";

import ChatScreen from "../screens/ChatScreen";
import SettingsScreen from "../screens/SettingsScreen";
import CustomDrawer from "../components/CustomDrawer";

import { Dimensions } from "react-native";


const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => (
        <CustomDrawer {...props} />
      )}
      id="MainDrawer"
      initialRouteName="Chat"
      screenOptions={ {
        headerShown: false,
        drawerType: "back",
        drawerStyle: {
  width: Dimensions.get("window").width * 0.86,
  backgroundColor: "#020617",
},

}}
      
      >
      <Drawer.Screen
        name="Chat"
        component={ChatScreen}
        />

      <Drawer.Screen
        name="Settings"
        component={SettingsScreen}
        />
    </Drawer.Navigator>
  );
}