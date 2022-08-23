import {useEffect} from 'react';
import {StyleSheet, Pressable, ScrollView} from 'react-native';

import MasonryList from '@react-native-seoul/masonry-list';
import {Text, View} from '../components/Themed';
import SearchBar from '../components/SearchBar';
import {Product, RootTabScreenProps} from '../types';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import ProductCard from '../components/ProductCard';
import {useGetProductsQuery} from '../services/products';
import { REACT_APP_BACKEND_URL } from "@env";
import {useDispatch} from "react-redux";
import {addFavoriteProduct, removeFavoriteProduct} from "../features/favorite/favoriteSlice";
import { useState } from 'react';
import { useDebounce } from '../hooks/useDebounce';


export default function Home({navigation}: RootTabScreenProps<'TabOne'>) {

    const [query, setQuery] = useState('');
    const debouncedQuery: string = useDebounce<string>(query, 500);
    const {data: products, isLoading, isFetching} = useGetProductsQuery(debouncedQuery);
    const dispatch = useDispatch();

    const onLikeHandler = (product: Product, isLiked: boolean) => {
        if(isLiked) {
            dispatch(removeFavoriteProduct(product.id));
        } else {
            dispatch(addFavoriteProduct(product));
        }
    }

    useEffect(() => {
        console.log('isFetching')
    }, [isFetching])

    return (
        <View style={styles.container}>
            <View style={styles.filterRow}>
                <SearchBar
                    value={query}
                    onChange={setQuery}
                />
                <Pressable style={styles.filterButton}>
                    <FontAwesome name="sliders" size={20}/>
                </Pressable>
            </View>
            {
                isFetching && <Text>
                    loading
                </Text>
            }

            <ScrollView>
                {
                    !isLoading &&
                    products.data.length === 0
                    ?
                        <Text>No results</Text>
                    :
                    <MasonryList
                        data={products.data}
                        contentContainerStyle={{paddingVertical: 20, marginHorizontal: -15}}
                        keyExtractor={(item): string => item.id}
                        showsVerticalScrollIndicator={false}
                        renderItem={({item, i}) => {
                            if (i === 0) {
                                return <Text style={styles.title}>Found {"\n"}{products.data.length - 1} Results</Text>
                            } else {
                                return <ProductCard
                                    onPress={() => navigation.navigate('ProductInner', {
                                        id: item.id
                                    })}
                                    id={item.id}
                                    onLike={(isLiked) => onLikeHandler(item, isLiked)}
                                    title={item.attributes.title}
                                    description={item.attributes.shortDescription}
                                    image={REACT_APP_BACKEND_URL + item.attributes.image.data[0].attributes.url}
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
