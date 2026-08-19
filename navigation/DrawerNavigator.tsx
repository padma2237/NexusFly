import React from "react";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";

import { useTheme } from "../theme/useTheme";

import ChatScreen from "../screens/ChatScreen";
import SettingsScreen from "../screens/SettingsScreen";
import InteractiveScreen from "../screens/InteractiveScreen";
import FeedScreen from "../screens/FeedScreen";

import CustomDrawer from "../components/CustomDrawer";

const Drawer = createDrawerNavigator();


// ============================================================
// DASHBOARD SCREEN
// ============================================================

function DashboardScreen() {
  const { colors } = useTheme();

  return (
    <ScrollView
      style={[
        styles.dashboardContainer,
        {
          backgroundColor: colors.background,
        },
      ]}
      contentContainerStyle={styles.dashboardContent}
      showsVerticalScrollIndicator={false}
    >
      {/* -------------------------------------------------- */}
      {/* HEADER */}
      {/* -------------------------------------------------- */}

      <Text
        style={[
          styles.mainHeading,
          {
            color: colors.text,
          },
        ]}
      >
        Performance
      </Text>

      <Text
        style={[
          styles.subText,
          {
            color: colors.subText,
          },
        ]}
      >
        Real-time app statistics
      </Text>


      {/* -------------------------------------------------- */}
      {/* STATS GRID */}
      {/* -------------------------------------------------- */}

      <View style={styles.grid}>

        {/* Total Views */}

        <View
          style={[
            styles.card,
            {
              backgroundColor: colors.surface,
              borderColor: colors.border,
            },
          ]}
        >
          <Text
            style={[
              styles.cardTitle,
              {
                color: colors.subText,
              },
            ]}
          >
            Total Views
          </Text>

          <Text
            style={[
              styles.cardStat,
              {
                color: colors.text,
              },
            ]}
          >
            12.4K
          </Text>

          <Text
            style={[
              styles.cardTrend,
              {
                color: colors.success,
              },
            ]}
          >
            +14% this week
          </Text>
        </View>


        {/* Active Users */}

        <View
          style={[
            styles.card,
            {
              backgroundColor: colors.surface,
              borderColor: colors.border,
            },
          ]}
        >
          <Text
            style={[
              styles.cardTitle,
              {
                color: colors.subText,
              },
            ]}
          >
            Active Users
          </Text>

          <Text
            style={[
              styles.cardStat,
              {
                color: colors.text,
              },
            ]}
          >
            1,105
          </Text>

          <Text
            style={[
              styles.cardTrendLive,
              {
                color: colors.error,
              },
            ]}
          >
            ● Live Now
          </Text>
        </View>

      </View>


      {/* -------------------------------------------------- */}
      {/* RECENT ACTIVITY */}
      {/* -------------------------------------------------- */}

      <Text
        style={[
          styles.sectionHeading,
          {
            color: colors.text,
          },
        ]}
      >
        Recent Activity
      </Text>


      {/* Premium Subscription */}

      <TouchableOpacity
        activeOpacity={0.8}
        style={[
          styles.listItem,
          {
            backgroundColor: colors.surface,
            borderColor: colors.border,
          },
        ]}
      >
        <View
          style={[
            styles.avatarPlaceholder,
            {
              backgroundColor: colors.border,
            },
          ]}
        />

        <View style={styles.listTextContainer}>
          <Text
            style={[
              styles.listTitle,
              {
                color: colors.text,
              },
            ]}
          >
            New premium subscription
          </Text>

          <Text
            style={[
              styles.listTime,
              {
                color: colors.subText,
              },
            ]}
          >
            2 minutes ago
          </Text>
        </View>

        <Text
          style={[
            styles.listAmount,
            {
              color: colors.success,
            },
          ]}
        >
          +$9.99
        </Text>
      </TouchableOpacity>


      {/* Server Update */}

      <TouchableOpacity
        activeOpacity={0.8}
        style={[
          styles.listItem,
          {
            backgroundColor: colors.surface,
            borderColor: colors.border,
          },
        ]}
      >
        <View
          style={[
            styles.avatarPlaceholder,
            {
              backgroundColor: colors.border,
            },
          ]}
        />

        <View style={styles.listTextContainer}>
          <Text
            style={[
              styles.listTitle,
              {
                color: colors.text,
              },
            ]}
          >
            Server update deployment
          </Text>

          <Text
            style={[
              styles.listTime,
              {
                color: colors.subText,
              },
            ]}
          >
            1 hour ago
          </Text>
        </View>

        <Text
          style={[
            styles.listStatusText,
            {
              color: colors.primary,
              backgroundColor: colors.background,
              borderColor: colors.border,
            },
          ]}
        >
          Success
        </Text>
      </TouchableOpacity>

    </ScrollView>
  );
}


// ============================================================
// DRAWER NAVIGATOR
// ============================================================

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

      {/* Chat */}

      <Drawer.Screen
        name="Chat"
        component={ChatScreen}
      />


      {/* Dashboard */}

      <Drawer.Screen
        name="Dashboard"
        component={DashboardScreen}
      />


      {/* Interactive */}

      <Drawer.Screen
        name="Interactive"
        component={InteractiveScreen}
      />


      {/* Feed */}

      <Drawer.Screen
        name="Feed"
        component={FeedScreen}
      />


      {/* Settings */}

      <Drawer.Screen
        name="Settings"
        component={SettingsScreen}
      />

    </Drawer.Navigator>
  );
}


// ============================================================
// STATIC LAYOUT STYLES
// ============================================================
//
// IMPORTANT:
// No theme colors belong here.
//
// Colors are applied dynamically inside the component using
// colors from useTheme().
//
// ============================================================

const styles = StyleSheet.create({

  dashboardContainer: {
    flex: 1,
  },

  dashboardContent: {
    padding: 20,
    paddingTop: 50,
    paddingBottom: 40,
  },


  // ----------------------------------------------------------
  // HEADER
  // ----------------------------------------------------------

  mainHeading: {
    fontSize: 28,
    fontWeight: "800",
  },

  subText: {
    fontSize: 14,
    marginTop: 4,
    marginBottom: 20,
  },


  // ----------------------------------------------------------
  // STATS
  // ----------------------------------------------------------

  grid: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  card: {
    width: "48%",
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
  },

  cardTitle: {
    fontSize: 12,
    fontWeight: "600",
  },

  cardStat: {
    fontSize: 24,
    fontWeight: "800",
    marginVertical: 4,
  },

  cardTrend: {
    fontSize: 11,
    fontWeight: "600",
  },

  cardTrendLive: {
    fontSize: 11,
    fontWeight: "600",
  },


  // ----------------------------------------------------------
  // RECENT ACTIVITY
  // ----------------------------------------------------------

  sectionHeading: {
    fontSize: 18,
    fontWeight: "700",
    marginTop: 25,
    marginBottom: 10,
  },

  listItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
  },

  avatarPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },

  listTextContainer: {
    flex: 1,
    marginLeft: 12,
  },

  listTitle: {
    fontSize: 14,
    fontWeight: "600",
  },

  listTime: {
    fontSize: 12,
    marginTop: 2,
  },

  listAmount: {
    fontSize: 14,
    fontWeight: "700",
  },

  listStatusText: {
    fontSize: 12,
    fontWeight: "600",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
  },

});