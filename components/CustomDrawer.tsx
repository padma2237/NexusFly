import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
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

import {
  useConversation,
} from "../context/ConversationContext";

export default function CustomDrawer(props: any) {

  const { colors } = useTheme();

  const styles = React.useMemo(
    () => createStyles(colors),
    [colors]
  );

  const [
    deleteModalVisible,
    setDeleteModalVisible,
  ] = React.useState(false);

  const [
    selectedChatId,
    setSelectedChatId,
  ] = React.useState<string | null>(null);

  const [
    renameModalVisible,
    setRenameModalVisible,
  ] = React.useState(false);

  const [
    selectedConversation,
    setSelectedConversation,
  ] = React.useState<{
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
        style={{
          backgroundColor: colors.background,
        }}
        contentContainerStyle={{
          paddingBottom: 20,
        }}
      >

        <Text style={styles.logo}>
          NexusFly
        </Text>

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
            color={colors.text}
          />

          <Text style={styles.newChatText}>
            New Chat
          </Text>
        </TouchableOpacity>

        <Text style={styles.heading}>
          Conversations
        </Text>

        {conversations.map((chat) => {
          const isActive =
            chat.id === currentConversationId;

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

                  activeBackgroundColor={
                    colors.primary
                  }

                  activeTintColor={
                    colors.text
                  }

                  inactiveTintColor={
                    colors.text
                  }

                  label={chat.title}

                  labelStyle={[
                    styles.label,
                    {
                      color: isActive
                        ? colors.text
                        : colors.text,

                      fontWeight:
                        isActive
                          ? "700"
                          : "500",
                    },
                  ]}

                  icon={({ color, size }) => (
                    <MaterialCommunityIcons
                      name="chat-outline"
                      size={size}
                      color={color}
                    />
                  )}

                  onPress={() => {
                    setCurrentConversationId(
                      chat.id
                    );

                    props.navigation.closeDrawer();
                  }}
                />
              </View>

              {/* RENAME */}

              <TouchableOpacity
                onPress={() => {
                  setSelectedConversation({
                    id: chat.id,
                    title: chat.title,
                  });

                  setRenameModalVisible(true);
                }}
                style={{
                  paddingHorizontal: 10,
                }}
              >
                <Ionicons
                  name="create-outline"
                  size={20}
                  color={colors.primary}
                />
              </TouchableOpacity>

              {/* DELETE */}

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
                  color={colors.error}
                />
              </TouchableOpacity>

            </View>
          );
        })}

      </DrawerContentScrollView>

      {/* ========================================= */}
      {/* BOTTOM NAVIGATION GRID */}
      {/* ========================================= */}

      <View style={styles.bottomSectionGrid}>

        {/* Row One */}

        <View style={styles.gridRow}>

          <TouchableOpacity
            style={styles.gridItem}
            onPress={() =>
              props.navigation.navigate(
                "Dashboard"
              )
            }
          >
            <Ionicons
              name="speedometer-outline"
              size={18}
              color={colors.text}
            />

            <Text
              numberOfLines={1}
              style={styles.gridLabel}
            >
              Dashboard
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.gridItem}
            onPress={() =>
              props.navigation.navigate(
                "Interactive"
              )
            }
          >
            <Ionicons
              name="construct-outline"
              size={18}
              color={colors.text}
            />

            <Text
              numberOfLines={1}
              style={styles.gridLabel}
            >
              Interactive
            </Text>
          </TouchableOpacity>

        </View>

        {/* Row Two */}

        <View style={styles.gridRow}>

          <TouchableOpacity
            style={styles.gridItem}
            onPress={() =>
              props.navigation.navigate(
                "Feed"
              )
            }
          >
            <Ionicons
              name="images-outline"
              size={18}
              color={colors.text}
            />

            <Text
              numberOfLines={1}
              style={styles.gridLabel}
            >
              NexusFeed
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.gridItem}
            onPress={() =>
              props.navigation.navigate(
                "Settings"
              )
            }
          >
            <Ionicons
              name="settings-outline"
              size={18}
              color={colors.text}
            />

            <Text
              numberOfLines={1}
              style={styles.gridLabel}
            >
              Settings
            </Text>
          </TouchableOpacity>

        </View>

      </View>

      {/* ========================================= */}
      {/* RENAME MODAL */}
      {/* ========================================= */}

      <CustomModal
        visible={renameModalVisible}
        title="Rename Conversation"
        message=""
        confirmText="Save"
        cancelText="Cancel"
        showInput
        inputValue={
          selectedConversation?.title ?? ""
        }
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

      {/* ========================================= */}
      {/* DELETE MODAL */}
      {/* ========================================= */}

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
            deleteConversation(
              selectedChatId
            );
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

      backgroundColor:
        colors.primary,

      marginHorizontal: 15,
      padding: 14,
      borderRadius: 14,
      marginBottom: 25,
    },

    newChatText: {
      color: colors.text,
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

      borderTopColor:
        colors.border,

      backgroundColor:
        colors.background,

      paddingVertical: 12,
      paddingHorizontal: 10,

      paddingBottom:
        Platform.OS === "ios"
          ? 24
          : 12,
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

      backgroundColor:
        colors.surface,

      paddingVertical: 10,
      paddingHorizontal: 10,

      borderRadius: 10,
      marginHorizontal: 4,

      borderWidth: 0.5,

      borderColor:
        colors.border,
    },

    gridLabel: {
      marginLeft: 6,
      fontSize: 13,
      fontWeight: "600",
      flex: 1,
      color: colors.text,
    },

  });