import * as ImagePicker from "expo-image-picker";

export async function pickImage() {
  const permission =
    await ImagePicker.requestMediaLibraryPermissionsAsync();

  console.log("Permission:", permission);

  if (!permission.granted) {
    alert("Gallery permission is required.");
    return null;
  }

  const result =
    await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

  console.log("Picker result:", result);

  if (result.canceled) {
    return null;
  }

  return result.assets[0];
}