import AntDesign from "@expo/vector-icons/AntDesign";
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { videos } from "@/data/video";
import Entypo from "@expo/vector-icons/Entypo";


type ItemList = {
  id: number;
  headerImage: any;
  topic: string;
  subTopic: string;
  image: any;
};

export default function Profile() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.march}>March result</Text>
        <Text style={styles.glasses}>VR glasses</Text>
      </View>

      <View style={styles.searchInput}>
        <TextInput
          placeholder="VR glasses"
          style={styles.input}
          placeholderTextColor={"#fff"}
        />
        <AntDesign
          name="search1"
          size={20}
          style={{ position: "absolute", top: 15, right: 10 }}
          color={"#fff"}
        />
      </View>

      <FlatList
        data={videos}
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
            <Image source={item.image} resizeMode="cover" style={{ width: "100%", height: 200 }} />
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
    paddingRight: 20,
    paddingLeft: 20,
    paddingTop: 20
    // gap: 20,
  },
  header: {
    marginVertical: 20
  },
  input: {
    color: "#fff",
    paddingHorizontal: 10,
    alignItems: "center",
    backgroundColor: "#1e1e2d",
    width: "100%",
    height: 58,
    borderRadius: 10
  },
  search: {
    position: "relative",
    // right: 32,
    // top: 14
    bottom: 40,
    left: 300,
  },
  march: {
    color: "#fff",
  },
  glasses: {
    fontSize: 24,
    fontWeight: "800",
    color: "#fff",
  },
  topicContainer: {
    flexDirection: "row",
    gap: 16,
    alignItems: "center",
    justifyContent: "space-between"
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
    gap: 5
  },
  searchInput: {
    backgroundColor: "#1e1e2d",
    borderRadius: 8,
    paddingHorizontal: 10,
    position: "relative",
    color: "#fff",
    marginBottom: 20
  },
});
