import React, {useState} from 'react';
import {View, useWindowDimensions, StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import Search from '../components/Search';
import Lists from "../components/Lists";

export const Home = () => {
    const insets = useSafeAreaInsets();
    function useLandscape() {
        const {height, width} = useWindowDimensions();
        return width > height;
    }
    const isLandscape = useLandscape();
    const [searchParams, setSearchParams] = useState<string>('');
    return (
        <View
            style={[
                styles.screen,
                isLandscape
                    ? {
                        ...styles.landscapeScreen,
                        paddingLeft: insets.left,
                        paddingRight: insets.right,
                    }
                    : null,
            ]}>
            <Search submit={setSearchParams}/>
            <Lists searchParams={searchParams}/>
        </View>
    );
};
const styles = StyleSheet.create({
    screen: {
        flexGrow: 1,
        paddingHorizontal: 34,
        paddingVertical: 4,
    },
    landscapeScreen: {
        paddingVertical: 16,
    },
    header: {
        fontSize: 20,
        fontWeight: '800',
        color: 'black',
        textTransform: 'uppercase',
        marginBottom: 16,
    },
    text: {
        color: 'white',
    },
});
