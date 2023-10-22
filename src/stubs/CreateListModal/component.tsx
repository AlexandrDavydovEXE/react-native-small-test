import React from 'react';

import {View, StyleSheet} from 'react-native';
import {TextInput, Button, HelperText} from 'react-native-paper';

const CreateListModal = () => (
  <View style={styles.container}>
    <TextInput mode="outlined" label="Name" />
    <HelperText type="error" visible={false}>
      Should be combination of numbers & alphabets
    </HelperText>
    <TextInput mode="outlined" label="Description" />
    <HelperText type="error" visible={false}>
      Should not be empty
    </HelperText>
    <Button mode="contained">Create</Button>
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
});

export default CreateListModal;
