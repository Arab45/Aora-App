import { useState } from "react";
import {
  View,
  SafeAreaView,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Link, useRouter } from "expo-router";
import Icon from "@expo/vector-icons/Ionicons";
import { Formik } from "formik";

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const router = useRouter();

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handlePress = () => {
    setIsLoading(true);
    router.push("/home");
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.inputBox}>
          <Image
            source={require("../assets/aoraImages/logo.png")}
            style={styles.logo}
          />
          <Text style={styles.sigupText}>Sign In</Text>
          <View style={styles.input}>
            <Text style={styles.labelText}>Email</Text>
            <TextInput
              placeholder="ola@gmail.com"
              style={styles.inputText}
              placeholderTextColor={"gray"}
            />
          </View>
          <View style={styles.input}>
            <Text style={styles.labelText}>Password</Text>
            <TextInput
              placeholder="******"
              secureTextEntry={isPasswordVisible}
              style={styles.inputText}
              placeholderTextColor={"gray"}
            />
            <TouchableOpacity
              onPress={togglePasswordVisibility}
              style={styles.icon}
            >
              <Icon
                name={isPasswordVisible ? "eye" : "eye-off"}
                size={24}
                color="gray"
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={handlePress} style={[styles.buttonCont]}>
            <Text style={styles.signupFooter}>Sign In</Text>
          </TouchableOpacity>
        </View>
        <Link href={"/signup"} style={styles.footerText}>
          <Text>
            Don't have an account? <Text style={styles.innerText}> Signup</Text>
          </Text>
        </Link>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#161622",
  },
  sigupText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  logo: {
    width: 115,
    height: 35,
    marginTop: 100,
  },
  inputBox: {
    paddingHorizontal: 32,
    gap: 24,
  },
  input: {
    gap: 10,
  },
  inputText: {
    backgroundColor: "#1e1e2d",
    height: 55,
    borderRadius: 8,
    paddingHorizontal: 10,
    color: "#fff",
  },
  labelText: {
    color: "#fff",
    fontSize: 20,
  },
  buttonCont: {
    backgroundColor: "#fe9f00",
    height: 55,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  signupFooter: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  footerText: {
    textAlign: "center",
    color: "#fff",
    marginTop: 10,
  },
  innerText: {
    color: "#fe9f00",
  },
  icon: {
    position: "relative",
    left: 290,
    bottom: 50,
  },
});
