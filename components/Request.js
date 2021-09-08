import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  SafeAreaView,
} from "react-native";
import {
  DefaultTheme,
  NavigationContainer,
  useNavigation,
} from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CourseContext } from "../reducer/context";
import { AntDesign } from "@expo/vector-icons";
import { Title, Caption, Headline } from "react-native-paper";

export default function Request() {
  const { state, dispatch } = React.useContext(CourseContext);
  const post = state.latestPost.find(
    (post) => post.student_id == state.student_id
  );
  //console.log(state.token)

  const {
    created_date,
    currentCourse,
    desiredCourse,
    message,
    status,
    studentFullName,
    _id,
  } = post;
  const navigation = useNavigation();

  //delete request
  const deleteRequest = async () => {
    axios
      .delete(
        `https://miu-csa-backend.herokuapp.com/api/v1/courses/posts/${_id}`,
        {
          headers: { Authorization: state.token },
        }
      )
      .then((response) => {
        dispatch({ type: "DELETE_POST" });
        console.log(response);
      })
      .catch((err) => console.log(err));
  };

  //set request's status to 'done'
  const closeRequest = async () => {
    axios
      .put(
        `https://miu-csa-backend.herokuapp.com/api/v1/courses/posts/status/${_id}`,
        {},
        {
          headers: { Authorization: state.token },
        }
      )
      .then((response) => {
        if (response.data.status == "success") {
          dispatch({ type: "DELETE_POST" });
        } else {
          Alert.alert("error");
        }
        console.log(response);
      })
      .catch((err) => console.log(err));
  };

  //edit request
  const editRequest = () => {
    navigation.navigate("EDIT_REQUEST", {
      currentCourse: currentCourse,
      desiredCourse: desiredCourse,
      message: message,
      status: status,
      _id: _id,
    });
  };

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

      <Text style={{ marginTop: 10 }}>
        <TouchableOpacity
          onPress={deleteRequest}
          style={styles.button}
          underlayColor="#5398DC"
        >
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={editRequest}
          style={styles.button}
          underlayColor="#5398DC"
        >
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={closeRequest}>
          <Text style={styles.buttonText}>Complete</Text>
        </TouchableOpacity>
      </Text>
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
