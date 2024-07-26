import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../screens/Login';
import Home from '../screens/Home';
import Appointment from '../screens/Appointment';
import Customer from '../screens/Customer';

type PublicStackParamList = {
    Login: undefined;
}

type MainStackParamList = {
    Home: undefined;
    Appointment: undefined;
    Customer: undefined;
}

const PublicStack = createStackNavigator<PublicStackParamList>();
const MainStack = createStackNavigator<MainStackParamList>();

const PublicNavigator = () => {
    return (
        <PublicStack.Navigator>
            <PublicStack.Screen name="Login" component={Login}/>
        </PublicStack.Navigator>
    );
}

const MainNavigator = () => {
    return (
        <MainStack.Navigator>
            <MainStack.Screen name="Home" component={Home} />
            <MainStack.Screen name="Appointment" component={Appointment} />
            <MainStack.Screen name="Customer" component={Customer} />
        </MainStack.Navigator>
    );
}

const RootNavigator = () => {
    const logged = true;

    return (
        <NavigationContainer>
            {logged ? MainNavigator() : PublicNavigator()}
        </NavigationContainer>
    );
}

export default RootNavigator