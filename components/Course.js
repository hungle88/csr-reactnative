import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  DefaultTheme,
  NavigationContainer,
  useNavigation,
} from "@react-navigation/native";
import { Title, Caption, Headline } from "react-native-paper";

export default function Course({ data }) {
  const { coursesName, offeringDate, posts } = data;
  const navigation = useNavigation();
  const courseDetail = () => {
    navigation.navigate("COURSE_DETAIL", { posts });
  };
  const date = new Date(offeringDate);
  const numberOfRequests = posts.filter((item) => item.status != "complete");
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.row}>
        <View>
          <Title>Course: {coursesName}</Title>
          <Text>
            Offering Date:{" "}
            {date.getMonth() +
              1 +
              "-" +
              date.getDate() +
              "-" +
              date.getFullYear()}
          </Text>
          <Text>Number of Requests: {numberOfRequests.length}</Text>
        </View>
        <View style={styles.rightSide}>
          <TouchableOpacity
            onPress={courseDetail}
            style={styles.button}
            underlayColor="#5398DC"
          >
            <Text style={styles.buttonText}>Request List</Text>
          </TouchableOpacity>
        </View>
      </View>
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
    marginRight: 5,
  },
  button: {
    flexDirection: "row",
    backgroundColor: "lightgrey",
    width: 100,
    justifyContent: "space-around",
    borderRadius: 10,
    marginTop: 5,
    marginBottom: 5,
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
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "grey",
    padding: 5,
  },
  rightSide: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
