import React, { forwardRef, useMemo } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { Camera, Image, FileText, Copy, Mic } from "lucide-react-native";
import { useTheme } from "../theme/useTheme";

interface Props {
  onCamera: () => void;
  onGallery: () => void;
  onFile: () => void;
  onClipboard: () => void;
}

const AttachmentSheet = forwardRef<BottomSheetModal, Props>(
  ({ onCamera, onGallery, onFile, onClipboard }, ref) => {
    const { colors } = useTheme();
    const snapPoints = useMemo(() => ["25%"], []); 
    const styles = createStyles(colors);

    const Item = ({ icon, title, onPress }: any) => (
      <TouchableOpacity style={styles.item} activeOpacity={0.85} onPress={onPress}>
        {/* The icon container now has the circle style */}
        <View style={styles.iconContainer}>{icon}</View>
        <Text style={styles.title}>{title}</Text>
      </TouchableOpacity>
    );



    return (
      <BottomSheetModal
        ref={ref}
        
        
        
        android_keyboardInputMode="adjustResize"
        
      detached={true}
      bottomInset={15}
        
        
        
       
        keyboardBehavior="interactive"
keyboardBlurBehavior="restore"
enableHandlePanningGesture={false}
handleComponent={null}
        
        
        backgroundStyle={{
          backgroundColor: colors.surface,
          borderRadius: 24,
        }}
        // ADD THESE TWO LINES TO FLOAT IT
        style={{
          marginLeft: 15,
          
          
          width: "75%",
alignSelf: "flex-start",
        }}
      >
        <BottomSheetView style={styles.container}>
          <Item icon={<Camera color={colors.text} size={20} />} title="Camera" 
          onPress={onCamera}
          
/>
          <Item icon={<Image color={colors.text} size={20} />} 
          title="Photos" 
          onPress={onGallery}
          
          />
          
          
          <Item icon={<FileText color={colors.text} size={20} />} title="Files" onPress={onFile} />
          <Item icon={<Copy color={colors.text} size={20} />} title="Clipboard" onPress={onClipboard} />
          
        
        </BottomSheetView>
      </BottomSheetModal>
    );
  }
);


export default AttachmentSheet;

const createStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      padding: 10,
      
      shadowColor: "#000",
shadowOpacity: 0.15,
shadowRadius: 20,
shadowOffset: {
  width: 0,
  height: 12,
},
elevation: 12,
    },
    
    
    item: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 11,
      paddingHorizontal: 15,
      transform: [{ scale: 1 }],
    },
    // This is the new circular icon background
    iconContainer: {
      marginRight: 16,
      backgroundColor: colors.primary + "10", 
      padding: 8,
      borderRadius: 50,
    },
    title: {
      color: colors.text,
      fontSize: 16,
      fontWeight: "500",
      marginLeft: 8,
    },
    
    
  });
