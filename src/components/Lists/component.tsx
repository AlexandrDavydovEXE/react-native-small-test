import React, { useEffect, useRef, useState } from "react";

import {
  StyleSheet,
  FlatList,
  Text,
  View,
  ActivityIndicator,
} from "react-native";
import {searchData} from "../../api/api";
import ListItem from "../ListItem";

type ListProps = {
  firstPreviewImage: any;
  id: string|number;
  author: any;
  title: string;
  price: number;
  img: string;
};

const Lists = ({searchParams}: any) => {
  const [list, setList] = useState<ListProps[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1); // Current page
  const itemsPerPage = 20; // Number of items to load per page
  const isFetching = useRef(false); // Flag to prevent multiple fetch calls

  const requestList = async () => {
    try {
      if (isFetching.current) return; //prevent multi req
      isFetching.current = true;
      const newData = await searchData(searchParams,currentPage);
      isFetching.current = false;
      if (newData?.length > 0) {
        setList((list) => [...list, ...newData]); // Append the new data to the existing data
      }
    } catch (e) {
      console.error(e);
      isFetching.current = false; // Reset the fetching flag
      throw new Error(e);
    }
  };

  useEffect(() => {
      requestList()
  }, [currentPage]);

  useEffect(() => {
    currentPage > 1 && setCurrentPage(1);
    list.length && setList([]);
    requestList();
  }, [searchParams]);

  const handleScroll = () => {
    list?.length === currentPage * itemsPerPage &&
      setCurrentPage(currentPage + 1);
  };

  return (
    <>
      {isFetching.current && <ActivityIndicator />}
      <FlatList
        initialNumToRender={20}
        onEndReachedThreshold={0.1}
        onEndReached={handleScroll}
        data={list}
        renderItem={({ item }) => (
            <ListItem
                title={item.title}
                price={item.price}
                image={item.firstPreviewImage.watermarked}
                author={item.author.details.publicName}
            />
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text>No results</Text>
          </View>
        }
      />
    </>
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
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
