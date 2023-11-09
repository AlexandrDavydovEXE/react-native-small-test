import React from "react";
import "react-native-gesture-handler";
import { Button } from "react-native";
import {NavigationContainer, useNavigation} from "@react-navigation/native";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import { RootStackParamList } from "./types";
import ErrorBoundary from "react-native-error-boundary";
import ErrorFallbackComponent from "./components/ErrorFallbackComponent";
import { handleErrorBoundary } from "./helpers/handleErrorBoundary";
import {Home} from "./screens/Home";
import { SafeAreaProvider } from "react-native-safe-area-context";
import ProductDetails from "./screens/ProductDetails";

const Stack = createStackNavigator<RootStackParamList>();

const RootStack = () => {
    const navigation = useNavigation();
    return(
    <Stack.Navigator>
        <Stack.Screen
            name="Home"
            component={Home}
        />
        <Stack.Screen
            name="ProductDetails"
            component={ProductDetails}
            options={{
                title: "Product Details",
                headerShown: true,
                headerLeft: () => (
                    <Button
                        onPress={() => navigation.goBack()}
                        title="<"
                    />
                ),
            }}
        />
    </Stack.Navigator>
)
}

const App = () => {
  return (
      <SafeAreaProvider>
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
                name="ProductDetails"
                component={ProductDetails}
                options={{
                  title: "Product Details",
                  headerShown: true
                }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </ErrorBoundary>
      </SafeAreaProvider>

  );
};

export default App;
