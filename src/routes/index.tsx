import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Login from '../screens/Login';
import Appointment from '../screens/Appointment';
import Payment from '../screens/Payment';
import Customer from '../screens/Customer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AppointmentCreateUpdate from '../screens/Appointment/components/AppointmentCreateUpdate';

export type PublicStackParamList = {
    Login: undefined;
}

export type AppointmentStackParamList = {
    Appointment: undefined;
    AppointmentCreateUpdate: {
        id?: number;
        selectedDate: Date;
    }
}

export type PaymentStackParamList = {
    Payment: undefined;
}

export type TabParamsList = {
    Appointment: undefined;
    Payment: undefined;
    Customer: undefined;

}

const PublicStack = createStackNavigator<PublicStackParamList>();
const AppointmentStack = createStackNavigator<AppointmentStackParamList>();
const PaymentStack = createStackNavigator<PaymentStackParamList>();
const Tab = createBottomTabNavigator<TabParamsList>();

const PublicNavigator = () => {
    return (
        <PublicStack.Navigator screenOptions={{headerShown: false}}>
            <PublicStack.Screen name="Login" component={Login}/>
        </PublicStack.Navigator>
    );
}

const AppointmentNavigator = () => {
    return (
        <AppointmentStack.Navigator screenOptions={{headerShown: false}}>
            <AppointmentStack.Screen name="Appointment" component={Appointment}/>
            <AppointmentStack.Screen name="AppointmentCreateUpdate" component={AppointmentCreateUpdate}/>
        </AppointmentStack.Navigator>
    );
}

const PaymentNavigator = () => {
    return (
        <PaymentStack.Navigator screenOptions={{headerShown: false}}>
            <PaymentStack.Screen name="Payment" component={Payment}/>
        </PaymentStack.Navigator>
    );
}

const TabNavigator = () => {
    return (
        <Tab.Navigator 
            screenOptions={{
            headerShown: false,
            tabBarStyle: { position: 'absolute', backgroundColor: '#f2f2f2' },
        }}>
            <Tab.Screen 
                name="Appointment" 
                component={AppointmentNavigator} 
                options={{
                    tabBarIcon: () => <Icon name="book-clock" size={28} />,
                    tabBarLabelStyle: { fontSize: 12 },
                }}
            />
            <Tab.Screen 
                name="Payment" 
                component={PaymentNavigator}
                options={{
                    tabBarIcon: () => <Icon name="currency-brl" size={28} />,
                    tabBarLabelStyle: { fontSize: 12 },
                }}
            />
            <Tab.Screen 
                name="Customer" 
                component={Customer}
                options={{
                    tabBarIcon: () => <Icon name="account-group" size={28} />,
                    tabBarLabelStyle: { fontSize: 12 },
                }}
            />
        </Tab.Navigator>
    );
}

const RootNavigator = () => {
    const logged = true;

    return (
        <NavigationContainer>
            {logged ? TabNavigator() : PublicNavigator()}
        </NavigationContainer>
    );
}

export default RootNavigator