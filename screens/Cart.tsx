import {StyleSheet, Pressable, Text, ScrollView, TouchableNativeFeedback} from "react-native";
import {StatusBar} from "expo-status-bar";
import { LinearGradient } from 'expo-linear-gradient';

import { View } from '../components/Themed';
import CartItem from '../components/Cart/CartItem';
import LogoSvg from '../components/Svg/LogoSvg';
import PromoCodeField from '../components/Cart/PromoCodeField';
import {useDispatch, useSelector} from "react-redux";
import { RootState } from "../store";
import {plusItem, minusItem, removeItem} from "../features/cart/cartSlice";
import {Product} from "../PRODUCTS";


const Cart = () => {

    const cartItems = useSelector((state: RootState) => state.cart.cartItems);
    const dispatch = useDispatch();

    const incrementProduct = (product: Product) => {
        dispatch(plusItem(product));
    }

    const decrementProduct = (product: Product) => {
        dispatch(minusItem(product));
    }

    const removeProduct = (id: string) => {
        dispatch(removeItem(id));
    }

    const subTotalPrice = cartItems.reduce((acc, cur) => (+cur.product.price * cur.quantity) + acc, 0);
    const shippingPrice = 4.59;
    const totalPrice = (subTotalPrice + shippingPrice).toFixed(2);

    if (cartItems.length === 0) {
        return (
            <LinearGradient colors={['#DEDEE2', '#EBEAEF']}>
                <View style={[styles.container, styles.emptyContainer]}>
                    <Text style={styles.cartEmptyText}>
                        Cart is empty
                    </Text>
                </View>
            </LinearGradient>
        )
    }

    return (
        <LinearGradient
            colors={['#DEDEE2', '#EBEAEF']}>
            <ScrollView style={styles.container}>
                <StatusBar translucent={true}/>
                {
                    cartItems.map(item => (
                        <CartItem
                            key={item.product.id}
                            image={item.product.thumbnail}
                            name={item.product.name}
                            shortDescription={item.product.shortDescription}
                            price={item.product.price}
                            onIncrement={() => incrementProduct(item.product)}
                            onDecrement={() => decrementProduct(item.product)}
                            onClose={() => removeProduct(item.product.id)}
                            count={item.quantity}/>
                    ))
                }
                <PromoCodeField/>
                <View style={styles.listItem}>
                    <Text style={styles.listItemTitle}>
                        Subtotal
                    </Text>
                    <View style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                        <Text style={styles.listItemPrice}>
                            ${subTotalPrice}
                        </Text>
                        <Text style={styles.listItemCurrency}>
                            USD
                        </Text>
                    </View>
                </View>
                <View style={styles.listItem}>
                    <Text style={styles.listItemTitle}>
                        Shipping
                    </Text>
                    <View style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                        <Text style={styles.listItemPrice}>
                            ${shippingPrice}
                        </Text>
                        <Text style={styles.listItemCurrency}>
                            USD
                        </Text>
                    </View>
                </View>
                <View style={styles.listItem}>
                    <Text style={styles.listItemTitle}>
                        Total
                    </Text>
                    <View style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                        <Text style={styles.listItemPrice}>
                            ${totalPrice}
                        </Text>
                        <Text style={styles.listItemCurrency}>
                            USD
                        </Text>
                    </View>
                </View>
                <View style={{
                    overflow: "hidden",
                    borderRadius: 999,
                    marginTop: 20
                }}>
                    <TouchableNativeFeedback
                        background={TouchableNativeFeedback.Ripple('#222426', false)}
                        onPress={() => {}}
                    >
                        <View style={styles.checkoutButton}>
                            <Text style={styles.checkoutButtonText}>
                                Processed To Checkout
                            </Text>
                        </View>
                    </TouchableNativeFeedback>
                </View>

            </ScrollView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 80,
        paddingBottom: 30,
        paddingHorizontal: 20,
        display: 'flex',
        minHeight: '100%'
    },
    emptyContainer: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    cartEmptyText: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    checkoutButton: {
        backgroundColor: '#000',
        borderRadius: 9999,
        padding: 20,
    },
    checkoutButtonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '600'
    },
    listItem: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 20,
        borderColor: '#fff',
        borderStyle: 'solid',
        borderBottomWidth: 1,
    },
    listItemTitle: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    listItemPrice: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    listItemCurrency: {
        color: 'grey',
        fontSize: 18,
        fontWeight: '600',
        marginLeft: 10
    },
})

export default Cart;