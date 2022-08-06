/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import {FontAwesome, Feather} from '@expo/vector-icons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer, DefaultTheme, DarkTheme} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as React from 'react';
import {ColorSchemeName, Pressable, Image} from 'react-native';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import TabOneScreen from '../screens/TabOneScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import ProductInner from '../screens/ProductInner';
import Cart from '../screens/Cart';
import {RootStackParamList, RootTabParamList, RootTabScreenProps} from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import ProductCard from "../components/ProductCard";
import CartIcon from '../components/CartIcon';
import Favorite from "../screens/Favorite";

export default function Navigation({colorScheme}: { colorScheme: ColorSchemeName }) {
    return (
        <NavigationContainer
            linking={LinkingConfiguration}
            theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <RootNavigator/>
        </NavigationContainer>
    );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Root"
                component={BottomTabNavigator}
                options={{
                    headerShown: false,
                }}/>
            <Stack.Screen
                name="ProductInner"
                options={({navigation}) => ({
                    headerTransparent: true,
                    headerRight: () => (
                        <Pressable onPress={() => navigation.navigate('Cart')}>
                            <CartIcon />
                        </Pressable>
                    )
                })}

                component={ProductInner}/>
            <Stack.Screen name="NotFound" component={NotFoundScreen} options={{title: 'Oops!'}}/>
            <Stack.Group screenOptions={{presentation: 'modal'}}>
                <Stack.Screen name="Modal" component={ModalScreen}/>
            </Stack.Group>
        </Stack.Navigator>
    );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
    const colorScheme = useColorScheme();

    return (
        <BottomTab.Navigator
            initialRouteName="TabOne"
            screenOptions={{
                tabBarShowLabel: false,
                tabBarStyle: {
                    elevation: 0,
                    height: 65,
                    borderRadius: 20,
                    margin: 20,
                    backgroundColor: Colors[colorScheme].backgroundLight
                },
                tabBarActiveTintColor: Colors[colorScheme].tint,
            }}>
            <BottomTab.Screen
                name="TabOne"
                component={TabOneScreen}
                options={({navigation}: RootTabScreenProps<'TabOne'>) => ({
                    headerTransparent: true,
                    title: 'Tab One',
                    tabBarIcon: ({color}) => <TabBarIcon name="list" color={color}/>,
                    headerRight: () => (
                        <Pressable
                            onPress={() => navigation.navigate('Modal')}
                            style={({pressed}) => ({
                                opacity: pressed ? 0.5 : 1,
                            })}>
                            <Image
                                style={{
                                    width: 40,
                                    height: 40,
                                    marginRight: 25,
                                    borderRadius: 10
                                }}
                                source={require('../assets/images/avatar.jpg')}
                            />
                        </Pressable>
                    ),
                })}
            />
            <BottomTab.Screen
                name="Cart"
                component={Cart}
                options={{
                    title: "Shopping Bag",
                    headerTransparent: true,
                    tabBarIcon: ({color}) => <CartIcon color={color}/>,
                }}
            />
            <BottomTab.Screen
                name="Favorite"
                component={Favorite}
                options={{
                    title: "Favorite",
                    headerTransparent: true,
                    tabBarIcon: ({color}) => <TabBarIcon name="heart" color={color}/>,
                }}
            />
        </BottomTab.Navigator>
    );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
    name: React.ComponentProps<typeof FontAwesome>['name'];
    color: string;
}) {
    return <Feather size={23} {...props} />;
}
