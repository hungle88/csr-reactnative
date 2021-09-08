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
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { CourseContext } from "../reducer/context";

export default function EditRequest({ route: { params }, navigation }) {
  const { state, dispatch } = React.useContext(CourseContext);

  const { currentCourse, desiredCourse, message, status, _id } = params;

  const [editRequestState, setEditRequestState] = React.useState(params);

  const inputChange = (name, value) => {
    setEditRequestState({ ...editRequestState, [name]: value });
  };

  const submit = async () => {
    console.log(editRequestState);
    axios
      .put(
        `https://miu-csa-backend.herokuapp.com/api/v1/courses/posts/${_id}`,
        editRequestState,
        {
          headers: { Authorization: state.token },
        }
      )
      .then((response) => {
        if (response.data.status == "success") {
          dispatch({ type: "UPDATE_POST", payload: editRequestState });
          Alert.alert("success");
          navigation.goBack();
          console.log(response);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView extraScrollHeight={40}>
        <Text style={styles.title}>Current Course: </Text>
        <TextInput
          style={styles.input}
          autoFocus={true}
          autoCapitalize="none"
          defaultValue={currentCourse}
          onChangeText={(text) =>
            inputChange("currentCourse", text.toLowerCase())
          }
        />
        <Text style={styles.title}>Desired Course: </Text>
        <TextInput
          style={styles.input}
          autoFocus={true}
          autoCapitalize="none"
          defaultValue={desiredCourse}
          onChangeText={(text) =>
            inputChange("desiredCourse", text.toLowerCase())
          }
        />
        <Text style={styles.title}>Message (optional): </Text>
        <TextInput
          style={[styles.input, { height: 100 }]}
          multiline={true}
          maxLength= {200}
          defaultValue={message}
          onChangeText={(text) => inputChange("message", text)}
        />
        <Text style={{alignSelf:'flex-end'}}>{editRequestState.message.length}/200 characters</Text>

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
    marginRight:5
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
