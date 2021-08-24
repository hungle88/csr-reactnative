import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
  SafeAreaView,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import axios from "axios";

export default function SignUp() {
  const [signUpState, setSignUpState] = React.useState();
  const inputChange = (name, value) => {
    setSignUpState({ ...signUpState, [name]: value });
  };

  const submit = () => {
    if (
      signUpState &&
      signUpState.firstName &&
      signUpState.lastName &&
      signUpState.student_id &&
      signUpState.email &&
      signUpState.password
    ) {
      if (signUpState.email.indexOf("@miu.edu") === -1) {
        Alert.alert("Use MIU email only");
      } else {
        axios
          .post(
            "https://miu-csa-backend.herokuapp.com/api/v1/authenticate/signup",
            signUpState
          )
          .then((response) => {
            if (response.data.status == "success") {
              Alert.alert("success")
            } else { Alert.alert("user exist") }

          })

          .catch((err) => {
            console.log(err);
          });
      }
    } else {
      Alert.alert("Please fill the form");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView extraScrollHeight={40}>
        <Text style={styles.title}>First Name: </Text>
        <TextInput
          style={styles.input}
          autoFocus={true}
          autoCapitalize="none"
          onChangeText={(text) => inputChange("firstName", text)}
        />
        <Text style={styles.title}>Last Name: </Text>
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          onChangeText={(text) => inputChange("lastName", text)}
        />
        <Text style={styles.title}>Student ID: </Text>
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          onChangeText={(text) => inputChange("student_id", text)}
        />
        <Text style={styles.title}>Password: </Text>
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          onChangeText={(text) => inputChange("password", text)}
        />
        <Text style={styles.title}>Email: </Text>
        <TextInput
          style={styles.input}
          placeholder="example@miu.edu"
          autoCapitalize="none"
          onChangeText={(text) => inputChange("email", text)}
        />
        <Text style={{ marginTop: 20, alignSelf: "center" }}>
          <TouchableOpacity style={styles.button} onPress={submit}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </Text>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignContent: "center",
    justifyContent: "center",
    backgroundColor: "#f6f6f6",
  },
  button: {
    flexDirection: "row",
    backgroundColor: "lightgrey",
    width: 100,
    justifyContent: "space-around",
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 20,
    color: "#111",
    alignSelf: "center",
  },
  input: {
    height: 50,
    padding: 5,
    marginRight: 5,
    fontSize: 22,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "black",
    backgroundColor: "white",
  },
  title: {
    fontSize: 22,
    marginTop: 20,
  },
});
