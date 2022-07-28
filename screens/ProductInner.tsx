import { Dimensions, Text, StyleSheet, Image, TouchableOpacity, Pressable, Button, Platform, useWindowDimensions  } from 'react-native';
import { useState, useRef, useCallback } from 'react';

import { View } from '../components/Themed';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import PRODUCTS from '../PRODUCTS';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetRefProps } from '../components/BottomSheet';
import { StatusBar } from 'expo-status-bar';
import {
    PagerTabIndicator,
    IndicatorViewPager,
    PagerTitleIndicator,
    PagerDotIndicator,
  } from '@shankarmorwal/rn-viewpager';


const slides = [
    {
        key: 1
    },
    {
        key: 2
    }
]

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
const slideHeight = viewportHeight * 0.8

const ProductInner = ({navigation, route}: boolean) => {
    const {id} = route.params;
    const {name, shortDescription, price} = PRODUCTS.filter(item => item.id === id)[0]

    const [productCount, setProductCount] = useState(1);

    const increment = () => {
        setProductCount(Math.min(10, productCount + 1))
    }

    const decrement = () => {
        setProductCount(Math.max(1, productCount - 1))
    }

    const ref = useRef<BottomSheetRefProps>(null);


    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <StatusBar translucent={true}/>
            <View style={styles.container}>
                <View style={styles.slider}>
                    <IndicatorViewPager
                       style={{flex: 1, paddingTop: 20, backgroundColor: 'white'}}
                       indicator={<PagerDotIndicator pageCount={3} />}>
                        <View>
                            <Image
                                style={styles.image}
                                source={{
                                    uri: 'https://cdn.shopify.com/s/files/1/0081/7374/8305/products/Facial_Recovery_Serum_30ml_FL_01_1200x1200.jpg?v=1599504591',
                                }}
                            /> 
                        </View>
                        <View>
                            <Image
                                style={styles.image}
                                source={{
                                    uri: 'https://cdn.shopify.com/s/files/1/0081/7374/8305/products/Facial_Recovery_Serum_30ml_FL_01_1200x1200.jpg?v=1599504591',
                                }}
                            /> 
                        </View>
                    </IndicatorViewPager>  
                </View>
            <BottomSheet
                onUpdate={(value) => console.log(value)}
                ref={ref}>
                <View style={styles.content}>
                    <View
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between'
                        }}
                    >
                            <View>
                                <Text style={styles.title}>{name}</Text>
                                <Text style={styles.shortDescription}>{shortDescription}</Text>
                            </View>
                            <View>
                                <View style={styles.stars}>
                                    <View style={styles.starsFilled}>
                                        {
                                            [0, 1, 2, 3, 4].map(item => (
                                                <FontAwesome
                                                    style={styles.star}
                                                    key={item}
                                                    name="star"
                                                    color="#000"
                                                    size={15}/> 
                                            ))
                                        }
                                    </View>
                                        {
                                            [0, 1, 2, 3, 4].map(item => (
                                                <FontAwesome
                                                    style={styles.star}
                                                    key={item}
                                                    name="star"
                                                    color="#E1E1E1"
                                                    size={15}/> 
                                            ))
                                        }
                                </View>
                                <Text style={styles.shortDescription}>(132 Reviews)</Text>
                            </View>
                    </View>
                    <View
                            style={{
                                marginTop: 30,
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between'
                            }}
                        >
                            <Text style={styles.price}>
                                ${price}
                            </Text>
                            <View
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center'
                                }}
                            >
                                <View style={styles.counter}>
                                    <Pressable 
                                    onPress={decrement}
                                    style={styles.counterButton}>
                                        <FontAwesome
                                            name="minus"
                                            size={10}/> 
                                    </Pressable>
                                    <Text>{productCount}</Text>
                                    <Pressable
                                    onPress={increment}
                                    style={styles.counterButton}>
                                        <FontAwesome
                                            name="plus"
                                            size={10}/> 
                                    </Pressable>
                                </View>
                                <Pressable 
                                style={({ pressed }) => [
                                        {
                                            backgroundColor: pressed ? 'rgba(28, 28, 28, .8)' : 'rgba(28, 28, 28, 1)'
                                        },
                                        styles.cartButton
                                    ]}>
                                    <Text style={styles.cartButtonText}>Cart</Text>
                                </Pressable>
                            </View>
                    </View>
                    <Text style={styles.longDescription}>
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempora, error asperiores officiis doloremque quibusdam fuga suscipit eius! Neque animi ipsam ipsa totam obcaecati, ducimus odio, vel, tempora molestiae velit modi!
                    </Text>
                </View>
            </BottomSheet>
            </View>
      </GestureHandlerRootView>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        flex: 1,
    },
    slider: {
        marginTop: -50,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    content: {
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold'
    }, 
    shortDescription: {
        color: 'grey',
        fontSize: 13
    },
    starsFilled: {
        position: 'absolute',
        display: 'flex',
        width: '63%',
        overflow: 'hidden',
        flexDirection: 'row',
        left: 0,
        top: 0,
        zIndex: 2,
    },
    stars: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 7,
        marginTop: 10,
        position: 'relative',
        zIndex: 1,
    },
    star: {
        marginHorizontal: 2
    },
    price: {
        fontSize: 30,
        fontWeight: 'bold'
    },
    counter: {
        borderRadius: 20,
        borderColor: '#e7e7e9',
        borderWidth: 1,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: 100,
    },
    counterButton: {
        paddingHorizontal: 10,
        paddingVertical: 13,
    },
    cartButton: {
        borderRadius: 15,
        paddingVertical: 15,
        paddingHorizontal: 20,
        marginLeft: 10
    },
    cartButtonText: {
        color: '#fff',
        fontSize: 17,
    },
    button: {
        height: 50,
        borderRadius: 25,
        aspectRatio: 1,
        backgroundColor: 'white',
        opacity: 0.6,
    },
    longDescription: {
        color: 'grey',
        fontSize: 15,
        lineHeight: 25,
        marginTop: 20
    }
})

export default ProductInner