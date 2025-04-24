import {
  View,
  SafeAreaView,
  Text,
  StyleSheet,
  Image,
  TextInput,
  FlatList,
  StatusBar
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import { arrayList } from "@/data/items";
import SliderImage from "@/component/sliderImage";

type ItemList = {
  id: number;
  headerImage: any;
  topic: string;
  subTopic: string;
  Image: any;
};

export default function Home() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar 
  barStyle="dark-content"   // 'light-content' for white icons, 'dark-content' for dark
  backgroundColor="#fff"  // Sets background color for Android
/>
      <View style={styles.welcomeCon}>
        <View style={styles.welcomeText}>
          <Text style={styles.welcome}>Welcome back</Text>
          <Text style={styles.mastery}>jsmastery</Text>
        </View>
        <Image source={require("../../assets/aoraImages/Group.png")} />
      </View>

      <View style={styles.searchInput}>
        <TextInput
          placeholder="Search for a video topic"
          style={styles.input}
          placeholderTextColor={"#fff"}
        />
        <AntDesign
          name="search1"
          size={20}
          style={{
            position: "absolute",
            top: 15,
            right: 10,
          }}
          color={"#fff"}
        />
      </View>

      <FlatList
        data={arrayList}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
        ListHeaderComponent={
          <>
            <Text style={styles.trending}>Trending Videos</Text>
            <SliderImage />
          </>
        }
        renderItem={({ item }: { item: ItemList }) => (
          <View style={styles.arrayListContainer}>
            <View style={styles.topicContainer}>
              <View style={styles.avatarContentBox}>
                <Image source={item.headerImage} />
                <View>
                  <Text style={styles.topic}>{item.topic}</Text>
                  <Text style={styles.subTopic}>{item.subTopic}</Text>
                </View>
              </View>
              <Entypo name="dots-three-vertical" size={18} color={"#fff"} />
            </View>
            <Image
              source={item.Image}
              resizeMode="cover"
              style={{ width: "100%", borderRadius: 10 }}
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
    paddingRight: 20,
    paddingLeft: 20,
    gap: 10,
    paddingTop: 20
  },
  welcomeCon: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  welcomeText: {
    gap: 5,
  },
  welcome: {
    color: "#fff",
  },
  mastery: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  input: {
    color: "#fff",
    width: "90%",
    height: 58,
    borderRadius: 10,
  },
  searchInput: {
    backgroundColor: "#1e1e2d",
    borderRadius: 8,
    paddingHorizontal: 10,
    position: "relative",
  },
  arrayListContainer: {
    marginTop: 10,
    gap: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  topicContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  topic: {
    fontSize: 18,
    color: "#fff",
  },
  subTopic: {
    color: "#fff",
  },
  trending: {
    color: "gray",
    fontSize: 20,
    marginBottom: 10,
    marginTop: 20,
  },
  avatarContentBox: {
    flexDirection: "row",
    gap: 5,
  },
});
