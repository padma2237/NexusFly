import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from "react-native";
import { useTheme } from "../theme/useTheme";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

// Mock Data Arrays
const STORIES = [
  { id: "1", name: "Your Story", image: "https://picsum.photos", isUser: true },
  { id: "2", name: "alex_dev", image: "https://picsum.photos" },
  { id: "3", name: "nexus_fly", image: "https://picsum.photos" },
  { id: "4", name: "ai_design", image: "https://picsum.photos" },
  { id: "5", name: "termux_pro", image: "https://picsum.photos" },
];

const INITIAL_POSTS = [
  {
    id: "1",
    username: "nexus_fly",
    userAvatar: "https://picsum.photos",
    location: "Cyber Space",
    postImage: "https://picsum.photos",
    caption: "Running full React Native bundles directly on an Android device using Termux, Acode, and Expo Go. Mobile setup unlocked! 🚀💻",
    likes: 124,
    time: "2 hours ago",
    isLiked: false,
    isBookmarked: false,
  },
  {
    id: "2",
    username: "ai_design",
    userAvatar: "https://picsum.photos",
    location: "Neural Grid",
    postImage: "https://picsum.photos",
    caption: "The evolution of clean, minimalist UI interfaces. Letting the grid lines breathe. Minimal code, maximal interaction.",
    likes: 85,
    time: "5 hours ago",
    isLiked: false,
    isBookmarked: false,
  },
];

export default function FeedScreen() {
  const { colors } = useTheme();
  const [posts, setPosts] = useState(INITIAL_POSTS);

  const toggleLike = (id: string) => {
    setPosts(
      posts.map((post) =>
        post.id === id
          ? { ...post, isLiked: !post.isLiked, likes: post.isLiked ? post.likes - 1 : post.likes + 1 }
          : post
      )
    );
  };

  const toggleBookmark = (id: string) => {
    setPosts(
      posts.map((post) =>
        post.id === id ? { ...post, isBookmarked: !post.isBookmarked } : post
      )
    );
  };

  // Header and Horizontal Story Component
  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.storiesContainer}>
        {STORIES.map((story) => (
          <View key={story.id} style={styles.storyWrapper}>
            <View style={[styles.storyRing, { borderColor: story.isUser ? "#9CA3AF" : "#E1306C" }]}>
              <Image source={{ uri: story.image }} style={styles.storyAvatar} />
              {story.isUser && (
                <View style={[styles.addStoryBadge, { backgroundColor: colors.primary }]}>
                  <Ionicons name="add" size={12} color="#FFF" />
                </View>
              )}
            </View>
            <Text numberOfLines={1} style={[styles.storyName, { color: colors.text }]}>
              {story.name}
            </Text>
          </View>
        ))}
      </ScrollView>
      <View style={[styles.divider, { backgroundColor: colors.border || "#E5E7EB" }]} />
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Top Navbar Title */}
      <View style={[styles.navBar, { borderBottomColor: colors.border || "#E5E7EB" }]}>
        <Text style={[styles.navTitle, { color: colors.text }]}>NexusFeed</Text>
        <TouchableOpacity>
          <Ionicons name="paper-plane-outline" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

      {/* Main Timeline Stream */}
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderHeader}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.feedContent}
        renderItem={({ item }) => (
          <View style={[styles.postCard, { backgroundColor: colors.surface || "#FFF", borderColor: colors.border || "#E5E7EB" }]}>
            {/* User Profile Header Block */}
            <View style={styles.postHeader}>
              <View style={styles.userInfoRow}>
                <Image source={{ uri: item.userAvatar }} style={styles.userAvatarThumb} />
                <View>
                  <Text style={[styles.usernameText, { color: colors.text }]}>{item.username}</Text>
                  {item.location && <Text style={styles.locationText}>{item.location}</Text>}
                </View>
              </View>
              <TouchableOpacity>
                <Ionicons name="ellipsis-horizontal" size={20} color={colors.text} />
              </TouchableOpacity>
            </View>

            {/* Main Visual Image Media */}
            <Image source={{ uri: item.postImage }} style={styles.postMainImage} resizeMode="cover" />

            {/* Interactive Functional Actions Strip */}
            <View style={styles.actionStripRow}>
              <View style={styles.leftActions}>
                <TouchableOpacity onPress={() => toggleLike(item.id)} style={styles.actionButton}>
                  <Ionicons
                    name={item.isLiked ? "heart" : "heart-outline"}
                    size={26}
                    color={item.isLiked ? "#EF4444" : colors.text}
                  />
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                  <Ionicons name="chatbubble-outline" size={24} color={colors.text} />
                </TouchableOpacity>
              </View>
              <TouchableOpacity onPress={() => toggleBookmark(item.id)}>
                <Ionicons
                  name={item.isBookmarked ? "bookmark" : "bookmark-outline"}
                  size={24}
                  color={item.isBookmarked ? "#F59E0B" : colors.text}
                />
              </TouchableOpacity>
            </View>

            {/* Likes count & Captions Footer block */}
            <View style={styles.postFooterMeta}>
              <Text style={[styles.likesText, { color: colors.text }]}>{item.likes.toLocaleString()} likes</Text>
              <Text style={[styles.captionText, { color: colors.text }]}>
                <Text style={styles.captionUsername}>{item.username} </Text>
                {item.caption}
              </Text>
              <Text style={styles.timeAgoText}>{item.time}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 40 },
  navBar: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 15, paddingBottom: 10, borderBottomWidth: 0.5 },
  navTitle: { fontSize: 24, fontWeight: "800", fontStyle: "italic" },
  headerContainer: { marginTop: 10 },
  storiesContainer: { paddingHorizontal: 10, paddingBottom: 10 },
  storyWrapper: { alignItems: "center", marginRight: 15, width: 68 },
  storyRing: { width: 64, height: 64, borderRadius: 32, borderWidth: 2, padding: 2, justifyContent: "center", alignItems: "center", position: "relative" },
  storyAvatar: { width: 54, height: 54, borderRadius: 27 },
  addStoryBadge: { position: "absolute", bottom: 0, right: 0, width: 18, height: 18, borderRadius: 9, borderWidth: 2, borderColor: "#FFF", justifyContent: "center", alignItems: "center" },
  storyName: { fontSize: 11, marginTop: 4, width: "100%", textAlign: "center" },
  divider: { height: 0.5, marginTop: 10 },
  feedContent: { paddingBottom: 40 },
  postCard: { marginBottom: 15, borderWidth: 0.5, elevation: 1 },
  postHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 12 },
  userInfoRow: { flexDirection: "row", alignItems: "center" },
  userAvatarThumb: { width: 36, height: 36, borderRadius: 18, marginRight: 10 },
  usernameText: { fontSize: 14, fontWeight: "700" },
  locationText: { fontSize: 11, color: "#6B7280", marginTop: 1 },
  postMainImage: { width: width, height: width },
  actionStripRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 14, paddingVertical: 12 },
  leftActions: { flexDirection: "row", alignItems: "center" },
  actionButton: { marginRight: 18 },
  postFooterMeta: { paddingHorizontal: 14, paddingBottom: 14 },
  likesText: { fontSize: 14, fontWeight: "700" },
  captionText: { fontSize: 14, marginTop: 5, lineHeight: 18 },
  captionUsername: { fontWeight: "700" },
  timeAgoText: { fontSize: 11, color: "#9CA3AF", marginTop: 6, fontWeight: "500" },
});
