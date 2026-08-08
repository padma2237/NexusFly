import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Platform,
} from "react-native";

import { useTheme } from "../theme/useTheme";

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
  
  const { colors } = useTheme();
  const styles = React.useMemo(
    () => createStyles(colors),
    [colors]
  );

  const [deleteModalVisible, setDeleteModalVisible] = React.useState(false);
  const [selectedChatId, setSelectedChatId] = React.useState<string | null>(null);

  const [renameModalVisible, setRenameModalVisible] = React.useState(false);
  const [selectedConversation, setSelectedConversation] = React.useState<{
    id: string;
    title: string;
  } | null>(null);


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
        style={{ backgroundColor: colors.background }}
        contentContainerStyle={{ paddingBottom: 20 }}
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


        {conversations.map((chat) => {
          const isActive = chat.id === currentConversationId;
          return (
            <View
              key={chat.id}
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <View style={{ flex: 1 }}>
                <DrawerItem
                  focused={isActive}
                  activeBackgroundColor={colors.primary || "#1e3a8a"} // Uses theme primary or defaults to your dark blue
                  activeTintColor="#ffffff" // Forces the icon to be white when selected
                  inactiveTintColor={colors.text || "#4B5563"} // Follows theme text or falls back
                  label={chat.title}
                  labelStyle={[
                    styles.label, 
                    { 
                      color: isActive ? "#ffffff" : (colors.text || "#111827"), // White when active, theme text when inactive
                      fontWeight: isActive ? "700" : "500" 
                    }
                  ]}
                  icon={({ color, size }) => (
                    <MaterialCommunityIcons
                      name="chat-outline"
                      size={size}
                      color={color} // Automatically handles tint mapping
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
                style={{ paddingHorizontal: 10 }}
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
                style={{ paddingHorizontal: 15 }}
              >
                <Ionicons
                  name="trash-outline"
                  size={20}
                  color="#ef4444"
                />
              </TouchableOpacity>
            </View>
          );
        })}

        
        
        
      </DrawerContentScrollView>
      
      {/* 2x2 COMPACT NAVIGATION GRID ADDED TO THE BOTTOM */}
      <View style={styles.bottomSectionGrid}>
        {/* Row One: Dashboard & Interactive */}
        <View style={styles.gridRow}>
          <TouchableOpacity 
            style={styles.gridItem} 
            onPress={() => props.navigation.navigate("Dashboard")}
          >
            <Ionicons name="speedometer-outline" size={18} color={colors.text || "#4B5563"} />
            <Text numberOfLines={1} style={[styles.gridLabel, { color: colors.text }]}>Dashboard</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.gridItem} 
            onPress={() => props.navigation.navigate("Interactive")}
          >
            <Ionicons name="construct-outline" size={18} color={colors.text || "#4B5563"} />
            <Text numberOfLines={1} style={[styles.gridLabel, { color: colors.text }]}>Interactive</Text>
          </TouchableOpacity>
        </View>

        {/* Row Two: NexusFeed & Settings */}
        <View style={styles.gridRow}>
          <TouchableOpacity 
            style={styles.gridItem} 
            onPress={() => props.navigation.navigate("Feed")}
          >
            <Ionicons name="images-outline" size={18} color={colors.text || "#4B5563"} />
            <Text numberOfLines={1} style={[styles.gridLabel, { color: colors.text }]}>NexusFeed</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.gridItem} 
            onPress={() => props.navigation.navigate("Settings")}
          >
            <Ionicons name="settings-outline" size={18} color={colors.text || "#4B5563"} />
            <Text numberOfLines={1} style={[styles.gridLabel, { color: colors.text }]}>Settings</Text>
          </TouchableOpacity>
        </View>
      </View>

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
          if (selectedConversation && value?.trim()) {
            renameConversation(selectedConversation.id, value.trim());
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

const createStyles = (colors: any) =>
  StyleSheet.create({
    logo: {
      color: colors.text,
      fontSize: 30,
      fontWeight: "bold",
      marginTop: 25,
      marginLeft: 20,
      marginBottom: 25,
    },
    newChat: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.primary,
      marginHorizontal: 15,
      padding: 14,
      borderRadius: 14,
      marginBottom: 25,
    },
    newChatText: {
      color: "#fff",
      marginLeft: 10,
      fontWeight: "600",
      fontSize: 16,
    },
    heading: {
      color: colors.subText,
      marginLeft: 18,
      marginBottom: 10,
      fontSize: 13,
      fontWeight: "600",
    },
    label: {
      color: colors.text,
      fontSize: 15,
    },
    bottomSectionGrid: {
      borderTopWidth: 1,
      borderTopColor: colors.border,
      backgroundColor: colors.background,
      paddingVertical: 12,
      paddingHorizontal: 10,
      paddingBottom: Platform.OS === 'ios' ? 24 : 12,
    },
    gridRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 6,
    },
    gridItem: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.card || "rgba(0,0,0,0.03)", 
      paddingVertical: 10,
      paddingHorizontal: 10,
      borderRadius: 10,
      marginHorizontal: 4,
      borderWidth: 0.5,
      borderColor: colors.border || "transparent",
    },
    gridLabel: {
      marginLeft: 6,
      fontSize: 13,
      fontWeight: "600",
      flex: 1,
    },
  });
