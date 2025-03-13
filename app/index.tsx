import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Image,
} from "react-native";
import { Link } from "expo-router";

export default function Onboarding() {
  return (
    <SafeAreaView style={styles.conatiner}>
      <StatusBar backgroundColor="#161622" />
      <View style={styles.headerCont}>
        <Image
          source={require("../assets/aoraImages/logo.png")}
          style={styles.logo}
        />
      </View>
      <View style={styles.imageCont}>
        <Image source={require("../assets/aoraImages/img.png")} />
        <View style={styles.descriptionContainer}>
          <Text style={styles.description}>Discover Endless </Text>
          <Text style={styles.description}>
            {" "}
            Posibilities with <Text style={styles.aoraText}>Aora</Text>{" "}
          </Text>
          <Image
            source={require("../assets/aoraImages/aora.png")}
            style={styles.aoraImage}
          />
        </View>
        <View style={styles.descriptionContainer}>
          <Text style={styles.text}>
            Where creativity meets innovation: Embark on
          </Text>
          <Text style={styles.text}>
            a journey of limitless exploration with Aora
          </Text>
        </View>
      </View>
      <View style={styles.boxContainer}>
        <Link href={"/signup"}>
        <Text style={styles.boxText}>Continue with Email</Text>
        </Link>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    backgroundColor: "#161622",
    alignItems: "center",
    height: "100%",
    gap: 32,
    paddingHorizontal: 34,
  },
  headerCont: {
    marginTop: 40,
  },
  logo: {
    width: 115,
    height: 35,
  },
  aora: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  description: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
  },
  descriptionContainer: {
    alignItems: "center",
    color: "#fff",
  },
  text: {
    color: "#fff",
  },
  boxContainer: {
    width: "100%",
    backgroundColor: "#fe9f00",
    height: 50,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  boxText: {
    fontSize: 20,
    fontWeight: "700",
  },
  imageCont: {
    gap: 24,
  },
  aoraText: {
    color: "#fe9f00",
    fontSize: 32,
    fontWeight: "bold",
  },
  aoraImage: {
    width: 90,
    height: 20,
    marginLeft: 180,
    marginTop: -10,
  },
});
