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
import * as Yup from "yup";
import { useSignIn } from '@clerk/clerk-expo';
import Spinner from 'react-native-loading-spinner-overlay';


const signInSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email")
    .required("Please enter your email address"),
  password: Yup.string()
    .min(8)
    .required("Please enter your password.")
    .matches(
      /^(?=.*[A-Z])(?=.*[0-9])(?=.*[#?!@$%^&*+-]).{8,}$/,
      "Must contain at least one uppercase letter, one number, and one special character"
    ),
});

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const router = useRouter();
  const { signIn, setActive, isLoaded } = useSignIn();


  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handlePress = async (values: any) => {
    if (!isLoaded) {
			return;
		}
		setIsLoading(true);
		try {
			const completeSignIn = await signIn?.create({
				identifier: values.email,
				password: values.password
			});
      console.log(completeSignIn);

      if (completeSignIn.createdSessionId) {
        await setActive({ session: completeSignIn.createdSessionId });
        router.push("/home");  // Redirect only if sign-in is successful
      } else {
        throw new Error("Session creation failed. Please try again.");
      }
		} catch (err: any) {
      console.error("Clerk Signup Error:", err);
			alert(err.errors?.[0]?.message ?? "Invalid credentials.");
		} finally {
			setIsLoading(false);
		}
    // router.push("/home");
  };

  // console.log(handlePress());
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={(values) => handlePress(values)}
          validationSchema={signInSchema}
        >
          {({
          values,
          errors,
          touched,
          handleChange,
          setFieldTouched,
          isValid,
          handleSubmit
        }) => (
          <View>
            <View style={styles.inputBox}>
              <Image
                source={require("../../assets/aoraImages/logo.png")}
                style={styles.logo}
              />
              <Text style={styles.sigupText}>Sign In</Text>
              <Text style={styles.labelText}>Email</Text>
              <View style={styles.input}>
                <TextInput
                  value={values.email}
                  placeholder="ola@gmail.com"
                  onChangeText={handleChange('email')}
                  style={styles.inputText}
                  placeholderTextColor={"gray"}
                  onBlur={() => setFieldTouched("email")}

                />
              </View>
              {touched.email && errors.email &&
                  (<Text style={styles.errorText}>{errors.email}</Text>)
                }
              <Text style={styles.labelText}>Password</Text>
              <View style={styles.passwordInput}>
                <TextInput
                  placeholder="******"
                  value={values.password}
                  onChangeText={handleChange("password")}
                  secureTextEntry={isPasswordVisible}
                  style={{ height: 55, width: "92%", color: "#fff" }}
                  placeholderTextColor={"gray"}
                  onBlur={() => setFieldTouched("password")}
                />
                <TouchableOpacity
                  onPress={togglePasswordVisibility}
                  // style={styles.icon}
                  style={{ position: "absolute", top: 12, right: 10}}
                >
                  <Icon
                    name={isPasswordVisible ? "eye" : "eye-off"}
                    size={24}
                    color="gray"
                  />
                </TouchableOpacity>
              </View>
              {touched.password && errors.password &&
                  (<Text style={styles.errorText}>{errors.password}</Text>)
                }
              <TouchableOpacity 
              onPress={() =>  handleSubmit()} 
              style={[styles.buttonCont]}
              disabled={!isValid || isLoading}
              >
                <Text style={styles.signupFooter}>
                {isLoading ? "Loading..." : "Sign In"}
                </Text>
              </TouchableOpacity>
            </View>
            <Link href={"/signup"} style={styles.footerText}>
              <Text>
                Don't have an account? <Text style={styles.innerText}> Signup</Text>
              </Text>
            </Link>
          </View>
        )}
        </Formik>
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
    gap: 15
  },
  passwordInput: {
    backgroundColor: "#1e1e2d",
    borderRadius: 8,
    paddingHorizontal: 10,
    position: "relative",
    color: "#fff"
  },
  input: {
    // gap: 10,
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
  errorText: {
    fontSize: 8,
    color: "red"
  }
});
