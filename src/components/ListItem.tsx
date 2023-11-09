import React, {memo, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {StyleSheet, Text, View, Pressable, Image, ActivityIndicator, useWindowDimensions} from 'react-native';

interface ItemProps {
  image: string;
  title: string;
  author: string;
  price: number;
}

const ListItem = memo(({image, title, author, price}: ItemProps) => {
  const [isLoading, seIsLoading] = useState(true)
  const {navigate} = useNavigation();

  const useLandscape=()=> {
    const {height, width} = useWindowDimensions();
    return width > height;
  }
  const isLandscape = useLandscape();

    const onPress = () => {
      navigate('ProductDetails', {
        image,
        title,
        author,
        price,
      });
    };
    return (
      <Pressable
        onPress={onPress}
        style={[
          styles.wrapper,
          isLandscape ? styles.landscapeWrapper : null,
        ]}>
        {isLoading && <ActivityIndicator size='small' color='blue' />}
          <Image
              source={{ uri: image }}
              style={{
                minWidth: isLandscape ? '20%' : '50%',
                height: 176,
                resizeMode: 'contain',
              }}
              onLoadEnd={()=>seIsLoading(false)}
          />
        <View style={styles.innerWrapper}>
          <Text style={styles.title} numberOfLines={3}>
            {title}
          </Text>
          <Text style={styles.author}>
            {author}
          </Text>
          <Text style={styles.price}>
            {price}
            <>&#8364;</>
          </Text>
        </View>
      </Pressable>
    );
  },
);
export default ListItem;

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    width: '100%',
    maxWidth: '100%',
    height: 180,
    flexWrap: 'nowrap',
    border: 'solid',
    borderWidth: 1,
    borderRadius: 8,
    marginVertical: 10,
  },
  landscapeWrapper: {
    maxWidth: '50%',
  },
  innerWrapper: {
    width: '55%',
    marginLeft: 8,
    marginTop: 8,
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  imgWrapper: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 'auto',
  },
  author: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: '800',
    color: '#ad8d36',
    marginBottom: 8,
  },
});
