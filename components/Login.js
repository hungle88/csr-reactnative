import {
  setStatusBarNetworkActivityIndicatorVisible,
  StatusBar,
} from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Image,
  Alert,
  SafeAreaView,
} from "react-native";
import {
  DefaultTheme,
  NavigationContainer,
  useNavigation,
} from "@react-navigation/native";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { CourseContext } from "../reducer/context";
import axios from "axios";
import * as Location from "expo-location";
import { ActivityIndicator } from "react-native-paper";

export default function Login({ navigation }) {
  const [loginState, setLoginState] = React.useState();
  const [loading, setLoading] = React.useState(false);

  const { dispatch } = React.useContext(CourseContext);

  const login = async () => {
    setLoading(true);
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }
    let location = await Location.getCurrentPositionAsync({});
    console.log(location);
    let miu_location = { latitude: 41.023532, longitude: -91.963967 };
    let not_miu_location = { latitude: 39.023532, longitude: -89.963967 };

    if (location) {
      //use this latitude and longtitude for your current location
      // const { latitude, longitude } = location.coords;

      //this latitude and longtitude is MIU campus coordinate
      const { latitude, longitude } = miu_location;

      let address = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });
      console.log(address);

      if (
        address[0].name == "Maharishi International University" &&
        address[0].postalCode == 52556 &&
        address[0].city == "Fairfield"
      ) {
        (function () {
          axios
            .post(
              "https://miu-csa-backend.herokuapp.com/api/v1/authenticate/login",
              loginState
            )
            .then((response) => {
              // console.log(response);
              if (response.status !== "invalid_user") {
                //dispatch({ type: "STUDENT_ID", payload: response.data.studentId });
                dispatch({
                  type: "LOG_IN",
                  payload: {
                    token: response.data.result,
                    student_id: response.data.studentId,
                  },
                });

                AsyncStorage.setItem("bearer_token", response.data.result);
                AsyncStorage.setItem("student_id", response.data.studentId);
                setLoading(false);
              }
            })
            .catch((err) => {
              console.log(err);
              setLoading(false);
            });
        })();
      } else {
        Alert.alert("Permission to access login was denied");
        setLoading(false);
      }
    }
  };

  const inputChange = (name, value) => {
    setLoginState({ ...loginState, [name]: value });
  };

  const signUp = () => {
    navigation.navigate("SIGNUP");
  };
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView extraScrollHeight={100}>
        <Image
          source={require("../assets/miu_logo.jpeg")}
          style={styles.image}
        />
        <View>
          <Text style={styles.title}>Email: </Text>
          <TextInput
            style={styles.input}
            autoFocus={true}
            autoCapitalize="none"
            onChangeText={(text) => inputChange("email", text.toLowerCase())}
          />
          <Text style={styles.title}>Password: </Text>
          <TextInput
            secureTextEntry={true}
            style={styles.input}
            autoCapitalize="none"
            onChangeText={(text) => inputChange("password", text.toLowerCase())}
          />
          <Text style={{ marginTop: 20 }}>
            <TouchableOpacity style={styles.button} onPress={login}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={signUp}>
              <Text style={styles.buttonText}>SignUp</Text>
            </TouchableOpacity>
          </Text>
          {loading && (
            <ActivityIndicator
              style={styles.loading}
              size="large"
              color="grey"
            />
          )}
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
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
  loading: {
    alignContent: "center",
    justifyContent: "center",
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  image: {
    height: 103,
    width: 260,
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
});
