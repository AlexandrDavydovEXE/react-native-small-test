import {ActivityIndicator, Image, StyleSheet, Text, useWindowDimensions, View} from "react-native";
import React, {useState} from "react";
import {useRoute} from "@react-navigation/native";
import {useSafeAreaInsets} from "react-native-safe-area-context";

const ProductDetails = ()=> {
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const {params} = useRoute();
    const insets = useSafeAreaInsets();
    const useLandscape=()=> {
        const {height, width} = useWindowDimensions();
        return width > height;
    }
    const isLandscape = useLandscape();

    const screenStyles = [
        {
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
        },
        isLandscape
            ? {
                flexDirection: 'row',
                paddingLeft: insets.left,
                paddingRight: insets.right,
                paddingTop: 16,
                paddingBottom: 16,
            }
            : {
                flexDirection: 'column',
                paddingLeft: 16,
                paddingRight: 16,
                paddingTop: 16,
                paddingBottom: 16,
            },
    ];
    return(
        <View style={screenStyles}>
            {isLoading && !isError ? (
                <ActivityIndicator size="large" color="#ad8d36" />
            ) : null}
            <Image
                        source={{ uri: params.image }}
                        style={[styles.image, {width: isLandscape ? '50%' : '100%',}]}
                        onLoad={() => setIsLoading(false)}
                        onError={() => setIsError(true)}
                    />
                <View style={isLandscape ? styles.textWrapper : null}>
                    <View style={styles.textContainer}>
                        <Text style={styles.label}>Title</Text>
                        <Text style={ styles.text}>{params.title}</Text>
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.label}>Author</Text>
                        <Text style={styles.text}>{params?.author}</Text>
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.label}>Price</Text>
                        <Text style={styles.text}>
                            {` ${params.price}`}
                            <>&#8364;</>
                        </Text>
                    </View>
                </View>
        </View>
    )
}
export default ProductDetails

const styles = StyleSheet.create({
    textWrapper: {
        marginLeft: 16,
        maxWidth: '50%',
    },
    textContainer: {
        marginBottom: 16,
    },
    label: {
        fontSize: 26,
        fontWeight: '800',
        color: '#ad8d36',
        marginBottom: 4,
    },
    text: {
        fontSize: 22,
    },
    image: {
        height: 300,
        resizeMode: 'contain',
        borderRadius: 8,
    },
});
