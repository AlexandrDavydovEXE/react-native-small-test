import React from "react";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";

export type Props = { error: Error; resetError: () => void };

const ErrorFallbackComponent = (props: Props) => (
  <SafeAreaView>
    <View>
      <Text>Oops! Something went wrong, try again!</Text>
    </View>
    <TouchableOpacity onPress={props.resetError}>
      <Text>Retry</Text>
    </TouchableOpacity>
  </SafeAreaView>
);
export default ErrorFallbackComponent;
