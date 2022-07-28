import { useEffect } from 'react';
import { StyleSheet, Image, Text } from 'react-native';

import Animated from 'react-native-reanimated'
import { View } from  '../Themed';

const Tags = ({ itemStyle }: {itemStyle: object}) => {


    return (
        <Animated.View style={[styles.tags]}>
            <Animated.View style={[
                styles.tag,
                itemStyle
                ]}>
                <Image
                    resizeMode='center'
                    style={styles.tagImage}
                    source={require('../../assets/images/plant.png')}
                />
                <Text style={styles.tagText}>Vegan</Text>
            </Animated.View>
            <Animated.View style={[
                styles.tag,
                itemStyle
                ]}>
                <Image
                    resizeMode='center'
                    style={styles.tagImage}
                    source={require('../../assets/images/nature2.png')}
                />
                <Text style={styles.tagText}>Natural</Text>
            </Animated.View>
            <Animated.View style={[
                styles.tag,
                itemStyle
                ]}>
                <Image
                    resizeMode='center'
                    style={styles.tagImage}
                    source={require('../../assets/images/nature.png')}
                />
                <Text style={styles.tagText}>Neutral</Text>
            </Animated.View>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    tags: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 20,
        marginBottom: 20
    },
    tag: {
        backgroundColor: '#fff',
        width: 100,
        height: 100,
        display: 'flex',
        alignItems: 'center',
        borderRadius: 20,
        justifyContent: 'center'
    },
    tagText: {
        marginTop: 5,
        fontSize: 13,
        color: 'grey',
        textAlign: 'center'
    },
    tagImage: {
        width: 40,
        height: 40
    }
})

export default Tags;