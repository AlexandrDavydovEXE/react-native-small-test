import React, { useRef, useState } from "react";

import { View, StyleSheet, ActivityIndicator } from "react-native";
import { TextInput, Button, HelperText } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { saveData } from "../../services/api";

type ListInput = {
  value: string;
  error: boolean;
};

const CreateListModal = () => {
  const [name, setName] = useState<ListInput>({ value: "", error: false });
  const [description, setDescription] = useState<ListInput>({
    value: "",
    error: false,
  });
  const isFetching = useRef(false);
  const navigation = useNavigation();

  const saveList = async () => {
    try {
      if (isFetching.current) return; //prevent multi req
      isFetching.current = true;
      const newData = await saveData(name.value, description.value);
      isFetching.current = false; // Reset the fetching flag
      newData?.success && navigation.goBack();
    } catch (e) {
      console.error(e);
      isFetching.current = false;
      throw new Error(e);
    }
  };

  const createList = () => {
    const nameHasErrors = () => {
      const regex = /^(?=.*[a-zA-Z])(?=.*[0-9])/;

      return !regex.test(name.value);
    };
    const descriptionHasErrors = () => {
      return !description.value.trim().length;
    };
    if (!nameHasErrors() && !descriptionHasErrors()) {
      saveList();
    } else {
      nameHasErrors() && setName({ ...name, error: true });
      descriptionHasErrors() && setDescription({ ...description, error: true });
    }
  };

  return (
    <View style={styles.container}>
      {isFetching.current && <ActivityIndicator />}
      <TextInput
        value={name.value}
        onChangeText={(text) => setName({ value: text, error: false })}
        mode="outlined"
        label="Name"
      />
      <HelperText type="error" visible={name.error}>
        Should be combination of numbers & alphabets
      </HelperText>
      <TextInput
        value={description.value}
        onChangeText={(text) => setDescription({ value: text, error: false })}
        mode="outlined"
        label="Description"
      />
      <HelperText type="error" visible={description.error}>
        Should not be empty
      </HelperText>
      <Button onPress={createList} mode="contained">
        Create
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
});

export default CreateListModal;
