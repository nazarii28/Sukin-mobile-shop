import {TextInput, StyleSheet, Pressable, Text} from "react-native";

import { View } from '../Themed';

const PromoCodeField = () => {
    return (
        <View style={styles.wrapper}>
            <TextInput style={styles.input} placeholder="Promo Code" />
            <Pressable style={styles.button}>
                <Text style={styles.buttonText}>
                    Apply
                </Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 15,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    input: {
        width: '75%'
    },
    button: {
        backgroundColor: '#000',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 14
    }
})

export default PromoCodeField;