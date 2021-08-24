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
import Request from "./Request";
import axios from "axios";
import { CourseContext } from "../reducer/context";

export default function UserRequest({ navigation }) {
  const { state } = React.useContext(CourseContext);

  const post = state.latestPost.filter(
    (post) => post.student_id == state.student_id
  );

  return (
    <>
      {post !== null && (
        <SafeAreaView style={styles.container}>
          <FlatList
            data={post}
            renderItem={({ item }) => <Request data={{ ...item }} />}
            keyExtractor={(item) => item._id.toString()}
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
    backgroundColor: "lightgrey",
    justifyContent: "space-around",
    borderRadius: 10,
    width: 120,
  },
  buttonText: {
    fontSize: 15,
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
    borderColor: "white",
    backgroundColor: "lightblue",
  },
  title: {
    fontSize: 22,
  },
});
