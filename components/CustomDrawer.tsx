import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import {
  DrawerContentScrollView,
  DrawerItem,
} from "@react-navigation/drawer";

import {
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

import Colors from "../constants/colors";
import { useConversation } from "../context/ConversationContext";

export default function CustomDrawer(props: any) {
  const {
    createNewConversation,
    conversations,
    setCurrentConversationId,
    deleteConversation,
  } = useConversation();


  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={styles.container}
    >
      <Text style={styles.logo}>NexusFly</Text>

      <TouchableOpacity
        style={styles.newChat}
        onPress={() => {
          createNewConversation();
          props.navigation.closeDrawer();
        }}
      >
        <Ionicons
          name="add"
          size={22}
          color="white"
        />
        <Text style={styles.newChatText}>
          New Chat
        </Text>
      </TouchableOpacity>

      <Text style={styles.heading}>
        Conversations
      </Text>

      {conversations.map((chat) => ( 
        

<View
  key={chat.id}
    style={{
        flexDirection: "row",
            alignItems: "center",
              }}
              >
                <View style={{ flex: 1 }}>
                    <DrawerItem
                          label={chat.title}
                                labelStyle={styles.label}
                                      icon={({ color, size }) => (
                                              <MaterialCommunityIcons
                                                        name="chat-outline"
                                                                  size={size}
                                                                            color={color}
                                                                                    />
                                                                                          )}
                                                                                                onPress={() => {
                                                                                                        setCurrentConversationId(chat.id);
                                                                                                                props.navigation.closeDrawer();
                                                                                                                      }}
                                                                                                                          />
                                                                                                                            </View>

                                                                                                                              <TouchableOpacity
                                                                                                                                  onPress={() => deleteConversation(chat.id)}
                                                                                                                                      style={{
                                                                                                                                            paddingHorizontal: 15,
                                                                                                                                                }}
                                                                                                                                                  >
                                                                                                                                                      <Ionicons
                                                                                                                                                            name="trash-outline"
                                                                                                                                                                  size={20}
                                                                                                                                                                        color="#ef4444"
                                                                                                                                                                            />
                                                                                                                                                                              </TouchableOpacity>
                                                                                                                                                                              </View>))}









          


      <View style={{ flex: 1 }} />

      <DrawerItem
        label="Settings"
        labelStyle={styles.label}
        icon={({ color, size }) => (
          <Ionicons
            name="settings-outline"
            size={size}
            color={color}
          />
        )}
        onPress={() =>
          props.navigation.navigate("Settings")
        }
      />
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#020617",
  },

  logo: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 25,
    marginLeft: 20,
    marginBottom: 25,
  },

  newChat: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4f46e5",
    marginHorizontal: 15,
    padding: 14,
    borderRadius: 14,
    marginBottom: 25,
  },

  newChatText: {
    color: "white",
    marginLeft: 10,
    fontWeight: "600",
    fontSize: 16,
  },

  heading: {
    color: "#94a3b8",
    marginLeft: 18,
    marginBottom: 10,
    fontSize: 13,
    fontWeight: "600",
  },

  label: {
    color: "white",
    fontSize: 15,
  },
});