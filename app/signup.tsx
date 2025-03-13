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
// import { Formik } from "formik";
import * as Yup from "yup";

const signUpSchema = Yup.object().shape({
  username: Yup.string()
    .min(6, "Too short")
    .max(50, "Too long")
    .required("Required"),
  email: Yup.string()
    .email("Invalid email")
    .required("please enter your email address"),
  password: Yup.string()
    .min(8)
    .required("please enter your password.")
    .matches(
      /^(?=.*?^[A-Z])(?=.*?[0-9])(?=.*?[#?!@$%^*+-]).{8,}$/,
      "must contain minimum 8 characters, at least one uppercase letter"
    ),
});

export default function SignUp() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handlePress = () => {
    setIsLoading(true);
    router.push("/login");
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.inputBox}>
          <Image
            source={require("../assets/aoraImages/logo.png")}
            style={styles.logo}
          />
          {/* <Formik
            initialValues={{ username: "", email: "", password: "" }}
            onSubmit={ }
            validationSchema={signUpSchema}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              setFieldTouched,
              isValid,
              handleSubmit,
            })} =>  {
              return ( */}

            <Text style={styles.sigupText}>Sign Up</Text>
            <View style={styles.input}>
              <Text style={styles.labelText}>Username</Text>
              <TextInput
                placeholder="Your unique username"
                style={styles.inputText}
                placeholderTextColor={"gray"}
              />
            </View>

            <View style={styles.input}>
              <Text style={styles.labelText}>email</Text>
              <TextInput
                placeholder="ola@gmail.com"
                style={styles.inputText}
                placeholderTextColor={"gray"}
              />
            </View>
            <View style={styles.input}>
              <Text style={styles.labelText}>password</Text>
              <TextInput
                placeholder="*******"
                secureTextEntry={!isPasswordVisible}
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
              <Text style={styles.signupFooter}>Sign Up</Text>
            </TouchableOpacity>
            {/* )} */}
          {/* </Formik> */}
        </View>
        <Link href={"/login"} style={styles.footerText}>
          <Text>
            Already have an acoount?{" "}
            <Text style={styles.innerText}> Login</Text>
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
    justifyContent: "space-between"
  },
});
