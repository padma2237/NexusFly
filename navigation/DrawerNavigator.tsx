import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { useTheme } from "../theme/useTheme";
import ChatScreen from "../screens/ChatScreen";
import SettingsScreen from "../screens/SettingsScreen";
import CustomDrawer from "../components/CustomDrawer";
import { Dimensions, StyleSheet, Text, View, ScrollView, TouchableOpacity } 
from "react-native";



import InteractiveScreen from "../screens/InteractiveScreen";

import FeedScreen from "../screens/FeedScreen";



const Drawer = createDrawerNavigator();

// --- THE NEW NEW ANALYTICS DASHBOARD UI SCREEN ---
function DashboardScreen() {
  const { colors } = useTheme();

  return (
    <ScrollView style={[styles.dashboardContainer, { backgroundColor: colors.background }]} showsVerticalScrollIndicator={false}>
      <Text style={[styles.mainHeading, { color: colors.text || '#111827' }]}>Performance</Text>
      <Text style={styles.subText}>Real-time app statistics</Text>

      {/* Stats Grid */}
      <View style={styles.grid}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Total Views</Text>
          <Text style={styles.cardStat}>12.4K</Text>
          <Text style={styles.cardTrend}>+14% this week</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Active Users</Text>
          <Text style={styles.cardStat}>1,105</Text>
          <Text style={styles.cardTrendLive}>● Live Now</Text>
        </View>
      </View>

      {/* Detailed List Item */}
      <Text style={[styles.sectionHeading, { color: colors.text || '#111827' }]}>Recent Activity</Text>
      <TouchableOpacity style={styles.listItem}>
        <View style={styles.avatarPlaceholder} />
        <View style={styles.listTextContainer}>
          <Text style={styles.listTitle}>New premium subscription</Text>
          <Text style={styles.listTime}>2 minutes ago</Text>
        </View>
        <Text style={styles.listAmount}>+$9.99</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.listItem}>
        <View style={styles.avatarPlaceholder} />
        <View style={styles.listTextContainer}>
          <Text style={styles.listTitle}>Server update deployment</Text>
          <Text style={styles.listTime}>1 hour ago</Text>
        </View>
        <Text style={styles.listStatusText}>Success</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

// --- YOUR MAIN NAVIGATOR ---
export default function DrawerNavigator() {
  const { colors } = useTheme();
  
  return (
    <Drawer.Navigator
      drawerContent={(props) => (
        <CustomDrawer {...props} />
      )}
      id="MainDrawer"
      initialRouteName="Chat"
      screenOptions={{
        headerShown: false,
        drawerType: "back",
        drawerStyle: {
          width: Dimensions.get("window").width * 0.86,
          backgroundColor: colors.background,
        },
      }}
    >
      <Drawer.Screen
        name="Chat"
        component={ChatScreen}
      />

      {/* NEWLY CONNECTED DASHBOARD INTERFACE */}
      <Drawer.Screen
        name="Dashboard"
        component={DashboardScreen}
      />
      
      <Drawer.Screen name="Interactive" component={InteractiveScreen} />
  
  <Drawer.Screen name="Feed" component={FeedScreen} />

      <Drawer.Screen
        name="Settings"
        component={SettingsScreen}
      />
    </Drawer.Navigator>
  );
}

// Modern styles for the dashboard items
const styles = StyleSheet.create({
  dashboardContainer: {
    flex: 1,
    padding: 20,
    paddingTop: 50, // Added padding to clear potential device camera notches
  },
  mainHeading: {
    fontSize: 28,
    fontWeight: '800',
  },
  subText: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
    marginBottom: 20,
  },
  sectionHeading: {
    fontSize: 18,
    fontWeight: '700',
    marginTop: 25,
    marginBottom: 10,
  },
  grid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: '#FFFFFF',
    width: '48%',
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  cardTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280',
  },
  cardStat: {
    fontSize: 24,
    fontWeight: '800',
    color: '#111827',
    marginVertical: 4,
  },
  cardTrend: {
    fontSize: 11,
    color: '#10B981',
    fontWeight: '600',
  },
  cardTrendLive: {
    fontSize: 11,
    color: '#EF4444',
    fontWeight: '600',
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  avatarPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E5E7EB',
  },
  listTextContainer: {
    flex: 1,
    marginLeft: 12,
  },
  listTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  listTime: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 2,
  },
  listAmount: {
    fontSize: 14,
    fontWeight: '700',
    color: '#10B981',
  },
  listStatusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#3B82F6',
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
});
