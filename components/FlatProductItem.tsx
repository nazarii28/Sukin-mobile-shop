import {Text, StyleSheet, Image, TouchableNativeFeedback} from 'react-native';

import Colors from "../constants/Colors";
import {View} from './Themed';
import useColorScheme from "../hooks/useColorScheme";


interface FlatProductItemProps {
    title: string,
    shortDescription: string,
    image: string,
    price: number,
    onPress?: () => void
}

const FlatProductItem = ({title, shortDescription, image, price, onPress}: FlatProductItemProps) => {
    const colorScheme = useColorScheme()
    return (
        <View style={styles.container}>
            <TouchableNativeFeedback
                onPress={onPress}
            >
                <View style={styles.wrapper}>
                    <Image
                        style={styles.image}
                        source={{
                            uri: image,
                        }}
                    />
                    <View>
                        <View style={{
                            display: 'flex',
                            flexDirection: 'row'
                        }}>
                            <Text style={styles.title}>{title}</Text>
                            <Text style={styles.price}>${price}</Text>
                        </View>
                        <Text style={styles.shortDescription}>{shortDescription}</Text>
                    </View>
                </View>
            </TouchableNativeFeedback>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 15,
        overflow: 'hidden'
    },
    wrapper: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 15,
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginBottom: 15,
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        color: '#000',
        flexBasis: '70%'
    },
    shortDescription: {

    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 15,
        marginRight: 15
    },
    price: {
        fontWeight: '700',
        fontSize: 17,
        marginLeft: -25,
        color: Colors['light'].tint
    }
});

export default FlatProductItem;