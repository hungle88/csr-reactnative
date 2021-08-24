import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Requests from "./Requests";
import axios from "axios";
import { CourseContext } from "../reducer/context";

export default function LatestPosts({ navigation }) {
  const showUserRequest = () => {
    navigation.navigate("USER_REQUEST");
  };

  const { dispatch, state } = React.useContext(CourseContext);
  React.useEffect(() => {
    fetchCourse();
  }, [state.latestPost.length]);

  const fetchCourse = () => {
    console.log(state.latestPost);
    axios
      .get(
        "https://miu-csa-backend.herokuapp.com/api/v1/courses/posts/latest",
        {
          headers: { Authorization: state.token },
        }
      )
      .then((response) => {
        dispatch({ type: "LATEST_POST", payload: response.data[0].posts });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      {state.latestPost !== null && (
        <SafeAreaView style={styles.container}>
          <TouchableOpacity style={styles.button} onPress={showUserRequest}>
            <Text style={styles.buttonText}>Show My Requests</Text>
          </TouchableOpacity>
          <View
            style={{
              height: 1,
              backgroundColor: "grey",
              marginBottom: 5,
              marginTop: 5,
            }}
          ></View>
          <FlatList
            data={state.latestPost}
            renderItem={({ item }) => <Requests data={{ ...item }} />}
            keyExtractor={(item) => item._id}
          />
        </SafeAreaView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
    backgroundColor: "#f6f6f6",
    marginLeft: 5,
    marginRight:5
  },
  button: {
    flexDirection: "row",
    backgroundColor: "#0074B7",
    justifyContent: "space-around",
    alignSelf:"center",
    borderRadius: 10,
    marginTop: 5,
    marginBottom: 5,
    height:30,
    width: 200
  },
  buttonText: {
    fontSize: 15,
    color: "white",
    alignSelf: "center",
  },
  input: {
    height: 50,
    padding: 5,
    marginRight: 5,
    fontSize: 22,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "white",
    backgroundColor: "lightblue",
  },
  title: {
    fontSize: 22,
  },
});
