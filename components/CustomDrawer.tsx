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
import {
  useConversation
} from "../context/ConversationContext";

export default function CustomDrawer(props: any) {

  const [deleteModalVisible,
    setDeleteModalVisible] = React.useState(false);
  const [selectedChatId,
    setSelectedChatId] = React.useState < string | null > (null);

  const [renameModalVisible,
    setRenameModalVisible] = React.useState(false);
  const [selectedConversation,
    setSelectedConversation] = React.useState < {
    id: string;
    title: string;
  } | null > (null);


  const {
    createNewConversation,
    conversations,
    currentConversationId,
    setCurrentConversationId,
    deleteConversation,
    renameConversation,
  } = useConversation();


  return (
    <>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={ {
          backgroundColor: "#020617",
          paddingBottom: 20,
        }}
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
            style={ {
              flexDirection: "row",
              alignItems: "center",
            }}
            >
            <View style={ { flex: 1 }}>


              <DrawerItem
                focused={chat.id === currentConversationId}
                activeBackgroundColor="#1e3a8a"
                activeTintColor="#ffffff"
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
                setSelectedConversation({
                  id: chat.id,
                  title: chat.title,
                });

                setRenameModalVisible(true);
              }}
              style={ {
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

              style={ {
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
        visible={renameModalVisible}
        title="Rename Conversation"
        message=""
        confirmText="Save"
        cancelText="Cancel"
        showInput
        inputValue={selectedConversation?.title ?? ""}
        inputPlaceholder="Conversation name"
        onCancel={() => {
          setRenameModalVisible(false);
          setSelectedConversation(null);
        }}
        onConfirm={(value) => {
          if (
            selectedConversation &&
            value?.trim()
          ) {
            renameConversation(
              selectedConversation.id,
              value.trim()
            );
          }

          setRenameModalVisible(false);
          setSelectedConversation(null);
        }}
        />


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