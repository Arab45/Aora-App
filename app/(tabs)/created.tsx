import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import * as DocumentPicker from 'expo-document-picker'
import { useState } from "react";

export default function Created() {
 const [ name, setName] = useState("");
  const pick = async () => {
    const response = await DocumentPicker.getDocumentAsync({
      type: "application/*"
    })
    if(!response.canceled){
      const { name } = response.assets[0]
      setName(name)
    }

    console.log(response)
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.uploadVideo}>Upload Video</Text>
      <View style={styles.box}>
        <Text style={styles.label}>Vidoe Title</Text>
        <TextInput
          placeholder="Give your video catchey title..."
          placeholderTextColor={"#fff"}
          style={styles.videoBox}
        />
      </View>
      <View style={styles.pictureBox}>
        <View style={styles.downloadBox}>
          <TouchableOpacity onPress={pick}>
          <Image
            source={require("../../assets/aoraImages/solar_upload-bold-duotone.png")}
            />
            </TouchableOpacity>
        </View>
      </View>
      <View style={styles.box}>
        <Text style={styles.label}>Thumbnail Image</Text>
        <View style={styles.chooseFile}>
        <TouchableOpacity onPress={pick}>
          <Image
            source={require("../../assets/aoraImages/solar_upload-bold-duotone.png")}
            style={{
              width: 20,
              height: 20,
              alignItems: "center",
              justifyContent: "center",
            }}
            />
            </TouchableOpacity>
          <Text style={styles.chooseAfile}>Choose a file</Text>
        </View>
      </View>
      <View style={styles.box}>
        <Text style={styles.label}>AI prompt</Text>
        <View style={styles.chooseFile}>
          <Text style={styles.promptAI}>The AI prompt of your video...</Text>
        </View>
      </View>
      <View style={styles.submitPublish}>
        <Text style={styles.submitText}>Submit & Publish</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#161622",
    paddingHorizontal: 20,
    gap: 20,
    paddingTop: 20
  },
  uploadVideo: {
    marginTop: 20,
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  label: {
    color: "#fff",
  },
  box: {
    gap: 5,
  },
  videoBox: {
    backgroundColor: "#1e1e2d",
    height: 58,
    borderRadius: 10,
    paddingHorizontal: 10,
    color: "#fff"
  },
  pictureBox: {
    width: "100%",
    height: 200,
    backgroundColor: "#1e1e2d",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  chooseFile: {
    height: 60,
    width: "100%",
    backgroundColor: "#1e1e2d",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 5,
  },
  submitPublish: {
    backgroundColor: "#fe9f00",
    height: 60,
    width: "100%",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  submitText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  chooseAfile: {
    color: "#fff",
  },
  downloadBox: {
    borderWidth: 2,
    borderColor: "#fe9f00",
    borderStyle: "dotted",
    padding: 16,
    borderRadius: 10,
  },
  promptAI: {
    color: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
