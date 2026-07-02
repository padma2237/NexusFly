import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import ChatScreen from "../screens/ChatScreen";
import SettingsScreen from "../screens/SettingsScreen";
import CustomDrawer from "../components/CustomDrawer";

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
      <Drawer.Navigator
        drawerContent={(props) => (
            <CustomDrawer {...props} />
              )}
      id="MainDrawer"
            initialRouteName="Chat"
                  screenOptions={{
                          headerShown: false,
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