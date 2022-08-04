import {Pressable, StyleSheet, Text, View} from "react-native";
import {Feather} from "@expo/vector-icons";
import {useSelector} from "react-redux";
import {RootState} from "../store";

const CartIcon = ({navigation}) => {

    const totalQuantity = useSelector((state: RootState) => state.cart.totalQuantity);

    return (
        <Pressable
            style={styles.button}
            onPress={() => navigation.navigate('Cart')}>
            {
                totalQuantity > 0 &&
                <View style={styles.counter}>
                    <Text style={styles.counterText}>
                        {totalQuantity}
                    </Text>
                </View>
            }
            <Feather name="shopping-bag" size={23}/>
        </Pressable>
    );
}

const styles =  StyleSheet.create({
    button: {
        position: 'relative',
    },
    counterText: {
        fontSize: 11,
        color: '#fff',
    },
    counter:  {
        position: 'absolute',
        right: -5,
        top: -5,
        zIndex: 999,
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: '#000',
        paddingHorizontal: 4,
        height: 15,
        borderRadius: 5
    }
})

export default CartIcon;