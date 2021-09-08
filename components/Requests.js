import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
  Alert,
  SafeAreaView,
} from "react-native";
import {
  DefaultTheme,
  NavigationContainer,
  useNavigation,
} from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";

import * as MailComposer from "expo-mail-composer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Title, Caption, Headline, Card } from "react-native-paper";

export default function Requests({ data }) {
  const {
    created_date,
    currentCourse,
    desiredCourse,
    message,
    status,
    studentFullName,
    student_id,
    email,
  } = data;
  const navigation = useNavigation();
  let checkStudentId;

  React.useEffect(() => {
    getStudentId();
  }, []);

  const [emailState, setEmailstate] = React.useState();

  const getStudentId = async () => {
    let currentStudentId = await AsyncStorage.getItem("student_id");
    if (currentStudentId === student_id) {
      setEmailstate(true);
    } else {
      setEmailstate(false);
    }
  };

  //the content of the email students send to students
  async function sendEmail() {
    let result = await MailComposer.composeAsync({
      recipients: [email],
      isHtml: true,
      subject: "Response to your switch request",
      body: `<pre>Hello, 

I want to switch with you.
Please reply my message.
      
Thanks,</pre>`,
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      <Title>
        <AntDesign name="user" size={22} /> {studentFullName}
      </Title>
      <Text>Created Date: {created_date}</Text>
      <Text>Current Course: {currentCourse}</Text>
      <Text>Desired Course: {desiredCourse}</Text>
      <Text>Status: {status}</Text>
      <Text>Message:</Text>
      <Text>{message}</Text>

      {!emailState && (
        <Text style={{ marginTop: 10 }}>
          <TouchableOpacity style={styles.button} onPress={sendEmail}>
            <Text style={styles.buttonText}>Send Email</Text>
          </TouchableOpacity>
        </Text>
      )}
      <View
        style={{
          height: 1,
          backgroundColor: "grey",
          marginBottom: 5,
          marginTop: 5,
        }}
      ></View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
    backgroundColor: "#f6f6f6",
    marginLeft: 5,
    marginRight:5
  },
  text: {
    fontWeight: "bold",
  },
  button: {
    flexDirection: "row",
    backgroundColor: "lightgrey",
    width: 100,
    justifyContent: "space-around",
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 12,
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
