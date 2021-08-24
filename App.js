import { StatusBar } from "expo-status-bar";
import {
  Ionicons,
  AntDesign,
  Entypo,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
// import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

import * as React from "react";
import {
  DrawerLayoutAndroid,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TouchableOpacity,
} from "react-native";
import "react-native-gesture-handler";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import {
  createStackNavigator,
  HeaderBackground,
} from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CourseList from "./components/CourseList";
import AddRequest from "./components/AddRequest";
import LatestPosts from "./components/LatestPosts";
import EditRequest from "./components/EditRequest";

import Login from "./components/Login";
import SignUp from "./components/SignUp";
import UserRequest from "./components/UserRequest";
import CourseDetails from "./components/CourseDetails";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { reducer } from "./reducer/reducer";
import { CourseContext } from "./reducer/context";
import {
  DefaultTheme,
  Appbar,
  Provider as PaperProvider,
} from "react-native-paper";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#0074B7",
    accent: "yellow",
  },
};

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

//export const CourseContext = React.createContext();
//export const TokenContext = React.createContext();

const Root = () => {
  return (
    // <TokenContext.Provider value={{ token, setToken }}>

    <Tab.Navigator
      tabBarOptions={{
        activeBackgroundColor: "#0074B7",
        activeTintColor: "white",
        color: "white",
      }}
    >
      <Tab.Screen
        name="COURSES"
        component={CourseList}
        options={{
          tabBarIcon: () => <Ionicons name="list" size={25} />,
          tabBarLabel: "Course List",
        }}
      />
      <Tab.Screen
        name="LATEST_POSTS"
        component={LatestPosts}
        options={{
          tabBarIcon: () => <Entypo name="new" size={25} />,
          tabBarLabel: "Latest Posts",
        }}
      />
      <Tab.Screen
        name="ADD_REQUEST"
        component={AddRequest}
        options={{
          tabBarIcon: () => <Entypo name="new-message" size={25} />,
          tabBarLabel: "Add Request",
        }}
      />
    </Tab.Navigator>
    // </TokenContext.Provider>
  );
};

export default function App() {
  //const [token, setToken] = React.useState(null);
  const [state, dispatch] = React.useReducer(reducer, {
    courses: [],
    latestPost: [],
    token: null,
    student_id: null,
  });

  React.useEffect(() => {
    getToken();
  }, []);

  const getToken = async () => {
    try {
      const value = await AsyncStorage.getItem("bearer_token");
      const stud_id = await AsyncStorage.getItem("student_id");

      if (value !== null) {
        dispatch({
          type: "LOG_IN",
          payload: { token: value, student_id: stud_id },
        });
        // dispatch({ type: "LOG_IN", payload: value });
        // dispatch({ type: "STUDENT_ID", payload: stud_id });
        //setToken(value);
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <CourseContext.Provider value={{ state, dispatch }}>
      <PaperProvider theme={theme}>
        <Appbar.Header>
          <Appbar.Content title="MAHARISHI UNIVERSITY" subtitle={"CSR APP"} />
        </Appbar.Header>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={() => ({
              headerRight: () => (
                <TouchableOpacity
                  onPress={async () => {
                    dispatch({ type: "LOG_OUT" });
                    AsyncStorage.clear();
                    //setToken();
                  }}
                >
                  <Text>LOGOUT</Text>
                </TouchableOpacity>
              ),
            })}
          >
            {state.token ? (
              <>
                <Stack.Screen
                  name="ROOT"
                  component={Root}
                  options={({ navigation }) => ({
                    title: "Course Switch Request",
                    headerLeft: null,
                  })}
                />
                <Stack.Screen
                  name="USER_REQUEST"
                  component={UserRequest}
                  options={{ title: "My Requests" }}
                />
                <Stack.Screen
                  name="COURSE_DETAIL"
                  component={CourseDetails}
                  options={{ title: `Request List` }}
                />

                <Stack.Screen
                  name="EDIT_REQUEST"
                  component={EditRequest}
                  options={{ title: `Edit Request` }}
                />
              </>
            ) : (
              <>
                <Stack.Screen
                  name="LOGIN"
                  component={Login}
                  options={() => ({
                    headerRight: null,
                  })}
                />
                <Stack.Screen name="SIGNUP" component={SignUp} />
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </CourseContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f6f6f6",
  },
});
