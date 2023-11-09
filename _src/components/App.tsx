import React from "react";

import "react-native-gesture-handler";
import { Button, View } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";

import Stubs from "../stubs/Stubs";
import Lists from "../stubs/Lists";
import CreateListModal from "../stubs/CreateListModal";

import store from "../store/store";
import { RootStackParamList } from "./types";
import ErrorBoundary from "react-native-error-boundary";
import ErrorFallbackComponent from "../stubs/ErrorFallbackComponent";
import { handleErrorBoundary } from "../helpers/handleErrorBoundary";

const Stack = createStackNavigator<RootStackParamList>();

//TODO: interviewee fix warning
const RootStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Home"
      options={({ navigation }) => ({
        headerRight: () => (
          <Button onPress={() => navigation.push("Stubs")} title="Stubs" />
        ),
      })}
    >
      {() => <View />}
    </Stack.Screen>
    <Stack.Screen name="Stubs" component={Stubs} />
    <Stack.Screen
      name="Lists"
      component={Lists}
      options={({ navigation }) => ({
        title: "My Lists",
        headerRight: () => (
          <Button
            onPress={() => navigation.push("CreateListModal")}
            title="Add"
          />
        ),
      })}
    />
  </Stack.Navigator>
);

const App = () => {
  return (
    <PaperProvider>
      <Provider store={store}>
        <ErrorBoundary
          onError={handleErrorBoundary}
          FallbackComponent={ErrorFallbackComponent}
        >
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={() => ({
                headerShown: false,
                gestureEnabled: true,
                cardOverlayEnabled: true,
                presentation: "modal",
                ...TransitionPresets.ModalPresentationIOS,
              })}
            >
              <Stack.Screen name="Root" component={RootStack} />
              <Stack.Screen
                name="CreateListModal"
                component={CreateListModal}
                options={{
                  title: "Create list",
                  headerShown: true,
                }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </ErrorBoundary>
      </Provider>
    </PaperProvider>
  );
};

export default App;
