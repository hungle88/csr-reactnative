import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  SafeAreaView,
} from "react-native";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import axios from "axios";
import { CourseContext } from "../reducer/context";

export default function AddRequest({ navigation }) {
  const [addRequestState, setAddRequestState] = React.useState({message:""});
  const { state, dispatch } = React.useContext(CourseContext);

  const inputChange = (name, value) => {
    setAddRequestState({ ...addRequestState, [name]: value });
  };

  const submit = async () => {
    if (
      addRequestState &&
      addRequestState.currentCourse &&
      addRequestState.desiredCourse
    ) {
      const student = state.latestPost.find(
        (post) => post.student_id == state.student_id
      );

      if (!student) {
        axios
          .post(
            "https://miu-csa-backend.herokuapp.com/api/v1/courses/posts",
            addRequestState,
            {
              headers: { Authorization: state.token },
            }
          )
          .then((response) => {
            if (response.data.status == "success") {
              axios
                .get(
                  `https://miu-csa-backend.herokuapp.com/api/v1/courses/students/${state.student_id}`,
                  {
                    headers: { Authorization: state.token },
                  }
                )
                .then((response) => {
                  dispatch({
                    type: "ADD_REQUEST",
                    payload: response.data[0].posts,
                  });
                })
                .catch((err) => {
                  console.log(err);
                });

              Alert.alert("Successfully added");
              setAddRequestState({message:""})
              navigation.goBack();
            } else {
              Alert.alert("fail to add request");
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        Alert.alert("You can not request more than once");
      }
    } else {
      Alert.alert("Please fill the form");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView extraScrollHeight={80}>
        <Text style={styles.title}>Current Course: </Text>
        <TextInput
          style={styles.input}
          autoFocus={true}
          autoCapitalize="none"
          value={addRequestState.currentCourse}
          onChangeText={(text) =>
            inputChange("currentCourse", text.toLowerCase())
          }
        />
        <Text style={styles.title}>Desired Course: </Text>
        <TextInput
          style={styles.input}
          value={addRequestState.desiredCourse}

          autoCapitalize="none"
          onChangeText={(text) =>
            inputChange("desiredCourse", text.toLowerCase())
          }
        />
        <Text style={styles.title}>Message (optional): </Text>
        <TextInput
          style={[styles.input, { height: 100 }]}
          value={addRequestState.message}

          multiline={true}
          maxLength={200}
          onChangeText={(text) => inputChange("message", text)}
        />

     
            <Text style={{alignSelf:'flex-end'}}>{addRequestState.message.length}/200 characters</Text>
       

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
