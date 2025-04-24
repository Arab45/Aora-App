import { saveds } from "@/data/saved";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

type ItemList = {
  id: number;
  headerImage: any;
  topic: string;
  subTopic: string;
  image: any;
};

export default function Saved() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.uploadVideo}>Saved Video</Text>
      <View style={styles.box}>
        <Text style={styles.label}>Vidoe Title</Text>

        <View style={styles.searchInput}>
          <TextInput
            placeholder="Give your video catchey title..."
            placeholderTextColor={"#fff"}
            style={styles.videoBox}
          />
          <AntDesign
            name="search1"
            size={20}
            // style={styles.search}
            style={{ position: "absolute", top: 15, right: 10 }}
            color={"#fff"}
          />
        </View>
      </View>
      <FlatList
        data={saveds}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }: { item: ItemList }) => (
          <View style={styles.arrayListContainer}>
            <View style={styles.topicContainer}>
              <View style={styles.avatarContainerBox}>
                <Image source={item.headerImage} />
                <View>
                  <Text style={styles.topic}>{item.topic}</Text>
                  <Text style={styles.subTopic}>{item.subTopic}</Text>
                </View>
              </View>
              <Entypo name="dots-three-vertical" size={18} color={"#fff"} />
            </View>
            <Image
              source={item.image}
              resizeMode="cover"
              style={{ width: "100%", height: 200, borderRadius: 10 }}
            />
          </View>
        )}
      />
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
  box: {
    gap: 5,
  },
  label: {
    color: "#fff",
  },
  videoBox: {
    backgroundColor: "#1e1e2d",
    height: 58,
    borderRadius: 10,
    paddingHorizontal: 10,
    color: "#fff"
  },
  search: {
    position: "relative",
    bottom: 48,
    left: 300,
  },
  topicContainer: {
    flexDirection: "row",
    gap: 16,
    alignItems: "center",
    justifyContent: "space-between",
  },
  arrayListContainer: {
    gap: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  topic: {
    fontSize: 16,
    color: "#fff",
  },
  subTopic: {
    color: "#fff",
  },
  avatarContainerBox: {
    flexDirection: "row",
    gap: 5,
  },
  searchInput: {
    backgroundColor: "#1e1e2d",
    borderRadius: 8,
    paddingHorizontal: 10,
    position: "relative",
    color: "#fff"
  },
});
