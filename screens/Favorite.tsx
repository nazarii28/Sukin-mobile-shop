import {FlatList, ScrollView, StyleSheet} from 'react-native';

import {REACT_APP_BACKEND_URL} from '@env';
import { View } from '../components/Themed';
import {useSelector} from "react-redux";
import { RootState } from '../store';
import FlatProductItem from "../components/FlatProductItem";
import {Product} from "../types";
import {LinearGradient} from "expo-linear-gradient";
import {StatusBar} from "expo-status-bar";

const Favorite = ({navigation}) => {
    const products = useSelector((state: RootState) => state.favorite.products);

    return (
        <LinearGradient
            start={{ x: 0.3, y: 0.5 }}
            end={{ x: 1.4, y: 0.5 }}
            colors={['#dbdbdb', '#EBEBEF']}>
            <StatusBar translucent={true}/>
            <View style={styles.wrapper}>
                <FlatList
                    data={products}
                    keyExtractor={item => item.id}
                    renderItem={({item}) => (
                        <FlatProductItem
                            title={item.attributes.title}
                            shortDescription={item.attributes.shortDescription}
                            price={item.attributes.price}
                            image={REACT_APP_BACKEND_URL + item.attributes.image.data[0].attributes.url}
                            onPress={() => navigation.navigate('ProductInner', {
                                id: item.id
                            })}
                        />
                    )}
                />
            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        paddingTop: 70,
        paddingHorizontal: 15,
        minHeight: '100%'
    }
});

export default Favorite;