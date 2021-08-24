import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, FlatList, Button, SafeAreaView } from "react-native";
import Requests from "./Requests";

export default function CourseDetails({ route: { params } }) {
  const posts = params.posts;
  const incompletePosts = posts.filter((posts) => posts.status !== "complete");
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={incompletePosts}
        renderItem={({ item }) => <Requests data={{ ...item }} />}
        keyExtractor={(item) => item._id}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f6f6f6",
  },
});
