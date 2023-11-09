import React, { useEffect, useRef, useState } from "react";

import {
  StyleSheet,
  FlatList,
  Text,
  View,
  ActivityIndicator,
} from "react-native";
import {
  IconButton,
  Card,
  Title,
  Paragraph,
  Portal,
  Dialog,
  Button,
  Snackbar,
} from "react-native-paper";
import { range } from "lodash";
import { loadData } from "../../services/api";
import { useIsFocused } from "@react-navigation/native";

const data = range(10).map((index) => ({ index }));

type RemoveDialogProps = {
  visible: boolean;
  hideDialog: () => void;
  onOkPress: () => void;
};

type RemoveDialogErrorProps = {
  visible: boolean;
  onDismissSnackBar: () => void;
};

type MovieList = {
  description: string;
  favorite_count: number;
  id: number;
  item_count: number;
  iso_639_1: string;
  list_type: string;
  name: string;
  poster_path: string | null;
};

//TODO: interviewee add type
const RemoveDialog: React.FC<RemoveDialogProps> = ({
  visible,
  hideDialog,
  onOkPress,
}) => (
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
const RemoveDialogError: React.FC<RemoveDialogErrorProps> = ({
  visible,
  onDismissSnackBar,
}) => (
  <Snackbar visible={visible} onDismiss={onDismissSnackBar}>
    Oops, something went wrong
  </Snackbar>
);

const Lists = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [snackbarVisible, setSnackbarVisible] = useState<boolean>(false);
  const [list, setList] = useState<MovieList[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1); // Current page
  const itemsPerPage = 20; // Number of items to load per page
  const isFetching = useRef(false); // Flag to prevent multiple fetch calls
  const isFocused = useIsFocused();
  // const [isErrorComponentVisible, setIsErrorComponentVisible] = useState(false)  // put this if we want specify error;

  const requestList = async () => {
    try {
      if (isFetching.current) return; //prevent multi req
      isFetching.current = true;
      const newData = await loadData(currentPage);
      isFetching.current = false;
      if (newData?.length > 0) {
        setList((list) => [...list, ...newData]); // Append the new data to the existing data
      }
    } catch (e) {
      // setIsErrorComponentVisible(true); // put this if we want specify error
      console.error(e);
      isFetching.current = false; // Reset the fetching flag
      throw new Error(e);
    }
  };

  useEffect(() => {
    if (list?.length < currentPage * itemsPerPage && isFocused) {
      requestList();
    }
  }, [currentPage, isFocused]);
  useEffect(() => {
    if (!isFocused) {
      setCurrentPage(1);
      setList([]);
    }
  }, [isFocused]);

  const handleScroll = () => {
    list?.length === currentPage * itemsPerPage &&
      setCurrentPage(currentPage + 1);
  };

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
      {/*{isErrorComponentVisible && <ErrorFallbackComponent />} // put this if we want specify error*/}
      {isFetching.current && <ActivityIndicator />}
      <FlatList
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.list}
        keyExtractor={(item) => item?.id?.toString()}
        initialNumToRender={20}
        onEndReachedThreshold={0.1}
        onEndReached={handleScroll}
        data={list}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Card.Content>
              <Title>List name: {item.name}</Title>
              <Paragraph>Description: {item.description}</Paragraph>
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
    justifyContent: "space-around",
  },
  empty: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Lists;
