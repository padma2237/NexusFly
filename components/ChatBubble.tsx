import React, {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  Linking,
  Share,
  Keyboard,
  BackHandler,
  Modal,
  Dimensions,
} from "react-native";

import Animated, {
  FadeInLeft,
  FadeInRight,
} from "react-native-reanimated";

import AIResponse from "./AIResponse/AIResponse";


import MessageActionRow from "./Chat/MessageActions/MessageActionRow";

import UserMessageActions from "./Chat/MessageActions/UserMessageActions";

import * as Clipboard from "expo-clipboard";

import {
  useTheme
} from "../theme/useTheme";

import {
  Message
} from "../types/chat";

import {
  Attachment
} from "../components/Attachments/types/attachment";

import Markdown from "react-native-markdown-display";

import {
  BottomSheetModal,
} from "@gorhom/bottom-sheet";

import MessageActionSheet from "./MessageActionSheet";

import CodeBlock from "./CodeBlock";


interface ChatBubbleProps {
  message: Message;
  onRegenerate?: () => void;
  onEdit?: () => void;
}

const {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT
} =
Dimensions.get("window");

function ChatBubble({
  message,
  onRegenerate,
  onEdit,
}: ChatBubbleProps) {

  const isUser = message.role === "user";

  const {
    colors
  } = useTheme();

  const [expanded,
    setExpanded] =
  useState(false);

  const [selectedImage,
    setSelectedImage] =
  useState < string | null > (null);

  const LONG_MESSAGE_LENGTH = 500;

  const shouldCollapse =
  isUser &&
  message.text.length >
  LONG_MESSAGE_LENGTH;

  const styles = React.useMemo(
    () => createStyles(colors),
    [colors]
  );

  const markdownStyles = React.useMemo(
    () => createMarkdownStyles(colors),
    [colors]
  );

  const markdownRules = React.useMemo(
    () => ({
      text: (
        node: any,
        children: React.ReactNode[],
        parent: any[],
        styles: any,
        inheritedStyles: any = {}
      ) => {
        return (
          <Text
            key={node.key}
            selectable={true}
            style={[
              inheritedStyles,
              styles.text,
            ]}
            >
            {node.content}
          </Text>
        );
      },

      textgroup: (
        node: any,
        children: React.ReactNode[],
        parent: any[],
        styles: any
      ) => {
        return (
          <Text
            key={node.key}
            selectable={true}
            style={styles.textgroup}
            >
            {children}
          </Text>
        );
      },

      strong: (
        node: any,
        children: React.ReactNode[],
        parent: any[],
        styles: any
      ) => {
        return (
          <Text
            key={node.key}
            selectable={true}
            style={styles.strong}
            >
            {children}
          </Text>
        );
      },

      em: (
        node: any,
        children: React.ReactNode[],
        parent: any[],
        styles: any
      ) => {
        return (
          <Text
            key={node.key}
            selectable={true}
            style={styles.em}
            >
            {children}
          </Text>
        );
      },

      code_block: (
        node: any,
        children: React.ReactNode[],
        parent: any[],
        styles: any
      ) => {



        const code =
        String(node.content ?? "");

        return (
          <CodeBlock
            key={node.key}
            code={code}
            language="text"
            />
        );
      },

      fence: (
        node: any,
        children: React.ReactNode[],
        parent: any[],
        styles: any
      ) => {

        const code =
        String(node.content ?? "");

        const language =
        typeof node.info === "string" &&
        node.info.trim()
        ? node.info
        .trim()
        .split(/\s+/)[0]: "text";

        return (
          <CodeBlock
            key={node.key}
            code={code}
            language={language}
            />
        );
      },
    }),
    []
  );


  const sheetRef =
  useRef < BottomSheetModal > (null);

  const [isSheetOpen,
    setIsSheetOpen] =
  React.useState(false);


  useEffect(() => {

    const subscription =
    BackHandler.addEventListener(
      "hardwareBackPress",
      () => {

        if (selectedImage) {
          setSelectedImage(null);
          return true;
        }

        if (isSheetOpen) {
          sheetRef.current?.dismiss();
          return true;
        }

        return false;
      }
    );

    return () =>
    subscription.remove();

  }, [isSheetOpen, selectedImage]);


  const copyMessage = async () => {
    await Clipboard.setStringAsync(
      message.text
    );
  };


  const shareMessage = async () => {
    try {
      await Share.share({
        message: message.text,
      });
    } catch (error) {
      console.log(error);
    }
  };


  const getDomain = (url: string) => {
    try {
      return new URL(url)
      .hostname
      .replace("www.", "");
    } catch {
      return url;
    }
  };


  /*
   * ----------------------------------------
   * IMAGE ATTACHMENTS
   * ----------------------------------------
   */

  const imageAttachments =
  message.attachments?.filter(
    (attachment) =>
    attachment.type === "image" ||
    attachment.type === "camera"
  ) ?? [];


  const fileAttachments =
  message.attachments?.filter(
    (attachment) =>
    attachment.type !== "image" &&
    attachment.type !== "camera"
  ) ?? [];


  const renderImage = (
    attachment: Attachment,
    index: number
  ) => {

    const isSingle =
    imageAttachments.length === 1;

    return (
      <Pressable
        key={attachment.id}
        onPress={() =>
        setSelectedImage(
          attachment.uri
        )
        }
        style={[
          styles.imagePressable,
          isSingle
          ? styles.singleImagePressable: styles.gridImagePressable,
        ]}
        >

        <Image
          source={ {
            uri: attachment.uri,
          }}
          style={
          isSingle
          ? styles.singleImage: styles.gridImage
          }
          resizeMode="cover"
          />

      </Pressable>
    );
  };


  const renderFile = (
    attachment: Attachment
  ) => {

    return (
      <View
        key={attachment.id}
        style={[
          styles.attachmentFile,
          {
            backgroundColor:
            colors.background,
            borderColor:
            colors.border,
          },
        ]}
        >

        <Text
          style={[
            styles.attachmentFileName,
            {
              color: colors.text,
            },
          ]}
          numberOfLines={2}
          >
          {attachment.name ??
          attachment.type}
        </Text>

      </View>
    );
  };


  return (
    <>

      
        
        
        
        <Animated.View
  style={{
    alignSelf: isUser ? "flex-end" : "flex-start",
  }}
  entering={
    isUser
      ? FadeInRight
          .springify()
          .damping(50)
      : FadeInLeft
          .springify()
          .damping(50)
  }
>

        <View
          style={[
            styles.bubble,
            isUser
            ? styles.userBubble: styles.aiBubble,
          ]}
          >

          {isUser ? (

            <>
              {/*
               * IMAGE GRID
               */}

              {imageAttachments.length > 0 && (

                <View
                  style={[
                    styles.imageGrid,
                    imageAttachments.length === 1 &&
                    styles.singleImageGrid,
                  ]}
                  >

                  {imageAttachments.map(
                    renderImage
                  )}

                </View>
              )}


              {/*
               * NON-IMAGE ATTACHMENTS
               */}

              {fileAttachments.length > 0 && (

                <View
                  style={styles.fileContainer}
                  >

                  {fileAttachments.map(
                    renderFile
                  )}

                </View>
              )}


              {/*
               * USER TEXT
               */}

              {message.text.length > 0 && (

                <Text
                  style={styles.text}
                  numberOfLines={
                  shouldCollapse &&
                  !expanded
                  ? 8: undefined
                  }
                  ellipsizeMode="tail"
                  >
                  {message.text}
                </Text>
              )}


              {shouldCollapse && (

                <Pressable
                  onPress={() =>
                  setExpanded(
                    (prev) => !prev
                  )
                  }
                  hitSlop={8}
                  >

                  <Text
                    style={styles.showMore}
                    >
                    {expanded
                    ? "Show less ↑": "Show more ↓"}
                  </Text>

                </Pressable>
              )}



            </>

          ): (

            <>

<AIResponse text={message.text} />

              <MessageActionRow
                onCopy={copyMessage}
                onShare={shareMessage}
                onRegenerate={onRegenerate}
                onMore={() => {
                  Keyboard.dismiss();

                  setTimeout(() => {
                    sheetRef.current?.present();
                  }, 120);
                }}
                />


              {message.sources &&
              message.sources.length > 0 && (

                <>

                  <Text
                    style={
                    styles.sourceTitle
                    }
                    >
                    📚 Sources
                  </Text>


                  {message.sources.map(
                    (source, index) => (

                      <Pressable
                        key={index}
                        style={
                        styles.sourceCard
                        }
                        onPress={() =>
                        Linking.openURL(
                          source.url
                        )
                        }
                        >

                        <Text
                          style={
                          styles.sourceName
                          }
                          >
                          🌐 {source.title}
                        </Text>

                        <Text
                          style={
                          styles.sourceDomain
                          }
                          >
                          {getDomain(
                            source.url
                          )}
                        </Text>

                      </Pressable>
                    )
                  )}

                </>
              )}
            </>
          )}
          
                  </View>

        {isUser && (
          <UserMessageActions
            text={message.text}
            onEdit={onEdit}
          />
        )}

      </Animated.View>
          




      {/*
       * ----------------------------------------
       * FULL-SCREEN IMAGE VIEWER
       * ----------------------------------------
       */}

      <Modal
        visible={
        selectedImage !== null
        }
        transparent={false}
        animationType="fade"
        statusBarTranslucent
        onRequestClose={() =>
        setSelectedImage(null)
        }
        >

        <View
          style={styles.viewerContainer}
          >

          <Pressable
            style={styles.viewerBackground}
            onPress={() =>
            setSelectedImage(null)
            }
            >

            {selectedImage && (

              <Image
                source={ {
                  uri: selectedImage,
                }}
                style={styles.fullScreenImage}
                resizeMode="contain"
                />

            )}

          </Pressable>


          <Pressable
            style={styles.closeButton}
            onPress={() =>
            setSelectedImage(null)
            }
            hitSlop={12}
            >

            <Text
              style={styles.closeButtonText}
              >
              ✕
            </Text>

          </Pressable>

        </View>

      </Modal>
      

<MessageActionSheet
  ref={sheetRef}
  onCopy={copyMessage}
  onShare={shareMessage}
  onRegenerate={onRegenerate}
  onEdit={
    isUser
      ? onEdit
      : undefined
  }
  onChange={(index) =>
    setIsSheetOpen(index >= 0)
  }
/>




    </>
  );
}


const createStyles = (
  colors: any
) =>
StyleSheet.create({

  
bubble: {
  maxWidth: "100%",
  paddingHorizontal: 14,
  paddingVertical: 10,
  borderRadius: 20,
},

  userBubble: {
    alignSelf: "flex-end",
    backgroundColor:
    colors.userBubble ||
    colors.primary,
    borderBottomRightRadius: 6,
  },

  aiBubble: {
    backgroundColor:
    colors.surface,
    borderBottomLeftRadius: 6,
    borderWidth: 1,
    borderColor:
    colors.border,
  },

  text: {
    color: colors.text,
    fontSize: 16,
    lineHeight: 24,
  },


  /*
     * --------------------------------
     * IMAGE GRID
     * --------------------------------
     */

  imageGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    marginBottom: 8,
  },

  singleImageGrid: {
    flexDirection: "column",
  },

  imagePressable: {
    overflow: "hidden",
    borderRadius: 14,
  },

  singleImagePressable: {
    width: 220,
    height: 220,
  },

  gridImagePressable: {
    width: "48%",
    aspectRatio: 1,
  },

  singleImage: {
    width: "100%",
    height: "100%",
    borderRadius: 14,
  },

  gridImage: {
    width: "100%",
    height: "100%",
    borderRadius: 14,
  },


  /*
     * --------------------------------
     * FILE ATTACHMENTS
     * --------------------------------
     */

  fileContainer: {
    marginBottom: 8,
  },

  attachmentFile: {
    minWidth: 160,
    maxWidth: 220,
    minHeight: 60,
    borderRadius: 12,
    borderWidth: 1,
    padding: 10,
    justifyContent:
    "center",
    marginBottom: 8,
  },

  attachmentFileName: {
    fontSize: 13,
    fontWeight: "600",
  },


  /*
     * --------------------------------
     * FULL-SCREEN VIEWER
     * --------------------------------
     */

  viewerContainer: {
    flex: 1,
    backgroundColor: "#000",
  },

  viewerBackground: {
    flex: 1,
    justifyContent:
    "center",
    alignItems: "center",
  },

  fullScreenImage: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },

  closeButton: {
    position: "absolute",
    top: 50,
    right: 20,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor:
    "rgba(0,0,0,0.65)",
    justifyContent:
    "center",
    alignItems: "center",
  },

  closeButtonText: {
    color: "#fff",
    fontSize: 25,
    fontWeight: "600",
  },


  /*
     * --------------------------------
     * SOURCES
     * --------------------------------
     */

  sourceTitle: {
    color: colors.text,
    fontWeight: "bold",
    marginTop: 14,
    marginBottom: 8,
  },

  sourceCard: {
    backgroundColor:
    colors.background,
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor:
    colors.border,
  },

  sourceName: {
    color: colors.text,
    fontWeight: "bold",
    fontSize: 15,
  },

  sourceDomain: {
    color: colors.subText,
    marginTop: 4,
    fontSize: 13,
  },

  showMore: {
    color: colors.text,
    fontSize: 14,
    fontWeight: "900",
    marginTop: 8,
  },
  
  editText: {
  color: colors.primary,
  fontSize: 13,
  fontWeight: "600",
  marginTop: 8,
},

});


const createMarkdownStyles = (
  colors: any
) =>
StyleSheet.create({

  body: {
    color: colors.text,
    fontSize: 16,
    lineHeight: 24,
  },

  heading1: {
    color: colors.text,
    fontWeight: "700",
  },

  heading2: {
    color: colors.text,
    fontWeight: "700",
  },

  heading3: {
    color: colors.text,
    fontWeight: "700",
  },

  strong: {
    color: colors.text,
    fontWeight: "700",
  },

  em: {
    color: colors.text,
  },

  bullet_list: {
    color: colors.text,
  },

  ordered_list: {
    color: colors.text,
  },

  list_item: {
    color: colors.text,
  },

  paragraph: {
    color: colors.text,
    marginTop: 0,
    marginBottom: 10,
  },

  code_inline: {
    backgroundColor:
    colors.background,
    color: colors.text,
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 5,
  },

  blockquote: {
    backgroundColor:
    colors.background,
    borderLeftWidth: 4,
    borderLeftColor:
    colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },

  link: {
    color: colors.primary,
  },

}); 


export default React.memo(
  ChatBubble
);