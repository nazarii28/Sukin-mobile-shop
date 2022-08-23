import { Image, StyleSheet, Text, Pressable, TouchableNativeFeedback } from 'react-native';
import Colors from '../constants/Colors';

import { View } from './Themed';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import useColorScheme from "../hooks/useColorScheme";
import {useSelector} from "react-redux";
import {RootState} from "../store";
import { Product } from '../types';

interface ProductCardProps {
    id: number,
    title: string,
    description?: string,
    price: string,
    image: string,
    onPress?: () => void,
    onLike?: (isLiked: boolean) => void
}

const ProductCard = ({id, title, description, price, image, onPress, onLike}: ProductCardProps) => {

    const colorScheme = useColorScheme();
    const favoriteProducts = useSelector((state: RootState) => state.favorite.products)
    const isAddedToFavorite = favoriteProducts.find((item: Product) => item.id === id);

    return (
        <View style={styles.wrapper}>
            <View style={styles.card}>
                <TouchableNativeFeedback
                    onPress={onPress}
                    >
                    <View>
                        <Image
                            style={styles.image}
                            source={{
                                uri: image,
                            }}
                        />
                        <View style={styles.footer}>
                            <Text style={styles.title}>{title}</Text>    
                            <Text style={styles.description}>{description}</Text>    
                            <View style={styles.bottom}>
                                <Text style={styles.price}>
                                    ${price}
                                </Text>
                                <Pressable
                                    onPress={() => onLike(isAddedToFavorite)}
                                    style={styles.likeButton}>
                                    <FontAwesome name="heart" color={isAddedToFavorite ? Colors[colorScheme].backgroundLight : "#fff"}/>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </TouchableNativeFeedback>
            </View>  
        </View>    
    )
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 25,
        backgroundColor: '#fff',
        overflow: 'hidden'
    },
    wrapper: {
        padding: 15
    },
    image: {
        width: '100%',
        height: 200,
    },
    footer: {
        padding: 10
    },
    bottom: {
        marginTop: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    price: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    likeButton: {
        backgroundColor: '#000',
        borderRadius: 999,
        width: 25,
        height: 25,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontWeight: 'bold',
        marginTop: 5,
        fontSize: 14,
    },
    description: {
        opacity: .6
    }
})

export default ProductCard