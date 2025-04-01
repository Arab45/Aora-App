import {
  View,
  SafeAreaView,
  Text,
  StyleSheet,
  Image,
  TextInput,
  FlatList,
  ScrollView,
  SectionList
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import { arrayList } from "@/data/items";
import { carousel } from "@/data/carousel";
import Animated, { useAnimatedScrollHandler, useScrollViewOffset, useSharedValue } from "react-native-reanimated"
import SliderImage from "@/component/sliderImage";


type ItemList = {
  id: number;
  headerImage: any;
  topic: string;
  subTopic: string;
  Image: any;
};

type Carousel = {
  id: number;
  image: any;
};

export default function Home() {

  return (
    <SafeAreaView style={styles.container}>
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
          style={{ position: "absolute", top: 15, right: 10, borderWidth: 1, borderColor: "red" }}
          color={"#fff"}
        />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.trending}>Treding Videos</Text>
        <SliderImage />
        <FlatList
          showsVerticalScrollIndicator={false}
          data={arrayList}
          contentContainerStyle={{ paddingBottom: 50 }}
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
              <Image source={item.Image} resizeMode="cover" style={{ width: "100%", borderRadius: 10 }} />
            </View>
          )}
        />
      </ScrollView>
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
  },
  welcomeCon: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    // paddingHorizontal: 20
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
    // paddingHorizontal: 10,
    alignItems: "center",
    // backgroundColor: "#1e1e2d",
    width: "90%",
    height: 45,
    borderRadius: 10
  },
  search: {
    position: "relative",
    bottom: 48,
    left: 300,
  },
  arrayListContainer: {
    marginTop: 10,
    gap: 10,
    // justifyContent: "space-between"
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
  trendingImage: {
    gap: 10,
  },
  trending: {
    color: "gray",
    fontSize: 20,
    marginBottom: 10
  },
  avatarContentBox: {
    flexDirection: "row",
    gap: 5
  },
  searchInput: {
    backgroundColor: "#1e1e2d",
    borderRadius: 8,
    paddingHorizontal: 10,
    position: "relative",
    // color: "#fff"
  },

});
