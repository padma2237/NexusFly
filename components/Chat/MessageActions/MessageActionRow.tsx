import React from "react";
import {
  View,
  StyleSheet,
} from "react-native";

import {
  Copy,
  Share2,
  RotateCcw,
  MoreHorizontal,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react-native";

import MessageActionButton from "./MessageActionButton";

import { useTheme } from "../../../theme/useTheme";

interface MessageActionRowProps {
  onCopy: () => void;
  onShare: () => void;
  onRegenerate?: () => void;
  onMore: () => void;
  showFeedback?: boolean;
}

export default function MessageActionRow({
  onCopy,
  onShare,
  onRegenerate,
  onMore,
  showFeedback = false,
}: MessageActionRowProps) {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>

      {showFeedback && (
        <>
          <MessageActionButton
            onPress={() => {}}
            icon={
              <ThumbsUp
                size={18}
                color={colors.subText}
              />
            }
          />

          <MessageActionButton
            onPress={() => {}}
            icon={
              <ThumbsDown
                size={18}
                color={colors.subText}
              />
            }
          />
        </>
      )}

      {onRegenerate && (
        <MessageActionButton
          onPress={onRegenerate}
          icon={
            <RotateCcw
              size={18}
              color={colors.subText}
            />
          }
        />
      )}

      <MessageActionButton
        onPress={onCopy}
        icon={
          <Copy
            size={18}
            color={colors.subText}
          />
        }
      />

      <MessageActionButton
        onPress={onShare}
        icon={
          <Share2
            size={18}
            color={colors.subText}
          />
        }
      />

      <MessageActionButton
        onPress={onMore}
        icon={
          <MoreHorizontal
            size={20}
            color={colors.subText}
          />
        }
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    paddingLeft: 4,
    paddingRight: 4,
  },
});

//const styles = StyleSheet.create({
 // container: {
  //  flexDirection: "row",
  //  alignItems: "center",
 //   marginTop: 2,
//    marginLeft: 4,
//  },
// });