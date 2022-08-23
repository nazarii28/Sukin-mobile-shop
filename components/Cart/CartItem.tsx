import {Image, Pressable, StyleSheet, Text} from 'react-native';

import { View } from '../Themed';
import FontAwesome from "@expo/vector-icons/FontAwesome";

interface CartItemProps {
    count: number;
    onDecrement?: () => void;
    onIncrement?: () => void;
    onClose: () => void;
    image: string;
    name: string;
    price: number;
    shortDescription: string
}

const CartItem = ({count, onDecrement, onIncrement, image, name, shortDescription, price, onClose}: CartItemProps) => {
    return (
        <View style={styles.wrapper}>
            <Image
                style={styles.image}
                source={{
                    uri: image,
                }}
            />
            <View
            style={{
                flex: 1
            }}
            >
                <Text style={styles.title}>
                    {name}
                </Text>
                <Text style={styles.description}>
                    {shortDescription}
                </Text>
                <View style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    marginTop: 5
                }}>
                    <Text style={styles.price}>
                        ${price}
                    </Text>
                    <View style={styles.counter}>
                        <Pressable
                            onPress={onDecrement}
                            style={[styles.counterButton, styles.counterButtonGhost]}>
                            <FontAwesome
                                name="minus"
                                color="#000"
                                size={10}/>
                        </Pressable>
                        <Text style={styles.counterNumber}>{count}</Text>
                        <Pressable
                            onPress={onIncrement}
                            style={styles.counterButton}>
                            <FontAwesome
                                name="plus"
                                color="#fff"
                                size={10}/>
                        </Pressable>
                    </View>
                </View>
            </View>
            <Pressable
                onPress={onClose}
                style={styles.closeIcon}
            >
                <FontAwesome name="times" size={18}/>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 20,
        position: 'relative'
    },
    closeIcon: {
      position: 'absolute',
      right: 5,
      top: 5
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 15,
        marginRight: 20
    },
    title: {
        fontWeight: 'bold',
        fontSize: 18
    },
    description: {
        fontSize: 12,
        color: 'grey'
    },
    price: {
        fontWeight: 'bold',
        fontSize: 19
    },
    counter: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    counterButton: {
        borderRadius: 9999,
        width: 30,
        height: 30,
        backgroundColor: '#000',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    counterButtonGhost: {
        backgroundColor: 'transparent',
        borderColor: '#000',
        borderWidth: 1,
        borderStyle: 'solid',
    },
    counterNumber: {
        fontSize: 18,
        fontWeight: 'bold',
        marginHorizontal: 10
    }
})

export default CartItem;