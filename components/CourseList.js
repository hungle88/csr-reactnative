import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Button,
  SafeAreaView,
} from "react-native";
import Course from "./Course";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CourseContext } from "../reducer/context";
import axios from "axios";

export default function CourseList() {
  const { state, dispatch } = React.useContext(CourseContext);

  React.useEffect(() => {
    fetchCourse();
  }, []);

  const fetchCourse = async () => {
    console.log(state.student_id);

    axios
      .get("https://miu-csa-backend.herokuapp.com/api/v1/courses", {
        headers: { Authorization: state.token },
      })
      .then((response) => {
        console.log(response);
        const sortedByDate = response.data.result.sort(
          (a, b) => new Date(a.offeringDate) - new Date(b.offeringDate)
        );
        const filterByMonth = sortedByDate.filter(
          (item) =>
            new Date(item.offeringDate).getMonth() >= new Date().getMonth()
        );
        dispatch({ type: "GET_COURSES", payload: filterByMonth });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      {state.courses !== null && (
        <SafeAreaView style={styles.container}>
          <FlatList
            data={state.courses}
            renderItem={({ item }) => <Course data={{ ...item }} />}
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
    backgroundColor: "#f6f6f6",
  },
});
