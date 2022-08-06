import {StyleSheet, Pressable, ScrollView} from 'react-native';

import MasonryList from '@react-native-seoul/masonry-list';
import EditScreenInfo from '../components/EditScreenInfo';
import {Text, View} from '../components/Themed';
import SearchBar from '../components/SearchBar';
import {RootTabScreenProps} from '../types';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import PRODUCTS from '../PRODUCTS';
import ProductCard from '../components/ProductCard';
import { useGetProductsQuery } from '../services/products';
import {useEffect} from "react";

let count = 0

export default function TabOneScreen({navigation}: RootTabScreenProps<'TabOne'>) {

    const {data: products, isLoading} = useGetProductsQuery();

    return (
        <View style={styles.container}>
            <View style={styles.filterRow}>
                <SearchBar/>
                <Pressable style={styles.filterButton}>
                    <FontAwesome name="sliders" size={20}/>
                </Pressable>
            </View>
            <ScrollView>
                {
                    !isLoading &&
                    <MasonryList
                        data={products.data}
                        contentContainerStyle={{paddingVertical: 20, marginHorizontal: -15}}
                        keyExtractor={(item): string => item.id}
                        showsVerticalScrollIndicator={false}
                        renderItem={({item, i}) => {
                            if (i === 0) {
                                return <Text style={styles.title}>Found {"\n"}10 Results</Text>
                            } else {
                                return <ProductCard
                                    onPress={() => navigation.navigate('ProductInner', {
                                        id: item.id
                                    })}
                                    title={item.attributes.title}
                                    description={item.attributes.shortDescription}
                                    image={'http://10.0.2.2:1337' + item.attributes.image.data[0].attributes.url}
                                    price={item.attributes.price}
                                />
                            }
                        }}
                    />
                }

            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 90,
        paddingBottom: 10,
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginLeft: 15
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
    filterRow: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 50
    },
    filterButton: {
        backgroundColor: '#fff',
        height: '100%',
        width: 50,
        borderRadius: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    filterButtonText: {
        fontSize: 30
    }
});
