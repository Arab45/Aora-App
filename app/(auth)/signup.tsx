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
import { useSignUp } from "@clerk/clerk-expo";
import { Button } from "react-native";
import { useAuth } from "@clerk/clerk-expo";



// Validation Schema using Yup
const signUpSchema = Yup.object().shape({
  username: Yup.string()
    .min(6, "Too short")
    .max(50, "Too long")
    .required("Please enter your username"),
  email: Yup.string()
    .email("Invalid email")
    .required("Please enter your email address"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Please enter your password.")
    .matches(
      /^(?=.*[A-Z])(?=.*[0-9])(?=.*[#?!@$%^&*+-]).{8,}$/,
      "Must contain at least one uppercase letter, one number, and one special character"
    ),
});

export default function SignUp() {
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState('');
  const router = useRouter();
  const { isLoaded, signUp, setActive } = useSignUp();
  const { signOut } = useAuth();

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  // Handles user signup
  const handleSignUp = async (values: any) => {
    if (!isLoaded) return;
    setIsLoading(true);

    console.log("my valuues are:", values);

    try {

    // 👇 Sign out first (if in single session mode)
    await signOut();

      // Create user with Clerk
      const result = await signUp.create({
        emailAddress: values.email,
        password: values.password,
      });

      // Send email verification code
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // await result?.user?.update({
      //   publicMetadata: {
      //     username: values.username,
      //   },
      // });

      // change the UI to verify the email address
      setPendingVerification(true);

      alert("Account created successfully! Please log in.");

      // Navigate to home page after successful signup
      // router.push("/login");
    } catch (error: any) {
      // console.error("Clerk Signup Error:", error);
      alert(error.errors?.[0]?.message ?? "Sign up failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }
    setIsLoading(true);

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code
      });

      await setActive({ session: completeSignUp.createdSessionId });
      router.push("/login");
    } catch (err: any) {
      alert(err.errors[0].message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {!pendingVerification && (

        <ScrollView>
          <View style={styles.inputBox}>
            <Image
              source={require("../../assets/aoraImages/logo.png")}
              style={styles.logo}
            />
            <Formik
              initialValues={{ username: "", email: "", password: "" }}
              onSubmit={handleSignUp}
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
              }) => (
                <View style={{ gap: 10 }}>
                  <Text style={styles.signupText}>Sign Up</Text>

                  {/* Username Input */}
                  <View style={styles.input}>
                    <Text style={styles.labelText}>Username</Text>
                    <TextInput
                      placeholder="Your unique username"
                      value={values.username}
                      onChangeText={handleChange("username")}
                      style={styles.inputText}
                      placeholderTextColor="gray"
                      onBlur={() => setFieldTouched("username")}
                    />
                    {touched.username && errors.username && (
                      <Text style={styles.errorText}>{errors.username}</Text>
                    )}
                  </View>

                  {/* Email Input */}
                  <View style={styles.input}>
                    <Text style={styles.labelText}>Email</Text>
                    <TextInput
                      placeholder="ola@gmail.com"
                      value={values.email}
                      onChangeText={handleChange("email")}
                      style={styles.inputText}
                      placeholderTextColor="gray"
                      onBlur={() => setFieldTouched("email")}
                    />
                    {touched.email && errors.email && (
                      <Text style={styles.errorText}>{errors.email}</Text>
                    )}
                  </View>

                  {/* Password Input */}
                  <Text style={styles.labelText}>Password</Text>
                  <View style={styles.passwordInput}>
                    <TextInput
                      placeholder="*******"
                      value={values.password}
                      onChangeText={handleChange("password")}
                      secureTextEntry={!isPasswordVisible}
                      style={{ height: 55, width: "92%", color: "#fff" }}
                      placeholderTextColor="gray"
                      onBlur={() => setFieldTouched("password")}
                    />
                    <TouchableOpacity
                      onPress={togglePasswordVisibility}
                      style={{ position: "absolute", top: 12, right: 10 }}
                    >
                      <Icon
                        name={isPasswordVisible ? "eye" : "eye-off"}
                        size={24}
                        color="gray"
                      />
                    </TouchableOpacity>
                  </View>
                  {touched.password && errors.password && (
                    <Text style={styles.errorText}>{errors.password}</Text>
                  )}

                  {/* Sign Up Button */}
                  <TouchableOpacity
                    onPress={() => handleSubmit()}
                    style={styles.buttonCont}
                    disabled={!isValid || isLoading}
                  >
                    <Text style={styles.signupFooter}>
                      {isLoading ? "Signing Up..." : "Sign Up"}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </Formik>
          </View>

          <Link href="/login" style={styles.footerText}>
            <Text>
              Already have an account? <Text style={styles.innerText}>Login</Text>
            </Text>
          </Link>
        </ScrollView>
      )}

      {pendingVerification && (
        <>
          <View style={styles.centeredContainer}>
            <TextInput
              value={code}
              placeholder="Code..."
              style={styles.inputField}
              onChangeText={setCode}
            />
          </View>
          <Button onPress={onPressVerify} title="Verify Email" color={'#161622'}></Button>
        </>
      )}
    </SafeAreaView>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#161622",
    gap: 5,
  },
  signupText: {
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
  passwordInput: {
    backgroundColor: "#1e1e2d",
    borderRadius: 8,
    paddingHorizontal: 10,
    position: "relative",
    color: "#fff",
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
  errorText: {
    fontSize: 12,
    color: "red",
  },
  inputField: {
    marginVertical: 4,
    height: 50,
    borderWidth: 1,
    borderColor: '#6c47ff',
    borderRadius: 4,
    padding: 10,
    backgroundColor: '#fff'
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
    backgroundColor: '#161622',
    gap: 16,
  },
});
