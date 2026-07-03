import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Platform,
} from "react-native";

import CustomModal from "../components/CustomModal";

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

  const [deleteModalVisible, setDeleteModalVisible] = React.useState(false);
  const [selectedChatId, setSelectedChatId] = React.useState<string | null>(null);

  const {
    createNewConversation,
    conversations,
    setCurrentConversationId,
    deleteConversation,
    renameConversation,
  } = useConversation();


  return (
    <>
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
              onPress={() => {
                if (Platform.OS === "android") {
                  Alert.alert(
                    "Rename",
                    "We'll replace this with a custom rename dialog in the next step."
                  );
                }
              }}
              style={{
                paddingHorizontal: 10,
              }}
            >
              <Ionicons
                name="create-outline"
                size={20}
                color="#60a5fa"
              />
            </TouchableOpacity>

            <TouchableOpacity

              onPress={() => {
                setSelectedChatId(chat.id);
                setDeleteModalVisible(true);
              }}

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


      <CustomModal
        visible={deleteModalVisible}
        title="Delete Conversation"
        message="This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        onCancel={() => {
          setDeleteModalVisible(false);
          setSelectedChatId(null);
        }}
        onConfirm={() => {
          if (selectedChatId) {
            deleteConversation(selectedChatId);
          }

          setDeleteModalVisible(false);
          setSelectedChatId(null);
        }}
      />
    </>
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