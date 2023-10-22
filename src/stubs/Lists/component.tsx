import React, {useState} from 'react';

import {StyleSheet, FlatList, Text, View} from 'react-native';
import {
  IconButton,
  Card,
  Title,
  Paragraph,
  Portal,
  Dialog,
  Button,
  Snackbar,
} from 'react-native-paper';
import {range} from 'lodash';

const data = range(10).map(index => ({index}));

//TODO: interviewee add type
const RemoveDialog = ({visible, hideDialog, onOkPress}) => (
  <Portal>
    <Dialog visible={visible} onDismiss={hideDialog}>
      <Dialog.Content>
        <Paragraph>Do you want to delete list?</Paragraph>
      </Dialog.Content>
      <Dialog.Actions>
        <Button>Cancel</Button>
        <Button onPress={onOkPress}>Ok</Button>
      </Dialog.Actions>
    </Dialog>
  </Portal>
);

//TODO: interviewee add type
const RemoveDialogError = ({visible, onDismissSnackBar}) => (
  <Snackbar visible={visible} onDismiss={onDismissSnackBar}>
    Oops, something went wrong
  </Snackbar>
);

const Lists = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  const showModal = () => {
    setModalVisible(true);
  };

  const hideModal = () => {
    setModalVisible(false);
  };

  const showSnackbar = () => {
    showModal();
    setSnackbarVisible(true);
  };

  const hideSnackbar = () => {
    setSnackbarVisible(false);
  };

  return (
    <>
      <FlatList
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.list}
        data={data}
        renderItem={({index}) => (
          <Card style={styles.card}>
            <Card.Content>
              <Title>List name{index}</Title>
              <Paragraph>Description</Paragraph>
            </Card.Content>
            <Card.Actions>
              <IconButton icon="delete-outline" onPress={showModal} />
            </Card.Actions>
          </Card>
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text>No results</Text>
          </View>
        }
      />
      <RemoveDialog
        visible={modalVisible}
        hideDialog={hideModal}
        onOkPress={showSnackbar}
      />
      <RemoveDialogError
        visible={snackbarVisible}
        onDismissSnackBar={hideSnackbar}
      />
    </>
  );
};

const styles = StyleSheet.create({
  list: {
    flex: data.length === 0 ? 1 : 0,
  },
  card: {
    flex: 1,
    margin: 5,
  },
  row: {
    flex: 1,
    justifyContent: 'space-around',
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Lists;
